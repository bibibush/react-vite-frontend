import requestAPI from "@/api";
import Invested from "@/types/Invested";
import Stock from "@/types/Stock";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

interface GetStocksResponse {
  data: Array<Stock>;
  invests: Array<Invested>;
}

interface GetStocksParams {
  userId: number | null;
}

async function getStocksAPI(params: GetStocksParams) {
  try {
    const response = await requestAPI({
      url: "/api/stocks/list/",
      params: {
        userId: params.userId,
      },
      method: "GET",
    });
    return response.data;
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
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
