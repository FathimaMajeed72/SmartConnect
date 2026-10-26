import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { updateStudentStatus } from "../services/student.service";
import { STUDENT_QUERY_KEYS } from "./useStudents";
import type { UpdateStudentStatusRequest } from "../types/student.type";

export const useUpdateStudentStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateStudentStatusRequest;
    }) => updateStudentStatus(id, data),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: STUDENT_QUERY_KEYS.lists(),
      });

      await queryClient.invalidateQueries({
        queryKey: STUDENT_QUERY_KEYS.details(),
      });

      toast.success("Student status updated successfully.");
    },
  });
};
