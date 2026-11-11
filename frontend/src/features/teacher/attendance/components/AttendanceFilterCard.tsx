import { CalendarDays, GraduationCap, Users } from "lucide-react";

import { Card, CardContent } from "@/shared/ui/card";

interface AttendanceFilterCardProps {
  className: string;
  batchName: string;
  selectedDate: string;
  maxDate: string;
  onDateChange: (date: string) => void;
}

const AttendanceFilterCard = ({
  className,
  batchName,
  selectedDate,
  maxDate,
  onDateChange,
}: AttendanceFilterCardProps) => {
  return (
    <Card>
      <CardContent className="flex flex-wrap items-end gap-6 p-5">
        {/* Assigned Class */}
        <div className="flex-1 space-y-2">
          <p className="text-sm text-muted-foreground">Assigned Class</p>

          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            <span className="font-semibold">{className}</span>
          </div>
        </div>

        {/* Assigned Batch */}
        <div className="flex-1 space-y-2">
          <p className="text-sm text-muted-foreground">Assigned Batch</p>

          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <span className="font-semibold">{batchName}</span>
          </div>
        </div>

        {/* Attendance Date */}
        <div className="w-full space-y-2 sm:max-w-xs">
          <label
            htmlFor="attendance-date"
            className="flex items-center gap-2 text-sm font-medium"
          >
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
            Attendance Date
          </label>

          <input
            id="attendance-date"
            type="date"
            value={selectedDate}
            max={maxDate}
            onChange={(event) => onDateChange(event.target.value)}
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default AttendanceFilterCard;