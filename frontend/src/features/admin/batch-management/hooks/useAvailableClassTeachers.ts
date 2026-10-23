import { useQuery } from "@tanstack/react-query";

import { getAvailableClassTeachers } from "../services/available-class-teacher.service";

export const useAvailableClassTeachers = () => {
  return useQuery({
    queryKey: ["available-class-teachers"],
    queryFn: getAvailableClassTeachers,
  });
};