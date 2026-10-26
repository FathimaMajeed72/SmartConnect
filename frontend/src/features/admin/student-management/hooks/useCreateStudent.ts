import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { createStudent } from "../services/student.service";
import { STUDENT_QUERY_KEYS } from "./useStudents";

export const useCreateStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createStudent,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: STUDENT_QUERY_KEYS.lists(),
      });

      toast.success("Student created successfully.");
    },
  });
};
