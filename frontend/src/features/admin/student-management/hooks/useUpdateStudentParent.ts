import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { updateStudentParent } from "../services/student-parent.service";

import type {
  UpdateStudentParentRequest,
} from "../types/student-parent.type";

interface UpdateStudentParentParams {
  parentUserId: string;
  data: UpdateStudentParentRequest;
}

export const useUpdateStudentParent = (studentId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      parentUserId,
      data,
    }: UpdateStudentParentParams) =>
      updateStudentParent(studentId, parentUserId, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["student-parents", studentId],
      });

      toast.success("Parent relationship updated successfully.");
    },
  });
};