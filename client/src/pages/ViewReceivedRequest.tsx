import {
  useGetApprovalHistory,
  useGetApproverQuery,
  useGetSingleVoucherQuery,
  useNextApproverQuery,
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
import { APPROVALHISTORY, ViewRequestedT } from "@/types/types";
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
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useUser } from "@/context/UserContext";
import { useMutation } from "@tanstack/react-query";
import http from "@/lib/http";
import { API_ENDPOINTS } from "@/lib/settings";
import { toast } from "@/components/ui/use-toast";
import { Tooltip } from "@radix-ui/react-tooltip";
import { TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { MonitorDown } from "lucide-react";
import { format, parseISO } from "date-fns";

type HandleApproveT = {
  reqno: string;
  approverstage: number | undefined;
  approver_userid: string | undefined;
  approver_username: string | undefined;
  app_status: string;
  next_approver: number | undefined;
  app_level: number | undefined;
  requester: string;
  currency: string | undefined;
  totalAmount: string;
};

const ViewReceivedRequest = () => {
  const { state } = useUser();
  const navigate = useNavigate();
  const current_user = state.USER_ID;
  const [searchParams] = useSearchParams();
  const reqno = searchParams.get("reqno") || "";
  const requester = searchParams.get("requester") || "";
  const { data, isLoading } = useGetSingleVoucherQuery(requester, reqno);
  const [rejectRemark, setRejectRemark] = useState<string>("");
  const [rejectRemarkError, setRejectRemarkError] = useState<boolean>(false);
  const [rejectModal, setRejectModal] = useState<boolean>(false);
  const [otpModal, setOTPModal] = useState<boolean>(true);

  const [otp, setOTP] = useState("");
  const [otpError, setOTPError] = useState<boolean>(false);

  const { data: history } = useGetApprovalHistory(reqno);

  const { data: Approver } = useGetApproverQuery(
    current_user,
    "PAYREQ",
    requester
  );

  const handleOTP = async () => {
    if (otp === "") {
      setOTPError(true);
      return;
    }
    try {
      const { data } = await http.post(`${API_ENDPOINTS.VERIFYOTP}`, {
        userId: current_user,
        OTP: otp,
      });
      if (data.ValidateOTPResult.Output === "Failed") {
        setOTPError(true);
        return;
      }
      setOTPModal(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await http.post(`${API_ENDPOINTS.GENERATEOTP}`, {
          userId: current_user,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [current_user]);

  useEffect(() => {
    if ((data?.result.length as number) === 0) {
      navigate("/error");
    }
    if ((Approver?.result.length as number) === 0) {
      navigate("/error");
    }
  }, [Approver, data, navigate]);

  const { data: NextApprover } = useNextApproverQuery(
    requester,
    "PAYREQ",
    Approver?.result[0].APPROVALSTAGE as number
  );

  const { mutate: handleVoucherApprove, isPending } = useMutation({
    mutationFn: async (data: HandleApproveT) => {
      const response = await http.post(
        API_ENDPOINTS.HANDLEVOUCHERAPPROVE,
        data
      );
      return response.data;
    },
    onSuccess: () => {
      const status = "approved";
      navigate(`/approval?status=${status}`);
      toast({
        title: "Success !!",
        description: "You have successfully approved the request voucher",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    },
  });

  const { mutate: handleVoucherReject, isPending: LoadingReject } = useMutation(
    {
      mutationFn: async (data: HandleApproveT & { rejectRemark: string }) => {
        const response = await http.post(
          API_ENDPOINTS.HANDLEVOUCHERREJECT,
          data
        );
        return response.data;
      },
      onSuccess: () => {
        setRejectModal(false);
        setRejectRemark("");
        navigate(`/approval?status='rejected'`);
        toast({
          title: "Success !!",
          description: "You have successfully rejected the request voucher",
        });
      },
      onError: () => {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
      },
    }
  );

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
        name: getCurrencyName(data?.result[0]?.REQCURRCODE as string),
        plural: getCurrencyName(data?.result[0]?.REQCURRCODE as string),
        symbol: data?.result[0]?.REQCURRCODE as string,
        fractionalUnit: {
          name: "cents",
          plural: "cents",
          symbol: "",
        },
      },
    },
  });

  const showmodal = () => {
    setRejectModal(true);
  };

  const handleApprove = () => {
    const resulter: HandleApproveT = {
      reqno: reqno,
      requester: requester,
      approverstage: Approver?.result[0].APPROVALSTAGE,
      approver_userid: Approver?.result[0].USERID,
      approver_username: Approver?.result[0].USERNAME,
      app_status: "A",
      next_approver:
        (NextApprover?.result.length as number) > 0
          ? NextApprover?.result[0].APPROVALSTAGE
          : 0,
      app_level:
        (NextApprover?.result.length as number) > 0
          ? NextApprover?.result[0].APPROVALSTAGE
          : 0,
      totalAmount: formatNumberWithCommas(
        calculateTotalAmountfromALl(data?.result as ViewRequestedT[])
      ),
      currency: data?.result[0].REQCURRCODE,
    };
    handleVoucherApprove(resulter);
  };

  const handlereject = () => {
    if (rejectRemark === "") {
      setRejectRemarkError(true);
      return;
    }
    const resulter: HandleApproveT & { rejectRemark: string } = {
      reqno: reqno,
      requester: requester,
      approverstage: Approver?.result[0].APPROVALSTAGE,
      approver_userid: Approver?.result[0].USERID,
      approver_username: Approver?.result[0].USERNAME,
      app_status: "R",
      next_approver:
        (NextApprover?.result.length as number) > 0
          ? NextApprover?.result[0].APPROVALSTAGE
          : 0,
      app_level:
        (NextApprover?.result.length as number) > 0
          ? NextApprover?.result[0].APPROVALSTAGE
          : 0,
      totalAmount: formatNumberWithCommas(
        calculateTotalAmountfromALl(data?.result as ViewRequestedT[])
      ),
      currency: data?.result[0].REQCURRCODE,
      rejectRemark,
    };
    handleVoucherReject(resulter);
  };

  return (
    <div className="flex justify-center mt-6 mb-10">
      {(data?.result.length as number) > 0 && (
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
                <TableHead className="border-[1.3px] border-slate-400 h-8">
                  <span className="text-gray-900 text-xs">Attachments</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.result.map((item: ViewRequestedT, index: number) => (
                <TableRow
                  className="font-light text-xs"
                  key={item.REQNO + index}
                >
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
                  <TableCell className="border-[1px] border-slate-400 h-8">
                    <Tooltip>
                      <TooltipTrigger type="button" className="relative">
                        {countFiles(item["REQATTACH:2"]) !== 0 && (
                          <MonitorDown
                            size={22}
                            color="green"
                            className="cursor-pointer"
                            onClick={() => handleDownload(item["REQATTACH:2"])}
                          />
                        )}

                        {countFiles(item["REQATTACH:2"]) !== 0 && (
                          <div className="h-3 w-3 absolute bg-purple-500 top-0 rounded-full -right-1">
                            <span className="text-[9px] text-white absolute -top-[2px] right-[3px]">
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
                    {(data?.result?.length as number) > 0
                      ? toWords.convert(
                          calculateTotalAmountfromALl(
                            data?.result as ViewRequestedT[]
                          )
                        )
                      : null}
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
                Received by:
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
          <div>
            <div className="flex flex-row justify-end gap-3 items-center">
              <Button
                className="text-[11px]"
                variant={"secondary"}
                size={"sm"}
                type="submit"
                onClick={handleApprove}
                disabled={isPending}
              >
                Approve
              </Button>
              <Button
                className="text-[11px]"
                variant={"default"}
                size={"sm"}
                type="button"
                onClick={showmodal}
                disabled={isPending}
              >
                Reject
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
          </div>
        </div>
      )}

      <Dialog open={rejectModal} onOpenChange={() => setRejectModal(false)}>
        <DialogContent className="max-w-xl">
          <div className="flex flex-col gap-4">
            <div>
              <span className="text-sm">
                Do you want to reject this request ?
              </span>
            </div>
            <div>
              <label htmlFor="reject" className="text-xs">
                Please give a short remark
              </label>
              <Input
                id="reject"
                type="text"
                className="col-span-2"
                value={rejectRemark}
                onChange={(e) => {
                  setRejectRemarkError(false);
                  setRejectRemark(e.target.value);
                }}
              />
              {rejectRemarkError && (
                <span className="text-[10px] text-red-400">
                  Please give reason to reject this transaction
                </span>
              )}

              <div className="flex flex-row justify-end mt-4">
                <Button
                  className="text-xs"
                  size={"sm"}
                  variant={"secondary"}
                  onClick={handlereject}
                  disabled={LoadingReject}
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={otpModal} onOpenChange={() => {}}>
        <DialogContent
          className="max-w-xl"
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="reject" className="text-xs">
              Please verify your login.
            </label>
            <Input
              id="reject"
              type="text"
              placeholder="Enter OTP"
              className="col-span-2"
              value={otp}
              onChange={(e) => {
                setOTPError(false);
                setOTP(e.target.value);
              }}
            />
            {otpError && (
              <span className="text-[12px] text-red-400">
                This OTP is Invalid.
              </span>
            )}

            <div className="flex flex-row justify-end mt-4">
              <Button
                className="text-xs"
                size={"sm"}
                variant={"secondary"}
                onClick={handleOTP}
              >
                Submit
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ViewReceivedRequest;
