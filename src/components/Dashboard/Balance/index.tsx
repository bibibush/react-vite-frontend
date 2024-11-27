import { Input } from "@/components/ui/input";

function Balance() {
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
        className="text-white bg-black lg:h-14 lg:py-4 lg:px-5 lg:text-xl font-medium"
        value="$7,532.21"
        readOnly
      />
    </section>
  );
}

export default Balance;
