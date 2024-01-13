import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ViewRequestedResponse } from "@/types/types";
import { format, parseISO } from "date-fns";
import logo from "@/assets/logo.png";

type Props = {
  data: ViewRequestedResponse;
  type: string;
};

const Header = ({ data, type }: Props) => {
  return (
    <>
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
          <span className="text-md font-semibold">{type}</span>
          <Table className="border-[1.3px] border-slate-400 mt-2">
            <TableHeader className="">
              <TableRow className="text-xs font-semibold">
                <TableHead className="border-[1.3px] border-slate-400 h-10">
                  <span className="text-gray-900 text-xs">No.</span>
                </TableHead>
                <TableHead className="border-[1.3px] border-slate-400 h-10">
                  <span className="text-gray-900 text-xs">Payment Type</span>
                </TableHead>
                {/* <TableHead className="border-[1.3px] border-slate-400 h-10">
                  <span className="text-gray-900 text-xs">Location</span>
                </TableHead> */}
                <TableHead className="border-[1.3px] border-slate-400 h-10">
                  <span className="text-gray-900 text-xs">Mode</span>
                </TableHead>
                <TableHead className="border-[1.3px] border-slate-400 h-10">
                  <span className="text-gray-900 text-xs">
                    Date <span className=""></span>
                  </span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="font-light text-xs">
                <TableCell className="border-[1px] border-slate-400  h-8">
                  {data?.result[0].REQNO}
                </TableCell>
                <TableCell className="border-[1px] border-slate-400  h-8">
                  {data?.result[0].REQTYPENAME}
                </TableCell>
                {/* <TableCell className="border-[1px] border-slate-400  h-8">
                  {data?.result[0].REQLOCNAME}
                </TableCell> */}
                <TableCell className="border-[1px] border-slate-400  h-8">
                  {data?.result[0].REQMODENAME}
                </TableCell>
                <TableCell className="border-[1px] border-slate-400  h-8">
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
        </div>
      </div>
    </>
  );
};

export default Header;
