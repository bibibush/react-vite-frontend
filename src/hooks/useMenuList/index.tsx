import DashboardIcon from "@/components/menuIcons/DashboardIcon";
import WalletIcon from "@/components/menuIcons/WalletIcon";
import { IoMail } from "react-icons/io5";

export default function useMenuList({ pathName }: { pathName: string }) {
  const menuList = [
    {
      id: 1,
      menuName: "Dashboard",
      icon: <DashboardIcon color="#84828A" />,
      isActive: pathName === "/",
      to: "/",
    },
    {
      id: 2,
      menuName: "Exchange",
      icon: <WalletIcon color="#84828A" />,
      isActive: pathName === "/exchange",
      to: "/exchange",
    },
    {
      id: 3,
      menuName: "Contact",
      icon: <IoMail color="#84828A" size={24} />,
      isActive: pathName === "/contact",
      to: "/contact",
    },
  ];

  return {
    menuList,
  };
}
