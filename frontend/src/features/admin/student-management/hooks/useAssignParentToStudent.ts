import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { assignParentToStudent } from "../services/student-parent.service";

import type { AssignParentToStudentRequest } from "../types/student-parent.type";
import { getErrorMessage } from "@/core/utils/getErrorMessage";

export const useAssignParentToStudent = (studentId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AssignParentToStudentRequest) =>
      assignParentToStudent(studentId, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["student-parents", studentId],
      });

      toast.success("Parent assigned successfully.");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};
