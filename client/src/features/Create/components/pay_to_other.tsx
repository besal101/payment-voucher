import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

const PayToOtherC = () => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name="pay_to_others"
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor="pay_to_others" className="mr-8">
            Received by
          </FormLabel>
          <FormControl>
            <Input id="pay_to_others" className="col-span-2" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PayToOtherC;
