import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { unassignStudentsFromBatch } from "../services/student.service";
import { STUDENT_QUERY_KEYS } from "./useStudents";
import { getErrorMessage } from "@/core/utils/getErrorMessage";

export const useUnassignStudentsFromBatch = (classId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: unassignStudentsFromBatch,

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: STUDENT_QUERY_KEYS.all,
        }),
        queryClient.invalidateQueries({
          queryKey: ["batches", classId],
        }),
      ]);

      toast.success("Students unassigned from batch successfully.");
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};