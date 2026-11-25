import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

import { useParent } from "../context/use-parent";
import { useNavigate } from "react-router-dom"; 

export default function ChildSwitcher() {
  const { children, selectedChild, setSelectedChild } = useParent();
  const navigate = useNavigate();


  if (!children.length) {
    return null;
  }

  const handleChildChange = (childId: string) => {
    const child = children.find((item) => item.id === childId);

    if (child) {
      setSelectedChild(child);
      navigate(`/parent/children/${child.id}`);
    }
  };

  return (
    <Select
      value={selectedChild?.id ?? ""}
      onValueChange={handleChildChange}
    >
      <SelectTrigger className="w-50">
        <SelectValue placeholder="Select Child" />
      </SelectTrigger>

      <SelectContent>
        {children.map((child) => (
          <SelectItem key={child.id} value={child.id}>
            {child.firstName} {child.lastName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}