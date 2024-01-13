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

const PayTo = () => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name="pay_to"
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor="pay_to" className="mr-8">
            Disburse To
          </FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select Payment Receiver" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="employee">Employee</SelectItem>
              <SelectItem value="others">Others</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PayTo;
