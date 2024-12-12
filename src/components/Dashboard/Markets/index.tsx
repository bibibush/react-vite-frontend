import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useState } from "react";

function Markets() {
  const [chartFrequency, setFrequency] = useState<string>("1D");
  const chartFrequencyList = ["1D", "1W", "1M", "1Y"];

  const COMMON_CLASSES = "flex-1 text-center border-0 cursor-pointer";

  const handleSetFrequency = (value: string) => {
    setFrequency(value);
  };

  return (
    <section className="bg-white rounded-lg lg:py-5 lg:px-3 lg:w-[340px] flex flex-col gap-4">
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
    </section>
  );
}

export default Markets;
