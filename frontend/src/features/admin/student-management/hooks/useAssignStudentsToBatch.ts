import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { assignStudentsToBatch } from "../services/student.service";
import { STUDENT_QUERY_KEYS } from "./useStudents";
import { getErrorMessage } from "@/core/utils/getErrorMessage";

export const useAssignStudentsToBatch = (classId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: assignStudentsToBatch,

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: STUDENT_QUERY_KEYS.all,
        }),
        queryClient.invalidateQueries({
          queryKey: ["batches", classId],
        }),
      ]);

      toast.success("Students assigned to batch successfully.");
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};