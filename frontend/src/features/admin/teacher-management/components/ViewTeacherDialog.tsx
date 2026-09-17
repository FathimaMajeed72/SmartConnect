import { useEffect, useState } from "react";

import DetailsDialog from "@/shared/components/DetailsDialog";
import DetailsRow from "@/shared/components/DetailsRow";

import { getTeacherById } from "../services/teacher.service";
import type { TeacherDetails } from "../types/teacher.types";

import TeacherStatusBadge from "./TeacherStatusBadge";

interface ViewTeacherDialogProps {
  teacherId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ViewTeacherDialog({
  teacherId,
  open,
  onOpenChange,
}: ViewTeacherDialogProps) {
  const [teacher, setTeacher] =
    useState<TeacherDetails | null>(null);

  const [isLoading, setIsLoading] =
    useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    const loadTeacher = async () => {
      try {
        setIsLoading(true);

        const result = await getTeacherById(teacherId);

        setTeacher(result);
      } catch (error) {
        console.error(
          "Failed to fetch teacher details:",
          error,
        );

        setTeacher(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadTeacher();
  }, [teacherId, open]);

  return (
    <DetailsDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Teacher Details"
      description="View teacher information."
    >
      {isLoading && (
        <p className="text-sm text-muted-foreground">
          Loading teacher details...
        </p>
      )}

      {!isLoading && teacher && (
        <>
          <DetailsRow
            label="Teacher ID"
            value={teacher.teacherId}
          />

          <DetailsRow
            label="Name"
            value={`${teacher.firstName} ${teacher.lastName}`}
          />

          <DetailsRow
            label="Email"
            value={teacher.email}
          />

          <DetailsRow
            label="Phone"
            value={teacher.phone}
          />

          <DetailsRow
            label="Qualification"
            value={teacher.qualification}
          />

          <DetailsRow
            label="Joining Date"
            value={new Date(
              teacher.joiningDate,
            ).toLocaleDateString()}
          />

          <DetailsRow
            label="Status"
            value={
              <TeacherStatusBadge
                status={teacher.status}
              />
            }
          />
        </>
      )}

      {!isLoading && !teacher && (
        <p className="text-sm text-destructive">
          Unable to load teacher details.
        </p>
      )}
    </DetailsDialog>
  );
}