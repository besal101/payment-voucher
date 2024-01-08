import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";

const Remarks = () => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name="remarks"
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor="cashier" className="">
            Remarks
          </FormLabel>
          <FormControl>
            <Textarea
              id="remarks"
              {...field}
              className="h-14 w-[240px] text-[10px] px-1 py-1 border border-slate-400 font-light rounded-sm"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default Remarks;
