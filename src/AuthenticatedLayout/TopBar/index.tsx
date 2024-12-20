import InputTopBar from "@/components/ui/InputTopBar";
import NotificationIcon from "@/components/Icons/NotificationIcon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import LogoutIcon from "@/components/menuIcons/LogoutIcon";
import { BiBook } from "react-icons/bi";
import { useFoxStore } from "@/zustand/store";
import { Fragment, useState } from "react";
import SigninModal from "@/components/modals/SigninModal";
import RegisterModal from "@/components/modals/RegisterModal";

function TopBar() {
  const isSignedIn = useFoxStore((state) => state.isSignedIn);
  const username = useFoxStore((state) => state.user.username);
  const onSignout = useFoxStore((state) => state.onSignout);

  const [isOpenSigninModal, setIsOpenSigninModal] = useState<boolean>(false);
  const [isOpenRegisterModal, setIsOpenRegisterModal] =
    useState<boolean>(false);

  const handleOpenSigninModal = () => {
    setIsOpenSigninModal(true);
  };
  const handleCloseSigninModal = () => {
    setIsOpenSigninModal(false);
  };

  const handleOpenRegisterModal = () => {
    setIsOpenRegisterModal(true);
  };
  const handleCloseRegisterModal = () => {
    setIsOpenRegisterModal(false);
  };

  return (
    <header className="lg:h-[96px] bg-white fixed top-0 lg:left-[315px] lg:w-[calc(100%-315px)] lg:px-8 lg:py-6 z-20">
      <div className="flex items-center justify-between">
        <p className="font-medium text-black lg:text-xl">Hello {username}</p>

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
                  <Fragment>
                    <span className="flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-gray-100">
                      <BiBook size={24} color="#84828A" />
                      MyProfile
                    </span>
                    <span
                      className="flex gap-2 p-2 rounded-lg cursor-pointer hover:bg-gray-100"
                      onClick={onSignout}
                    >
                      <LogoutIcon color="#84828A" />
                      Logout
                    </span>
                  </Fragment>
                ) : (
                  <Fragment>
                    <span
                      className="flex gap-2 p-2 rounded-lg cursor-pointer hover:bg-gray-100"
                      onClick={handleOpenSigninModal}
                    >
                      <LogoutIcon color="#84828A" />
                      Login
                    </span>
                    <span
                      className="flex gap-2 p-2 rounded-lg cursor-pointer hover:bg-gray-100"
                      onClick={handleOpenRegisterModal}
                    >
                      <LogoutIcon color="#84828A" />
                      register
                    </span>
                  </Fragment>
                )}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      {isOpenSigninModal && (
        <SigninModal
          isOpen={isOpenSigninModal}
          onClose={handleCloseSigninModal}
        />
      )}
      {isOpenRegisterModal && (
        <RegisterModal
          isOpen={isOpenRegisterModal}
          onClose={handleCloseRegisterModal}
        />
      )}
    </header>
  );
}

export default TopBar;
