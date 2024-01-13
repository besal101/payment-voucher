import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TableCell, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useDropModal from "@/hooks/useDropModal";
import {
  useGetCostCenterDepartmentQuery,
  useGetCostCenterDivisionQuery,
  useGetGLCodeQuery,
  useGetProductLineQuery,
} from "@/query/procedure/getProcedure";
import {
  CostCenterDepartment,
  CostCenterDivision,
  GLCODE,
  ProductLine,
  ItemType,
  NameType,
} from "@/types/types";
import { FilePlus2, Trash2 } from "lucide-react";
import { useFormContext } from "react-hook-form";

type SingleItemProps = {
  name: NameType;
  index: number;
  fields: ItemType[];
  removeField: (index: number) => void;
};

const SingleItem = ({ name, index, fields, removeField }: SingleItemProps) => {
  const { control, setValue } = useFormContext();

  const { data: CostCenterDivision } = useGetCostCenterDivisionQuery();
  const { data: CostCenterDepartment } = useGetCostCenterDepartmentQuery();
  const { data: ProductLine } = useGetProductLineQuery();
  const { data: GLCode } = useGetGLCodeQuery();

  const openModal = useDropModal((state) => state.onOpen);
  const payload = useDropModal((state) => state.payload);

  const getArrayLength = (key: string): number | null => {
    if (payload[key]) {
      return payload[key].length;
    }
    return 0;
  };
  return (
    <>
      <TableRow>
        <TableCell className="border-[1.3px] border-slate-300">
          <FormField
            control={control}
            name={`${name}[${index}].division_code`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={(value) => {
                      const selectedName = CostCenterDivision?.result?.find(
                        (item) => item.PrcCode.toString() === value
                      );
                      field.onChange(value);
                      setValue(
                        `${name}[${index}].division_name`,
                        selectedName?.PrcName
                      );
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Division" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {CostCenterDivision?.result.map(
                        (item: CostCenterDivision, index: number) => (
                          <SelectItem value={item.PrcCode} key={index}>
                            {item.PrcName}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </TableCell>
        <TableCell className="border-[1.3px] border-slate-300">
          <FormField
            control={control}
            name={`${name}[${index}].department_code`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={(value) => {
                      const selectedName = CostCenterDepartment?.result?.find(
                        (item) => item.DeptCode.toString() === value
                      );
                      field.onChange(value);
                      setValue(
                        `${name}[${index}].department_name`,
                        selectedName?.DeptName
                      );
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Department" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {CostCenterDepartment?.result.map(
                        (item: CostCenterDepartment, index: number) => (
                          <SelectItem value={item.DeptCode} key={index}>
                            {item.DeptName}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </TableCell>
        <TableCell className="border-[1.3px] border-slate-300 pl-2 pr-2">
          <FormField
            control={control}
            name={`${name}[${index}].product_line_code`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={(value) => {
                      const selectedName = ProductLine?.result?.find(
                        (item) => item.ProdLineCode.toString() === value
                      );
                      field.onChange(value);
                      setValue(
                        `${name}[${index}].product_line_name`,
                        selectedName?.ProdLineName
                      );
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Product Line" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ProductLine?.result.map(
                        (item: ProductLine, index: number) => (
                          <SelectItem value={item.ProdLineCode} key={index}>
                            {item.ProdLineName}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </TableCell>
        <TableCell className="border-[1.3px] border-slate-300 pl-2 pr-2">
          <FormField
            control={control}
            name={`${name}[${index}].gl_code`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      const selectedGLName = GLCode?.result.find(
                        (item) => item.ACCODE === value
                      )?.ACCNAME;
                      setValue(
                        `${name}[${index}].gl_name`,
                        selectedGLName || ""
                      );
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select GL Code" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {GLCode?.result.map((item: GLCODE, index: number) => (
                        <SelectItem value={item.ACCODE} key={index}>
                          {item.ACCNAME}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </TableCell>
        <TableCell className="border-[1.3px] border-slate-300">
          <FormField
            control={control}
            name={`${name}[${index}].description`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    id={`${name}[${index}].description`}
                    {...field}
                    className="text-[10px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </TableCell>
        <TableCell className="border-[1.3px] border-slate-300 max-w-[100px]">
          <FormField
            control={control}
            name={`${name}[${index}].total`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="number"
                    id={`${name}[${index}].total`}
                    {...field}
                    className="text-center"
                    onChange={(e) => {
                      const intValue = parseInt(e.target.value, 10);
                      field.onChange(intValue);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </TableCell>
        <TableCell className="border-[1.3px] border-slate-300 w-24">
          <div className="flex flex-row gap-2 justify-center items-center flex-1">
            <Tooltip>
              <TooltipTrigger type="button" className="relative">
                <FilePlus2
                  size={17}
                  color="blue"
                  onClick={() => openModal(`${name}[${index}]`)}
                  className="cursor-pointer"
                />
                {getArrayLength(`${name}[${index}]`) !== 0 && (
                  <div className="h-3 w-3 absolute bg-red-500 top-0 rounded-full right-0">
                    <span className="text-[9px] text-white absolute -top-[3px] right-[3px]">
                      {getArrayLength(`${name}[${index}]`)}
                    </span>
                  </div>
                )}
              </TooltipTrigger>
              <TooltipContent>
                {getArrayLength(`${name}[${index}]`) !== 0 ? (
                  <p>{getArrayLength(`${name}[${index}]`)} files attached</p>
                ) : (
                  <p>Click to attach the file</p>
                )}
              </TooltipContent>
            </Tooltip>
          </div>
        </TableCell>
        <TableCell className="border-[1.3px] border-slate-300 w-12">
          {fields.length > 1 && (
            <Tooltip>
              <TooltipTrigger type="button">
                <Trash2
                  color="red"
                  size={20}
                  onClick={() => removeField(index)}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Remove item</p>
              </TooltipContent>
            </Tooltip>
          )}
        </TableCell>
      </TableRow>
    </>
  );
};

export default SingleItem;
