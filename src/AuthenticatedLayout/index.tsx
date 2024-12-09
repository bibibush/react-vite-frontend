import React, { useCallback, useEffect } from "react";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import axios from "axios";
import { useFoxStore } from "@/zustand/store";
import { tokenService } from "@/lib/tokenService";
import { cookieService } from "@/lib/cookieService";
import useGetMyProfile from "@/hooks/useGetMyProfile";

function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const { setAccessToken, onSignout, setUser } = useFoxStore((state) => state);
  const userId = tokenService.getToken("userId");

  const { data: myUserData } = useGetMyProfile({ userId });

  const handleGetCSRF = async () => {
    try {
      await axios.get("/api/users/");
    } catch (e) {
      console.error(e);
    }
  };

  const handleRefresh = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (refresh: any) => {
      if (!refresh) {
        onSignout();
        return;
      }

      try {
        const res = await axios.post("/api/users/token/refresh/", { refresh });
        setAccessToken(res.data.access);
      } catch (e) {
        console.error(e);
      }
    },
    [setAccessToken, onSignout]
  );

  useEffect(() => {
    handleGetCSRF();
  }, []);

  useEffect(() => {
    const token = tokenService.getToken("accessToken");
    const refresh = cookieService.getCookie("refreshToken");
    if (!refresh || !token) {
      onSignout();
      return;
    }

    setAccessToken(token);
    const expireAccessToken = setTimeout(() => {
      tokenService.removeToken(["accessToken"]);
      handleRefresh(refresh);
    }, 1000 * 60 * 10);

    return () => clearTimeout(expireAccessToken);
  }, [setAccessToken, onSignout, handleRefresh]);

  useEffect(() => {
    if (!myUserData) {
      return;
    }

    setUser(myUserData);
  }, [myUserData, setUser]);

  return (
    <section className="flex bg-[#F7F6F9] lg:h-[1200px]">
      <SideBar />
      <div className="flex flex-col w-full">
        <TopBar />
        <div className="py-3 px-8 ml-[315px] mt-[96px]">{children}</div>
      </div>
    </section>
  );
}

export default AuthenticatedLayout;
