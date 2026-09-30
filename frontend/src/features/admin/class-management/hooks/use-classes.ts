import { useCallback, useEffect, useState } from "react";

import { getClasses } from "../services/class.service";

import type {
  ClassListItem,
  GetClassesParams,
} from "../types/class.types";

import { type ClassStatus } from "../types/class-status";

interface UseClassesReturn {
  classes: ClassListItem[];
  isLoading: boolean;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  setPage: (page: number) => void;
  search: string;
  statusFilter: ClassStatus | "ALL";
  setSearch: (search: string) => void;
  setStatusFilter: (status: ClassStatus | "ALL") => void;
  fetchClasses: () => Promise<void>;
}

export function useClasses(): UseClassesReturn {
  const [classes, setClasses] = useState<ClassListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<ClassStatus | "ALL">("ALL");

  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchClasses = useCallback(async () => {
    try {
      setIsLoading(true);

      const params: GetClassesParams = {
        page,
        limit,
      };

      if (search.trim()) {
        params.search = search.trim();
      }

      if (statusFilter !== "ALL") {
        params.status = statusFilter;
      }

      const result = await getClasses(params);

      setClasses(result.classes);
      setTotal(result.total);
      setPage(result.page);
      setTotalPages(result.totalPages);
    } catch (error) {
      console.error("Failed to fetch classes:", error);
    } finally {
      setIsLoading(false);
    }
  }, [page, limit, search, statusFilter]);

  useEffect(() => {
    const loadClasses = async () => {
      await fetchClasses();
    };

    loadClasses();
  }, [fetchClasses]);

  return {
    classes,
    isLoading,
    total,
    page,
    limit,
    totalPages,
    setPage,
    search,
    statusFilter,
    setSearch,
    setStatusFilter,
    fetchClasses,
  };
}