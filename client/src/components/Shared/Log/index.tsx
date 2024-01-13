type Props = {
  preparedby: string;
  approvedby?: string;
  receivedby?: string;
  paidby?: string;
  image?: string;
};

const HistoryLog = ({
  preparedby,
  approvedby,
  receivedby,
  image,
  paidby,
}: Props) => {
  return (
    <>
      <div className="border-b-[1.3px] border-l-[1.3px] border-slate-400 h-12 pl-2 pt-1">
        <span className="text-xs font-semibold flex justify-start items-center">
          Prepared by:
        </span>
        <span className="text-xs mt-1 flex justify-start items-center">
          {preparedby}
        </span>
      </div>
      <div className="border-b-[1.3px] border-l-[1.3px] border-slate-400 h-12 pl-2 pt-1">
        <span className="text-xs font-semibold flex justify-start items-center">
          Approved by:
        </span>
        <span className="text-xs mt-1 flex justify-start items-center">
          {approvedby}
        </span>
      </div>
      <div className="border-b-[1.3px] border-l-[1.3px] border-slate-400 h-12 pl-2 pt-1">
        <span className="text-xs font-semibold flex justify-start items-center">
          Paid by:
        </span>
        <span className="text-xs mt-1 flex justify-start items-center">
          {paidby}
        </span>
      </div>
      <div className="border-b-[1.3px] border-l-[1.3px] border-r-[1.3px] border-slate-400 h-12 pl-2 pt-1">
        <span className="text-xs font-semibold flex justify-start items-center">
          Received by:
        </span>
        <div className="text-xs mt-1 flex justify-start items-center relative">
          <span className="absolute top-0">{receivedby}</span>
          <span className="absolute top-0">
            {image && (
              <img
                src={`${import.meta.env.VITE_PUBLIC_BACKEND}/uploads/${image}`}
                height={60}
                width={90}
                className="mr-8"
              />
            )}
          </span>
        </div>
      </div>
    </>
  );
};

export default HistoryLog;
