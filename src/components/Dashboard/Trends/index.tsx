import CustomDataTable from "@/components/CustomTables/CustomDataTable";
import { Badge } from "@/components/ui/badge";
import useGetDataTable from "@/hooks/useGetDataTable";
import { cn } from "@/lib/utils";
import DataTable from "@/types/DataTable";
import { keepPreviousData } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import _ from "lodash";

const Category = {
  siselist_tab_0: "상한가",
  siselist_tab_1: "하한가",
  siselist_tab_2: "상승",
  siselist_tab_3: "보합",
  siselist_tab_4: "하락",
  siselist_tab_5: "거래량상위",
  siselist_tab_6: "고가대비급락",
  siselist_tab_7: "시가총액상위",
} as const;
type CategoryKey = keyof typeof Category;

function Trends() {
  const [category, setCategory] = useState<CategoryKey>("siselist_tab_0");

  const COMMON_CLASSES = "flex-1 text-center border-0 cursor-pointer";
  const categories = useMemo(() => {
    const keyList = [...Object.keys(Category)];

    return keyList as CategoryKey[];
  }, []);
  const ColumnsNameList = useMemo(() => {
    if (category === "siselist_tab_0" || category === "siselist_tab_1") {
      return [
        "trading_volume",
        "market_price",
        "highest_price",
        "lowest_price",
      ];
    } else if (
      category === "siselist_tab_2" ||
      category === "siselist_tab_3" ||
      category === "siselist_tab_4"
    ) {
      return [
        "trading_volume",
        "mesu_hoga",
        "medo_hoga",
        "total_mesu",
        "total_medo",
      ];
    } else if (category === "siselist_tab_5") {
      return ["trading_volume", "trading_amount", "mesu_hoga", "medo_hoga"];
    } else if (category === "siselist_tab_6") {
      return [
        "market_price",
        "highest_price",
        "lowest_price",
        "total_different_percent",
      ];
    } else {
      return [
        "total_market_price",
        "registered_stocks",
        "face_value",
        "foreigner_percent",
      ];
    }
  }, [category]);
  const camelColumnsNameList = useMemo((): ColumnDef<typeof DataTable>[] => {
    const cameledList = _.map(ColumnsNameList, _.camelCase);

    return cameledList.map((cameledEl) => ({
      accessorKey: cameledEl,
      header: DataTable[cameledEl as DataTable],
    }));
  }, [ColumnsNameList]);

  const { data } = useGetDataTable(
    {
      category,
      extraColumnsName: ColumnsNameList.join(","),
    },
    {
      enabled: !!category,
      refetchInterval: 60 * 1000,
      placeholderData: keepPreviousData,
    }
  );

  const columns: ColumnDef<typeof DataTable>[] = [
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
      cell: ({ row, column }) => {
        const colorValue = row.getValue("differentPercent") as string;
        const value = colorValue.trim();
        if (value.startsWith("+")) {
          return (
            <span className="text-red-500">{row.getValue(column.id)}</span>
          );
        } else if (value.startsWith("-")) {
          return (
            <span className="text-blue-500">{row.getValue(column.id)}</span>
          );
        } else {
          return row.getValue(column.id);
        }
      },
    },
    {
      accessorKey: "differentPercent",
      id: "differentPercent",
      header: "등락률",
      cell: ({ row, column }) => {
        const value = row.getValue(column.id) as string;
        return (
          <span
            className={cn(
              value.trim().startsWith("+")
                ? "text-red-500"
                : value.trim().startsWith("-")
                ? "text-blue-500"
                : null
            )}
          >
            {value.trim()}
          </span>
        );
      },
    },
    ...camelColumnsNameList,
  ];

  const handleSetCategory = (category: CategoryKey) => {
    setCategory(category);
  };

  return (
    <section className="flex flex-col bg-white rounded-lg gap-9 lg:py-5 lg:px-3">
      <div className="flex items-center">
        {categories.map((cat, index) =>
          index === categories.length - 1 ? (
            <span
              key={cat}
              className={cn(COMMON_CLASSES)}
              onClick={() => handleSetCategory(cat)}
            >
              {cat === category ? (
                <Badge className="py-1 text-base font-normal" variant="purple">
                  {Category[cat as CategoryKey]}
                </Badge>
              ) : (
                Category[cat as CategoryKey]
              )}
            </span>
          ) : (
            <span
              key={cat}
              className={cn(COMMON_CLASSES, "border-r")}
              onClick={() => handleSetCategory(cat)}
            >
              {cat === category ? (
                <Badge className="py-1 text-base font-normal" variant="purple">
                  {Category[cat as CategoryKey]}
                </Badge>
              ) : (
                Category[cat as CategoryKey]
              )}
            </span>
          )
        )}
      </div>
      <CustomDataTable columns={columns} data={data ?? []} />
    </section>
  );
}

export default Trends;
