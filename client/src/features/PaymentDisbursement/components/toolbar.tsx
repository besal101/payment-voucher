import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { statuses } from "@/lib/variables";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DateRangeFilter } from "./date-filter";
import { DataTableViewOptions } from "./filterview";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search by Reqno..."
          value={(table.getColumn("REQNO")?.getFilterValue() as string) ?? ""}
          onChange={(event) => {
            table.setColumnFilters([
              { id: "REQNO", value: event.target.value },
            ]);
          }}
          className="h-8 w-[150px] lg:w-[250px]"
        />

        {table.getColumn("RESTATUS") && (
          <DataTableFacetedFilter
            column={table.getColumn("RESTATUS")}
            title="Status"
            options={statuses}
          />
        )}

        {table.getColumn("REQDATE") && (
          <DateRangeFilter column={table.getColumn("REQDATE")} title="Date" />
        )}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-2 px-2 lg:px-3 text-xs font-poppins"
          >
            Reset
            <Cross2Icon className="ml-1.5 h-3 w-3" />
          </Button>
        )}
      </div>
      <div className="flex flex-row gap-3">
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
