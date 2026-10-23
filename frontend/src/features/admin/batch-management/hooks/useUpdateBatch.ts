import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { updateBatch } from "../services/batch.service";
import type { UpdateBatchRequest } from "../types/batch.type";
import { getErrorMessage } from "@/core/utils/getErrorMessage";

interface UpdateBatchVariables {
  batchId: string;
  data: UpdateBatchRequest;
}

export const useUpdateBatch = (classId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ batchId, data }: UpdateBatchVariables) =>
      updateBatch(classId, batchId, data),

    onSuccess: (_response, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["batches", classId],
      });

      queryClient.invalidateQueries({
        queryKey: ["batch", classId, variables.batchId],
      });

      toast.success("Batch updated successfully.");
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};
