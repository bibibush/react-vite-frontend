import useGetStocks from "@/hooks/useGetStocks";
import { useMemo, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import ArrowIcon from "../Icons/ArrowIcon";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

function Dashboard() {
  const { data: stocks, isLoading } = useGetStocks();

  const [boxLocation, setBoxLocation] = useState<number>(0);

  const stockList = useMemo(() => {
    return stocks?.map((stock) => ({
      id: stock.id,
      name: stock.name,
      code: stock.code,
      color: stock.color,
      price: stock.price,
      increased: stock.increased,
      isDomestic: stock.is_domestic,
    }));
  }, [stocks]);

  const handleSetLeftLocation = () => {
    setBoxLocation(boxLocation - 560);
  };
  const handleSetRightLocation = () => {
    setBoxLocation(boxLocation + 560);
  };

  return (
    <section className="overflow-hidden">
      <p className="text-lg font-semibold">Stocks</p>
      <main className="flex flex-col gap-5 mt-3">
        <div className="relative bg-white p-3 rounded-lg shadow-sm lg:w-[1060px] 3xl:w-[1360px] overflow-hidden">
          <div
            className="flex items-center w-full gap-2"
            style={{
              transform: `translateX(-${boxLocation}px)`,
              transition: ".3s",
            }}
          >
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
                    className="lg:py-4 lg:px-3 lg:h-[116px] lg:w-[280px] shrink-0 rounded-lg flex flex-col justify-between"
                    style={{ backgroundColor: `${stock.color}` }}
                    key={stock.id}
                  >
                    <div className="flex items-start justify-between">
                      <p className="font-medium text-sm">{stock.name}</p>
                      <div className="flex flex-col items-center text-sm">
                        <p>{stock.code}</p>
                        {stock.increased ? (
                          <p className="text-[#77B900]">+{stock.increased}원</p>
                        ) : (
                          <p className="text-[#FF2F2F]">-원</p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-[2px]">
                      <p className="text-gray-500 text-xs">현재가</p>
                      <p className="text-lg font-medium">{stock.price}원</p>
                    </div>
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
          {!!boxLocation && (
            <Button
              className={cn(
                "absolute bg-[#6425FE] hover:bg-[#5127bb] shadow-sm p-[10px]",
                "rounded-lg lg:left-5 top-0 bottom-0 my-auto z-10 cursor-pointer rotate-180"
              )}
              onClick={handleSetLeftLocation}
            >
              <ArrowIcon />
            </Button>
          )}
          <Button
            className={cn(
              "absolute bg-[#6425FE] hover:bg-[#5127bb] shadow-sm p-[10px]",
              "rounded-lg lg:right-5 top-0 bottom-0 my-auto z-10 cursor-pointer"
            )}
            onClick={handleSetRightLocation}
          >
            <ArrowIcon />
          </Button>
        </div>
      </main>
    </section>
  );
}

export default Dashboard;
