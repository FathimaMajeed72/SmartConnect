import { useMutation, useQueryClient } from "@tanstack/react-query";

import { markAttendance } from "../services/attendance.service";
import type { MarkAttendanceRequest } from "../types/attendance.types";

export const useMarkAttendance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: MarkAttendanceRequest) => markAttendance(data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [
          "attendance",
          variables.batchId,
          variables.date,
        ],
      });
    },
  });
};