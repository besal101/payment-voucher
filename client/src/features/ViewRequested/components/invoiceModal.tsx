import { Dialog, DialogContent } from "@/components/ui/dialog";
import useInvoiceModal from "@/hooks/useInvoiceModal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import logo from "@/assets/logo.png";
import { ViewRequestedT } from "@/types/types";
import {
  calculateNetAmount,
  calculateTotalAmountfromALl,
  formatNumberWithCommas,
  getCurrencyName,
} from "@/lib/helpers";
import { ToWords } from "to-words";

interface InvoiceModalProps {
  trans: ViewRequestedT[];
}

const InvoiceModal: React.FC<InvoiceModalProps> = ({ trans }) => {
  const isOpen = useInvoiceModal((state) => state.isOpen);
  const closeModal = useInvoiceModal((state) => state.closeModal);

  const toWords = new ToWords({
    localeCode: "en-AE",
    converterOptions: {
      currency: true,
      ignoreDecimal: false,
      ignoreZeroCurrency: false,
      doNotAddOnly: false,
      currencyOptions: {
        name: getCurrencyName(trans[0].REQCURRCODE),
        plural: getCurrencyName(trans[0].REQCURRCODE),
        symbol: trans[0].REQCURRCODE,
        fractionalUnit: {
          name: "cents",
          plural: "cents",
          symbol: "",
        },
      },
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={() => closeModal()}>
      <DialogContent className="max-w-5xl">
        <div className="flex justify-center ">
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
                  <span className="text-lg font-semibold">Payment Voucher</span>
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
                          <span className="text-gray-900 text-xs">
                            Location
                          </span>
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
                          {trans[0].REQNO}
                        </TableCell>
                        <TableCell className="border-[1px] border-slate-400">
                          {trans[0].REQTYPENAME}
                        </TableCell>
                        <TableCell className="border-[1px] border-slate-400">
                          {trans[0].REQLOCNAME}
                        </TableCell>
                        <TableCell className="border-[1px] border-slate-400">
                          {trans[0].REQMODENAME}
                        </TableCell>
                        <TableCell className="border-[1px] border-slate-400">
                          {trans[0].REQDATE}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                <div className="flex flex-row text-xs font-extralight">
                  <div className="col-span-4 flex-1 border-l-[1px] border-r-[1px] border-b-[1px] border-slate-400 h-9 flex items-center">
                    <span className="ml-4">
                      <span className="font-bold mr-2">Pay to:</span>
                      {trans[0].REQEMPCODE}
                    </span>
                  </div>
                  <div className="col-span-1 border-r-[1px] border-b-[1px] border-slate-400 h-9 flex items-center w-28">
                    <span className="ml-2">Control no: </span>
                  </div>
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {trans?.map((item: ViewRequestedT, index: number) => (
                  <TableRow
                    className="font-light text-xs"
                    key={item.REQNO + index}
                  >
                    <TableCell className="border-[1px] border-slate-400 h-6">
                      {item.CC_DIV}
                    </TableCell>
                    <TableCell className="border-[1px] border-slate-400 h-6">
                      {item.CC_DEPT}
                    </TableCell>
                    <TableCell className="border-[1px] border-slate-400 h-6">
                      {item.CC_PRODLINE}
                    </TableCell>
                    <TableCell className="border-[1px] border-slate-400 h-6">
                      {item.GLNAME}
                    </TableCell>
                    <TableCell className="border-[1px] border-slate-400 h-6">
                      {item.REQDESC}
                    </TableCell>
                    <TableCell className="border-[1px] border-slate-400 h-6">
                      {formatNumberWithCommas(item.REQAMOUNT)}
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
                      {toWords.convert(calculateTotalAmountfromALl(trans))}
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
                  <span className="text-xs font-normal">VAT</span>
                </div>
                <div className="border-l-[1px] border-t-[1px] border-b-[1px] border-slate-400 h-6 flex justify-center items-center">
                  <span className="text-xs font-normal">Total Amount</span>
                </div>
              </div>
              <div className="w-28 border-slate-400 text-sm">
                <div className="border-l-[1px] border-slate-400 h-6 flex justify-center items-center">
                  {calculateNetAmount(trans)}
                </div>
                <div className="border-l-[1px] border-t-[1px] border-slate-400 h-6 flex justify-center items-center">
                  {trans[0].REQVATPERC} %
                </div>
                <div className="border-l-[1px] border-t-[1px] border-b-[1px] border-slate-400 h-6 flex justify-center items-center">
                  {formatNumberWithCommas(calculateTotalAmountfromALl(trans))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-6">
              <div className="border-b-[1.3px] border-l-[1.3px] border-slate-400 h-6">
                <span className="text-xs flex justify-center items-center">
                  Prepared by
                </span>
              </div>
              <div className="border-b-[1.3px] border-l-[1.3px] border-slate-400 h-6">
                <span className="text-xs flex justify-center items-center">
                  Approved by
                </span>
              </div>
              <div className="col-span-3 border-b-[1.3px] border-l-[1.3px] border-slate-400 h-6"></div>
              <div className="border-b-[1.3px] border-l-[1.3px] border-r-[1px] border-slate-400 h-6">
                <span className="text-xs flex justify-center items-center">
                  Received by
                </span>
              </div>
            </div>
            <div className="grid grid-cols-6">
              <div className="border-b-[1.3px] border-l-[1.3px] border-slate-400 h-8"></div>
              <div className="border-b-[1.3px] border-l-[1.3px] border-slate-400 h-8"></div>
              <div className="border-b-[1.3px] border-l-[1.3px] border-slate-400 h-8">
                <span className="text-xs ml-1">Auditor :</span>
              </div>
              <div className="border-b-[1.3px] border-l-[1.3px] border-slate-400 h-8">
                <span className="text-xs ml-1">MD :</span>
              </div>
              <div className="border-b-[1.3px] border-l-[1.3px] border-slate-400 h-8">
                <span className="text-xs ml-1">CEO :</span>
              </div>
              <div className="border-b-[1.3px] border-l-[1.3px] border-r-[1.3px] border-slate-400 h-8"></div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InvoiceModal;
