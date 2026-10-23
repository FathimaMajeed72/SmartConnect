import { Pencil, Power } from "lucide-react";

import DataTable, {
  type DataTableColumn,
} from "@/shared/components/DataTable";

import { Button } from "@/shared/ui/button";
import { Badge } from "@/shared/ui/badge";

import type { BatchListItem } from "../types/batch.type";

interface BatchTableProps {
  batches: BatchListItem[];
  isLoading: boolean;
  onEdit: (batch: BatchListItem) => void;
  onToggleStatus: (batch: BatchListItem) => void;
}

export default function BatchTable({
  batches,
  isLoading,
  onEdit,
  onToggleStatus,
}: BatchTableProps) {
  const columns: DataTableColumn<BatchListItem>[] = [
    {
      header: "Batch Name",
      cell: (batch) => (
        <span className="font-medium">{batch.name}</span>
      ),
    },
    {
      header: "Class Teacher",
      cell: (batch) => (
        <span>{batch.classTeacherName || "—"}</span>
      ),
    },
    {
      header: "Capacity",
      cell: (batch) => batch.capacity,
    },
    {
      header: "Status",
      cell: (batch) => (
        <Badge
          variant={batch.status === "ACTIVE" ? "default" : "secondary"}
        >
          {batch.status === "ACTIVE" ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      header: "Actions",
      className: "text-right",
      cell: (batch) => (
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            size="icon"
            aria-label={`Edit ${batch.name}`}
            onClick={() => onEdit(batch)}
            disabled={batch.status === "INACTIVE"}
          >
            <Pencil className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            aria-label={`${
              batch.status === "ACTIVE" ? "Deactivate" : "Activate"
            } ${batch.name}`}
            onClick={() => onToggleStatus(batch)}
          >
            <Power className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={batches}
      isLoading={isLoading}
      loadingMessage="Loading batches..."
      emptyMessage="No batches found for this class."
      getRowKey={(batch) => batch.id}
    />
  );
}