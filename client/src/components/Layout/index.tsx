import React from "react";
import Sidebar from "./Sidebar";
import Menu from "./Menu";
import { useLocation } from "react-router-dom";
import useInvoiceModal from "@/hooks/useInvoiceModal";
import InvoiceModal from "@/features/ViewRequested/components/invoiceModal";
import useSignatureModal from "@/hooks/useSignatureModal";
import SignatureModal from "@/features/modal/SignatureModal";

type Props = {
  children: React.ReactNode;
};

const Layout = (props: Props) => {
  const location = useLocation();
  const isOpen = useInvoiceModal((state) => state.isOpen);
  const isSignatureOpen = useSignatureModal((state) => state.isOpen);

  return (
    <div className="h-full">
      <aside className="fixed left-0 top-0 z-10 w-[3.35rem] transition-all border-gray-300/40   hover:w-56 hover:shadow-2xl">
        <Sidebar active={location.pathname} />
      </aside>
      <main className="w-[calc(100%-3.35rem)] ml-auto">
        <div className="2xl:container relative">
          <div className="h-36 bg-red-500 border-b border-gray-300/40 dark:border-gray-700">
            <div className="flex flex-row justify-between">
              <span className="text-white font-semibold font-poppins text-sm px-9 pt-4">
                {location.pathname === "/payment-request" && "Payment Requests"}
                {location.pathname === "/payment-request/create" &&
                  "Payment Request"}
                {location.pathname === "/payment-disbursement" &&
                  "Payment Disbursement"}
                {location.pathname === "/view-cashier-voucher" &&
                  "View Voucher"}
                {location.pathname === "/view-voucher" && "View Voucher"}
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
        {isOpen && <InvoiceModal />}
        {isSignatureOpen && <SignatureModal />}
      </main>
    </div>
  );
};

export default Layout;
