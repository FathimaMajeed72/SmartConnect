import { useCallback, useEffect, useState } from "react";

import { getSubjects } from "../services/subject.service";

import type { SubjectStatus } from "../types/subject-status";

import type { SubjectListItem } from "../types/subject.types";

export function useSubjects() {
  const [subjects, setSubjects] = useState<SubjectListItem[]>([]);

  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<SubjectStatus | undefined>(undefined);

  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const fetchSubjects = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await getSubjects({
        page,
        limit,
        search: search.trim() || undefined,
        status,
      });

      setSubjects(response.subjects);
      setTotal(response.total);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Failed to fetch subjects:", error);

      setError("Failed to load subjects.");
      setSubjects([]);
      setTotal(0);
      setTotalPages(0);
    } finally {
      setIsLoading(false);
    }
  }, [page, limit, search, status]);

  useEffect(() => {
    const loadSubjects = async () => {
      await fetchSubjects();
    };

    void loadSubjects();
  }, [fetchSubjects]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleStatusChange = (value: SubjectStatus | undefined) => {
    setStatus(value);
    setPage(1);
  };

  return {
    subjects,
    page,
    setPage,
    limit,
    search,
    setSearch: handleSearchChange,
    status,
    setStatus: handleStatusChange,
    total,
    totalPages,
    isLoading,
    error,
    fetchSubjects,
  };
}
