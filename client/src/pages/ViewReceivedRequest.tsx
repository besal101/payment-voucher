import { PageLoader } from "@/components/Shared";
import ApprovalHistory from "@/components/Shared/Approvals";
import Calculations from "@/components/Shared/Calculations";
import Header from "@/components/Shared/Header";
import HistoryLog from "@/components/Shared/Log";
import TransactionTable from "@/components/Shared/Transaction";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useUser } from "@/context/UserContext";
import {
  calculateTotalAmountfromALl,
  countFiles,
  formatNumberWithCommas,
  handleDownload,
} from "@/lib/helpers";
import http from "@/lib/http";
import { API_ENDPOINTS } from "@/lib/settings";
import {
  useGetApprovalHistory,
  useGetApproverQuery,
  useGetSingleVoucherQuery,
  useNextApproverQuery,
} from "@/query/procedure/getProcedure";
import { APPROVALHISTORYRESPONSE, ViewRequestedT } from "@/types/types";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

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

function checkPresence(
  data: APPROVALHISTORYRESPONSE,
  user_id: string
): boolean {
  for (const entry of data.result) {
    if (entry.APPROVERUSERID === user_id && entry.APPROVERSTATUS === "A") {
      return true;
    }
  }
  return false;
}

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
  const [otpModal, setOTPModal] = useState<boolean>(state.OTP ? false : true);

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
    if (state.OTP === undefined) {
      fetchData();
    }
  }, [current_user, state]);

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
            {data && <Header data={data} type="Payment Request" />}
          </div>
          {data && <TransactionTable data={data} showAttachment />}

          <div className="flex flex-row border-l-[1px] border-r-[1px] border-slate-400 h-18">
            {data && <Calculations data={data} />}
          </div>
          <div className="grid grid-cols-6">
            {data?.result.length !== undefined && (
              <HistoryLog
                preparedby={data?.result[0]?.REQUSERNAME}
                approvedby={data?.result[0]?.APPROVEDUSERNAME}
                receivedby={data?.result[0].RECEIVEDBY}
                image={data?.result[0].PAIDSIGNDOC}
              />
            )}
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
            {history !== undefined &&
              checkPresence(history, state.USER_ID) !== true && (
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
              )}

            {history && <ApprovalHistory history={history} />}
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
