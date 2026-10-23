import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { createBatch } from "../services/batch.service";
import type { CreateBatchRequest } from "../types/batch.type";
import { getErrorMessage } from "@/core/utils/getErrorMessage";

export const useCreateBatch = (classId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBatchRequest) => createBatch(classId, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["batches", classId],
      });

      queryClient.invalidateQueries({
        queryKey: ["available-class-teachers"],
      });

      toast.success("Batch created successfully.");
    },

    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};
