import { useQuery } from "@tanstack/react-query";
import { getStudentById } from "../services/student.service";
import { STUDENT_QUERY_KEYS } from "./useStudents";

export const useStudentById = (id: string) => {
  return useQuery({
    queryKey: STUDENT_QUERY_KEYS.detail(id),
    queryFn: () => getStudentById(id),
    enabled: Boolean(id),
  });
};
