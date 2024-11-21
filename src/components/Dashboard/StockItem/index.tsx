interface StockItemProps {
  color: string;
  code: string;
  name: string;
  increased: string | null;
  decreased: string | null;
  price: string;
}

function StockItem({
  color,
  code,
  name,
  increased,
  decreased,
  price,
}: StockItemProps) {
  return (
    <div
      className="lg:py-4 lg:px-3 lg:h-[116px] lg:w-[280px] shrink-0 rounded-lg flex flex-col justify-between"
      style={{ backgroundColor: `${color}` }}
    >
      <div className="flex items-start justify-between">
        <p className="font-medium text-sm">{name}</p>
        <div className="flex flex-col items-center text-sm">
          <p>{code}</p>
          {increased ? (
            <p className="text-[#77B900]">+{increased}원</p>
          ) : (
            <p className="text-[#FF2F2F]">-{decreased}원</p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-[2px]">
        <p className="text-gray-500 text-xs">현재가</p>
        <p className="text-lg font-medium">{price}원</p>
      </div>
    </div>
  );
}

export default StockItem;
