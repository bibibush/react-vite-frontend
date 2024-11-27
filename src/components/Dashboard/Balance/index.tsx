import { Input } from "@/components/ui/input";

function Balance() {
  return (
    <section className="bg-white lg:py-5 lg:px-3 rounded-lg">
      <p>Balance</p>
      <div className="flex gap-2">
        <Input
          className="lg:py-4 lg:px-5 lg:w-[252px] lg:h-14 bg-[#6425FE] text-white font-medium lg:text-xl"
          value="$14,032.56"
          readOnly
        />
        <div className="lg:p-[10px] bg-[#C7FFA5] rounded-lg flex justify-center items-center">
          5.63%
        </div>
      </div>
    </section>
  );
}

export default Balance;
