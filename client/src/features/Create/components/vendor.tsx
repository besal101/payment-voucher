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
  const { control, setValue } = useFormContext();
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
            <Select
              onValueChange={(value) => {
                const Vendorname = VendorList?.result?.find(
                  (item) => item.CardCode.toString() === value
                );
                field.onChange(value);
                setValue("vendor_name", Vendorname?.VENDOR);
              }}
            >
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
