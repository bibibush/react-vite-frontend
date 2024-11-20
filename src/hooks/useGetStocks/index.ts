import Stock from "@/types/Stock";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";

async function getStocksAPI() {
  try {
    const res = await axios.get("/api/stocks/list/");
    return res.data;
  } catch (e) {
    console.error(e);
  }
}

export default function useGetStocks() {
  const results = useQuery<Stock[]>({
    queryKey: ["stocks"],
    queryFn: getStocksAPI,
    placeholderData: keepPreviousData,
  });

  return {
    ...results,
    data: results.data,
  };
}
