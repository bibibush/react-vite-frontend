import useGetStocks from "@/hooks/useGetStocks";
import { useEffect, useMemo, useState } from "react";
import Stocks from "./Stocks";
import Balance from "./Balance";
import { useFoxStore } from "@/zustand/store";
import Markets from "./Markets";

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
  const topbarKeyword = useFoxStore((state) => state.topbarKeyword);
  const userId = useFoxStore((state) => state.user.id);
  const invests = useFoxStore((state) => state.user.invests);
  const setInvests = useFoxStore((state) => state.setInvests);

  const {
    data: stocks,
    isLoading,
    invests: investsData,
  } = useGetStocks({ userId });

  const [boxLocation, setBoxLocation] = useState<number>(0);

  const stockList = useMemo((): stockList => {
    return stocks
      ?.filter((stock) =>
        stock.name.toLowerCase().includes(topbarKeyword.toLowerCase())
      )
      ?.map((stock) => ({
        id: stock.id,
        name: stock.name,
        code: stock.code,
        color: stock.color,
        price: stock.price,
        increased: stock.increased,
        decreased: stock.decreased,
        isDomestic: stock.isDomestic,
      }));
  }, [stocks, topbarKeyword]);

  const handleSetLeftLocation = () => {
    setBoxLocation(boxLocation - 560);
  };
  const handleSetRightLocation = () => {
    setBoxLocation(boxLocation + 560);
  };

  useEffect(() => {
    if (!investsData?.length) {
      return;
    }

    setInvests(investsData);
  }, [investsData, setInvests]);

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

        <div className="flex gap-5">
          <Balance invests={invests} userId={userId} />
          <Markets />
        </div>
      </main>
    </section>
  );
}

export default Dashboard;
