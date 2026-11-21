import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { updateStudentParentStatus } from "../services/student-parent.service";

import type {
  UpdateStudentParentStatusRequest,
} from "../types/student-parent.type";

interface UpdateStudentParentStatusParams {
  parentUserId: string;
  data: UpdateStudentParentStatusRequest;
}

export const useUpdateStudentParentStatus = (
  studentId: string,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      parentUserId,
      data,
    }: UpdateStudentParentStatusParams) =>
      updateStudentParentStatus(
        studentId,
        parentUserId,
        data,
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["student-parents", studentId],
      });

      toast.success("Parent relationship status updated successfully.");
    },
  });
};