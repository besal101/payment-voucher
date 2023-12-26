import { Button } from "@/components/ui/button";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  calculateTotalAmount,
  filterRequired,
  groupArray,
} from "@/lib/helpers";
import { VTDATA, ViewRequestedResponse, ViewRequestedT } from "@/types/types";
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import InvoiceModal from "./components/invoiceModal";
import useInvoiceModal from "@/hooks/useInvoiceModal";

const ViewRequested: React.FC<ViewRequestedResponse> = (result) => {
  const data = groupArray(result?.result);
  const { openModal, isOpen } = useInvoiceModal();
  const [invoiceData, setInvoiceData] = useState<ViewRequestedT[]>([]);

  const handleModalOpen = (key: number) => {
    setInvoiceData(filterRequired(result?.result, key));
    openModal(key);
  };

  return (
    <div>
      <Table className="border-[1px] border-slate-400 mt-2 mb-5">
        <TableHeader>
          <TableRow className="px-2 py-3 h-8 text-[11px] font-semibold">
            <TableHead className="border-[1.35px] border-slate-300">
              <span className="text-gray-900">Req.</span>
            </TableHead>
            <TableHead className="border-[1.35px] border-slate-300">
              <span className="text-gray-900">Date</span>
            </TableHead>
            <TableHead className="border-[1.35px] border-slate-300">
              <span className="text-gray-900">Location</span>
            </TableHead>
            <TableHead className="border-[1.35px] border-slate-300">
              <span className="text-gray-900">Payment Type</span>
            </TableHead>
            <TableHead className="border-[1.35px] border-slate-300">
              <span className="text-gray-900">Currency</span>
            </TableHead>
            <TableHead className="border-[1.35px] border-slate-300">
              <span className="text-gray-900">Amount</span>
            </TableHead>
            <TableHead className="border-[1.35px] border-slate-300">
              <span className="text-gray-900">Action</span>
            </TableHead>
            <TableHead className="border-[1.35px] border-slate-300">
              <span className="text-gray-900">Status</span>
            </TableHead>
            <TableHead className="border-[1.35px] border-slate-300">
              <span className="text-gray-900">V no</span>
            </TableHead>
            <TableHead className="border-[1.35px] border-slate-300">
              <span className="text-gray-900">Date</span>
            </TableHead>
            <TableHead className="border-[1.35px] border-slate-300">
              <span className="text-gray-900">Amount</span>
            </TableHead>
            <TableHead className="border-[1.35px] border-slate-300">
              <span className="text-gray-900">log</span>
            </TableHead>
            <TableHead className="border-[1.35px] border-slate-300">
              <span className="text-gray-900">Action</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((item: VTDATA) => (
            <TableRow key={item.REQNO} className="text-xs font-light h-7">
              <TableCell className="border-[1px] border-slate-300">
                {item.REQNO}
              </TableCell>
              <TableCell className="border-[1px] border-slate-300">
                {item.REQDATE}
              </TableCell>
              <TableCell className="border-[1px] border-slate-300">
                {item.REQLOCNAME}
              </TableCell>
              <TableCell className="border-[1px] border-slate-300">
                {item.REQTYPENAME}
              </TableCell>
              <TableCell className="border-[1px] border-slate-300">
                {item.REQCURRCODE}
              </TableCell>
              <TableCell className="border-[1px] border-slate-300">
                {calculateTotalAmount(item)}
              </TableCell>
              <TableCell className="border-[1px] border-slate-300">
                <Button
                  size={"xs"}
                  className="text-xs my-1"
                  onClick={() => handleModalOpen(item.REQNO)}
                >
                  View
                </Button>
              </TableCell>
              <TableCell className="border-[1px] border-slate-300">
                {item.REQCANCELED === "y" ? (
                  <Badge variant="secondary" className="text-white">
                    Pending
                  </Badge>
                ) : (
                  <Badge variant="destructive" className="text-white">
                    Rejected
                  </Badge>
                )}
              </TableCell>
              <TableCell className="border-[1px] border-slate-300">
                {item.REQBPCODE}
              </TableCell>
              <TableCell className="border-[1px] border-slate-300"></TableCell>
              <TableCell className="border-[1px] border-slate-300"></TableCell>
              <TableCell className="border-[1px] border-slate-300"></TableCell>
              <TableCell className="border-[1px] border-slate-300"></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {isOpen && <InvoiceModal trans={invoiceData} />}
    </div>
  );
};

export default ViewRequested;
