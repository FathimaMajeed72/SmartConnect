import { BookOpen, Users, UserRound, Layers, Pencil } from "lucide-react";
import { Badge } from "@/shared/ui/badge";

import type { ClassListItem } from "@/features/admin/class-management/types/class.types";
import { Button } from "@/shared/ui/button";

interface ClassDetailsProps {
  classDetails: ClassListItem | null;
  activeTab: "overview" | "subjects" | "batches";
  onTabChange: (
    tab: "overview" | "subjects" | "batches",
  ) => void;
  onEditClass: () => void;
  onStatusChange: () => void;
  isLoading: boolean;
}

export default function ClassDetails({
  classDetails,
  activeTab,
  onTabChange,
  onEditClass,
  onStatusChange,
  isLoading,
}: ClassDetailsProps) {
  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center rounded-lg bg-white">
        <p className="text-sm text-muted-foreground">
          Loading class details...
        </p>
      </div>
    );
  }

  if (!classDetails) {
    return (
      <div className="flex h-full items-center justify-center rounded-lg bg-white">
        <p className="text-sm text-muted-foreground">
          Select a class to view its details.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col rounded-lg bg-white">
      {/* Class Header */}
      <div className="border-b p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">
              {classDetails.name}
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              {classDetails.code}
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onEditClass}
          >
          <Pencil className="mr-2 h-4 w-4" />
            Edit Class
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onStatusChange}
          >
            {classDetails.status === "ACTIVE"
              ? "Deactivate"
              : "Activate"}
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b px-6">
        <div className="flex gap-6">
          <button
            type="button"
            onClick={() => onTabChange("overview")}
            className={`border-b-2 px-1 py-3 text-sm ${
              activeTab === "overview"
                ? "border-primary font-medium text-primary"
                : "border-transparent text-muted-foreground"
            }`}
          >
            Overview
          </button>

          <button
            type="button"
            onClick={() => onTabChange("subjects")}
            className={`border-b-2 px-1 py-3 text-sm ${
              activeTab === "subjects"
                ? "border-primary font-medium text-primary"
                : "border-transparent text-muted-foreground"
            }`}
          >
            Subjects
          </button>

          <button
            type="button"
            onClick={() => onTabChange("batches")}
            className={`border-b-2 px-1 py-3 text-sm ${
              activeTab === "batches"
                ? "border-primary font-medium text-primary"
                : "border-transparent text-muted-foreground"
            }`}
          >
            Batches
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === "overview" && (
          <ClassOverview
            classDetails={classDetails}
          />
        )}

        {activeTab === "subjects" && (
          <div className="flex min-h-75 items-center justify-center">
            <p className="text-sm text-muted-foreground">
              Subjects will be displayed here.
            </p>
          </div>
        )}

        {activeTab === "batches" && (
          <div className="flex min-h-75 items-center justify-center">
            <p className="text-sm text-muted-foreground">
              Batches will be displayed here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

interface ClassOverviewProps {
  classDetails: ClassListItem ;
}

function ClassOverview({
  classDetails,
}: ClassOverviewProps) {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <SummaryCard
          icon={<Layers className="h-5 w-5" />}
          label="Total Batches"
          value="0"
        />

        <SummaryCard
          icon={<Users className="h-5 w-5" />}
          label="Total Students"
          value="0"
        />

        <SummaryCard
          icon={<UserRound className="h-5 w-5" />}
          label="Total Teachers"
          value="0"
        />

        <SummaryCard
          icon={<BookOpen className="h-5 w-5" />}
          label="Total Subjects"
          value="0"
        />
      </div>

      {/* Class Information */}
      <div className="rounded-lg border p-5">
        <h2 className="mb-4 font-semibold">
          Class Information
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <InfoRow
            label="Class Name"
            value={classDetails.name}
          />

          <InfoRow
            label="Class Code"
            value={classDetails.code}
          />

          <InfoRow
            label="Academic Year"
            value={classDetails.academicYear}
          />

          <InfoRow
            label="Description"
            value={
              classDetails.description || "—"
            }
          />

          {/* <InfoRow
            label="Status"
            value={classDetails.status}
          /> */}

          <div>
            <p className="text-xs text-muted-foreground">
              Status
            </p>

            <div className="mt-1">
              <ClassStatusBadge status={classDetails.status} />
            </div>
          </div>

          <InfoRow
            label="Created On"
            value={new Date(
              classDetails.createdAt,
            ).toLocaleDateString()}
          />
        </div>
      </div>
    </div>
  );
}

interface ClassStatusBadgeProps {
  status: ClassListItem["status"];
}

function ClassStatusBadge({
  status,
}: ClassStatusBadgeProps) {
  if (status === "ACTIVE") {
    return (
      <Badge variant="default">
        Active
      </Badge>
    );
  }

  return (
    <Badge variant="secondary">
      Inactive
    </Badge>
  );
}

interface SummaryCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

function SummaryCard({
  icon,
  label,
  value,
}: SummaryCardProps) {
  return (
    <div className="rounded-lg border p-4">
      <div className="mb-2 flex items-center gap-2 text-muted-foreground">
        {icon}
        <span className="text-xs">{label}</span>
      </div>

      <p className="text-xl font-semibold">
        {value}
      </p>
    </div>
  );
}

interface InfoRowProps {
  label: string;
  value: string;
}

function InfoRow({
  label,
  value,
}: InfoRowProps) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium">
        {value}
      </p>
    </div>
  );
}