"use client";
import dayjs from "dayjs";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useProxy } from "valtio/utils";
import { state } from "../store/user-store";
import { useQuery } from "@tanstack/react-query";
import { getUserTransaction } from "../api";
import { Line } from "react-chartjs-2";
import { Skeleton } from "@/components/ui/skeleton";
import { OperationHistory } from "./OperationHistory";

export const EditDrawer = () => {
  const store = useProxy(state);
  const user = state.user;
  const { data: list, isLoading } = useQuery({
    queryKey: ["user", user?.id],
    queryFn: () => getUserTransaction(user?.id),
    enabled: !!user?.id,
  });

  return (
    <Sheet
      onOpenChange={() => {
        store.open = !store.open;
      }}
      open={store.open}
    >
      <SheetContent className="w-[500px] min-w-[500px]">
        <SheetHeader>
          <SheetTitle>{user?.email}</SheetTitle>
        </SheetHeader>
        <p className="text-lg text-white mb-4 mt-4">Использование токенов</p>
        {isLoading ? (
          <Skeleton />
        ) : (
          <div className="bg-white w-full relative">
            <Line
              datasetIdKey="id"
              data={{
                labels: list?.map((item) =>
                  dayjs(item.created_at).format("DD/MM/YYYY")
                ),
                datasets: [
                  {
                    label: "",
                    data: list?.map((item) => item.amount),

                    borderColor: "#1C64F2",
                    borderDashOffset: 0.5,
                  },
                ],
              }}
            />
          </div>
        )}

        <p className="text-lg text-white mb-4 mt-4">История операций</p>
        <OperationHistory data={list} />
      </SheetContent>
    </Sheet>
  );
};
