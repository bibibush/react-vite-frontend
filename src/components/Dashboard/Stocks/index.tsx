import { Skeleton } from "@/components/ui/skeleton";
import { stockList } from "..";
import StockItem from "./StockItem";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ArrowIcon from "@/components/Icons/ArrowIcon";

interface StocksProps {
  stockList: stockList;
  isLoading: boolean;
  boxLocation: number;
  onLeftLocation: () => void;
  onRightLocation: () => void;
}

function Stocks({
  stockList,
  isLoading,
  boxLocation,
  onLeftLocation,
  onRightLocation,
}: StocksProps) {
  return (
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
              <StockItem
                key={stock.id}
                code={stock.code}
                color={stock.color}
                name={stock.name}
                increased={stock.increased}
                decreased={stock.decreased}
                price={stock.price}
              />
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
          onClick={onLeftLocation}
        >
          <ArrowIcon />
        </Button>
      )}
      <Button
        className={cn(
          "absolute bg-[#6425FE] hover:bg-[#5127bb] shadow-sm p-[10px]",
          "rounded-lg lg:right-5 top-0 bottom-0 my-auto z-10 cursor-pointer"
        )}
        onClick={onRightLocation}
      >
        <ArrowIcon />
      </Button>
    </div>
  );
}

export default Stocks;
