import DashboardIcon from "@/components/ui/menuIcons/DashboardIcon";

function SideBar() {
  return (
    <aside className="bg-white lg:w-[315px] h-full flex flex-col p-5">
      <div className="text-2xl font-medium text-[#2C2C2C] mt-5">Foxstocks</div>

      <div className="flex flex-col gap-4 mt-14">
        <p className="text-sm font-medium text-[#7E7D82]">User Panel</p>
        <div className="px-4 py-5 lg:w-[275px] text-[#84828A] flex gap-3 hover:bg-[#EFE9FF] rounded-md duration-150 cursor-pointer">
          <DashboardIcon color="#84828A" />
          Dashboard
        </div>
      </div>
    </aside>
  );
}

export default SideBar;
