import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import useDropModal from "@/hooks/useDropModal";
import { mergeItemsAttachments } from "@/lib/helpers";
import http from "@/lib/http";
import { API_ENDPOINTS } from "@/lib/settings";
import { PaymentFormType } from "@/types/types";
import { useMutation } from "@tanstack/react-query";
import { useFormContext, useWatch } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import CashierC from "@/features/Create/components/cashier";
import Date from "@/features/Create/components/date";
import VendorC from "@/features/Create/components/vendor";
import LocationC from "@/features/Create/components/location";
import PurchaseOrderC from "@/features/Create/components/purchaseOrder";
import PaymentMethodC from "@/features/Create/components/paymentMethod";
import Apinvoice from "@/features/Create/components/ap_invoice";
import PaymenttypeC from "@/features/Create/components/payment_type";
import VatC from "@/features/Create/components/vat";
import PaymentModeC from "@/features/Create/components/payment_mode";
import PayTo from "@/features/Create/components/payTo";
import CurrencyC from "@/features/Create/components/currency";
import EmployeeC from "@/features/Create/components/employee";
import PayToOtherC from "@/features/Create/components/pay_to_other";
import TransactionTable from "./components/trans_table";
import { lazy } from "react";
import Remarks from "./components/remarks";
import Calculations from "./components/calculations";
const DropModal = lazy(() => import("@/components/ui/dropModal"));
import { useNavigate } from "react-router-dom";

const CreateVC = () => {
  const { handleSubmit, reset, control } = useFormContext<PaymentFormType>();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const payload = useDropModal((state) => state.payload);

  const openModal = useDropModal((state) => state.onOpen);

  const handleButtonClick = (modalKey: string) => {
    openModal(modalKey);
  };

  const payReceiver = useWatch({
    control,
    name: "pay_to",
    defaultValue: "employee",
  });

  const { mutate: createPaymentVoucher, isPending } = useMutation({
    mutationFn: async (data: PaymentFormType) => {
      const response = await http.post(
        API_ENDPOINTS.CREATEPAYMENTVOUCHER,
        data
      );
      return response.data;
    },
    onSuccess: () => {
      reset();
      navigate("/view-requested");
      toast({
        title: "Success !!",
        description:
          "You have successfully created a new payment request voucher",
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

  function onSubmit(data: PaymentFormType) {
    data.attachments = payload.attachments
      ? JSON.stringify(payload.attachments)
      : undefined;
    data.user_id = searchParams.get("uSrId") as string;
    data.status = "y";
    const updatedData = mergeItemsAttachments(data, payload);
    createPaymentVoucher(updatedData);
  }

  return (
    <div className="mt-0.5 mb-16 px-4">
      <Form {...useFormContext<PaymentFormType>()}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="flex flex-row justify-end">
            <Date />
          </div>
          <div className="grid grid-cols-6 gap-2">
            <div className="flex flex-col">
              <CashierC />
              <VendorC />
            </div>
            <div className="flex flex-col">
              <LocationC />
              <PurchaseOrderC />
            </div>
            <div className="flex flex-col">
              <PaymentMethodC />
              <Apinvoice />
            </div>
            <div className="flex flex-col">
              <PaymenttypeC />
              <VatC />
            </div>
            <div className="flex flex-col">
              <PaymentModeC />
              <PayTo />
            </div>
            <div className="flex flex-col">
              <CurrencyC />
              {payReceiver === "employee" ? <EmployeeC /> : <PayToOtherC />}
            </div>
          </div>
          <div
            style={{
              position: "relative",
              width: "100%",
              marginTop: "20px",
            }}
          >
            <div className="flex flex-col rounded-xl">
              <TransactionTable />
              <div className="flex flex-row justify-start mt-2 ">
                <Button
                  variant={"secondary"}
                  type="button"
                  onClick={() => handleButtonClick("attachments")}
                  size={"xs"}
                  className="text-[11px] relative"
                >
                  {payload?.attachments?.length > 0 && (
                    <div className="absolute w-4 h-4 rounded-full -top-1.5 -right-1 bg-green-500">
                      <span className="text-[8px]">
                        {payload?.attachments?.length}
                      </span>
                    </div>
                  )}
                  Attach Files
                </Button>
              </div>
              <div>
                <div className="grid grid-cols-4 gap-3 justify-between mt-4">
                  <div className="flex flex-col gap-2">
                    <Remarks />
                  </div>
                  <div></div>
                  <div></div>
                  <div>
                    <Calculations />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed bottom-5 left-20 right-7 h-14 shadow-lg bg-slate-300 rounded-sm">
            <div className="flex flex-row justify-end items-center">
              <div className="flex justify-between gap-3 mt-3 mr-4">
                <Button
                  className="shadow-md"
                  variant={"default"}
                  size={"sm"}
                  type="submit"
                  disabled={isPending}
                >
                  Submit
                </Button>
                <Button
                  className="shadow-md"
                  variant={"secondary"}
                  size={"sm"}
                  type="button"
                  disabled={isPending}
                  onClick={() => reset()}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
      <DropModal />
    </div>
  );
};

export default CreateVC;
