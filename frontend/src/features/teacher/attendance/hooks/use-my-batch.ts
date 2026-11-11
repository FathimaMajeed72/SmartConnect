import { useQuery } from "@tanstack/react-query";

import { getMyBatch } from "../services/attendance.service";

export const useMyBatch = () => {
  return useQuery({
    queryKey: ["teacher", "my-batch"],
    queryFn: getMyBatch,
  });
};