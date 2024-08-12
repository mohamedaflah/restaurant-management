"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
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
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import React, { useEffect } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
  MixerHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useSearchParams } from "react-router-dom";
import { X } from "lucide-react";
import { AddRestaurantModal } from "./addrestaurent-modal";
import { useAppSelector } from "@/redux/store";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  });
  // row selection
  useEffect(() => console.log(rowSelection), [rowSelection]);

  // row selection
  const { filters } = useAppSelector((state) => state.retaurant);
  const [searchParam, setSearchParam] = useSearchParams();
  const hasFilters = Array.from(searchParam.entries()).some(
    ([key, value]) =>
      ["sort", "location", "cuisine", "pincode", "search"].includes(key) &&
      value.trim() !== ""
  );
  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Search restaurants..."
          className="max-w-sm h-9"
          value={
            searchParam.get("search") &&
            typeof searchParam.get("search") == "string"
              ? (searchParam.get("search") as string)
              : ""
          }
          onChange={(e) => {
            const param = new URLSearchParams(window.location.search);
            param.set("search", e.target.value);
            setSearchParam(param);
          }}
        />
        {hasFilters && (
          <>
            <Button
              variant={"ghost"}
              className="h-9 ml-2 gap-2"
              onClick={() => {
                const params = new URLSearchParams(location.search);
                if (params.has("search")) {
                  params.set("search", "");
                }
                if (params.has("location")) {
                  params.set("location", "");
                }
                if (params.has("pincode")) {
                  params.set("pincode", "");
                }
                setSearchParam(params);
              }}
            >
              Clear filters <X className="w-4" />
            </Button>
          </>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="ml-auto hidden h-8 lg:flex"
            >
              <MixerHorizontalIcon className="mr-2 h-4 w-4" />
              View
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[150px]">
            <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {table
              .getAllColumns()
              .filter(
                (column) =>
                  typeof column.accessorFn !== "undefined" &&
                  column.getCanHide()
              )
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        <AddRestaurantModal />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between px-2 mt-3">
        <div className="flex-1 text-sm text-muted-foreground">
          {Object.entries(rowSelection).length} row(s) selected.
        </div>
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <Select
              value={`${
                searchParam.get("pageSize") ? searchParam.get("pageSize") : 10
              }`}
              onValueChange={(value) => {
                const param = new URLSearchParams(window.location.search);
                param.set("pageSize", value);
                setSearchParam(param);
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={searchParam.get("pageSize")} />
              </SelectTrigger>
              <SelectContent side="top">
                {[7, 10, 20, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {filters.currentPage} of {filters?.totalPages}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              disabled={Number(filters?.currentPage) <= 1}
              onClick={() => {
                const params = new URLSearchParams(window.location.search);
                params.set("page", String(1));
                setSearchParam(params);
              }}
            >
              <span className="sr-only">Go to first page</span>
              <DoubleArrowLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              disabled={Number(filters?.currentPage) <= 1}
              onClick={() => {
                const params = new URLSearchParams(window.location.search);
                params.set("page", String(Number(filters?.currentPage) - 1));
                setSearchParam(params);
              }}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => {
                const params = new URLSearchParams(window.location.search);
                params.set("page", String(Number(filters?.currentPage) + 1));
                setSearchParam(params);
              }}
              disabled={
                Number(filters?.currentPage) >= Number(filters.totalPages)
              }
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => {
                const params = new URLSearchParams(window.location.search);
                params.set("page", String(filters?.totalPages));
                setSearchParam(params);
              }}
              disabled={
                Number(filters?.currentPage) >= Number(filters.totalPages)
              }
            >
              <span className="sr-only">Go to last page</span>
              <DoubleArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
