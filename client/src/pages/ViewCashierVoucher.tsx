import { PageLoader } from "@/components/Shared";
import ApprovalHistory from "@/components/Shared/Approvals";
import Calculations from "@/components/Shared/Calculations";
import Header from "@/components/Shared/Header";
import HistoryLog from "@/components/Shared/Log";
import TransactionTable from "@/components/Shared/Transaction";
import { Button } from "@/components/ui/button";
import useInvoiceModal from "@/hooks/useInvoiceModal";
import useSignatureModal from "@/hooks/useSignatureModal";
import { countFiles, handleDownload } from "@/lib/helpers";
import {
  useGetApprovalHistory,
  useGetSingleVoucherQuery,
  useVerifyCashier,
} from "@/query/procedure/getProcedure";
import { APPROVALHISTORYRESPONSE, ViewRequestedResponse } from "@/types/types";
import { Printer } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

const ViewCashierVoucher = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const reqno = searchParams.get("reqno") || "";
  const created_by = searchParams.get("created_by") || "";
  const uSrId = searchParams.get("uSrId") || "";
  const { data, isLoading } = useGetSingleVoucherQuery(created_by, reqno);
  const { data: CashierData } = useVerifyCashier(uSrId);

  const openModal = useInvoiceModal((state) => state.openModal);
  const { openModal: openSignature, setCashier } = useSignatureModal();

  const { data: history } = useGetApprovalHistory(reqno);

  if (isLoading) {
    return <PageLoader />;
  }

  const handleClose = () => {
    navigate(`/payment-disbursement?uSrId=${uSrId}`);
  };

  const handlePrint = () => {
    openModal(
      data as ViewRequestedResponse,
      history as APPROVALHISTORYRESPONSE
    );
  };

  const handlePay = () => {
    const cashierData = {
      CashierUserID: CashierData?.result[0].USER_ID as string,
      CashierUsername: CashierData?.result[0].USER_NAME as string,
    };

    setCashier(cashierData.CashierUserID, cashierData.CashierUsername);
    openSignature();
  };

  return (
    <div className="flex justify-center mt-6 mb-10">
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
              paidby={data?.result[0].PAIDEMPNAME}
              image={data?.result[0].PAIDSIGNDOC}
            />
          )}
          <div className="flex flex-row justify-end">
            {countFiles(data?.result[0].REQATTACH as string) !== 0 && (
              <Button
                variant={"secondary"}
                type="button"
                size={"xs"}
                className="text-[11px] py-1 mt-2 relative h-8"
                onClick={() =>
                  handleDownload(data?.result[0].REQATTACH as string)
                }
              >
                {countFiles(data?.result[0].REQATTACH as string) > 0 && (
                  <div className="absolute w-3 h-3 rounded-full -top-1.5 -right-1 bg-green-500">
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
          <div className="flex flex-row justify-end gap-3 mt-2 items-center">
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

          {history && <ApprovalHistory history={history} />}
        </div>
      </div>
    </div>
  );
};

export default ViewCashierVoucher;
