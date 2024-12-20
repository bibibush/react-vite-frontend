import CustomDataTable from "@/components/CustomTables/CustomDataTable";
import useGetDataTable from "@/hooks/useGetDataTable";
import DataTable from "@/types/DataTable";
import { ColumnDef } from "@tanstack/react-table";

function Trends() {
  const { data } = useGetDataTable(
    {
      category: "siselist_tab_0",
      extraColumnsName: [
        "trading_volume",
        "market_price",
        "highest_price",
        "lowest_price",
      ].join(","),
    },
    {
      refetchInterval: 60 * 1000,
    }
  );
  const columns: ColumnDef<DataTable>[] = [
    {
      id: "rank",
      header: "순위",
      cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: "name",
      header: "종목명",
    },
    {
      accessorKey: "currentPrice",
      header: "현재가",
    },
    {
      accessorKey: "fromYesterday",
      header: "전일비",
      cell: ({ row, column }) => (
        <span className="text-red-500">{row.getValue(column.id)}</span>
      ),
    },
    {
      accessorKey: "increasedPercent",
      header: "등락률",
      cell: ({ row, column }) => (
        <span className="text-red-500">{row.getValue(column.id)}</span>
      ),
    },
    {
      accessorKey: "tradingVolume",
      header: "거래량",
    },
    {
      accessorKey: "marketPrice",
      header: "시가",
    },
    {
      accessorKey: "highestPrice",
      header: "고가",
    },
    {
      accessorKey: "lowestPrice",
      header: "저가",
    },
  ];

  return (
    <section className="bg-white rounded-lg lg:py-5 lg:px-3">
      <CustomDataTable columns={columns} data={data ?? []} />
    </section>
  );
}

export default Trends;
