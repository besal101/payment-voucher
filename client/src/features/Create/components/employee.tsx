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
import { useGetFetchEmployeeQuery } from "@/query/procedure/getProcedure";
import { useFormContext } from "react-hook-form";

const EmployeeC = () => {
  const { control } = useFormContext();
  const { data: Employee } = useGetFetchEmployeeQuery();

  return (
    <FormField
      control={control}
      name="employee_code"
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor="employee_code" className="mr-8">
            Employee
          </FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select Employee name" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {Employee?.result?.map((item, index: number) => (
                <SelectItem value={item.EMP_ID.toString()} key={index}>
                  {item.EMP_FULLNAME}
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

export default EmployeeC;
