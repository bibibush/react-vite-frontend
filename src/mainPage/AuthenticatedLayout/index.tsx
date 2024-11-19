import React, { useEffect } from "react";
import TopBar from "./TopBar";
import SideBar from "./SideBar";
import axios from "axios";

function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
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

  return (
    <section className="flex bg-[#F7F6F9] lg:h-[1200px]">
      <SideBar />
      <div className="flex flex-col w-full">
        <TopBar />
        <div className="p-3 ml-[315px] mt-[96px]">{children}</div>
      </div>
    </section>
  );
}

export default AuthenticatedLayout;
