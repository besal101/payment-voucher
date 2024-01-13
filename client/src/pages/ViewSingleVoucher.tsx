import { PageLoader } from "@/components/Shared";
import ApprovalHistory from "@/components/Shared/Approvals";
import Calculations from "@/components/Shared/Calculations";
import Header from "@/components/Shared/Header";
import HistoryLog from "@/components/Shared/Log";
import TransactionTable from "@/components/Shared/Transaction";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { countFiles, handleDownload } from "@/lib/helpers";
import http from "@/lib/http";
import { API_ENDPOINTS } from "@/lib/settings";
import { QUERYKEYS } from "@/query/constants";
import {
  useGetApprovalHistory,
  useGetSingleVoucherQuery,
} from "@/query/procedure/getProcedure";
import { useQueryClient } from "@tanstack/react-query";
import { Trash2, X } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

const ViewSingleVoucher = () => {
  const { state } = useUser();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const reqno = searchParams.get("reqno") || "";
  const { data, isLoading } = useGetSingleVoucherQuery(state.USER_ID, reqno);
  const { data: history } = useGetApprovalHistory(reqno);

  const queryClient = useQueryClient();

  const handleClose = () => {
    navigate(`/payment-request?uSrId=${state.USER_ID}&LoTp=${state.OTP}`);
  };

  const handleCancel = async () => {
    const cancelData = {
      reqno: reqno,
      cancelled: "Y",
      userid: state.USER_ID,
    };
    const { data } = await http.post(
      `${API_ENDPOINTS.CANCELREQUEST}`,
      cancelData
    );
    if (data.result) {
      queryClient.invalidateQueries({
        queryKey: [QUERYKEYS.GETSINGLEVOUCHERS, state.USER_ID, reqno],
      });
    }
  };

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="flex justify-center mt-3 mb-10">
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
              receivedby={data?.result[0]?.RECEIVEDBY}
              image={data?.result[0]?.PAIDSIGNDOC}
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

        {history && <ApprovalHistory history={history} />}

        <div className="fixed bottom-5 left-20 right-7 h-14 shadow-lg bg-slate-300 rounded-sm">
          <div className="flex flex-row justify-end items-center">
            <div className="flex justify-between gap-3 mt-3 mr-4">
              {data?.result[0].RESTATUS !== "Paid" &&
                data?.result[0].REQCANCELED !== "Y" && (
                  <Button
                    className="shadow-md bg-purple-600"
                    variant={"default"}
                    size={"sm"}
                    type="button"
                    onClick={handleCancel}
                  >
                    <Trash2 size="18" className="mr-1" />
                    Cancel
                  </Button>
                )}
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
