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
import { PurchaseOrderResponse, PurchaseOrderT } from "@/types/types";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";

const PurchaseOrderC = () => {
  const { control } = useFormContext();

  const [purchaseOrder, setPurchaseOrder] = useState<PurchaseOrderResponse>({
    result: [],
  });

  const { mutate: getPurchaseOrder } = useMutation({
    mutationFn: async (vendorCode: string): Promise<PurchaseOrderResponse> => {
      const response = await http.post(API_ENDPOINTS.PURCHASEORDER, {
        vendorCode,
      });
      setPurchaseOrder(response.data);
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

  useEffect(() => {
    if (vendorCode !== "") {
      getPurchaseOrder(vendorCode);
    }
    return;
  }, [getPurchaseOrder, vendorCode]);

  return (
    <FormField
      control={control}
      name="purchase_order"
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor="purchase_order" className="mr-8">
            Purchase Order
          </FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select Purchase Order" />
              </SelectTrigger>
            </FormControl>
            {purchaseOrder?.result.length > 0 ? (
              <SelectContent>
                {purchaseOrder?.result.map((item: PurchaseOrderT) => (
                  <SelectItem value={item.PONO.toString()} key={item.PONO}>
                    {item.PONO}
                  </SelectItem>
                ))}
              </SelectContent>
            ) : (
              <SelectContent>
                <SelectItem value="0">No Purchase order</SelectItem>
              </SelectContent>
            )}
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PurchaseOrderC;
