# 증권 대시보드 웹사이트 (프론트 엔드)
##### 웹사이트 : https://foxstocks.site
##### 백엔드 깃헙 페이지: https://github.com/bibibush/Foxstocks_Django_backend

## 소개
> 네이버 증권 페이지를 크롤링해서 증권들을 한 눈에 보기 쉬운 대시보드 웹사이트를 개발했습니다.
>
> 현재 인기있는 주식들과 주식들의 시장가를 1분 마다 크롤링해서 보여주고, 각 분야별 주식들의 순위 데이터를 가져와서 데이터 테이블 형태로 보여줍니다.
> 또한 사용자의 투자한 금액과 그 투자한 주식의 시장가에 맞춰 현재 계좌 잔액을 보여주고, 그 차이를 퍼센트로 보여줍니다.
>
> 인증 방식은 JWT인증 방식을 사용했고 로그인, 회원가입 및 사용자 정보 수정 폼은 react-hook-form을 사용해 유효성 검사를 실행합니다.
> 프로필 이미지는 미리보기 기능이 구현되어있습니다.
>
> 서버에서 가져오는 상태의 관리는 tanstack query, 전역상태의 관리는 zustand를 사용해 사용자 정보 및 인증상태를 구현했습니다.

<br />

## 사용 기술
- Typescript
- React:18.3
- Tailwindcss
- Shad cn
- Tanstack Query:v5
- Zustand
- React-Hook-Form
- Tanstack Table
- AWS s3

<br />

## 핵심 설명
<details>
  <summary><b>동적인 사이드바 메뉴 구현</b></summary>

  메뉴를 클릭하면 효과가 강조되고 해당되는 경로로 이동하는 메뉴 리스트를 만드는 것은 어려운 일은 아니지만, 메뉴를 클릭하지 않고도 url의 경로에 따라 메뉴의 효과를 강조시킬 수 있도록 하고 싶었습니다.<br />
  그러므로 현재 url의 경로를 알 수있는 react-router-dom의 useLocation을 사용했고 useLocation의 pathname을 인자로 받아 현재 경로가 메뉴에 할당된 경로와 일치한지를 알 수 있도록 커스텀 메뉴 훅을 만들었습니다.
  ```typescript
  export default function useMenuList({ pathName }: { pathName: string }) {
  const menuList = [
    {
      id: 1,
      menuName: "Dashboard",
      icon: <DashboardIcon color="#84828A" />,
      isActive: pathName === "/",
      to: "/",
    },
    {
      id: 2,
      menuName: "buy-sell",
      icon: <WalletIcon color="#84828A" />,
      isActive: pathName === "/buy-sell",
      to: "/buy-sell",
    },
    {
      id: 3,
      menuName: "Contact",
      icon: <IoMail color="#84828A" size={24} />,
      isActive: pathName === "/contact",
      to: "/contact",
    },
  ];

  return {
    menuList,
  };
}
```
메뉴 리스트를 그대로 반환해도 되지만 메뉴 리스트가 아닌 다른 값들(예를 들어, totalCount 등) 을 반환할 여지를 남겨두어 메뉴 리스트를 담은 객체를 반환했습니다.

훅의 사용은,
```typescript
  const { menuList } = useMenuList({ pathName: location.pathname });
```
이렇게 구현해서 동적인 효과를 가지는 메뉴리스트를 구현했습니다.
</details>

<br />

<details>
  <summary><b>React Query(Tanstack Query)를 커스텀 훅으로 만들어 재사용 용이하게 하기</b></summary>

  react query를 사용해서 서버에서 받아오는 데이터를 유용하게 관리할 수 있었습니다. 특히, 데이터를 가져오는 로딩상태인지, 캐싱을 사용할 것인지, 데이터를 리패칭하는 중 이전의 데이터를 계속 보여줄지, 몇 초 마다 리패치할 것인지 등 서버 상태를   관리하는데 있어서 최고의 도구라고 생각합니다.
  <br />
  이 react query를 커스텀 훅으로 사용하면 재사용하기 용이할 뿐만 아니라 한 커스텀 훅이 서버의 무슨 데이터를 가져오는지 더욱 명확하게 알 수 있습니다. 그래서 저는 react query를 사용할 때 항상 커스텀 훅으로 만들어서 사용합니다.
  <br />
  한 예시를 보여드리겠습니다.
  ```typescript
  interface GetStocksResponse {
  data: Array<Stock>;
  invests: Array<Invested>;
}

interface GetStocksParams {
  userId: number | null;
}

export default function useGetStocks(
  params: GetStocksParams,
  options?: Omit<UseQueryOptions<GetStocksResponse>, "queryKey">
) {
  const results = useQuery<GetStocksResponse>({
    queryKey: ["stocks", params.userId],
    queryFn: () => getStocksAPI(params),
    ...options,
  });

  return {
    ...results,
    data: results.data?.data,
    invests: results.data?.invests,
  };
}
  ```
크롤링한 주식 정보들을 가져오고 1분 마다 업데이트하는 로직을 위해 useGetStocks라는 훅을 만들었습니다.<br />
useGetStocks는 userId라는 프로퍼티가 있는 객체를 인자로 받고, useQuery의 옵션들을 옵셔널한 매개변수로 받습니다. 여기서 타입스크립트의 Omit을 사용해서 UseQueryOptions타입의 queryKey속성을 제거해 주지 않으면 queryKey 중복 에러가 발생합니다.
<br />
매개변수로 받은 유저의 id를 쿼리키에 추가하여 유저의 id가 바뀔때 마다 리패치가 되도록 구현했습니다.
<br />
쿼리함수로는 응답이 성공적이면 GetStocksResponse타입을 가지는 응답 값을 반환하고 만약 응답에 오류가 생기면 Promise의 reject를 반환하는 함수를 할당했습니다. 그리고 useQuery의 옵션들을 스프레드 형식으로 전해줍니다.
<br />
훅의 반환값으로 각 데이터값, 서버에서 가져온 데이터의 상태를 알려주는 값들을 객체안에 담아 반환했습니다.
<br />
작성된 예시의 훅의 사용은
```typescript
 const {
    data: stocks,
    isLoading,
    invests: investsData,
  } = useGetStocks(
    { userId },
    {
      placeholderData: keepPreviousData,
      refetchInterval: 60 * 1000,
    }
  );
```
이런식으로 사용하면 됩니다.
<br />
이렇게 훅의 이름을 목적에 맞게 명확히 하면 이 훅이 주식들을 가져온다는 것을 쉽게 알 수 있습니다.
또한 훅의 첫번째 인자로 쿼리함수로 전달 될 매개변수들을 작성하고 두번째 인자로는 쿼리 관리에 유용하게 사용되는 옵션들을 작성해서, 이 훅을 재사용하기 쉽게 구현했습니다.
<br />
위 예시의 훅은 유저의 id가 변경될 때마다 또는 1분 마다 쿼리를 리패치 시키고, 쿼리가 리패치될때 이전 데이터를 데이터 패치가 완료되기 전까지 보여줍니다.
<br />
react query를 커스텀 훅으로 사용해서 재사용하기 쉽고 목적을 쉽게 알 수 있게 코드를 구현했습니다.
</details>
