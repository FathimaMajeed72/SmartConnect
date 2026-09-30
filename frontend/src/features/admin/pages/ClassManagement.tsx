import { useEffect, useState } from "react";

import ClassList from "../class-management/components/ClassList";
import ClassDetails from "../class-management/components/ClassDetails";

import { useClasses } from "../class-management/hooks/use-classes"; 
import { useClassDetails } from "../class-management/hooks/use-class-details";

import AddClassDialog from "../class-management/components/AddClassDialog";
import EditClassDialog from "../class-management/components/EditClassDialog";
import { CLASS_STATUS, type ClassStatus } from "../class-management/types/class-status";
import { updateClassStatus } from "../class-management/services/class.service";
import ConfirmDialog from "@/shared/components/ConfirmDialog";

type ClassTab = "overview" | "subjects" | "batches";

export default function ClassManagement() {
  const [selectedClassId, setSelectedClassId] =
    useState<string | null>(null);

  const [activeTab, setActiveTab] =
    useState<ClassTab>("overview");

  const [isAddClassOpen, setIsAddClassOpen] =
    useState(false);

  const [isEditClassOpen, setIsEditClassOpen] =
    useState(false);

  const [isStatusConfirmOpen, setIsStatusConfirmOpen] =
  useState(false);

  const [isStatusUpdating, setIsStatusUpdating] =
  useState(false);
  
  const {
    classes,
    isLoading: isClassesLoading,
    search,
    setSearch,
    fetchClasses,
  } = useClasses();

  const {
    classDetails,
    isLoading: isClassDetailsLoading,
    fetchClass,
  } = useClassDetails();

  const effectiveSelectedClassId =
  selectedClassId ?? classes[0]?.id ?? null;

  const handleSelectClass = (classId: string) => {
    setSelectedClassId(classId);
    setActiveTab("overview");
  };

  // const handleToggleClassStatus = async () => {
  //     if (!classDetails) {
  //       return;
  //     }

  //     const newStatus: ClassStatus =
  //       classDetails.status === CLASS_STATUS.ACTIVE
  //         ? CLASS_STATUS.INACTIVE
  //         : CLASS_STATUS.ACTIVE;

  //     try {
  //       await updateClassStatus(
  //         classDetails.id,
  //         { status: newStatus },
  //       );

  //       await fetchClasses();
  //       await fetchClass(classDetails.id);
  //     } catch (error) {
  //       console.error(
  //         "Failed to update class status:",
  //         error,
  //       );
  //     }
  //   };

    const handleStatusChange = () => {
      setIsStatusConfirmOpen(true);
    };

    const handleConfirmStatusChange = async () => {
      if (!classDetails) {
        return;
      }

      try {
        setIsStatusUpdating(true);

        const newStatus: ClassStatus =
          classDetails.status === CLASS_STATUS.ACTIVE
            ? CLASS_STATUS.INACTIVE
            : CLASS_STATUS.ACTIVE;

        await updateClassStatus(
          classDetails.id,
          { status: newStatus },
        );

        setIsStatusConfirmOpen(false);

        await fetchClasses();
        await fetchClass(classDetails.id);
      } catch (error) {
        console.error(
          "Failed to update class status:",
          error,
        );
      } finally {
        setIsStatusUpdating(false);
      }
    };

useEffect(() => {
  if (effectiveSelectedClassId) {
    void fetchClass(effectiveSelectedClassId);
  }
}, [effectiveSelectedClassId, fetchClass]);

  return (
    <div className="h-full">
      {/* Page Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-semibold">
          Classes
        </h1>

        <p className="text-sm text-muted-foreground">
          Manage classes, subjects, and batches.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid h-[calc(100vh-180px)] grid-cols-[280px_1fr] gap-4">
        {/* Left - Class List */}
        <ClassList
          classes={classes}
          selectedClassId={effectiveSelectedClassId}
          search={search}
          onSearchChange={setSearch}
          onSelectClass={handleSelectClass}
          onAddClass={() => setIsAddClassOpen(true)}
          isLoading={isClassesLoading}
        />

        {/* Right - Selected Class */}
        <ClassDetails
          classDetails={classDetails}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onEditClass={() =>
            setIsEditClassOpen(true)
          }
          onStatusChange={handleStatusChange}
          isLoading={isClassDetailsLoading}
        />
      </div>

      <AddClassDialog
        open={isAddClassOpen}
        onOpenChange={setIsAddClassOpen}
        onClassCreated={fetchClasses}
      />

      {classDetails && (
        <EditClassDialog
          open={isEditClassOpen}
          onOpenChange={setIsEditClassOpen}
          classDetails={classDetails}
          onClassUpdated={async () => {
            await fetchClasses();

            if (selectedClassId) {
              await fetchClass(selectedClassId);
            }
          }}
        />
      )}


      {classDetails && (
        <ConfirmDialog
          open={isStatusConfirmOpen}
          onOpenChange={setIsStatusConfirmOpen}
          title={
            classDetails.status === CLASS_STATUS.ACTIVE
              ? "Deactivate Class"
              : "Activate Class"
          }
          description={
            classDetails.status === CLASS_STATUS.ACTIVE
              ? "Are you sure you want to deactivate this class?"
              : "Are you sure you want to activate this class?"
          }
          confirmText={
            classDetails.status === CLASS_STATUS.ACTIVE
              ? "Deactivate"
              : "Activate"
          }
          onConfirm={handleConfirmStatusChange}
          isLoading={isStatusUpdating}
        />
      )}
    </div>
  );
}