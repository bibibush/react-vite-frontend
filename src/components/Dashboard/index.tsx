import useGetStocks from "@/hooks/useGetStocks";
import { useMemo } from "react";
import { Skeleton } from "../ui/skeleton";
import ArrowIcon from "../Icons/ArrowIcon";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

function Dashboard() {
  const { data: stocks, isLoading } = useGetStocks();
  const stockList = useMemo(() => {
    return stocks?.map((stock) => ({
      id: stock.id,
      name: stock.name,
      code: stock.code,
      color: stock.color,
      price: stock.price,
      isDomestic: stock.is_domestic,
    }));
  }, [stocks]);

  return (
    <section className="overflow-hidden">
      <p className="text-lg font-semibold">Stocks</p>
      <main className="flex flex-col gap-5 mt-3">
        <div className="relative bg-white p-3 rounded-lg shadow-sm lg:w-[1060px] 3xl:w-[1360px] overflow-hidden">
          <div className="flex items-center w-full gap-2">
            {isLoading
              ? Array(5)
                  .fill("")
                  .map((_, i) => (
                    <Skeleton
                      className="lg:w-[280px] rounded-lg lg:h-[116px] shrink-0"
                      key={i}
                    />
                  ))
              : stockList?.map((stock) => (
                  <div
                    className="lg:py-4 lg:px-3 lg:h-[116px] w-[280px] shrink-0 rounded-lg flex flex-col justify-between"
                    style={{ backgroundColor: `${stock.color}` }}
                    key={stock.id}
                  >
                    <div className="flex items-center justify-between">
                      <p>{stock.name}</p>
                      <p>{stock.code}</p>
                    </div>
                    <div>{stock.price}원</div>
                  </div>
                ))}
          </div>

          <div
            className="absolute h-full top-0 right-0 w-[116px] z-[1] rotate-90"
            style={{
              background:
                "linear-gradient(183deg, #FFF 26.14%, rgba(255, 255, 255, 0.00) 88.24%)",
            }}
          ></div>
          <Badge
            className={cn(
              "absolute bg-[#6425FE] hover:bg-[#5127bb] shadow-sm p-[10px]",
              "rounded-lg lg:h-[47px] lg:right-5 top-0 bottom-0 my-auto z-10 cursor-pointer"
            )}
          >
            <ArrowIcon />
          </Badge>
        </div>
      </main>
    </section>
  );
}

export default Dashboard;
