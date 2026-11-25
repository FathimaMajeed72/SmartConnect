import { useState, type ReactNode } from "react";

import type { ParentChild } from "../children/types/children.type";
import { useParentChildren } from "../children/hooks/useParentChildren";
import { ParentContext } from "./parent-context";

const SELECTED_CHILD_KEY = "selectedChildId";

export function ParentProvider({ children: content }: { children: ReactNode }) {
  const {
    data: parentChildren = [],
    isLoading,
    isError,
    error,
  } = useParentChildren();

  const [selectedChildId, setSelectedChildId] = useState<string | null>(() =>
    localStorage.getItem(SELECTED_CHILD_KEY),
  );

  const selectedChild =
    parentChildren.find((child) => child.id === selectedChildId) ?? null;

  const setSelectedChild = (child: ParentChild) => {
    setSelectedChildId(child.id);
    localStorage.setItem(SELECTED_CHILD_KEY, child.id);
  };

  return (
    <ParentContext.Provider
      value={{
        children: parentChildren,
        selectedChild,
        setSelectedChild,
        isLoading,
        isError,
        error,
      }}
    >
      {content}
    </ParentContext.Provider>
  );
}
