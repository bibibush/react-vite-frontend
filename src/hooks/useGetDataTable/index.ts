import requestAPI from "@/api";
import DataTable from "@/types/DataTable";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

interface GetDataTableResponse {
  data: Array<DataTable>;
  totalCount: number;
}
interface GetDataTableParams {
  category: string;
  extraColumnsName: string;
}

async function getDataTableAPI(params: GetDataTableParams) {
  try {
    const res = await requestAPI({
      url: "/api/stocks/table/",
      method: "GET",
      params: {
        category: params.category,
        extraColumnsName: params.extraColumnsName,
      },
    });
    return res.data;
  } catch (e) {
    console.error(e);
  }
}

export default function useGetDataTable(
  params: GetDataTableParams,
  options?: Omit<UseQueryOptions<GetDataTableResponse>, "queryKey">
) {
  const results = useQuery<GetDataTableResponse>({
    queryKey: ["dataTable", params.category],
    queryFn: () => getDataTableAPI(params),
    ...options,
  });

  return {
    ...results,
    data: results.data?.data,
    totalCount: results.data?.totalCount,
  };
}
