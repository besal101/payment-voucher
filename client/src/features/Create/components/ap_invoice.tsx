import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import http from "@/lib/http";
import { API_ENDPOINTS } from "@/lib/settings";
import { ApInvoiceResponse, ApInvoiceT } from "@/types/types";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";

const Apinvoice = () => {
  const { control } = useFormContext();

  const [apInvoice, setAPInvoice] = useState<ApInvoiceResponse>({
    result: [],
  });

  const { mutate: getAPInvoice } = useMutation({
    mutationFn: async (vendorCode: string): Promise<ApInvoiceResponse> => {
      const response = await http.post(API_ENDPOINTS.APINVOICE, {
        vendorCode,
        purchaseOrder: purchaseOrder ? +purchaseOrder : 0,
      });
      setAPInvoice(response.data);
      return response.data;
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    },
  });

  const vendorCode = useWatch({
    control,
    name: "vendor_code",
    defaultValue: "",
  });

  const purchaseOrder = useWatch({
    control,
    name: "purchase_order",
    defaultValue: 0,
  });

  useEffect(() => {
    if (vendorCode !== "") {
      getAPInvoice(vendorCode);
    }
    return;
  }, [getAPInvoice, vendorCode, purchaseOrder]);

  return (
    <FormField
      control={control}
      name="ap_invoice"
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor="ap_invoice" className="mr-8">
            AP Invoice
          </FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select AP Invoice" />
              </SelectTrigger>
            </FormControl>
            {apInvoice?.result.length > 0 ? (
              <SelectContent>
                {apInvoice?.result.map((item: ApInvoiceT) => (
                  <SelectItem value={item.INVNO.toString()} key={item.INVNO}>
                    {item.INVNO}
                  </SelectItem>
                ))}
              </SelectContent>
            ) : (
              <SelectContent>
                <SelectItem value="null">No Ap Invoice</SelectItem>
              </SelectContent>
            )}
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default Apinvoice;
