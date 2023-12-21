import { useFormContext } from "react-hook-form";
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
import { useGetVendorListQuery } from "@/query/procedure/getProcedure";
import { VENDORLIST } from "@/types/types";

const VendorC = () => {
  const { control } = useFormContext();
  const { data: VendorList } = useGetVendorListQuery();
  return (
    <FormField
      control={control}
      name="vendor_code"
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor="vendor_code" className="mr-8">
            Vendor Code
          </FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select Vendor" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {VendorList?.result.map((item: VENDORLIST) => (
                  <SelectItem value={item.CardCode} key={item.CardCode}>
                    {item.VENDOR}
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

export default VendorC;
