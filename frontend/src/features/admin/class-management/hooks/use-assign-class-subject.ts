import { useMutation, useQueryClient } from "@tanstack/react-query";

import { assignClassSubject } from "../services/class-subject.service";
import type { AssignClassSubjectRequest } from "../types/class-subject.types";

export const useAssignClassSubject = (classId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AssignClassSubjectRequest) =>
      assignClassSubject(classId, data),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["class-subjects", classId],
      });
    },
  });
};