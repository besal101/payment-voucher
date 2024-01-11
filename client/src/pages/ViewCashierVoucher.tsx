import {
  useGetApprovalHistory,
  useGetSingleVoucherQuery,
} from "@/query/procedure/getProcedure";
import { useNavigate, useSearchParams } from "react-router-dom";
import logo from "@/assets/logo.png";
import { PageLoader } from "@/components/Shared";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  APPROVALHISTORY,
  APPROVALHISTORYRESPONSE,
  ViewRequestedResponse,
  ViewRequestedT,
} from "@/types/types";
import {
  calculateNetAmount,
  calculateTotalAmountfromALl,
  calculateVatAmount,
  countFiles,
  formatNumberWithCommas,
  getCurrencyName,
  handleDownload,
} from "@/lib/helpers";
import { ToWords } from "to-words";
import { format, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import useInvoiceModal from "@/hooks/useInvoiceModal";
import useSignatureModal from "@/hooks/useSignatureModal";

const ViewCashierVoucher = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const reqno = searchParams.get("reqno") || "";
  const created_by = searchParams.get("created_by") || "";
  const cashierId = searchParams.get("cashierId") || "";
  const { data, isLoading } = useGetSingleVoucherQuery(created_by, reqno);

  const openModal = useInvoiceModal((state) => state.openModal);
  const { openModal: openSignature, setCashier } = useSignatureModal();

  const { data: history } = useGetApprovalHistory(reqno);

  if (isLoading) {
    return <PageLoader />;
  }

  const toWords = new ToWords({
    localeCode: "en-AE",
    converterOptions: {
      currency: true,
      ignoreDecimal: false,
      ignoreZeroCurrency: false,
      doNotAddOnly: false,
      currencyOptions: {
        name: getCurrencyName(data?.result[0].REQCURRCODE as string),
        plural: getCurrencyName(data?.result[0].REQCURRCODE as string),
        symbol: data?.result[0].REQCURRCODE as string,
        fractionalUnit: {
          name: "cents",
          plural: "cents",
          symbol: "",
        },
      },
    },
  });

  const handleClose = () => {
    navigate(`/payment-disbursement?cashierId=${cashierId}`);
  };

  const handlePrint = () => {
    openModal(
      data as ViewRequestedResponse,
      history as APPROVALHISTORYRESPONSE
    );
  };

  const handlePay = () => {
    const cashierData = {
      CashierUserID: data?.result[0].REQCASHIERCODE as string,
      CashierUsername: data?.result[0].REQCASHIERNAME as string,
    };
    setCashier(cashierData.CashierUserID, cashierData.CashierUsername);
    openSignature();
  };

  return (
    <div className="flex justify-center mt-6 mb-10">
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
              <span className="text-md font-semibold">Payment Request</span>
              <Table className="border-[1.3px] border-slate-400 mt-2">
                <TableHeader className="">
                  <TableRow className="text-xs font-semibold">
                    <TableHead className="border-[1.3px] border-slate-400 h-8">
                      <span className="text-gray-900 text-xs">No.</span>
                    </TableHead>
                    <TableHead className="border-[1.3px] border-slate-400 h-8">
                      <span className="text-gray-900 text-xs">
                        Payment Type
                      </span>
                    </TableHead>
                    <TableHead className="border-[1.3px] border-slate-400 h-8">
                      <span className="text-gray-900 text-xs">Location</span>
                    </TableHead>
                    <TableHead className="border-[1.3px] border-slate-400 h-8">
                      <span className="text-gray-900 text-xs">Mode</span>
                    </TableHead>
                    <TableHead className="border-[1.3px] border-slate-400 h-8">
                      <span className="text-gray-900 text-xs">
                        Date <span className=""></span>
                      </span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="font-light text-xs">
                    <TableCell className="border-[1px] border-slate-400">
                      {data?.result[0].REQNO}
                    </TableCell>
                    <TableCell className="border-[1px] border-slate-400">
                      {data?.result[0].REQTYPENAME}
                    </TableCell>
                    <TableCell className="border-[1px] border-slate-400">
                      {data?.result[0].REQLOCNAME}
                    </TableCell>
                    <TableCell className="border-[1px] border-slate-400">
                      {data?.result[0].REQMODENAME}
                    </TableCell>
                    <TableCell className="border-[1px] border-slate-400">
                      {format(
                        parseISO(data?.result[0].REQDATE as string),
                        "MMM dd, yyyy"
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <div className="flex flex-row text-xs font-extralight">
              <div className="col-span-4 flex-1 border-l-[1px] border-r-[1px] border-b-[1px] border-slate-400 h-9 flex items-center">
                <span className="ml-4">
                  <span className="font-bold mr-2">Pay to:</span>
                  {data?.result[0].REQEMPNAME}
                </span>
              </div>
              {/* <div className="col-span-1 border-r-[1px] border-b-[1px] border-slate-400 h-9 flex items-center w-28">
                <span className="ml-2">Control no: </span>
              </div> */}
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
            {data?.result.map((item: ViewRequestedT, index: number) => (
              <TableRow className="font-light text-xs" key={item.REQNO + index}>
                <TableCell className="border-[1px] border-slate-400 h-6">
                  {item.CC_DIVNAM}
                </TableCell>
                <TableCell className="border-[1px] border-slate-400 h-6">
                  {item.CC_DEPTNAM}
                </TableCell>
                <TableCell className="border-[1px] border-slate-400 h-6">
                  {item.CC_PRODLINENAM}
                </TableCell>
                <TableCell className="border-[1px] border-slate-400 h-6">
                  {item.GLNAME} - {item.GLCODE}
                </TableCell>
                <TableCell className="border-[1px] border-slate-400 h-6">
                  {item.REQDESC}
                </TableCell>
                <TableCell className="border-[1px] border-slate-400 h-6">
                  {data?.result[0].REQCURRCODE}{" "}
                  {formatNumberWithCommas(item.REQAMOUNT)}
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
                      data?.result as ViewRequestedT[]
                    )
                  )}
                </span>
              </span>
              <span></span>
            </div>
          </div>
          <div className="w-28 border-slate-400 ">
            <div className="border-l-[1px] border-slate-400 h-6 flex justify-center items-center">
              <span className="text-xs font-normal">Net Amount</span>
            </div>
            <div className="border-l-[1px] border-t-[1px] border-slate-400 h-6 flex justify-center items-center">
              <span className="text-xs font-normal">
                {" "}
                VAT{" "}
                <span className="font-semibold">
                  ({data?.result[0].REQVATPERC} %)
                </span>
              </span>
            </div>
            <div className="border-l-[1px] border-t-[1px] border-b-[1px] border-slate-400 h-6 flex justify-center items-center">
              <span className="text-xs font-normal">Total Amount</span>
            </div>
          </div>
          <div className="w-28 border-slate-400 text-xs">
            <div className="border-l-[1px] border-slate-400 h-6 flex justify-center items-center">
              {data?.result[0].REQCURRCODE}{" "}
              {calculateNetAmount(data?.result as ViewRequestedT[])}
            </div>
            <div className="border-l-[1px] border-t-[1px] border-slate-400 h-6 flex justify-center items-center">
              {data?.result[0].REQCURRCODE}{" "}
              {calculateVatAmount(data?.result as ViewRequestedT[])}
            </div>
            <div className="border-l-[1px] border-t-[1px] border-b-[1px] border-slate-400 h-6 flex justify-center items-center">
              {data?.result[0].REQCURRCODE}{" "}
              {formatNumberWithCommas(
                calculateTotalAmountfromALl(data?.result as ViewRequestedT[])
              )}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-6">
          <div className="border-b-[1.3px] border-l-[1.3px] border-slate-400 h-12 pl-2 pt-1">
            <span className="text-xs font-semibold flex justify-start items-center">
              Prepared by:
            </span>
            <span className="text-xs mt-1 flex justify-start items-center">
              {data?.result[0]?.REQUSERNAME}
            </span>
          </div>
          <div className="border-b-[1.3px] border-l-[1.3px] border-slate-400 h-12 pl-2 pt-1">
            <span className="text-xs font-semibold flex justify-start items-center">
              Approved by:
            </span>
            <span className="text-xs mt-1 flex justify-start items-center">
              {data?.result[0]?.APPROVEDUSERNAME}
            </span>
          </div>
          <div className="border-b-[1.3px] border-l-[1.3px] border-r-[1.3px] border-slate-400 h-12 pl-2 pt-1">
            <span className="text-xs font-semibold flex justify-start items-center">
              Received by:
            </span>
            <div className="text-xs mt-1 flex justify-start items-center relative">
              <span className="absolute top-0">
                {data?.result[0].RECEIVEDBY}
              </span>
              <span className="absolute top-0">
                {data?.result[0].PAIDSIGNDOC && (
                  <img
                    src={`${import.meta.env.VITE_PUBLIC_BACKEND}/uploads/${
                      data?.result[0].PAIDSIGNDOC
                    }`}
                    height={70}
                    width={100}
                    className="mr-8"
                  />
                )}
              </span>
            </div>
          </div>
          <div className="flex flex-row justify-end">
            {countFiles(data?.result[0].REQATTACH as string) !== 0 && (
              <Button
                variant={"secondary"}
                type="button"
                size={"sm"}
                className="text-[11px] py-1 mt-2 relative"
                onClick={() =>
                  handleDownload(data?.result[0].REQATTACH as string)
                }
              >
                {countFiles(data?.result[0].REQATTACH as string) > 0 && (
                  <div className="absolute w-4 h-4 rounded-full -top-1.5 -right-1 bg-green-500">
                    <span className="text-[8px]">
                      {countFiles(data?.result[0].REQATTACH as string)}
                    </span>
                  </div>
                )}
                View Attachments
              </Button>
            )}
          </div>
        </div>
        <div>
          <div className="flex flex-row justify-end gap-3 items-center">
            {data?.result[0].RESTATUS === "Approved" && (
              <div className="flex flex-row gap-2">
                <Button
                  className="text-[11px] w-16"
                  variant={"secondary"}
                  size={"sm"}
                  type="button"
                  onClick={handlePay}
                >
                  Pay
                </Button>
              </div>
            )}
            <Button
              className="text-[11px]"
              variant={"default"}
              size={"sm"}
              type="button"
              onClick={handleClose}
            >
              Close
            </Button>
            <Button
              className="text-[11px] bg-[#f47c7c]"
              size={"sm"}
              type="button"
              onClick={handlePrint}
            >
              <Printer size={18} className="mr-1" />
              Print
            </Button>
          </div>
          <div className="grid grid-cols-2">
            <div className="border-b-[1.3px] border-l-[1.3px] border-t-[1.3px] border-r-[1px] border-slate-400 h-6">
              <span className="text-xs flex justify-start mt-1 ml-2">
                Approvals
              </span>
            </div>
          </div>
          <div className="grid grid-cols-6">
            <div className="border-b-[1.3px] border-l-[1.3px] border-slate-400 h-6">
              <span className="text-xs font-thin flex justify-center items-center mt-1">
                Approvers
              </span>
            </div>
            <div className="border-b-[1.3px] border-l-[1.3px] border-slate-400 h-6">
              <span className="text-xs font-thin flex justify-center items-center mt-1">
                Date
              </span>
            </div>
            <div className="border-b-[1.3px] border-l-[1.3px] border-r-[1px] border-slate-400 h-6">
              <span className="text-xs flex justify-center items-center mt-1 font-thin">
                Status
              </span>
            </div>
          </div>
          {history?.result.map((item: APPROVALHISTORY, index: number) => (
            <div className="grid grid-cols-6" key={item.REQNO + index}>
              <div className="border-b-[1.3px] border-l-[1.3px] border-slate-400 h-5">
                <span className="text-xs flex justify-center items-center mt-1">
                  {item.APPROVELUSERNAME}
                </span>
              </div>
              <div className="border-b-[1.3px] border-l-[1.3px] border-slate-400 h-5">
                <span className="text-xs flex justify-center items-center mt-1">
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
                <span className="text-xs flex justify-center items-center mt-1">
                  {item.APPROVERSTATUS === "P" && "Pending"}
                  {item.APPROVERSTATUS === "A" && "Approved"}
                  {item.APPROVERSTATUS === "R" && "Rejected"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewCashierVoucher;
