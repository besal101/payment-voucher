import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFieldArray, useFormContext } from "react-hook-form";
import Items from "./items";
import { PaymentFormType } from "@/types/types";

const TransactionTable = () => {
  const { control } = useFormContext<PaymentFormType>();

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "items",
  });

  const addNewField = () => {
    append({
      division_code: "",
      division_name: "",
      department_code: "",
      department_name: "",
      product_line_code: "",
      product_line_name: "",
      gl_code: "",
      gl_name: "",
      description: "",
      total: 0,
      attachments: [],
    });
  };

  const removeField = (index: number) => {
    remove(index);
  };

  return (
    <>
      <Table className="border-[1px] border-slate-300">
        <TableHeader className="bg-gray-300">
          <TableRow>
            <TableHead className="border-[1px] border-slate-300 text-gray-900 text-[11px] font-semibold">
              Division
            </TableHead>
            <TableHead className="border-[1px] border-slate-300 text-gray-900 text-[11px] font-semibold">
              Department
            </TableHead>
            <TableHead className="border-[1px] border-slate-300 text-gray-900 text-[11px] font-semibold">
              Product Line
            </TableHead>
            <TableHead className="border-[1px] border-slate-300 text-gray-900 text-[11px] font-semibold">
              Expense Type
            </TableHead>
            <TableHead className="border-[1px] border-slate-300 text-gray-900 text-[11px] font-semibold">
              Description
            </TableHead>
            <TableHead className="border-[1px] border-slate-300 text-gray-900 text-[11px] font-semibold">
              Amount
            </TableHead>
            <TableHead className="border-[1px] border-slate-300 text-gray-900 text-[11px] font-semibold">
              Attachment
            </TableHead>
            <TableHead className="border-[1px] border-slate-300 text-gray-900 text-[11px] font-semibold w-12">
              Action.
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fields.map((field, index) => (
            <Items
              key={field.id}
              name={"items"}
              index={index}
              fields={fields}
              removeField={removeField}
            />
          ))}
        </TableBody>
      </Table>
      <div className="flex flex-row justify-end mt-2">
        <Button
          type="button"
          onClick={addNewField}
          size={"xs"}
          className="text-[11px]"
        >
          Add new
        </Button>
      </div>
    </>
  );
};

export default TransactionTable;
