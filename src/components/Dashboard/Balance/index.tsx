import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Invested from "@/types/Invested";
import React, { useMemo } from "react";

interface BalanceProps {
  invests: Invested[] | null;
  userId: number | null;
}

function Balance({ invests, userId }: BalanceProps) {
  const totalInvested = useMemo(() => {
    const totalInitialPrices = invests?.map(
      ({ input, initialPrice }) => input * initialPrice
    );

    return totalInitialPrices?.reduce((l, r) => l + r, 0);
  }, [invests]);

  const totalBalance = useMemo(() => {
    const currentTotalPrices = invests?.map(
      ({ input, currentPrice }) => input * currentPrice
    );

    return currentTotalPrices?.reduce((l, r) => l + r, 0);
  }, [invests]);

  const differenceRate = useMemo(() => {
    const result = (totalBalance ?? 0) / (totalInvested ?? 0);
    if (!result && result !== 0) {
      return `0%`;
    }

    if (result < 0 || result === 0) {
      return `${result.toFixed(2)}%`;
    } else {
      return `+${result.toFixed(2)}%`;
    }
  }, [totalBalance, totalInvested]);

  return (
    <section className="bg-white lg:py-5 lg:px-3 rounded-lg lg:w-[490px]">
      <p>Balance</p>
      <div className="flex gap-2 mb-5">
        <Input
          className={cn(
            "lg:py-4 lg:px-5 lg:w-[calc(100%-8px-63px)] lg:h-14 bg-[#6425FE] text-white font-medium",
            userId ? "lg:text-xl" : "lg:text-md"
          )}
          value={
            userId
              ? totalBalance?.toLocaleString("ko-KR", {
                  style: "currency",
                  currency: "KRW",
                }) ?? 0
              : "로그인이 필요한 항목입니다."
          }
          readOnly
        />
        <div className="lg:p-[10px] bg-[#C7FFA5] rounded-lg flex justify-center items-center">
          {differenceRate}
        </div>
      </div>
      <p>Invested</p>
      <Input
        className={cn(
          "font-medium text-white bg-black lg:h-14 lg:py-4 lg:px-5",
          userId ? "lg:text-xl" : "lg:text-md"
        )}
        value={
          userId
            ? totalInvested?.toLocaleString("ko-KR", {
                style: "currency",
                currency: "KRW",
              }) ?? 0
            : "로그인이 필요한 항목입니다."
        }
        readOnly
      />
    </section>
  );
}

export default React.memo(Balance);
