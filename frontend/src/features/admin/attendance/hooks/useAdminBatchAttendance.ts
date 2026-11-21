import { useQuery } from "@tanstack/react-query";
import { getAdminBatchAttendance } from "../services/attendance.service";

export const useAdminBatchAttendance = (
  batchId: string | null,
  date: string,
) => {
  return useQuery({
    queryKey: ["admin-batch-attendance", batchId, date],
    queryFn: () => getAdminBatchAttendance(batchId!, date),
    enabled: !!batchId && !!date,
  });
};