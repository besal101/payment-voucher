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
import { useGetVatPercentQuery } from "@/query/procedure/getProcedure";
import { VAT } from "@/types/types";
import { useFormContext } from "react-hook-form";

const VatC = () => {
  const { control } = useFormContext();
  const { data: vat } = useGetVatPercentQuery();
  return (
    <FormField
      control={control}
      name="vat_percent"
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor="vat_percent" className="mr-8">
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
                <SelectItem value={item.Rate.toString()} key={item.Rate}>
                  {item.Rate}
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
