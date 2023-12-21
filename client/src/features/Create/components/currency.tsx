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
import { useGetCurrencyQuery } from "@/query/procedure/getProcedure";
import { useFormContext } from "react-hook-form";

const CurrencyC = () => {
  const { control } = useFormContext();
  const { data: Currency } = useGetCurrencyQuery();
  return (
    <FormField
      control={control}
      name="currency"
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor="currency" className="mr-8">
            Currency
          </FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select Payment Type" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {Currency?.result?.map((item) => (
                <SelectItem value={item.CurrCode} key={item.CurrCode}>
                  {item.CurrName}
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

export default CurrencyC;
