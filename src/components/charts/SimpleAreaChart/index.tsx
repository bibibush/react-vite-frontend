import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { GetChartDataResponse } from "@/hooks/useGetChartData";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { DataKey } from "recharts/types/util/types";

interface SimpleAreaChartProps {
  chartConfig: ChartConfig;
  data: Array<GetChartDataResponse>;
  XdataKey: DataKey<string>;
  dataKey: DataKey<string>;
  unit?: string;
  labelUnit?: string;
}

function SimpleAreaChart({
  chartConfig,
  data,
  dataKey,
  XdataKey,
  unit,
  labelUnit,
}: SimpleAreaChartProps) {
  return (
    <ChartContainer config={chartConfig} className="w-full">
      <AreaChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey={XdataKey}
          tickLine={false}
          tickMargin={10}
          minTickGap={20}
        />
        <YAxis
          tickLine={false}
          domain={["dataMin-1000", "dataMax+1000"]}
          tickFormatter={(value) => `${value.toLocaleString()}${unit ?? ""}`}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              unit={unit}
              labelFormatter={(label) => `${label}${labelUnit ?? ""}`}
            />
          }
        />
        <Area
          dataKey={dataKey}
          stroke="var(--color-day)"
          fill="var(--color-day)"
        />
      </AreaChart>
    </ChartContainer>
  );
}

export default SimpleAreaChart;
