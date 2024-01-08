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
import { useGetVatCodeQuery } from "@/query/procedure/getProcedure";
import { VAT, VATRATERESPONSE } from "@/types/types";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";

const VatC = () => {
  const { control, setValue } = useFormContext();
  const { data: vat } = useGetVatCodeQuery();

  const { mutate: getVatPercent } = useMutation({
    mutationFn: async (vatCode: string): Promise<VATRATERESPONSE> => {
      const { data } = await http.post(API_ENDPOINTS.GETVATPERCENT, {
        vatCode,
      });
      setValue("vat_percent", data?.result[0].Rate);
      return data?.result[0].Rate;
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          "There was a problem getting VAT PERCENTAGE. Please contact IT.",
      });
    },
  });

  const vatCode = useWatch({
    control,
    name: "vat_code",
    defaultValue: "",
  });

  useEffect(() => {
    if (vatCode !== "") {
      getVatPercent(vatCode);
    }
    return;
  }, [getVatPercent, vatCode]);

  return (
    <FormField
      control={control}
      name="vat_code"
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor="vat_code" className="mr-8">
            VAT (%)
          </FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value.toString()}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select Vat Percent" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {vat?.result.map((item: VAT) => (
                <SelectItem value={item.Code.toString()} key={item.Code}>
                  {item.Name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default VatC;
