import { ChevronRight, Users } from "lucide-react";

import { Input } from "@/shared/ui/input";

import type { ClassListItem } from "../types/class.types";
import { Button } from "@/shared/ui/button";

interface ClassListProps {
  classes: ClassListItem[];
  selectedClassId: string | null;
  search: string;
  onSearchChange: (value: string) => void;
  onSelectClass: (classId: string) => void;
  onAddClass: () => void;
  isLoading: boolean;
}

export default function ClassList({
  classes,
  selectedClassId,
  search,
  onSearchChange,
  onSelectClass,
  onAddClass,
  isLoading,
}: ClassListProps) {
  return (
    <div className="flex h-full flex-col rounded-lg bg-white">
      {/* Header */}
      <div className="border-b p-4">
         <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              All Classes
            </h2>

            <Button
              type="button"
              size="sm"
              onClick={onAddClass}
            >
              + Add Class
            </Button>
          </div>

        <div className="mt-3">
          <Input
            placeholder="Search class"
            value={search}
            onChange={(event) =>
              onSearchChange(event.target.value)
            }
          />
        </div>
      </div>

      {/* Class List */}
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="p-4 text-sm text-muted-foreground">
            Loading classes...
          </div>
        ) : classes.length === 0 ? (
          <div className="p-4 text-sm text-muted-foreground">
            No classes found.
          </div>
        ) : (
          <div className="p-2">
            {classes.map((classItem) => {
              const isSelected =
                selectedClassId === classItem.id;

              return (
                <button
                  key={classItem.id}
                  type="button"
                  onClick={() =>
                    onSelectClass(classItem.id)
                  }
                  className={`flex w-full items-center justify-between rounded-md px-3 py-3 text-left transition ${
                    isSelected
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-md ${
                        isSelected
                          ? "bg-primary-foreground/20"
                          : "bg-blue-50"
                      }`}
                    >
                      <Users
                        className={`h-4 w-4 ${
                          isSelected
                            ? "text-primary-foreground"
                            : "text-blue-500"
                        }`}
                      />
                    </div>

                    <div>
                      <p className="text-sm font-medium">
                        {classItem.name}
                      </p>

                      <p
                        className={`text-xs ${
                          isSelected
                            ? "text-primary-foreground/70"
                            : "text-muted-foreground"
                        }`}
                      >
                        {classItem.code}
                      </p>
                    </div>
                  </div>

                  <ChevronRight className="h-4 w-4" />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}