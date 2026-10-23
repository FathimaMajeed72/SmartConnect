import { useQuery } from "@tanstack/react-query";
import { getBatches } from "../services/batch.service";

export const useBatches = (classId: string) => {
  return useQuery({
    queryKey: ["batches", classId],
    queryFn: () => getBatches(classId),
    enabled: Boolean(classId),
  });
};