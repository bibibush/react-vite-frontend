import requestAPI from "@/api";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

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
    return Promise.reject(e);
  }
}

function UseGetChartData(
  params: GetChartDataParams,
  options?: Omit<UseQueryOptions<GetChartDataResponse[]>, "queryKey">
) {
  const results = useQuery<GetChartDataResponse[]>({
    queryKey: ["charts", params.frequency],
    queryFn: () => getChartDataAPI(params),
    ...options,
  });

  return {
    ...results,
    data: results.data,
  };
}

export default UseGetChartData;
