import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "./components/paginations";
import { DataTableToolbar } from "./components/toolbar";
import { isWithinRange } from "@/lib/helpers";
import { ViewRequestedT } from "@/types/types";
import { useNavigate, useSearchParams } from "react-router-dom";
import React from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function PDDataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([
    {
      id: "REQNO",
      desc: true,
    },
  ]);

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: isWithinRange,
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const uSrId = searchParams.get("uSrId") || "";

  const handleCell = (value: ViewRequestedT) => {
    navigate(
      `/view-cashier-voucher?uSrId=${uSrId}&created_by=${value.REQUSERID}&reqno=${value.REQNO}`
    );
  };

  return (
    <div className="space-y-2">
      <DataTableToolbar table={table} />
      <div className="rounded-md ">
        <Table className="border-[1px] border-slate-400 bg-white rounded-lg mt-2">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="px-2 py-3 h-8 text-[11px] font-semibold"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="border-[1px] border-slate-300 font-medium"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="text-xs font-light h-7">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="border-[1px] border-slate-300"
                      onClick={() => {
                        const column = cell.id.split("_");
                        if (column[1] === "actions") {
                          handleCell(cell.row.original as ViewRequestedT);
                        }
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>No rows</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
