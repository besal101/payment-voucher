import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useFormContext } from "react-hook-form";
import { useGetFetchEmployeeQuery } from "@/query/procedure/getProcedure";
import { Label } from "@/components/ui/label";

const EmployeeC = () => {
  const { data: Employee } = useGetFetchEmployeeQuery();
  const { setValue } = useFormContext();
  const [open, setOpen] = React.useState(false);
  const [selectedEmployee, setSelectedEmployee] = React.useState({
    id: 0,
    name: "",
  });
  const [searchInput, setSearchInput] = React.useState("");

  const filteredEmployee = React.useMemo(() => {
    if (!searchInput) {
      return Employee?.result || [];
    }
    return (
      Employee?.result?.filter((emp) =>
        emp.EMP_FULLNAME.toLowerCase().includes(searchInput.toLowerCase())
      ) || []
    );
  }, [Employee, searchInput]);

  const setValueAndClosePopover = (emp: { id: number; name: string }) => {
    setValue("employee_code", emp.id);
    setValue("employee_name", emp.name);
    setSelectedEmployee(emp);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Label htmlFor="employee_code" className="mt-2">
        Employee
      </Label>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="h-6 mt-0.5 justify-between rounded-sm text-[10px] font-normal"
        >
          {selectedEmployee.name ? selectedEmployee.name : "Select employee"}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search employee..." className="h-6" />
          <CommandEmpty className="text-[10px] font-normal py-2 px-2">
            No Employee found.
          </CommandEmpty>
          <CommandGroup className="">
            {filteredEmployee.map((emp, index: number) => (
              <CommandItem
                key={emp.EMP_ID + index}
                value={emp.EMP_FULLNAME}
                onSelect={() => {
                  setValueAndClosePopover({
                    id: emp.EMP_ID,
                    name: emp.EMP_FULLNAME,
                  });
                  setSearchInput(emp.EMP_FULLNAME);
                }}
                className="text-[10px] font-normalpx-2"
              >
                {emp.EMP_FULLNAME}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    selectedEmployee.id === emp.EMP_ID
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default EmployeeC;
