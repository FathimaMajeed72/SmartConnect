import { useCallback, useState } from "react";

import { getClassById } from "../services/class.service";

import type { ClassListItem } from "../types/class.types";

interface UseClassDetailsReturn {
  classDetails: ClassListItem | null;
  isLoading: boolean;
  fetchClass: (id: string) => Promise<void>;
  clearClass: () => void;
}

export function useClassDetails(): UseClassDetailsReturn {
  const [classDetails, setClassDetails] =
    useState<ClassListItem | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const fetchClass = useCallback(async (id: string) => {
    try {
      setIsLoading(true);

      const result = await getClassById(id);

      setClassDetails(result.class);
    } catch (error) {
      console.error("Failed to fetch class details:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearClass = useCallback(() => {
    setClassDetails(null);
  }, []);

  return {
    classDetails,
    isLoading,
    fetchClass,
    clearClass,
  };
}