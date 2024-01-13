import ApprovalHistory from "@/components/Shared/Approvals";
import Calculations from "@/components/Shared/Calculations";
import Header from "@/components/Shared/Header";
import HistoryLog from "@/components/Shared/Log";
import TransactionTable from "@/components/Shared/Transaction";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import useInvoiceModal from "@/hooks/useInvoiceModal";
import { Margin, usePDF } from "react-to-pdf";

const InvoiceModal: React.FC = () => {
  const isOpen = useInvoiceModal((state) => state.isOpen);
  const closeModal = useInvoiceModal((state) => state.closeModal);
  const trans = useInvoiceModal((state) => state.trans);
  const history = useInvoiceModal((state) => state.history);

  const { toPDF, targetRef } = usePDF({
    filename: "invoice.pdf",
    canvas: {
      mimeType: "image/png",
      qualityRatio: 1,
      logging: true,
    },
    page: {
      margin: Margin.MEDIUM,
    },
    overrides: {
      pdf: {
        compress: true,
      },
      canvas: {
        useCORS: true,
      },
    },
  });

  const handleDownloadPDF = () => {
    toPDF();
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => closeModal()}>
      <DialogContent className="max-w-5xl">
        <div className="flex justify-center" ref={targetRef}>
          <div>
            <div className="grid grid-cols-5 gap-52">
              {trans && <Header data={trans} type="Payment Voucher" />}
            </div>
            {trans && <TransactionTable data={trans} showAttachment={false} />}

            <div className="flex flex-row border-l-[1px] border-r-[1px] border-slate-400 h-18">
              {trans && <Calculations data={trans} />}
            </div>
            <div className="grid grid-cols-6">
              {trans?.result.length !== undefined && (
                <HistoryLog
                  preparedby={trans?.result[0]?.REQUSERNAME}
                  approvedby={trans?.result[0]?.APPROVEDUSERNAME}
                  receivedby={trans?.result[0].RECEIVEDBY}
                  image={trans?.result[0].PAIDSIGNDOC}
                />
              )}
              <div></div>
            </div>
            {history && <ApprovalHistory history={history} />}
          </div>
        </div>
        <DialogFooter>
          <div className="flex flex-row justify-end">
            <Button
              variant={"secondary"}
              size={"sm"}
              className="w-24"
              onClick={handleDownloadPDF}
            >
              Print
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InvoiceModal;
