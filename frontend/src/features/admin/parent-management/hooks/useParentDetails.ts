import { useCallback, useState } from "react";

import { getParentById } from "../services/parent.service";
import type { ParentDetails } from "../types/parent.types";

interface UseParentDetailsReturn {
  parent: ParentDetails | null;
  isLoading: boolean;
  fetchParent: (id: string) => Promise<void>;
  clearParent: () => void;
}

export function useParentDetails(): UseParentDetailsReturn {
  const [parent, setParent] = useState<ParentDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchParent = useCallback(async (id: string) => {
    try {
      setIsLoading(true);

      const result = await getParentById(id);

      setParent(result);
    } catch (error) {
      console.error("Failed to fetch parent details:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearParent = useCallback(() => {
    setParent(null);
  }, []);

  return {
    parent,
    isLoading,
    fetchParent,
    clearParent,
  };
}