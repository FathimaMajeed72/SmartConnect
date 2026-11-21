import { useQuery } from "@tanstack/react-query";

import { getParents } from "@/features/admin/parent-management/services/parent.service";

export const useAvailableParents = () => {
  return useQuery({
    queryKey: ["available-parents"],
    queryFn: () =>
      getParents({
        page: 1,
        limit: 100,
        status: "ACTIVE",
      }),
    select: (data) => data.parents,
  });
};