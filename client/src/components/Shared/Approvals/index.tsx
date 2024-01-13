import { APPROVALHISTORY, APPROVALHISTORYRESPONSE } from "@/types/types";
import { format, parseISO } from "date-fns";

type Props = {
  history: APPROVALHISTORYRESPONSE;
};

const ApprovalHistory = ({ history }: Props) => {
  return (
    <>
      <div className="grid grid-cols-2 mt-2">
        <div className="border-b-[1.3px] border-l-[1.3px] border-t-[1.3px] border-r-[1px] border-slate-400 h-6">
          <span className="text-xs flex justify-start ml-2">Approvals</span>
        </div>
      </div>
      <div className="grid grid-cols-6">
        <div className="border-b-[1.3px] border-l-[1.3px] border-slate-400 h-6">
          <span className="text-xs font-thin flex justify-center items-center">
            Approvers
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
      {history?.result.map((item: APPROVALHISTORY) => (
        <div className="grid grid-cols-6">
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
    </>
  );
};

export default ApprovalHistory;
