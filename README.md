# 증권 대시보드 웹사이트 (프론트 엔드)
##### 웹사이트 : https://foxstocks.site

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

<br />

<details>
  <summary><b>JWT토큰을 활용한 인증 구현</b></summary>

  JWT토큰 인증방식을 사용할때 주로 사용되는 accessToken은 로컬스토리지, accessToken이 만료되서 새로운 accessToken을 재요청하는 용도로 사용되는 refreshToken은 react-cookie를 사용해서 구현했습니다.
  <br />
  로그인 방식은 이메일과 비밀번호를 검증하는 방식으로 처리했습니다.
  ```typescript
   const handleSignin = async (data: AuthenticateFormParams) => {
    try {
      const res = await requestAPI({
        url: "/api/users/token/",
        method: "POST",
        data: {
          email: data.userEmail,
          password: data.password,
        },
        withJWT: false,
      });

      cookieService.setCookie("refreshToken", res.data.refresh, {
        maxAge: 60 * 30,
      });
      setAccessToken(res.data.access);
      setUserId(String(res.data.user.id));
      methods.reset();
      onClose();
      toast({
        title: "로그인 성공",
        description: "로그인에 성공했습니다.",
      });
    } catch (e) {
      console.error(e);
      toast({
        variant: "destructive",
        title: "로그인 실패",
        description: e instanceof AxiosError ? e.message : "알 수 없는 에러",
      });
    }
  };
```
로그인 시도 후 실패 시 예외처리 구현은 try catch문을 사용했습니다. 먼저, 로그인 요청을 시도하고 성공했다면 리프레시토큰과 엑세스토큰을 받아옵니다.
<br />
리프레시토큰은 30분 후에 만료되는 쿠키로서 저장합니다. 그리고 엑세스토큰은 setAccessToken이라는 zustand를 사용한 상태변경 메소드를 사용해 전역상태로서 저장합니다.
<br />

그렇게 성공적으로 로그인에 대한 작업이 완료되면 shad cn의 toast를 사용해 로그인 성공 토스트 ui를 보여줍니다.
<br />
만약 로그인 과정중 에러가 발생하면 catch문으로 이동하여 콘솔에러를 띄우고 로그인 실패 토스트 ui를 띄웁니다. 이때, axios에러가 발생한다면, 즉 서버에 POST요청이 실패한다면 서버 측 에러메시지를 띄우고, 그게 아니라면 "알 수 없는 에러"메시지를 출력합니다.
<br />

최상위 컴포넌트에서 useEffect를 사용해 리프레시토큰이 쿠키에 저장이 되어있고, 엑세스토큰이 전역상태로서 처음에 저장 또는 변경될 때마다 로컬저장소에 저장된 엑세스토큰을 만료시키고 새로운 엑세스토큰을 요청하는 로직을 작성합니다.
```typescript
useEffect(() => {
    const refresh = cookieService.getCookie("refreshToken");
    if (!refresh) {
      onSignout();
      return;
    }

    const expireAccessToken = setTimeout(() => {
      tokenService.removeToken(["accessToken"]);
      handleRefresh(refresh);
    }, 1000 * 60 * 10);

    return () => clearTimeout(expireAccessToken);
  }, [accessToken, onSignout, handleRefresh]);
```
이렇게 짧은 주기로 엑세스토큰을 변경해 주면 만약 토큰이 탈취되더라도 토큰이 사용될 수 있는 시간이 짧아 보안에 도움이 됩니다.
<br />
만약 엑세스토큰이 만료가 되었는데 리프레시토큰이 쿠키에 저장되어있지 않다면 즉시 로그아웃을 시킵니다.
<br />

사용자가 페이지를 새로고침하더라도 로컬저장소에 엑세스토큰이 있다면 로그인 상태를 유지합니다.
```typescript
 useEffect(() => {
    const token = tokenService.getToken("accessToken");
    const userId = tokenService.getToken("userId");

    if (!token || !userId) {
      onSignout();
      return;
    }

    setUserId(userId);
    setAccessToken(token);
  }, [setAccessToken, onSignout, setUserId]);
```
만약 엑세스토큰이 로컬저장소에 없다면 즉시 로그아웃을 시킵니다.
<br />

이렇게 저장된 엑세스토큰은 서버와의 통신에서 인증도구로 사용됩니다.
```typescript
export default function requestAPI({
  headers,
  params,
  method,
  url,
  withJWT,
  ...config
}: requestParams) {
  if (withJWT) {
    const token = tokenService.getToken("accessToken");
    if (!token) {
      const error = Object.assign(new Error("Unauthorized"), {
        response: {
          status: 401,
          statusText: "Unauthorized",
        },
      });

      return Promise.reject(error);
    }

    headers = { ...headers, Authorization: `Bearer ${token}` };
  } ...
```
엑세스토큰을 요청 헤더의 Authorization에대한 값으로 넣고 서버와의 통신을 하면 엑세스토큰이 유효하면 성공적으로 응답 값을 보내주고 아니라면 서버 측에서 에러를 출력할 것입니다.
<br />
만약 엑세스토큰이 없는채로 서버와 요청을 하면 클라이언트 측에서 401에러를 반환하도록 했습니다.
<br />

이렇게 JWT인증 방식을 구현해서 클라이언트, 서버 간 통신의 보안을 강화했습니다.
</details>

<br />

<details>
  <summary><b>zustand를 활용한 전역상태 관리</b></summary>

  프론트엔드 프레임워크로서 리액트를 사용하게 되면 상태를 다른 컴포넌트와 공유하고 싶을때, 일반적인 방식으로는, 단방향 흐름의 특성상 상위 컴포넌트에서 하위 컴포넌트로 프롭스를 통해 내려줄 수 밖에 없습니다.
  <br />
  컴포넌트의 중첩이 한 두번이면 큰 상관없겠지만, 규모가 큰 프로젝트일 때는 프롭스를 상속시키기 위해 무수히 많은 컴포넌트를 거쳐야하기 때문에 불편함이 있습니다.
  <br />

  그래서 리액트를 사용할때 context API, redux, recoil, zustand 등등 전역상태 도구를 많이 사용합니다.
  <br />
  전의 회사에서는, 리덕스를 사용했었습니다. 저는 당시, 전역상태관리는 context API밖에 몰랐기 때문에 리덕스를 사용하면서 어떤점이 좋았었는지 별로 와닿지 않았습니다.
  <br />
  지금 생각해보면 리덕스는 서버로 부터 데이터를 가져와서 데이터가 성공적으로 가져와졌는지, 데이터를 가져오는데 에러가 발생했는지에 따라 전역상태를 생성 또는 변경하고 이 전역상태를 여러 컴포넌트에서 사용가능하게 하는, 즉 단방향 흐름의 속성    을 가지는 전역상태 툴이여서 대규모 프로젝트에 사용하기 나쁘지 않다는 점이 있는것 같습니다.
  <br />

  그렇다고 해도, 리덕스는 사전작업이 많이 필요하기 때문에 사용하기 번거롭고(특히, 작은 프로젝트에서), 벌써 서버에서 가져오는 데이터관리를 리액트 쿼리를 사용하고 있으면 사용용도가 겹치게 된다는 단점이 있었습니다.
  <br />
  그래서 저는 zustand를 사용했습니다. zustand는 최근 가장 인기있는 전역상태 관리 도구로서 자리매김했고, 리덕스에 비해 사용하기 간편합니다. 또한 서버 측 데이터와 아무 관계가 없기 때문에 리액트 쿼리와 함께 사용하기 좋습니다.
  <br />
  zustand를 사용하기 위해서 store를 작성했습니다.
  ```typescript
  const initialState: Store = {
  user: {
    id: null,
    isSuperuser: false,
    username: null,
    firstName: null,
    lastName: null,
    email: null,
    isStaff: false,
    dateJoined: null,
    invests: null,
    profileImg: null,
  },
  accessToken: null,
  isSignedIn: false,
  topbarKeyword: "",
};

export const useFoxStore = create<Store & Actions>((set) => ({
  ...initialState,
  setAccessToken: (token) =>
    set(() => {
      tokenService.setToken("accessToken", token);
      return { accessToken: token, isSignedIn: true };
    }),
  onChangeKeyword: (value) =>
    set(() => {
      return { topbarKeyword: value };
    }),
  setUserId: (userId) =>
    set((state) => {
      tokenService.setToken("userId", userId);
      return { user: { ...state.user, id: Number(userId) } };
    }),
  setUser: (user) =>
    set((state) => {
      return { user: { ...user, invests: state.user.invests } };
    }),
  setInvests: (invests) =>
    set((state) => {
      return { user: { ...state.user, invests } };
    }),
  onSignout: () =>
    set(() => {
      cookieService.removeCookie("refreshToken");
      tokenService.removeToken(["accessToken", "userId"]);
      return initialState;
    }),
}));
```
이렇게 하면 zustand의 전역상태와 전역상태변경 메소드를 사용하기 위한 준비가 다 끝났습니다.
<br />
사용 예시로는, 전의 예시에서 사용했던 JWT인증 방식의 엑세스토큰을 전역상태로 저장하는 것을 보여드리겠습니다.
```typescript
const { setAccessToken, setUserId } = useFoxStore((state) => state);

const handleSignin = async (data: AuthenticateFormParams) => {
    try {
      const res = await requestAPI({
        url: "/api/users/token/",
        method: "POST",
        data: {
          email: data.userEmail,
          password: data.password,
        },
        withJWT: false,
      });

      cookieService.setCookie("refreshToken", res.data.refresh, {
        maxAge: 60 * 30,
      });
      setAccessToken(res.data.access);
      setUserId(String(res.data.user.id));
      methods.reset();
      onClose();
      toast({
        title: "로그인 성공",
        description: "로그인에 성공했습니다.",
      });
    } ...
```
로그인 시도를 할때 요청이 성공적으로 완료되면 서버로부터 받은 엑세스토큰을 setAccessToken 전역상태변경 메소드에 인자로 넘겨 전역상태의 변경을 구현합니다.
<br />
이렇게 변경된 전역상태는
```typescript
const { accessToken, setAccessToken, onSignout, setUser, setUserId } =
    useFoxStore((state) => state);

 useEffect(() => {
    const refresh = cookieService.getCookie("refreshToken");
    if (!refresh) {
      onSignout();
      return;
    }

    const expireAccessToken = setTimeout(() => {
      tokenService.removeToken(["accessToken"]);
      handleRefresh(refresh);
    }, 1000 * 60 * 10);

    return () => clearTimeout(expireAccessToken);
  }, [accessToken, onSignout, handleRefresh]);
```
useEffect의 의존성 배열에 넣어 엑세스 토큰이 변경될 때마다 만료되는 시간을 부여하도록 설정할 수 있습니다.
<br />

이렇게 쉽게 전역상태를 관리함으로써 규모가 큰 프로젝트든 작은 프로젝트든 리액트 쿼리와 함께 사용하여 여러 컴포넌트에서 효율적으로 사용할 수 있게 했습니다.
</details>

<br />

<details>
<summary><b>shadcn ui와 react-hook-form을 이용한 커스텀 인풋 유효성 검사 구현</b></summary>

전의 회사에서는 chakra ui를 사용해 css를 구현했지만, 이번 개인 프로젝트는 tailwindcss를 사용해보고 싶었습니다. shadcn ui는 tailwindcss기반으로 만들어진 재사용하는 디자인 컴포넌트들을 가지고 있습니다.
<br />
즉, npm또는 yarn을 이용해 라이브러리를 설치하는것이 아닌, npx를 사용해 본인의 프로젝트에 컴포넌트를 저장하거나 또는 공식 문서에서 컴포넌트 코드를 그대로 복사해서 사용하는 형식입니다.
<br />

shadcn ui의 장점으로는 디자인 컴포넌트가 본인의 프로젝트 안에 있기 때문에 tailwindcss를 잘 이해하고 있으면 사용자의 입맛에 맞춰 변경을 할 수 있다는 점입니다.
또한 데이트피커, 차트, 데이터테이블 등 공식문서에 정말 많은 형태의 컴포넌트 예시들이 있어서 여러 디자인을 구현하기 쉽다는 점이 있습니다.
<br />
단점으로는 tailwindcss에 대한 이해가 필요하다는 것 말고는 개인적으로 딱히 느끼는 것은 없었습니다.
<br />

shadcn ui에서는 유효성검사를 위한 폼도 지원을 하는데, react-hook-form와 같이 써서 재사용하기 정말 유용한 커스텀 인풋을 구현할 수 있습니다.
<br />
다음은 제가 구현한 커스텀인풋 컴포넌트 입니다.
```typescript
interface CustomInputFormProps<T extends FieldValues> {
  control: Control<T>;
  className?: string;
  name: Path<T>;
  label?: string;
  rules?: RegisterOptions<T>;
  placeholder?: string;
  isPassword?: boolean;
}

function CustomInputForm<T extends FieldValues>({
  control,
  className,
  name,
  label,
  rules,
  placeholder,
  isPassword,
}: CustomInputFormProps<T>) {
  const customInput = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setTimeout(() => {
      customInput.current?.blur();
    }, 10);
  }, []);

  return (
    <FormField
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="font-semibold">{label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              type={isPassword ? "password" : "text"}
              className={className}
              placeholder={placeholder}
              ref={(e) => {
                field.ref(e);
                customInput.current = e;
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default React.memo(CustomInputForm) as typeof CustomInputForm;
```
커스텀인풋 컴포넌트를 보시면 shad cn의 FormField를 반환하는데 이 FormField 컴포넌트는 react-hook-form의 Controller와 쓰임이 거의 똑같습니다.
<br />
커스텀인풋 컴포넌트의 프롭스로는 formField에 전해줄 control, name, rules 그리고 인풋의 타입이 password인지 구별하기 위한 isPassword 불리언 값 등을 받습니다.
<br />
또한 제네릭 변수 T를 받는데 이는 Control, Path, RegisterOption이 가져오는 제네릭 변수를 자동으로 제네릭 변수 T로 저장되게 합니다.
<br />

구현된 커스텀인풋 컴포넌트는 React.memo에 감싸져서 export됩니다. 이는 상위 컴포넌트에서 리렌더링이 많이 일어나는 경우, 현재 컴포넌트의 프롭스에 변경이 일어나지 않는 이상 리렌더링을 시키지 않기 위함입니다.
<br />
React.memo로 감싸지 않으면 상위컴포넌트에서 리렌더링이 일어날시 커스텀인풋 컴포넌트 또한 같이 리렌더링됩니다.
<br />

이 컴포넌트의 사용 예시를 보여드리겠습니다.
```typescript
const methods = useForm<RegisterFormParams>({
    defaultValues: {
      email: "",
      username: "",
      password1: "",
      password2: "",
    },
  });

 <Form {...methods}>
            <form
              className="flex flex-col items-center gap-5 mt-10"
              onSubmit={methods.handleSubmit(handleRegister)}
            >
              <CustomInputForm
                className="w-[400px] bg-[#B0BAC366]"
                control={methods.control}
                name="email"
                label="email"
                rules={{
                  required: {
                    value: true,
                    message: "이메일은 필수입력항목입니다.",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message:
                      "이메일 형식이 아닙니다. 이메일 형식으로 입력해주세요.",
                  },
                }}
                placeholder="이메일을 입력해주세요."
              />
...
```
먼저 useForm을 정의해줍니다. 여기서 defaultValue를 지정해주지 않으면 shadcn ui의 폼은 경고메시지를 콘솔에 띄웁니다.
<br />
Form 컴포넌트는 shadcn의 컴포넌트인데 react-hook-form의 FormProvider와 사용법이 거의 흡사합니다.
<br />
그런 다음 폼 제출을 위한 form엘리먼트를 작성하고 자식요소로 커스텀인풋 컴포넌트를 작성합니다.
<br />

이런 식으로 커스텀 인풋 컴포넌트를 구현하면 프롭스의 rules에 따라 유효성 검사를 해주는 컴포넌트를 재사용하기 쉽게 구현할 수 있습니다.
</details>

<br />

<details>
  <summary><b>URL.createObjectURL를 사용한 이미지 미리보기 구현</b></summary>

  이미지 미리보기를 구현하기 위해서는 이미지 요소에 필요한 로컬파일 경로 또는 url이 필요한데, URL의 createObjectURL을 사용하면 파일 또는 블롭 객체를 url로 변환할 수 있습니다.
  <br />

  간단한 사용예시를 보여드리겠습니다.
  ```typescript
    const [selectedImg, setSelectedImg] = useState<File | null>(null);
  const [selectedImgURL, setSelectedImgURL] = useState<string | null>(null);

const handleChangeProfileImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    setSelectedImg(file);

    e.target.value = "";
  };

 useEffect(() => {
    if (!selectedImg) {
      return;
    }

    const convertedURL = URL.createObjectURL(selectedImg);
    setSelectedImgURL(convertedURL);

    return () => URL.revokeObjectURL(convertedURL);
  }, [selectedImg]);

...

  <Avatar
                className="cursor-pointer size-36"
                onClick={() => profileInputRef.current?.click()}
              >
                <AvatarImage src={selectedImgURL ?? ""} />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
```
먼저 selectedImg와 selectedImgURL이라는 두 개의 상태를 구현했습니다. 굳이 하나의 상태를 사용하지 않고 두 개의 상태를 사용하는 이유는
```typescript
const {
    username,
    profileImg,
    id: userId,
  } = useFoxStore((state) => state.user);

 useEffect(() => {
    if (!username) {
      return;
    }

    methods.reset({
      username,
      password1: methods.getValues("password1"),
      password2: methods.getValues("password2"),
    });
    setSelectedImgURL(profileImg);
  }, [username, methods, profileImg]);

...

  <Avatar
                className="cursor-pointer size-36"
                onClick={() => profileInputRef.current?.click()}
              >
                <AvatarImage src={selectedImgURL ?? ""} />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
```
처음 페이지에 진입할 때 서버로 부터 가져온 프로필 이미지를 보여주기 위함입니다. selectedImgURL은 보여지는 이미지 상태, selectedImg는 로컬 이미지 파일을 선택하는데 사용됩니다.
<br />

첫번째 코드에서 handleChangeProfileImg라는 함수를 정의해, 로컬 이미지 파일을 선택할 수 있도록 합니다.
<br />
여기서, e.target.value는 파일 input 필드를 초기화 해서 같은 파일을 선택하더라도 이 함수가 동작될 수 있도록 합니다.
<br />
useEffect 구문에서 선택된 로컬 이미지 파일이 없으면 다음 구문이 실행되지 않도록 하고, 로컬 이미지 파일이 선택되거나 변경되는 경우에 URL.createObjectURL을 사용해 이미지 파일을 url로 변환시켜줍니다. 이 변환된 url은 selectedImgURL 상태에 저장됩니다.
<br />
결과적으로, 선택된 이미지 파일을 미리보기로 바로 보여질 수 있도록 구현했습니다.
<br />

페이지가 언마운트 되거나 이미지 파일이 변경될 때, URL.revokeObjectURL을 사용해 생성된 url을 해제시킵니다.
<br />
브라우저는 createObjectURL로 생성된 url을 메모리로 저장합니다. 여기서, 쓸 일이 없어진 url을 해제시키지 않으면 계속 메모리 상에 남아있게 됩니다.
<br />
revokeObjectURL은 메모리 누수를 방지해주는 메서드로 createObjectURL을 사용했다면 필수적으로 사용됩니다.
<br />

이렇게 이미지 미리보기를 구현했습니다.
</details>

<br />

<details>
  <summary><b>aws s3,nginx 와 github action을 사용한 CI/CD 구현</b></summary>

  
</details>

## 문제 해결 경험
사용자의 프로필 이미지를 업로드 또는 변경할 때 어떤 이미지는 성공적으로 업로드가 되지만 몇 이미지들은 업로드를 시도할 때 413에러를 내면서 실패했습니다.
<br />
이게 어떤 에러인가 검색해 보니 413 Error Payload Too Large, 서버한테 보내는 요청의 크기가 너무 커서 발생하는 에러라고 나왔습니다. 즉, 업로드하는 이미지가 너무 커서 용량 제한이 걸린 것이었습니다.
<br />
프론트엔드에서는 이미지 파일의 용량을 제한하는 로직을 구현하지 않았기 때문에 백엔드인 Django에서 기본 용량제한을 2.5MB에서 5MB로 변경했습니다.
<br />
이제 잘 되나 싶었지만 5mb 이하인 파일을 업로드해도 여전히 413에러를 내면서 실패했습니다.
<br />
어떤 부분이 잘못되었나 더 검색을 해보니, 실제 웹을 운영시키는 웹 서버에도 서버한테 요청에 기본 용량 제한이 있다는 것을 알았습니다. 저는 NGINX를 사용하는데 NGINX는 기본 용량 제한이 1MB입니다.
<br />

nginx에서 설정을 해주었습니다.
```nginx
server {
        listen 80;
        server_name foxstocks.site www.foxstocks.site;

        return 301 https://$host$request_uri;
}

server {
        listen 443 ssl;
        server_name foxstocks.site www.foxstocks.site;

        ssl_certificate /etc/letsencrypt/live/foxstocks.site/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/foxstocks.site/privkey.pem;
        ssl_trusted_certificate /etc/letsencrypt/live/foxstocks.site/chain.pem;

        ...

        root /usr/share/nginx/html;
        index index.html;

        client_max_body_size 5M;

        location / {
                try_files $uri /index.html;
        }

        location /api {
                        proxy_pass http://django:8000;  # Django 애플리케이션이 실행 중인 gunicorn 서버로 요청 전달
                        proxy_set_header Host $host;
                        proxy_set_header X-Real-IP $remote_addr;
                        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                        proxy_set_header X-Forwarded-Proto $scheme;
        }

        location /admin {
                         proxy_pass http://django:8000;
                         proxy_set_header Host $host;
                         proxy_set_header X-Real-IP $remote_addr;
                         proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                         proxy_set_header X-Forwarded-Proto $scheme;
        }
        location /static {
                          alias /usr/share/nginx/static/;
        }
        location /media {
                          alias /usr/share/nginx/media/;
        }

}
```
nginx 설정 파일에서 'client_max_body_size 5M;'를 작성하여여 기본 용량 제한을 5MB로 설정해주었습니다.
<br />
그런 다음 파일 업로드를 실행했더니 성공적으로 업로드되었습니다.
