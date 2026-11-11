import { useQuery } from "@tanstack/react-query";

import { getBatchAttendance } from "../services/attendance.service";

export const useBatchAttendance = (
  batchId: string,
  date: string,
) => {
  return useQuery({
    queryKey: ["attendance", batchId, date],
    queryFn: () => getBatchAttendance(batchId, date),
    enabled: Boolean(batchId && date),
  });
};