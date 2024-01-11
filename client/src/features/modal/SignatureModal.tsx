import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import useSignatureModal from "@/hooks/useSignatureModal";
import { API_ENDPOINTS } from "@/lib/settings";
import { useState } from "react";
import ReactSignatureCanvas from "react-signature-canvas";
import SignatureCanvas from "react-signature-canvas";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import http from "@/lib/http";
import { useToast } from "@/components/ui/use-toast";
import { QUERYKEYS } from "@/query/constants";

type cashierData = {
  REQNUM: string;
  PAIDSTATUS: string;
  PAIDUSERID: string;
  PAIDUSERNAME: string;
  REQSTATUS: string;
  PAIDREMARKS: string | undefined;
  PAIDSIGNDOC: string;
  RECEIVEDBY: string;
  RECEIVERPHONE: string | undefined;
  RECEIVERDESIG: string | undefined;
};

const SignatureModal = () => {
  const isOpen = useSignatureModal((state) => state.isOpen);
  const closeModal = useSignatureModal((state) => state.closeModal);
  const cashier = useSignatureModal((state) => state.cashier);
  const [searchParams] = useSearchParams();
  const reqno = searchParams.get("reqno") || "";
  const created_by = searchParams.get("created_by") || "";

  const [sign, setSign] = useState<ReactSignatureCanvas | null>();

  const handleReset = () => {
    sign?.clear();
  };

  const { toast } = useToast();

  const queryClient = useQueryClient();

  const { mutate: updateCashierVoucher } = useMutation({
    mutationFn: async (data: cashierData) => {
      const response = await http.post(API_ENDPOINTS.CASHIERVOUCHERPAID, data);
      return response.data;
    },
    onSuccess: () => {
      toast({
        title: "Success !!",
        description:
          "You have successfully created a new payment request voucher",
      });
      queryClient.invalidateQueries({
        queryKey: [QUERYKEYS.GETSINGLEVOUCHERS, created_by, reqno],
      });
      closeModal();
      form.reset();
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    },
  });

  const handleGenerate = async () => {
    const base64Data = sign?.getTrimmedCanvas().toDataURL("image/png");
    if (base64Data) {
      const blobData = await (await fetch(base64Data)).blob();
      const formData = new FormData();
      formData.append("files", blobData, "signature.png");
      try {
        const response = await fetch(
          import.meta.env.VITE_PUBLIC_API_URL + API_ENDPOINTS.UPLOADIMAGE,
          {
            method: "POST",
            body: formData,
          }
        );
        if (response.ok) {
          const data = await response.json();
          return data.filenames[0];
        } else {
          console.error("Failed to upload signature. Status:", response.status);
        }
      } catch (error) {
        console.error("Error uploading signature:", error);
      }
    }
  };

  const formSchema = z.object({
    receiver_name: z.string().min(2).max(50),
    receiver_phone: z
      .string()
      .refine((val) => !Number.isNaN(parseInt(val, 10)), {
        message: "Expected number, received a string",
      })
      .optional(),
    receiver_designation: z.string().optional(),
    remarks: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      receiver_name: "",
      receiver_phone: "",
      receiver_designation: "",
      remarks: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await handleGenerate();

    const data = {
      REQNUM: reqno,
      PAIDSTATUS: "P",
      PAIDUSERID: cashier.CashierUserID,
      PAIDUSERNAME: cashier.CashierUsername,
      REQSTATUS: "Paid",
      PAIDREMARKS: values.remarks,
      PAIDSIGNDOC: response,
      RECEIVEDBY: values.receiver_name,
      RECEIVERPHONE: values.receiver_phone,
      RECEIVERDESIG: values.receiver_designation,
    };

    updateCashierVoucher(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => closeModal()}>
      <DialogContent className="max-w-xl">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-2"
          >
            <div className="grid grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="receiver_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Receiver name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="receiver_phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Receiver phone</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="receiver_designation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Receiver Designation</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="remarks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Remarks</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col">
              <div>
                <span className="text-sm font-medium">Signature</span>
              </div>
              <SignatureCanvas
                penColor="black"
                canvasProps={{
                  width: 500,
                  height: 200,
                  className: "sigCanvas",
                  style: {
                    border: "1px solid #ddd",
                    marginTop: "5px",
                  },
                }}
                ref={(data) => setSign(data)}
              />
            </div>
            <div className="flex flex-row justify-end gap-2">
              <Button
                variant={"secondary"}
                // onClick={handleGenerate}
                size={"xs"}
                className="h-8"
                type="submit"
              >
                Save
              </Button>
              <Button
                variant={"default"}
                onClick={() => {
                  handleReset();
                  form.reset();
                }}
                size={"xs"}
                className="h-8"
                type="button"
              >
                Reset
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SignatureModal;
