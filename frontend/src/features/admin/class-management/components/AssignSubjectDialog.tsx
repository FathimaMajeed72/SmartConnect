import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

import { getSubjects } from "@/features/admin/subject-management/services/subject.service";
import { getTeachers } from "@/features/admin/teacher-management/services/teacher.service";

import type { SubjectListItem } from "@/features/admin/subject-management/types/subject.types";
import type { TeacherListItem } from "@/features/admin/teacher-management/types/teacher.types";

import { useAssignClassSubject } from "../hooks/use-assign-class-subject";
import type { ClassSubjectDetails } from "../types/class-subject.types";

interface AssignSubjectDialogProps {
  classId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  assignedSubjects: ClassSubjectDetails[];
}

export const AssignSubjectDialog = ({
  classId,
  open,
  onOpenChange,
  assignedSubjects,
}: AssignSubjectDialogProps) => {
  const [subjectId, setSubjectId] = useState("");
  const [teacherId, setTeacherId] = useState("");

  const [subjects, setSubjects] = useState<SubjectListItem[]>([]);
  const [teachers, setTeachers] = useState<TeacherListItem[]>([]);

  const [isSubjectsLoading, setIsSubjectsLoading] = useState(false);
  const [isTeachersLoading, setIsTeachersLoading] = useState(false);

  const [subjectsError, setSubjectsError] = useState<string | null>(null);
  const [teachersError, setTeachersError] = useState<string | null>(null);

  const { mutate: assignSubject, isPending } = useAssignClassSubject(classId);

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setSubjectId("");
      setTeacherId("");
    }

    onOpenChange(isOpen);
  };

  const handleSubmit = () => {
    if (!subjectId || !teacherId) {
      toast.error("Please select both a subject and a teacher.");
      return;
    }

    assignSubject(
      {
        subjectId,
        teacherId,
      },
      {
        onSuccess: () => {
          toast.success("Subject assigned successfully.");
          handleOpenChange(false);
        },
        onError: () => {
          toast.error("Failed to assign subject. Please try again.");
        },
      },
    );
  };

  const isLoading = isSubjectsLoading || isTeachersLoading;

  const assignedSubjectIds = new Set(
    assignedSubjects.map((subject) => subject.subjectId),
  );

  const activeSubjects = subjects.filter(
    (subject) => subject.status === "ACTIVE",
  );

  const availableSubjects = activeSubjects.filter(
    (subject) => !assignedSubjectIds.has(subject.id),
  );

  const activeTeachers = teachers.filter(
    (teacher) => teacher.status === "ACTIVE",
  );

  useEffect(() => {
    if (!open) return;

    let cancelled = false;

    const loadSubjects = async () => {
      setIsSubjectsLoading(true);
      setSubjectsError(null);

      try {
        const response = await getSubjects({
          page: 1,
          limit: 100,
          status: "ACTIVE",
        });

        if (!cancelled) {
          setSubjects(response.subjects);
        }
      } catch {
        if (!cancelled) {
          setSubjectsError("Failed to load active subjects.");
        }
      } finally {
        if (!cancelled) {
          setIsSubjectsLoading(false);
        }
      }
    };

    const loadTeachers = async () => {
      setIsTeachersLoading(true);
      setTeachersError(null);

      try {
        const response = await getTeachers({
          page: 1,
          limit: 100,
          status: "ACTIVE",
        });

        if (!cancelled) {
          setTeachers(response.teachers);
        }
      } catch {
        if (!cancelled) {
          setTeachersError("Failed to load active teachers.");
        }
      } finally {
        if (!cancelled) {
          setIsTeachersLoading(false);
        }
      }
    };

    void loadSubjects();
    void loadTeachers();

    return () => {
      cancelled = true;
    };
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign Subject</DialogTitle>

          <DialogDescription>
            Select a subject and the teacher responsible for teaching it in this
            class.
          </DialogDescription>
          {subjectsError && (
            <p className="text-sm text-destructive">{subjectsError}</p>
          )}

          {teachersError && (
            <p className="text-sm text-destructive">{teachersError}</p>
          )}
        </DialogHeader>

        <div className="space-y-5 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Subject</label>

            <Select
              value={subjectId}
              onValueChange={setSubjectId}
              disabled={
                isLoading || isPending || availableSubjects.length === 0
              }
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    isSubjectsLoading
                      ? "Loading subjects..."
                      : availableSubjects.length === 0
                        ? "No available subjects"
                        : "Select a subject"
                  }
                />
              </SelectTrigger>

              <SelectContent>
                {availableSubjects.map((subject) => (
                  <SelectItem key={subject.id} value={subject.id}>
                    {subject.name} ({subject.code})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Teacher</label>

            <Select
              value={teacherId}
              onValueChange={setTeacherId}
              disabled={isLoading || isPending || activeTeachers.length === 0}
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    isTeachersLoading
                      ? "Loading teachers..."
                      : activeTeachers.length === 0
                        ? "No active teachers available"
                        : "Select a teacher"
                  }
                />
              </SelectTrigger>

              <SelectContent>
                {activeTeachers.map((teacher) => (
                  <SelectItem key={teacher.id} value={teacher.id}>
                    {teacher.firstName} {teacher.lastName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            disabled={isPending}
            onClick={() => handleOpenChange(false)}
          >
            Cancel
          </Button>

          <Button
            type="button"
            disabled={
              isLoading ||
              isPending ||
              Boolean(subjectsError) ||
              Boolean(teachersError) ||
              !subjectId ||
              !teacherId
            }
            onClick={handleSubmit}
          >
            {isPending ? "Assigning..." : "Assign Subject"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
