import { useQuery } from "@tanstack/react-query";

import { getStudentParents } from "../services/student-parent.service";

export const useStudentParents = (studentId: string) => {
  return useQuery({
    queryKey: ["student-parents", studentId],
    queryFn: () => getStudentParents(studentId),
    enabled: Boolean(studentId),
  });
};