import { useQuery } from "@tanstack/react-query";

import { getAcademicYears } from "../services/academic-year.service";

export function useAcademicYears() {
  const {
    data: academicYears = [],
    isLoading,
    isError,
    error,
  } = useQuery<string[], Error>({
    queryKey: ["academic-years"],
    queryFn: getAcademicYears,
    staleTime: 5 * 60 * 1000,
  });

  return {
    academicYears,
    isLoading,
    isError,
    error,
  };
}