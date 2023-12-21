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
import { useGetLocationQuery } from "@/query/procedure/getProcedure";
import { Location } from "@/types/types";
import { useFormContext } from "react-hook-form";

const LocationC = () => {
  const { control, setValue } = useFormContext();

  const { data: Location } = useGetLocationQuery();

  const handleLocationChange = (selectedValue: Location | undefined) => {
    setValue("location_code", selectedValue?.PrcCode.toString() ?? "");
    setValue("location_name", selectedValue?.PrcName ?? "");
  };

  return (
    <FormField
      control={control}
      name="location_code"
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor="location_code">Location</FormLabel>
          <FormControl tabIndex={2}>
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                handleLocationChange(
                  Location?.result.find(
                    (item) => item.PrcCode.toString() === value
                  )
                );
              }}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select Location" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {Location?.result.map((item: Location) => (
                  <SelectItem value={item.PrcCode} key={item.PrcCode}>
                    {item.PrcName}
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

export default LocationC;
