import { Input } from "@/components/ui/input";
import Invested from "@/types/Invested";
import React, { useMemo } from "react";

interface BalanceProps {
  invests: Invested[] | null;
}

function Balance({ invests }: BalanceProps) {
  const totalInvested = useMemo(() => {
    const inputs = invests?.map((invest) => invest.input);

    return inputs?.reduce((l, r) => l + r, 0);
  }, [invests]);

  return (
    <section className="bg-white lg:py-5 lg:px-3 rounded-lg lg:w-[340px]">
      <p>Balance</p>
      <div className="flex gap-2 mb-5">
        <Input
          className="lg:py-4 lg:px-5 lg:w-[calc(100%-8px-63px)] lg:h-14 bg-[#6425FE] text-white font-medium lg:text-xl"
          value="$14,032.56"
          readOnly
        />
        <div className="lg:p-[10px] bg-[#C7FFA5] rounded-lg flex justify-center items-center">
          5.63%
        </div>
      </div>
      <p>Invested</p>
      <Input
        className="font-medium text-white bg-black lg:h-14 lg:py-4 lg:px-5 lg:text-xl"
        value={totalInvested ?? 0}
        readOnly
      />
    </section>
  );
}

export default React.memo(Balance);
