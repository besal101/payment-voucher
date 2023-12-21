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
import { PAYMENT_MODE } from "@/lib/settings";
import { TPAYMENTMODE } from "@/types/types";
import { useFormContext } from "react-hook-form";

const PaymentModeC = () => {
  const { control, setValue } = useFormContext();

  const handlePaymentMode = (selectedValue: TPAYMENTMODE | undefined) => {
    setValue("payment_mode_code", selectedValue?.modeCode.toString() ?? "");
    setValue("payment_mode_name", selectedValue?.modeName ?? "");
  };
  return (
    <FormField
      control={control}
      name="payment_mode_code"
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor="payment_mode_code" className="mr-8">
            Payment Mode
          </FormLabel>
          <Select
            onValueChange={(value) => {
              field.onChange(value);
              handlePaymentMode(
                PAYMENT_MODE?.find((item) => item.modeCode.toString() === value)
              );
            }}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select Payment Mode" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {PAYMENT_MODE.map((item: TPAYMENTMODE) => (
                <SelectItem value={item.modeCode} key={item.modeCode}>
                  {item.modeName}
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

export default PaymentModeC;
