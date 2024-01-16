"use client";
import { Response } from "../api";
import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, LucideTrash, PenLine } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserModel } from "../models/UserModel";
import { SearchInput } from "./SearchInput";
import { Toggle } from "@/components/ui/toggle";
import { useProxy } from "valtio/utils";
import { state } from "../store/user-store";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  LineElement
);

export const columns: ColumnDef<UserModel>[] = [
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Имя",
  },
  {
    accessorKey: "role",
    header: "Роль",
  },
  {
    accessorKey: "subscription.plan.type",
    header: "План",
  },
  {
    accessorKey: "subscription.tokens",
    header: "Токены",
    cell: ({ row }) => {
      return (
        <div className="uppercase">{row.original.subscription.tokens} TKN</div>
      );
    },
  },
  {
    id: "actions",
    header: "Действия",
    enableHiding: false,
    cell: ({ row }) => {
      const store = useProxy(state);
      return (
        <div className="flex">
          <Toggle
            onClick={() => {
              store.open = !store.open;
              store.user = row.original;
            }}
          >
            <PenLine size={12} fill="#1C64F2" />
          </Toggle>
          <Toggle>
            <LucideTrash size={12} fill="#1C64F2" />
          </Toggle>
        </div>
      );
    },
  },
];

interface UserListProps {
  data: Response;
}

export const UserList = ({ data: userList }: UserListProps) => {
  const data = userList.data;

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="w-full">
      <SearchInput />
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
    </div>
  );
};
