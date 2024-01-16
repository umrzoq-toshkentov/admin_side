"use client";
import { Input } from "@/components/ui/input";
import { useQueryState } from "nuqs";
import { useDebounce } from "../hooks/useDebounce";
import { useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export const SearchInput = () => {
  const router = useRouter();
  const pathName = usePathname();
  const [search, setSearch] = useQueryState("search");
  const searchParams = useSearchParams();

  const page = searchParams.get("page") || "1";
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (debouncedSearch) {
      router.push(`${pathName}?page=${page}&search=${debouncedSearch}`);
    } else {
      router.push(`${pathName}?page=${page}`);
    }
  }, [debouncedSearch, page, pathName, router]);

  return (
    <div className="flex flex-col items-start gap-1 py-4 w-full mb-4">
      <p>Пользователи</p>
      <Input
        placeholder="Поиск"
        value={search || ""}
        onChange={(event) => {
          const value = event.target.value;
          setSearch(value);
        }}
        className="w-full"
      />
    </div>
  );
};
