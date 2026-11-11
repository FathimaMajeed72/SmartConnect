import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateAttendance } from "../services/attendance.service";

import type { UpdateAttendanceRequest } from "../types/attendance.types";

export const useUpdateAttendance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateAttendanceRequest) =>
      updateAttendance(data.batchId, {
        studentId: data.studentId,
        date: data.date,
        status: data.status,
        remarks: data.remarks,
      }),

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