import DashboardIcon from "@/components/menuIcons/DashboardIcon";

export default function useMenuList({ pathName }: { pathName: string }) {
  const menuList = [
    {
      id: 1,
      menuName: "Dashboard",
      icon: <DashboardIcon color="#84828A" />,
      isActive: pathName === "/",
      to: "/",
    },
    // {
    //   id: 2,
    //   menuName: "buy-sell",
    //   icon: <WalletIcon color="#84828A" />,
    //   isActive: pathName === "/buy-sell",
    //   to: "/buy-sell",
    // },
    // {
    //   id: 3,
    //   menuName: "Contact",
    //   icon: <IoMail color="#84828A" size={24} />,
    //   isActive: pathName === "/contact",
    //   to: "/contact",
    // },
  ];

  return {
    menuList,
  };
}
