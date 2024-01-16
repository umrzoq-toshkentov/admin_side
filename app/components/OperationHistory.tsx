"use client";

import { TransactionModel } from "../models/TransactionModel";
import dayjs from "dayjs";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
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

export const columns: ColumnDef<TransactionModel>[] = [
  {
    accessorKey: "type",
    header: "Тип",
  },
  {
    accessorKey: "amount",
    header: "Сумма",
  },
  {
    accessorKey: "created_at",
    header: "Дата",
    cell: ({ row }) => {
      return (
        <div className="uppercase">
          {dayjs(row.original.created_at).format("DD.MM.YYYY hh:mm:ss")}
        </div>
      );
    },
  },
];

interface OperationHistory {
  data?: TransactionModel[];
}

export const OperationHistory = ({ data }: OperationHistory) => {
  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  if (!data) return null;

  return (
    <div className="rounded-md border">
      <Table className="rounded-md border-border w-full h-10 overflow-clip relative">
        <TableHeader className="sticky w-full top-0 h-10 border-b-2 border-border rounded-t-md  bg-stone-700">
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
        <TableBody className="overflow-scroll mt-10">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
