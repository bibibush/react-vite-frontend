import useGetStocks from "@/hooks/useGetStocks";
import { useMemo } from "react";

function Dashboard() {
  const { data: stocks } = useGetStocks();
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

  console.log(stockList);

  return (
    <section>
      <p className="font-semibold text-lg">Stocks</p>
      <main className="flex flex-col gap-5 mt-3">
        <div className="bg-white p-3 flex items-center gap-2 rounded-lg shadow-sm lg:w-[1360px]">
          {stockList?.map((stock) => (
            <div
              className="lg:py-4 lg:px-3 lg:h-[116px] rounded-lg flex-1 flex flex-col gap-4"
              style={{ backgroundColor: `${stock.color}` }}
              key={stock.id}
            >
              <div className="flex items-center lg:gap-[90px]">
                <p>{stock.name}</p>
                <p>{stock.code}</p>
              </div>
              <div>{stock.price}</div>
            </div>
          ))}
        </div>
      </main>
    </section>
  );
}

export default Dashboard;
