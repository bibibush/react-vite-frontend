import DashboardIcon from "@/components/ui/menuIcons/DashboardIcon";
import WalletIcon from "@/components/ui/menuIcons/WalletIcon";
import { IoMail } from "react-icons/io5";

function SideBar() {
  const menuList = [
    {
      menuName: "Dashboard",
      icon: <DashboardIcon color="#84828A" />,
    },
    {
      menuName: "Exchange",
      icon: <WalletIcon color="#84828A" />,
    },
    {
      menuName: "Contact",
      icon: <IoMail color="#84828A" size={24} />,
    },
  ];

  return (
    <aside className="bg-white lg:w-[315px] h-full flex flex-col p-5">
      <div className="text-2xl font-medium text-[#2C2C2C] mt-5">Foxstocks</div>

      <div className="flex flex-col gap-3 mt-14">
        <p className="text-sm font-medium text-[#7E7D82]">User Panel</p>
        {menuList.map((menu) => (
          <div
            className="px-4 py-5 lg:w-[275px] text-[#84828A] flex gap-3 hover:bg-[#EFE9FF] rounded-md duration-200 cursor-pointer"
            key={menu.menuName}
          >
            {menu.icon}
            {menu.menuName}
          </div>
        ))}
      </div>
    </aside>
  );
}

export default SideBar;
