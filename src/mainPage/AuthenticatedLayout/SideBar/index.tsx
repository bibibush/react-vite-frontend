import DashboardIcon from "@/components/menuIcons/DashboardIcon";
import UnionIcon from "@/components/menuIcons/UnionIcon";
import WalletIcon from "@/components/menuIcons/WalletIcon";
import { IoMail } from "react-icons/io5";
import lightImage from "@/assets/light-image.png";
import LogoutIcon from "@/components/menuIcons/LogoutIcon";

function SideBar() {
  const menuList = [
    {
      id: 1,
      menuName: "Dashboard",
      icon: <DashboardIcon color="#84828A" />,
    },
    {
      id: 2,
      menuName: "Exchange",
      icon: <WalletIcon color="#84828A" />,
    },
    {
      id: 3,
      menuName: "Contact",
      icon: <IoMail color="#84828A" size={24} />,
    },
  ];

  return (
    <aside className="bg-white lg:w-[315px] h-full flex flex-col p-5">
      <div className="text-2xl font-medium text-[#2C2C2C] mt-5">Foxstocks</div>

      <div className="flex flex-col gap-3 my-14">
        <p className="text-sm font-medium text-[#7E7D82]">User Panel</p>
        {menuList.map((menu) => (
          <div
            className="px-4 py-5 lg:w-[275px] text-[#84828A] flex gap-3 hover:bg-[#EFE9FF] rounded-md duration-200 cursor-pointer"
            key={menu.id}
          >
            {menu.icon}
            {menu.menuName}
          </div>
        ))}
      </div>
      <div className="relative flex justify-center w-full">
        <UnionIcon />
        <img className="absolute lg:top-5" alt="light image" src={lightImage} />
        <p className="absolute text-sm lg:top-20 text-[#838383]">
          Thoughts Time
        </p>
        <div className="absolute lg:w-[183px] text-center lg:top-28">
          if you aren't willing to own a stock for 10 years.
          <br /> don't even think about owing it for 10 minutes.
        </div>
      </div>
      <div className="mt-20 flex lg-w-[275px] gap-3 text-[#84828A] hover:bg-[#EFE9FF] rounded-md duration-200 cursor-pointer px-4 py-5">
        <LogoutIcon color="#84828A" />
        Logout
      </div>
    </aside>
  );
}

export default SideBar;
