import { getUserList } from "./api";
import { UserList } from "./components/UserList";

export default async function Home() {
  const data = await getUserList({ page: "1", search: "" });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <UserList data={data} />
    </main>
  );
}
