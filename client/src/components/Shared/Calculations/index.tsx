import {
  calculateNetAmount,
  calculateTotalAmountfromALl,
  calculateVatAmount,
  formatNumberWithCommas,
  numberToWords,
} from "@/lib/helpers";
import { ViewRequestedResponse, ViewRequestedT } from "@/types/types";

type Props = {
  data: ViewRequestedResponse;
};

const Calculations = ({ data }: Props) => {
  return (
    <>
      <div className="flex flex-1 items-center  border-slate-400 border-b-[1px]">
        <div className="flex flex-col justify-center text-xs ml-3">
          <span>
            Amount in words:{" "}
            <span className="font-semibold">
              {data &&
                numberToWords(data?.result[0].REQCURRCODE as string, data)}
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
    </>
  );
};

export default Calculations;
