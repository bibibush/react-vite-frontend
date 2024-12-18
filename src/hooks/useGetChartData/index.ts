import requestAPI from "@/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

interface GetChartDataParams {
  frequency: string;
}

export interface GetChartDataResponse {
  day?: string;
  week?: string;
  month?: string;
  year?: string;
  price: number;
}

async function getChartDataAPI(params: GetChartDataParams) {
  try {
    const res = await requestAPI({
      url: "/api/stocks/charts/",
      method: "GET",
      params: {
        frequency: params.frequency,
      },
    });

    return res.data;
  } catch (e) {
    console.error(e);
  }
}

function UseGetChartData(params: GetChartDataParams) {
  const results = useQuery<GetChartDataResponse[]>({
    queryKey: ["charts", params.frequency],
    queryFn: () => getChartDataAPI(params),
    enabled: !!params.frequency,
    placeholderData: keepPreviousData,
    staleTime: 60 * 1000 * 10,
    gcTime: 60 * 1000 * 11,
  });

  return {
    ...results,
    data: results.data,
  };
}

export default UseGetChartData;
