import { getUserList } from "./api";
import { ListPagination } from "./components/ListPagination";
import { UserList } from "./components/UserList";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const page = searchParams.page;
  const search = searchParams.search;
  const data = await getUserList({ page, search });

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="w-full flex justify-center">
        <div className="w-11/12">
          <div color="rounded-e-2xl bg-midnight pt-4">
            <UserList data={data} />

            <ListPagination pages={data.pages} page={Number(page)} />
          </div>
        </div>
      </div>
    </main>
  );
}
