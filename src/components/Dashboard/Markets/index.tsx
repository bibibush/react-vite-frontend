import SimpleAreaChart from "@/components/charts/SimpleAreaChart";
import { Badge } from "@/components/ui/badge";
import { ChartConfig } from "@/components/ui/chart";
import UseGetChartData from "@/hooks/useGetChartData";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";

function Markets() {
  const [chartFrequency, setFrequency] = useState<string>("D");
  const chartFrequencyList = ["D", "W", "M", "Y"];
  const unitResult = useMemo(() => {
    switch (chartFrequency) {
      case "D":
        return { XdataKey: "day", labelUnit: "일" };
      case "W":
        return { XdataKey: "week", labelUnit: "주" };
      case "M":
        return { XdataKey: "month", labelUnit: "월" };
      case "Y":
        return { XdataKey: "year", labelUnit: "년" };
    }
  }, [chartFrequency]);

  const COMMON_CLASSES = "flex-1 text-center border-0 cursor-pointer";

  const { data: chartData } = UseGetChartData({ frequency: chartFrequency });

  const chartConfig: ChartConfig = {
    day: {
      label: "day",
      color: "#6425FE",
    },
  };

  const handleSetFrequency = (value: string) => {
    setFrequency(value);
  };

  return (
    <section className="bg-white rounded-lg lg:py-5 lg:px-3 lg:w-[410px] flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Badge
          className="text-xs font-medium p-[6px] rounded-lg cursor-pointer"
          variant="purple"
        >
          국내증시
        </Badge>
      </div>
      <div className="flex w-full">
        {chartFrequencyList.map((frq, index) =>
          index === chartFrequencyList.length - 1 ? (
            <span
              className={cn(
                COMMON_CLASSES,
                chartFrequency === frq && "text-primary-purple-500"
              )}
              onClick={() => handleSetFrequency(frq)}
            >
              {frq}
            </span>
          ) : (
            <span
              className={cn(
                COMMON_CLASSES,
                "border-r",
                chartFrequency === frq && "text-primary-purple-500"
              )}
              onClick={() => handleSetFrequency(frq)}
            >
              {frq}
            </span>
          )
        )}
      </div>
      <SimpleAreaChart
        data={chartData ?? []}
        dataKey="price"
        XdataKey={unitResult?.XdataKey ?? "day"}
        chartConfig={chartConfig}
        unit="원"
        labelUnit={unitResult?.labelUnit}
      />
    </section>
  );
}

export default Markets;
