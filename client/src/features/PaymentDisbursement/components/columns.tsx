import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatNumberWithCommas, isWithinRange } from "@/lib/helpers";
import { VTDATA } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<VTDATA>[] = [
  {
    accessorKey: "REQNO",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-xs"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Req no
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </Button>
      );
    },
    filterFn: "includesString",
  },
  {
    accessorKey: "REQDATE",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.original.REQDATE);
      const options: Intl.DateTimeFormatOptions = {
        month: "short",
        day: "numeric",
        year: "numeric",
      };
      return date.toLocaleDateString("en-US", options);
    },
    filterFn: isWithinRange,
  },
  {
    accessorKey: "REQMODENAME",
    header: "Payment Mode",
  },
  {
    accessorKey: "REQAMOUNT",
    header: "Amount",
    cell: ({ row }) => {
      const vatPercentage = parseFloat(row.original.REQVATPERC);
      const REQAMOUNT = row.original.REQAMOUNT;
      const totalAmount = REQAMOUNT + (vatPercentage / 100) * REQAMOUNT;
      return formatNumberWithCommas(totalAmount);
    },
  },
  {
    accessorKey: "REQCURRCODE",
    header: "Currency",
  },

  {
    accessorKey: "actions",
    header: "Actions",
    cell: () => {
      return (
        <Button size={"xs"} variant={"secondary"} className="text-xs my-1">
          View
        </Button>
      );
    },
  },
  {
    accessorKey: "REQUSERNAME",
    header: "Requested By",
  },
  {
    accessorKey: "RESTATUS",
    header: "Status",
    cell: ({ row }) => {
      return (
        <Badge
          variant={"default"}
          className={`
         ${row.original.RESTATUS === "Pending" && "bg-green-500"}
          ${row.original.RESTATUS === "Progress" && "bg-orange-500"}
          ${row.original.RESTATUS === "Approved" && "bg-purple-500"}
          ${row.original.RESTATUS === "Rejected" && "bg-red-500"}
        `}
        >
          {row.original.RESTATUS}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  // {
  //   accessorKey: "REQBPCODE",
  //   header: "V no",
  // },
  // {
  //   accessorKey: "date",
  //   header: "Date",
  // },
  // {
  //   accessorKey: "amount",
  //   header: "Amount",
  // },
  // {
  //   accessorKey: "log",
  //   header: "Log",
  // },
  // {
  //   accessorKey: "action",
  //   header: "Action",
  // },
];
