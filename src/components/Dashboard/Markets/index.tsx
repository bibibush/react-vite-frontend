import SimpleAreaChart from "@/components/charts/SimpleAreaChart";
import { Badge } from "@/components/ui/badge";
import { ChartConfig } from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import { useState } from "react";

function Markets() {
  const [chartFrequency, setFrequency] = useState<string>("1D");
  const chartFrequencyList = ["1D", "1W", "1M", "1Y"];

  const COMMON_CLASSES = "flex-1 text-center border-0 cursor-pointer";

  const garaData = [
    { day: "1", price: 53800 },
    { day: "2", price: 53300 },
    { day: "3", price: 53200 },
    { day: "4", price: 54000 },
    { day: "5", price: 53800 },
    { day: "6", price: 53900 },
    { day: "7", price: 53600 },
    { day: "8", price: 54100 },
    { day: "9", price: 54000 },
    { day: "10", price: 53700 },
    { day: "11", price: 53800 },
    { day: "12", price: 53600 },
    { day: "13", price: 54100 },
    { day: "14", price: 53700 },
    { day: "15", price: 53800 },
    { day: "16", price: 53000 },
    { day: "17", price: 52800 },
    { day: "18", price: 53500 },
    { day: "19", price: 53400 },
    { day: "20", price: 53900 },
    { day: "21", price: 54100 },
    { day: "22", price: 54000 },
    { day: "23", price: 53600 },
    { day: "24", price: 53000 },
    { day: "25", price: 53500 },
  ];
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
        data={garaData}
        dataKey="price"
        XdataKey="day"
        chartConfig={chartConfig}
        unit="원"
        labelUnit="일"
      />
    </section>
  );
}

export default Markets;
