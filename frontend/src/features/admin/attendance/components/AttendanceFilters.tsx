import { Card, CardContent } from "@/shared/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Input } from "@/shared/ui/input";

export interface AttendanceFilterOption {
  id: string;
  name: string;
}

interface AttendanceFiltersProps {
  academicYears: AttendanceFilterOption[];
  classes: AttendanceFilterOption[];
  batches: AttendanceFilterOption[];

  selectedAcademicYear: string;
  selectedClass: string;
  selectedBatch: string;
  selectedDate: string;

  onAcademicYearChange: (value: string) => void;
  onClassChange: (value: string) => void;
  onBatchChange: (value: string) => void;
  onDateChange: (value: string) => void;
}

const AttendanceFilters = ({
  academicYears,
  classes,
  batches,
  selectedAcademicYear,
  selectedClass,
  selectedBatch,
  selectedDate,
  onAcademicYearChange,
  onClassChange,
  onBatchChange,
  onDateChange,
}: AttendanceFiltersProps) => {
  return (
    <Card>
      <CardContent className="grid gap-4 p-5 sm:grid-cols-2 xl:grid-cols-4">
        {/* Academic Year */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Academic Year</label>

          <Select
            value={selectedAcademicYear}
            onValueChange={onAcademicYearChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select academic year" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All Academic Years</SelectItem>

              {academicYears.map((year) => (
                <SelectItem key={year.id} value={year.id}>
                  {year.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Class */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Class</label>

          <Select value={selectedClass} onValueChange={onClassChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select class" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All Classes</SelectItem>

              {classes.map((classItem) => (
                <SelectItem key={classItem.id} value={classItem.id}>
                  {classItem.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Batch */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Batch</label>

          <Select value={selectedBatch} onValueChange={onBatchChange} disabled={selectedClass === "all"}>
            <SelectTrigger>
              <SelectValue placeholder="Select batch" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All Batches</SelectItem>

              {batches.map((batch) => (
                <SelectItem key={batch.id} value={batch.id}>
                  {batch.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Date */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Date</label>

          <Input
            type="date"
            value={selectedDate}
            onChange={(event) => onDateChange(event.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default AttendanceFilters;