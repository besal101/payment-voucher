import React from "react";
import Sidebar from "./Sidebar";
import Menu from "./Menu";
import { useLocation } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

const Layout = (props: Props) => {
  const location = useLocation();

  return (
    <div className="h-full">
      <aside className="fixed left-0 top-0 z-10 w-[3.35rem] transition-all border-gray-300/40   hover:w-56 hover:shadow-2xl">
        <Sidebar active={location.pathname} />
      </aside>
      <main className="w-[calc(100%-3.35rem)] ml-auto">
        <div className="2xl:container relative">
          <div className="h-36 bg-red-500 border-b border-gray-300/40 dark:border-gray-700">
            <div className="flex flex-row justify-between">
              <span className="text-white font-semibold text-base font-poppins px-8 pt-4">
                {location.pathname === "/received-request" &&
                  "You have received the following requests to be approved"}
                {location.pathname === "/create-payment" &&
                  "Payment Request Voucher"}
                {location.pathname === "/view-requested" &&
                  "You have requested the followings payments to be approved"}
              </span>
              <Menu />
            </div>
          </div>
          <div className="max-h-96 absolute top-7 left-7 right-7 rounded-xl shadow-md">
            <div className="pb-8">
              <div className="border bg-slate-50 border-gray-300/40 rounded-md mt-6">
                {props.children}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
