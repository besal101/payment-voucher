import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ViewRequestedResponse, ViewRequestedT } from "@/types/types";
import {
  countFiles,
  formatNumberWithCommas,
  handleDownload,
} from "@/lib/helpers";
import { Tooltip, TooltipTrigger } from "@radix-ui/react-tooltip";
import { MonitorDown } from "lucide-react";
import { TooltipContent } from "@/components/ui/tooltip";

type Props = {
  data: ViewRequestedResponse;
  showAttachment: boolean;
};

const TransactionTable = ({ data, showAttachment }: Props) => {
  return (
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
          {showAttachment && (
            <TableHead className="border-[1.3px] border-slate-400 h-8">
              <span className="text-gray-900 text-xs">Attachments</span>
            </TableHead>
          )}
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
            {showAttachment && (
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
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TransactionTable;
