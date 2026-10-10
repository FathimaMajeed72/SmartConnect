import { useCallback, useEffect, useState } from "react";

import { getTeachers } from "../services/teacher.service";

import type {
  GetTeachersParams,
  TeacherListItem,
} from "../types/teacher.types";

import { type UserStatus } from "@/features/admin/types/user-status";

interface UseTeachersReturn {
  teachers: TeacherListItem[];
  isLoading: boolean;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  setPage: (page: number) => void;
  search: string;
  statusFilter: UserStatus | "ALL";
  setSearch: (search: string) => void;
  setStatusFilter: (status: UserStatus | "ALL") => void;
  fetchTeachers: () => Promise<void>;
  error: string | null;
}

export function useTeachers(): UseTeachersReturn {
  const [teachers, setTeachers] = useState<TeacherListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<UserStatus | "ALL">("ALL");

  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [error, setError] = useState<string | null>(null);

  const fetchTeachers = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const params: GetTeachersParams = {
        page,
        limit,
      };

      if (search.trim()) {
        params.search = search.trim();
      }

      if (statusFilter !== "ALL") {
        params.status = statusFilter;
      }

      const result = await getTeachers(params);

      setTeachers(result.teachers);
      setTotal(result.total);
      setPage(result.page);
      setTotalPages(result.totalPages);
    } catch (error) {
      console.error("Failed to fetch teachers:", error);

      setError("Failed to load teachers.");
      setTeachers([]);
      setTotal(0);
      setTotalPages(0);
    } finally {
      setIsLoading(false);
    }
  }, [page, limit, search, statusFilter]);

  useEffect(() => {
    const loadTeachers = async () => {
      await fetchTeachers();
    };

    loadTeachers();
  }, [fetchTeachers]);

  return {
    teachers,
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
    fetchTeachers,
    error,
  };
}
