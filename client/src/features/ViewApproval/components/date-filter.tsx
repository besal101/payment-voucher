import { Column } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CalendarDays } from "lucide-react";

interface DateRangeFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
}

export function DateRangeFilter<TData, TValue>({
  column,
  title = "Date",
}: DateRangeFilterProps<TData, TValue>) {
  const columnFilterValue = column?.getFilterValue();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 border-dashed text-xs"
        >
          <CalendarDays className="mr-1.5 h-3 w-3" />
          {title}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-light text-xs leading-none">
              Select date range
            </h4>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">From</Label>
              <Input
                type="date"
                className="col-span-2 h-7"
                value={(columnFilterValue as [string, string])?.[0] ?? ""}
                onChange={(e) => {
                  const val = e.target.value;
                  const formattedDate = format(new Date(val), "yyyy-MM-dd");
                  column?.setFilterValue((old: [string, string]) => [
                    formattedDate,
                    old?.[1],
                  ]);
                }}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">To</Label>
              <Input
                type="date"
                className="col-span-2 h-7"
                value={(columnFilterValue as [string, string])?.[1] ?? ""}
                onChange={(e) => {
                  const val = e.target.value;
                  const formattedDate = format(new Date(val), "yyyy-MM-dd");
                  column?.setFilterValue((old: [string, string]) => [
                    old?.[0],
                    formattedDate,
                  ]);
                }}
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
