import { useCallback, useEffect, useState } from "react";

import { getParents } from "@/features/admin/parent-management/services/parent.service";
import type {
  GetParentsParams,
  ParentListItem,
} from "../types/parent.types";

import { type UserStatus } from "@/features/admin/types/user-status";

interface UseParentsReturn {
  parents: ParentListItem[];
  isLoading: boolean;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  search: string;
  statusFilter: UserStatus | "ALL";
  setSearch: (search: string) => void;
  setStatusFilter: (status: UserStatus | "ALL") => void;
  fetchParents: () => Promise<void>;
}

export function useParents(): UseParentsReturn {
  const [parents, setParents] = useState<ParentListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<UserStatus | "ALL">("ALL");

  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchParents = useCallback(async () => {
    try {
      setIsLoading(true);

      const params: GetParentsParams = {
        page,
        limit,
      };

      if (search.trim()) {
        params.search = search.trim();
      }

      if (statusFilter !== "ALL") {
        params.status = statusFilter;
      }

      const result = await getParents(params);

      setParents(result.parents);
      setTotal(result.total);
      setPage(result.page);
      setTotalPages(result.totalPages);
    } catch (error) {
      console.error("Failed to fetch parents:", error);
    } finally {
      setIsLoading(false);
    }
  }, [page, limit, search, statusFilter]);

  useEffect(() => {
    const loadParents = async () => {
      await fetchParents();
    };

    loadParents();
  }, [fetchParents]);

  return {
    parents,
    isLoading,
    total,
    page,
    limit,
    totalPages,
    search,
    statusFilter,
    setSearch,
    setStatusFilter,
    fetchParents,
  };
}