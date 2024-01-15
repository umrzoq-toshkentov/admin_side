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

  const page = searchParams.get("page");
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (debouncedSearch) {
      router.push(`${pathName}?page=${page}&search=${debouncedSearch}`);
    } else {
      router.push(`${pathName}?page=${page}`);
    }
  }, [debouncedSearch]);

  return (
    <div className="flex items-center py-4 w-full">
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
