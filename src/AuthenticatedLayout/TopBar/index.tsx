import InputTopBar from "@/components/ui/InputTopBar";
import NotificationIcon from "@/components/Icons/notificationIcon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function TopBar() {
  return (
    <header className="lg:h-[96px] bg-white fixed top-0 lg:left-[315px] lg:w-[calc(100%-315px)] lg:px-8 lg:py-6">
      <div className="flex items-center justify-between">
        <p className="lg:text-xl font-medium text-black">Hello Matt</p>

        <div className="flex items-center lg:gap-8">
          <InputTopBar />
          <span className="cursor-pointer">
            <NotificationIcon />
          </span>
          <Avatar>
            <AvatarFallback>U</AvatarFallback>
            <AvatarImage alt="U" />
          </Avatar>
        </div>
      </div>
    </header>
  );
}

export default TopBar;
