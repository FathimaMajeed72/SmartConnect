import { useContext } from "react";
import { ParentContext } from "./parent-context"; 

export function useParent() {
  const context = useContext(ParentContext);

  if (!context) {
    throw new Error("useParent must be used within ParentProvider");
  }

  return context;
}