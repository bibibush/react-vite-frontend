import useGetStocks from "@/hooks/useGetStocks";
import { useMemo, useState } from "react";
import Stocks from "./Stocks";
import Balance from "./Balance";

export type stockList =
  | Array<{
      id: number;
      name: string;
      code: string;
      color: string;
      price: string;
      increased: string | null;
      decreased: string | null;
      isDomestic: boolean;
    }>
  | undefined;

function Dashboard() {
  const { data: stocks, isLoading } = useGetStocks();

  const [boxLocation, setBoxLocation] = useState<number>(0);

  const stockList = useMemo((): stockList => {
    return stocks?.map((stock) => ({
      id: stock.id,
      name: stock.name,
      code: stock.code,
      color: stock.color,
      price: stock.price,
      increased: stock.increased,
      decreased: stock.decreased,
      isDomestic: stock.isDomestic,
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
        <Stocks
          boxLocation={boxLocation}
          stockList={stockList}
          isLoading={isLoading}
          onLeftLocation={handleSetLeftLocation}
          onRightLocation={handleSetRightLocation}
        />
        <Balance />
      </main>
    </section>
  );
}

export default Dashboard;