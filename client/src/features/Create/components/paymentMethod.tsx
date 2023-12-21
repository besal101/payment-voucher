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
import { useGetPaymentMethodQuery } from "@/query/procedure/getProcedure";
import { useFormContext } from "react-hook-form";
import { PaymentMethod } from "@/types/types";

const PaymentMethodC = () => {
  const { control, setValue } = useFormContext();
  const { data: PaymentMethod } = useGetPaymentMethodQuery();
  const handlePaymentMethod = (selectedValue: PaymentMethod | undefined) => {
    setValue(
      "payment_method_code",
      selectedValue?.PayMethodCode.toString() ?? ""
    );
    setValue("payment_method_name", selectedValue?.PayMethodName ?? "");
  };
  return (
    <FormField
      control={control}
      name="payment_method_code"
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor="payment_method_code">Payment Method</FormLabel>
          <FormControl>
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                handlePaymentMethod(
                  PaymentMethod?.result.find(
                    (item) => item.PayMethodCode.toString() === value
                  )
                );
              }}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select Payment Method" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {PaymentMethod?.result.map((item: PaymentMethod) => (
                  <SelectItem
                    value={item.PayMethodCode}
                    key={item.PayMethodCode}
                  >
                    {item.PayMethodName}
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

export default PaymentMethodC;
