import { useQuery } from "@tanstack/react-query";

import { getParentChildren } from "../services/children.service";

export const useParentChildren = () => {
  return useQuery({
    queryKey: ["parent", "children"],
    queryFn: getParentChildren,
  });
};