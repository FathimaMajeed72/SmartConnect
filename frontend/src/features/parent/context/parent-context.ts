import { createContext } from "react";

import type { ParentChild } from "../children/types/children.type";

interface ParentContextType {
  children: ParentChild[];
  selectedChild: ParentChild | null;
  setSelectedChild: (child: ParentChild) => void;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export const ParentContext = createContext<ParentContextType | undefined>(
  undefined,
);
