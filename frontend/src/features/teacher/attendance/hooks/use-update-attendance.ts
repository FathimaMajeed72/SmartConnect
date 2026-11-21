import { useMutation } from "@tanstack/react-query";

import { updateAttendance } from "../services/attendance.service";

import type { UpdateAttendanceRequest } from "../types/attendance.types";

export const useUpdateAttendance = () => {

  return useMutation({
    mutationFn: (data: UpdateAttendanceRequest) =>
      updateAttendance(data.batchId, {
        studentId: data.studentId,
        date: data.date,
        status: data.status,
        remarks: data.remarks,
      }),

  });
};