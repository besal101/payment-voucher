import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

const Date = () => {
  const { control } = useFormContext();
  return (
    <div className="flex flex-row mt-2.5">
      <FormField
        control={control}
        name="date"
        render={({ field }) => (
          <FormItem className="flex flex-col whitespace-nowrap">
            <FormLabel htmlFor="date">Date :</FormLabel>
            <FormControl>
              <Input
                id="date"
                disabled
                type="text"
                className=" mt-1 text-[10px] disabled:text-black disabled:bg-white"
                value={field.value}
                tabIndex={1}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default Date;
