import UnionIcon from "@/components/menuIcons/UnionIcon";
import lightImage from "@/assets/light-image.png";
import LogoutIcon from "@/components/menuIcons/LogoutIcon";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import useMenuList from "@/hooks/useMenuList";
import { useFoxStore } from "@/zustand/store";

function SideBar() {
  const location = useLocation();

  const { menuList } = useMenuList({ pathName: location.pathname });
  const isSignedIn = useFoxStore((state) => state.isSignedIn);

  return (
    <aside className="bg-white lg:w-[315px] h-full flex flex-col p-5 fixed left-0 top-0 overflow-y-auto sidebar-scroll">
      <div className="text-2xl font-medium text-[#2C2C2C] mt-5">Foxstocks</div>

      <div className="flex flex-col gap-3 my-14">
        <p className="text-sm font-medium text-[#7E7D82]">User Panel</p>
        {menuList.map((menu) => (
          <Link
            className={cn(
              "px-4 py-5 lg:w-[275px] text-[#84828A] flex gap-3 rounded-md cursor-pointer",
              menu.isActive ? "bg-[#EFE9FF]" : "hover:bg-[#EFE9FF] duration-200"
            )}
            key={menu.id}
            to={menu.to}
          >
            {menu.icon}
            {menu.menuName}
          </Link>
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
      {isSignedIn && (
        <div className="mt-20 flex lg-w-[275px] gap-3 text-[#84828A] hover:bg-[#EFE9FF] rounded-md duration-200 cursor-pointer px-4 py-5">
          <LogoutIcon color="#84828A" />
          Logout
        </div>
      )}
    </aside>
  );
}

export default SideBar;
