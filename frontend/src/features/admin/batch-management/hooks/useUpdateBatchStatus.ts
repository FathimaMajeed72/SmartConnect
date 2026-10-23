import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { updateBatchStatus } from "../services/batch.service";
import type { UpdateBatchStatusRequest } from "../types/batch.type";
import type { BatchStatus } from "../types/batch.status";
import { getErrorMessage } from "@/core/utils/getErrorMessage";

interface UpdateBatchStatusVariables {
  batchId: string;
  status: BatchStatus;
  classTeacherId?: string;
}

export const useUpdateBatchStatus = (classId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      batchId,
      status,
      classTeacherId,
    }: UpdateBatchStatusVariables) => {
      const data: UpdateBatchStatusRequest = {
        status,
        ...(classTeacherId ? { classTeacherId } : {}),
      };

      return updateBatchStatus(classId, batchId, data);
    },

    onSuccess: (_response, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["batches", classId],
      });

      queryClient.invalidateQueries({
        queryKey: ["batch", classId, variables.batchId],
      });

      queryClient.invalidateQueries({
        queryKey: ["available-class-teachers"],
      });

      toast.success("Batch status updated successfully.");
    },

    onError: (error) => {
          toast.error(getErrorMessage(error));
        },
  });
};
