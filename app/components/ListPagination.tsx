"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface ListPaginationProps {
  pages: number;
  page: number;
}

export const ListPagination = ({ pages }: ListPaginationProps) => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const page = searchParams.get("page");
  const currentPage = Number(page) || 1;

  const searchQuery = search ? `&search=${search}` : "";

  if (pages === 0) return null;

  return (
    <Pagination className="mt-6">
      <PaginationContent>
        <Link
          href={
            currentPage > 1 ? `/?page=${currentPage - 1}${searchQuery}` : "#"
          }
        >
          <PaginationItem>
            <ArrowLeft />
          </PaginationItem>
        </Link>

        {pages > 0 &&
          Array(pages)
            .fill(0)
            .map((_, i) => (
              <Link key={i} href={`/?page=${i + 1}${searchQuery}`}>
                <PaginationItem>
                  <PaginationLink isActive={currentPage === i + 1} href="#">
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              </Link>
            ))}

        <Link
          href={
            currentPage === pages
              ? "#"
              : `/?page=${currentPage + 1}${searchQuery}`
          }
        >
          <PaginationItem>
            <ArrowRight />
          </PaginationItem>
        </Link>
      </PaginationContent>
    </Pagination>
  );
};
