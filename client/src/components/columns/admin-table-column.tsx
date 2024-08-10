import { IRestaurant } from "@/types/restaurant.type";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { Checkbox } from "../ui/checkbox";
import { DataTableColumnHeader } from "./column-header";
export const adminTableColumn: ColumnDef<IRestaurant>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader
        sortOption={true}
        column={column}
        title="Restaurant "
      />
    ),
  },
  {
    accessorKey: "images",
    header: ({ column }) => (
      <DataTableColumnHeader
        sortOption={false}
        column={column}
        title="Image "
      />
    ),
    cell: ({ row }) => (
      <div>
        <img
          src={(row.getValue("images") as Array<string>)[1]}
          className="size-10 rounded-sm"
          alt=""
        />
      </div>
    ),
  },
  {
    accessorKey: "location",
    header: ({ column }) => (
      <DataTableColumnHeader
        sortOption={true}
        column={column}
        title="Location "
      />
    ),
  },
  {
    accessorKey: "contactNum",
    header: ({ column }) => (
      <DataTableColumnHeader
        sortOption={true}
        column={column}
        title="Contact number "
      />
    ),
  },
  {
    accessorKey: "pincode",
    header: ({ column }) => (
      <DataTableColumnHeader
        sortOption={true}
        column={column}
        title="Pin code "
      />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;
      payment;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText("payment?.pincode")}
            >
              Copy Pincode
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View more details</DropdownMenuItem>
            <DropdownMenuItem>Edit restaurant</DropdownMenuItem>
            <DropdownMenuItem>Delete restaurant</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
