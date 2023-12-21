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
import { useFormContext } from "react-hook-form";

import { Cashier } from "@/types/types";
import { useGetFetchCashierQuery } from "@/query/procedure/getProcedure";

const CashierC = () => {
  const { control, setValue } = useFormContext();

  const { data: Cashier } = useGetFetchCashierQuery();

  const handleCashierChange = (selectedValue: Cashier | undefined) => {
    setValue("cashier_code", selectedValue?.EMP_ID.toString() ?? "");
    setValue("cashier_name", selectedValue?.EMP_FULLNAME ?? "");
  };

  return (
    <FormField
      control={control}
      name="cashier_code"
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor="cashier" className="">
            Cashier
          </FormLabel>
          <FormControl>
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                handleCashierChange(
                  Cashier?.result.find(
                    (item) => item.EMP_ID.toString() === value
                  )
                );
              }}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select Cashier" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {Cashier?.result.map((item) => (
                  <SelectItem value={item.EMP_ID.toString()} key={item.EMP_ID}>
                    {item.EMP_FULLNAME}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CashierC;
