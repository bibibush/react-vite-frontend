import requestAPI from "@/api";
import Stock from "@/types/Stock";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

async function getStocksAPI() {
  try {
    const response = await requestAPI({
      url: "/api/stocks/list/",
      method: "GET",
    });
    return response.data;
  } catch (e) {
    console.error(e);
  }
}

export default function useGetStocks() {
  const results = useQuery<Stock[]>({
    queryKey: ["stocks"],
    queryFn: getStocksAPI,
    placeholderData: keepPreviousData,
    refetchInterval: 60 * 1000,
  });

  return {
    ...results,
    data: results.data,
  };
}
