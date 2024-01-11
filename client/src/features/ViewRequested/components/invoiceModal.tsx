import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import useInvoiceModal from "@/hooks/useInvoiceModal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import logo from "@/assets/logo.png";
import { APPROVALHISTORY, ViewRequestedT } from "@/types/types";
import {
  calculateNetAmount,
  calculateTotalAmountfromALl,
  formatNumberWithCommas,
  getCurrencyName,
} from "@/lib/helpers";
import { ToWords } from "to-words";
import { format, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import { Margin, usePDF } from "react-to-pdf";

const InvoiceModal: React.FC = () => {
  const isOpen = useInvoiceModal((state) => state.isOpen);
  const closeModal = useInvoiceModal((state) => state.closeModal);
  const trans = useInvoiceModal((state) => state.trans);
  const history = useInvoiceModal((state) => state.history);

  const { toPDF, targetRef } = usePDF({
    filename: "invoice.pdf",
    canvas: {
      mimeType: "image/png",
      qualityRatio: 1,
      logging: true,
    },
    page: {
      margin: Margin.MEDIUM,
    },
    overrides: {
      pdf: {
        compress: true,
      },
      canvas: {
        useCORS: true,
      },
    },
  });

  const handleDownloadPDF = () => {
    toPDF();
  };

  const toWords = new ToWords({
    localeCode: "en-AE",
    converterOptions: {
      currency: true,
      ignoreDecimal: false,
      ignoreZeroCurrency: false,
      doNotAddOnly: false,
      currencyOptions: {
        name: getCurrencyName(trans?.result[0].REQCURRCODE as string),
        plural: getCurrencyName(trans?.result[0].REQCURRCODE as string),
        symbol: trans?.result[0].REQCURRCODE as string,
        fractionalUnit: {
          name: "cents",
          plural: "cents",
          symbol: "",
        },
      },
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={() => closeModal()}>
      <DialogContent className="max-w-5xl">
        <div className="flex justify-center" ref={targetRef}>
          <div>
            <div className="grid grid-cols-5 gap-52">
              <div className="col-span-2">
                <div className="flex flex-col text-xs font-light">
                  <img src={logo} className="w-40" alt="" />
                  <div className="flex flex-row mt-4">
                    <span>Tel: +971 4 8811195 | Fax: +971 4 8811196</span>
                  </div>
                  <div className="flex flex-row">
                    <span>P.O.Box: 41534 | Plot No: S21006, Jafza South</span>
                  </div>
                  <div className="flex flex-row">
                    <span>Dubai - UAE, Email: info.hq@neweast.co</span>
                  </div>
                </div>
              </div>
              <div className="col-span-3">
                <div className="flex flex-col text-center">
                  <span className="text-lg font-semibold">Payment Voucher</span>
                  <Table className="border-[1.3px] border-slate-400 mt-2">
                    <TableHeader className="">
                      <TableRow className="text-xs font-semibold">
                        <TableHead className="border-[1.3px] border-slate-400 h-8">
                          <span className="text-gray-900 text-xs mt-2">
                            No.
                          </span>
                        </TableHead>
                        <TableHead className="border-[1.3px] border-slate-400 h-8 mt-2">
                          <span className="text-gray-900 text-xs mt-2">
                            Payment Type
                          </span>
                        </TableHead>
                        <TableHead className="border-[1.3px] border-slate-400 h-8 mt-2">
                          <span className="text-gray-900 text-xs mt-2">
                            Location
                          </span>
                        </TableHead>
                        <TableHead className="border-[1.3px] border-slate-400 h-8 mt-2">
                          <span className="text-gray-900 text-xs mt-2">
                            Mode
                          </span>
                        </TableHead>
                        <TableHead className="border-[1.3px] border-slate-400 h-8">
                          <span className="text-gray-900 text-xs mt-2">
                            Date <span className=""></span>
                          </span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="font-light text-xs">
                        <TableCell className="border-[1px] border-slate-400">
                          <span className="leading-6">
                            {" "}
                            {trans?.result[0].REQNO}
                          </span>
                        </TableCell>
                        <TableCell className="border-[1px] border-slate-400">
                          <span className="leading-6">
                            {trans?.result[0].REQTYPENAME}
                          </span>
                        </TableCell>
                        <TableCell className="border-[1px] border-slate-400">
                          <span className="leading-6">
                            {" "}
                            {trans?.result[0].REQLOCNAME}
                          </span>
                        </TableCell>
                        <TableCell className="border-[1px] border-slate-400">
                          <span className="leading-6">
                            {" "}
                            {trans?.result[0].REQMODENAME}
                          </span>
                        </TableCell>
                        <TableCell className="border-[1px] border-slate-400">
                          <span className="leading-6">
                            {" "}
                            {trans?.result[0].REQDATE}
                          </span>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                <div className="flex flex-row text-xs font-extralight">
                  <div className="col-span-4 flex-1 border-l-[1px] border-r-[1px] border-b-[1px] border-slate-400 h-9 flex items-center">
                    <span className="ml-4">
                      <span className="font-bold mr-2">Pay to:</span>
                      {trans?.result[0].REQEMPNAME}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <Table className="border-[1.3px] border-slate-400 mt-1">
              <TableHeader className="">
                <TableRow className="text-xs font-semibold">
                  <TableHead className="border-[1.3px] border-slate-400 h-8">
                    <span className="text-gray-900 text-xs">Division</span>
                  </TableHead>
                  <TableHead className="border-[1.3px] border-slate-400 h-8">
                    <span className="text-gray-900 text-xs">Department</span>
                  </TableHead>
                  <TableHead className="border-[1.3px] border-slate-400 h-8">
                    <span className="text-gray-900 text-xs">Product Line</span>
                  </TableHead>
                  <TableHead className="border-[1.3px] border-slate-400 h-8">
                    <span className="text-gray-900 text-xs">GL Name</span>
                  </TableHead>
                  <TableHead className="border-[1.3px] border-slate-400 h-8">
                    <span className="text-gray-900 text-xs">Description</span>
                  </TableHead>
                  <TableHead className="border-[1.3px] border-slate-400 h-8">
                    <span className="text-gray-900 text-xs">Amount</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trans?.result.map((item: ViewRequestedT, index: number) => (
                  <TableRow
                    className="font-light text-xs"
                    key={item.REQNO + index}
                  >
                    <TableCell className="border-[1px] border-slate-400 h-8">
                      <span className="leading-6">{item.CC_DEPTNAM}</span>
                    </TableCell>
                    <TableCell className="border-[1px] border-slate-400 h-8">
                      <span className="leading-6"> {item.CC_DIVNAM}</span>
                    </TableCell>
                    <TableCell className="border-[1px] border-slate-400 h-8">
                      <span className="leading-6">{item.CC_PRODLINENAM}</span>
                    </TableCell>
                    <TableCell className="border-[1px] border-slate-400 h-8">
                      <span className="leading-6">{item.GLNAME}</span>
                    </TableCell>
                    <TableCell className="border-[1px] border-slate-400 h-8">
                      <span className="leading-6"> {item.REQDESC}</span>
                    </TableCell>
                    <TableCell className="border-[1px] border-slate-400 h-8">
                      <span className="leading-6">
                        {" "}
                        {formatNumberWithCommas(item.REQAMOUNT)}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex flex-row border-l-[1px] border-r-[1px] border-slate-400 h-18">
              <div className="flex flex-1 items-center  border-slate-400 border-b-[1px]">
                <div className="flex flex-col justify-center text-xs ml-3">
                  <span>
                    Amount in words:{" "}
                    <span className="font-semibold">
                      {toWords.convert(
                        calculateTotalAmountfromALl(
                          trans?.result as ViewRequestedT[]
                        )
                      )}
                    </span>
                  </span>
                  <span></span>
                </div>
              </div>
              <div className="w-28 border-slate-400">
                <div className="border-l-[1px] border-slate-400 h-7 flex justify-center items-center">
                  <span className="text-xs font-normal">Net Amount</span>
                </div>
                <div className="border-l-[1px] border-t-[1px] border-slate-400 h-7 flex justify-center items-center">
                  <span className="text-xs font-normal">VAT</span>
                </div>
                <div className="border-l-[1px] border-t-[1px] border-b-[1px] border-slate-400 h-7 flex justify-center items-center">
                  <span className="text-xs font-normal">Total Amount</span>
                </div>
              </div>
              <div className="w-28 border-slate-400 text-xs">
                <div className="border-l-[1px] border-slate-400 h-7 flex justify-center items-center">
                  {calculateNetAmount(trans?.result as ViewRequestedT[])}
                </div>
                <div className="border-l-[1px] border-t-[1px] border-slate-400 h-7 flex justify-center items-center">
                  {trans?.result[0].REQVATPERC} %
                </div>
                <div className="border-l-[1px] border-t-[1px] border-b-[1px] border-slate-400 h-7 flex justify-center items-center">
                  {formatNumberWithCommas(trans?.result[0].TOTALAMT as number)}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-6">
              <div className="border-b-[1.3px] border-l-[1.3px] border-slate-400 h-12 pl-2 pt-1">
                <span className="text-xs font-semibold flex justify-start items-center">
                  Prepared by:
                </span>
                <span className="text-xs mt-1 flex justify-start items-center">
                  {trans?.result[0]?.REQUSERNAME}
                </span>
              </div>
              <div className="border-b-[1.3px] border-l-[1.3px] border-slate-400 h-12 pl-2 pt-1">
                <span className="text-xs font-semibold flex justify-start items-center">
                  Approved by:
                </span>
                <span className="text-xs mt-1 flex justify-start items-center">
                  {trans?.result[0]?.APPROVEDUSERNAME}
                </span>
              </div>
              <div className="border-b-[1.3px] border-l-[1.3px] border-r-[1.3px] border-slate-400 h-12 pl-2 pt-1">
                <span className="text-xs font-semibold flex justify-start items-center">
                  Received by:
                </span>
                <div className="text-xs mt-1 flex justify-start items-center relative">
                  <span className="absolute top-0">
                    {trans?.result[0].RECEIVEDBY}
                  </span>
                  <span className="absolute top-0">
                    {trans?.result[0].PAIDSIGNDOC && (
                      <img
                        src={`${import.meta.env.VITE_PUBLIC_BACKEND}/uploads/${
                          trans?.result[0].PAIDSIGNDOC
                        }`}
                        height={60}
                        width={90}
                        className="mr-8"
                      />
                    )}
                  </span>
                </div>
              </div>
              <div></div>
            </div>

            <div className="grid grid-cols-2 mt-2">
              <div className="border-b-[1.3px] border-l-[1.3px] border-t-[1.3px] border-r-[1px] border-slate-400 h-6">
                <span className="text-xs flex justify-start ml-2">
                  Approvals
                </span>
              </div>
            </div>
            <div className="grid grid-cols-6">
              <div className="border-b-[1.3px] border-l-[1.3px] border-slate-400 h-6">
                <span className="text-xs font-thin flex justify-center items-center">
                  Username
                </span>
              </div>
              <div className="border-b-[1.3px] border-l-[1.3px] border-slate-400 h-6">
                <span className="text-xs font-thin flex justify-center items-center">
                  Date
                </span>
              </div>
              <div className="border-b-[1.3px] border-l-[1.3px] border-r-[1px] border-slate-400 h-6">
                <span className="text-xs flex justify-center items-center font-thin">
                  Status
                </span>
              </div>
            </div>
            {history?.result.map((item: APPROVALHISTORY, index: number) => (
              <div className="grid grid-cols-6" key={item.REQNO + index}>
                <div className="border-b-[1.3px] border-l-[1.3px] border-slate-400 h-5">
                  <span className="text-xs flex justify-center items-center">
                    {item.APPROVELUSERNAME}
                  </span>
                </div>
                <div className="border-b-[1.3px] border-l-[1.3px] border-slate-400 h-5">
                  <span className="text-xs flex justify-center items-center">
                    {item.APPROVERLOG === null ? (
                      <span>TBD</span>
                    ) : (
                      <span>
                        {format(parseISO(item.APPROVERLOG), "MMM dd, yyyy")}
                      </span>
                    )}
                  </span>
                </div>
                <div className="border-b-[1.3px] border-l-[1.3px] border-r-[1.3px] border-slate-400 h-5">
                  <span className="text-xs flex justify-center items-center">
                    {item.APPROVERSTATUS === "P" && "Pending"}
                    {item.APPROVERSTATUS === "A" && "Approved"}
                    {item.APPROVERSTATUS === "R" && "Rejected"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <DialogFooter>
          <div className="flex flex-row justify-end">
            <Button
              variant={"secondary"}
              size={"sm"}
              className="w-24"
              onClick={handleDownloadPDF}
            >
              Print
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InvoiceModal;
