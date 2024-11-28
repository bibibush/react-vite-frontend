import InputTopBar from "@/components/ui/InputTopBar";
import NotificationIcon from "@/components/Icons/NotificationIcon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import LogoutIcon from "@/components/menuIcons/LogoutIcon";
import { useFoxStore } from "@/zustand/store";
import axios from "axios";

function TopBar() {
  const isSignedIn = useFoxStore((state) => state.isSignedIn);
  const setAccessToken = useFoxStore((state) => state.setAccessToken);

  const logIn = async () => {
    try {
      const res = await axios.post("/api/users/token/", {
        username: "admin",
        email: "admin@admin.com",
        password: "admin1234",
      });
      setAccessToken(res.data.access);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <header className="lg:h-[96px] bg-white fixed top-0 lg:left-[315px] lg:w-[calc(100%-315px)] lg:px-8 lg:py-6 z-20">
      <div className="flex items-center justify-between">
        <p className="font-medium text-black lg:text-xl">Hello Matt</p>

        <div className="flex items-center lg:gap-8">
          <InputTopBar />
          <span className="cursor-pointer">
            <NotificationIcon />
          </span>
          <Popover>
            <PopoverTrigger>
              <Avatar>
                <AvatarFallback>U</AvatarFallback>
                <AvatarImage alt="U" />
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-[180px]">
              <div className="flex flex-col gap-2">
                {isSignedIn ? (
                  <span className="flex gap-2">
                    <LogoutIcon color="#84828A" />
                    Logout
                  </span>
                ) : (
                  <span className="flex gap-2" onClick={logIn}>
                    <LogoutIcon color="#84828A" />
                    Login
                  </span>
                )}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
}

export default TopBar;
