import React, { useEffect } from "react";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import axios from "axios";
import { useFoxStore } from "@/zustand/store";
import { tokenService } from "@/lib/tokenService";

function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const { setAccessToken } = useFoxStore((state) => state);

  const handleGetCSRF = async () => {
    try {
      await axios.get("/api/users/");
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    handleGetCSRF();
  }, []);

  useEffect(() => {
    const token = tokenService.getToken("accessToken");
    if (!token) {
      return;
    }

    setAccessToken(token);
    const expire = setTimeout(() => {
      tokenService.removeToken("accessToken");
    }, 1000 * 60);
    return () => clearTimeout(expire);
  }, [setAccessToken]);

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
