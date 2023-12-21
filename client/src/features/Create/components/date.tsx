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
    <div className="flex flex-row gap-3">
      <FormField
        control={control}
        name="date"
        render={({ field }) => (
          <FormItem className="flex flex-row whitespace-nowrap items-center">
            <FormLabel htmlFor="date">Date :</FormLabel>
            <FormControl className="ml-2">
              <Input
                id="date"
                disabled
                type="text"
                className="col-span-2 text-[10px] disabled:text-black disabled:bg-white"
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
