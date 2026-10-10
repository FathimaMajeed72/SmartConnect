import { useQuery } from "@tanstack/react-query";

import { getClassSubjects } from "../services/class-subject.service";

export const useClassSubjects = (classId: string) => {
  return useQuery({
    queryKey: ["class-subjects", classId],
    queryFn: () => getClassSubjects(classId),
    enabled: Boolean(classId),
  });
};