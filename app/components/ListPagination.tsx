"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useSearchParams } from "next/navigation";

interface ListPaginationProps {
  pages?: number;
}

export const ListPagination = ({ pages }: ListPaginationProps) => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const page = searchParams.get("page");
  const currentPage = Number(page) || 1;

  const searchQuery = search ? `&search=${search}` : "";

  if (pages === 0) return null;

  return (
    <Pagination className="mt-6 mb-6">
      <PaginationContent>
        <PaginationLink
          href={
            currentPage > 1 ? `/?page=${currentPage - 1}${searchQuery}` : "#"
          }
        >
          <PaginationItem>
            <ArrowLeft />
          </PaginationItem>
        </PaginationLink>

        {pages &&
          pages > 0 &&
          Array(pages)
            .fill(0)
            .map((_, i) => (
              <PaginationLink
                key={i}
                isActive={currentPage === i + 1}
                href={`/?page=${i + 1}${searchQuery}`}
              >
                {i + 1}
              </PaginationLink>
            ))}

        <PaginationLink
          href={
            currentPage === pages
              ? "#"
              : `/?page=${currentPage + 1}${searchQuery}`
          }
        >
          <PaginationItem>
            <ArrowRight />
          </PaginationItem>
        </PaginationLink>
      </PaginationContent>
    </Pagination>
  );
};
