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
import { useGetPaymentTypeQuery } from "@/query/procedure/getProcedure";
import { useFormContext } from "react-hook-form";
import { PaymentType } from "@/types/types";

const PaymenttypeC = () => {
  const { control, setValue } = useFormContext();

  const { data: PaymentType } = useGetPaymentTypeQuery();

  const handlePaymentType = (selectedValue: PaymentType | undefined) => {
    setValue("payment_type_code", selectedValue?.PayTypeCode.toString() ?? "");
    setValue("payment_type_name", selectedValue?.PayTypeName ?? "");
  };

  return (
    <FormField
      control={control}
      name="payment_type_code"
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor="payment_type_code">Payment Type</FormLabel>
          <FormControl>
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                handlePaymentType(
                  PaymentType?.result.find(
                    (item) => item.PayTypeCode.toString() === value
                  )
                );
              }}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select Payment Type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {PaymentType?.result.map((item: PaymentType) => (
                  <SelectItem value={item.PayTypeCode} key={item.PayTypeCode}>
                    {item.PayTypeName}
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

export default PaymenttypeC;
