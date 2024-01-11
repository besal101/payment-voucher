import logo from "@/assets/logo.png";
import { PageLoader } from "@/components/Shared";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TooltipContent } from "@/components/ui/tooltip";
import { useUser } from "@/context/UserContext";
import {
  calculateNetAmount,
  calculateTotalAmountfromALl,
  calculateVatAmount,
  countFiles,
  formatNumberWithCommas,
  getCurrencyName,
  handleDownload,
} from "@/lib/helpers";
import {
  useGetApprovalHistory,
  useGetSingleVoucherQuery,
} from "@/query/procedure/getProcedure";
import { APPROVALHISTORY, ViewRequestedT } from "@/types/types";
import { Tooltip, TooltipTrigger } from "@radix-ui/react-tooltip";
import { format, parseISO } from "date-fns";
import { X, MonitorDown } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ToWords } from "to-words";

const ViewSingleVoucher = () => {
  const { state } = useUser();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const reqno = searchParams.get("reqno") || "";
  const { data, isLoading } = useGetSingleVoucherQuery(state.USER_ID, reqno);

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
    navigate(`/payment-request?uSrId=${state.USER_ID}&LoTp=${state.OTP}`);
  };

  return (
    <div className="flex justify-center mt-3 mb-10">
      <div>
        <div className="grid grid-cols-5 gap-52 mt-4">
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
              <TableHead className="border-[1.3px] border-slate-400 h-8">
                <span className="text-gray-900 text-xs">Attachments</span>
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
                <TableCell className="border-[1px] border-slate-400 h-6">
                  {(item["REQATTACH:2"] !== "" ||
                    item["REQATTACH:2"] !== undefined) && (
                    <Tooltip>
                      <TooltipTrigger type="button" className="relative">
                        {countFiles(item["REQATTACH:2"]) !== 0 && (
                          <MonitorDown
                            size={22}
                            color="blue"
                            className="cursor-pointer "
                            onClick={() => handleDownload(item["REQATTACH:2"])}
                          />
                        )}

                        {countFiles(item["REQATTACH:2"]) !== 0 && (
                          <div className="h-3 w-3 absolute bg-primary top-0 rounded-full -right-1">
                            <span className="text-[10px] text-white absolute -top-[2px] right-[3px]">
                              {countFiles(item["REQATTACH:2"])}
                            </span>
                          </div>
                        )}
                      </TooltipTrigger>
                      <TooltipContent>
                        {countFiles(item["REQATTACH:2"]) !== 0 ? (
                          <p>Click to view the files</p>
                        ) : (
                          <p>No file attached</p>
                        )}
                      </TooltipContent>
                    </Tooltip>
                  )}
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
          <div className="w-28 border-slate-400">
            <div className="border-l-[1px] border-slate-400 h-6 flex justify-center items-center">
              <span className="text-xs font-normal">Net Amount</span>
            </div>
            <div className="border-l-[1px] border-t-[1px] border-slate-400 h-6 flex justify-center items-center">
              <span className="text-xs font-normal">
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
              Received by
            </span>
            <span className="text-xs mt-1 flex justify-start items-center"></span>
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

        <div className="grid grid-cols-2 mt-4">
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
        {history?.result.map((item: APPROVALHISTORY) => (
          <div className="grid grid-cols-6">
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
        <div className="fixed bottom-5 left-20 right-7 h-14 shadow-lg bg-slate-300 rounded-sm">
          <div className="flex flex-row justify-end items-center">
            <div className="flex justify-between gap-3 mt-3 mr-4">
              <Button
                className="shadow-md "
                variant={"default"}
                size={"sm"}
                type="button"
                onClick={handleClose}
              >
                <X size="18" className="mr-1" />
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewSingleVoucher;
