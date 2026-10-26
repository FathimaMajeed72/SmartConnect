import { useQuery } from "@tanstack/react-query";

import { getStudents } from "../services/student.service";
import type { GetStudentsParams } from "../types/student.type";

export const STUDENT_QUERY_KEYS = {
  all: ["students"] as const,

  lists: () => [...STUDENT_QUERY_KEYS.all, "list"] as const,

  list: (params: GetStudentsParams) =>
    [...STUDENT_QUERY_KEYS.lists(), params] as const,

  details: () => [...STUDENT_QUERY_KEYS.all, "detail"] as const,

  detail: (id: string) =>
    [...STUDENT_QUERY_KEYS.details(), id] as const,
};

export const useStudents = (params: GetStudentsParams) => {
  return useQuery({
    queryKey: STUDENT_QUERY_KEYS.list(params),
    queryFn: () => getStudents(params),
    placeholderData: (previousData) => previousData,
  });
};
