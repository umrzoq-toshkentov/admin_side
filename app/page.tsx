"use client";
import { useQuery } from "@tanstack/react-query";
import { getUserList } from "./api";
import { EditDrawer } from "./components/EditDrawer";
import { ListPagination } from "./components/ListPagination";
import { UserList } from "./components/UserList";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const page = searchParams.page;
  const search = searchParams.search;
  const { data, isLoading } = useQuery({
    queryKey: ["userList", { page, search }],
    queryFn: () => getUserList({ page, search }),
  });

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="w-full flex justify-center">
        <div className="w-11/12">
          <div color="rounded-e-2xl bg-midnight pt-4">
            {isLoading ? (
              <Skeleton />
            ) : (
              <>
                <UserList data={data} />
                <ListPagination pages={data?.pages} />
              </>
            )}

            <EditDrawer />
          </div>
        </div>
      </div>
    </main>
  );
}
