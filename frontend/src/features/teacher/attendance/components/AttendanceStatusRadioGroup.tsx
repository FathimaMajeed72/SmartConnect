import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group";

import {
  ATTENDANCE_STATUS_STYLES,
} from "../types/attendance-status";

import type { AttendanceStatus } from "../types/attendance-status";

interface AttendanceStatusRadioGroupProps {
  studentId: string;
  value: AttendanceStatus | "";
  onValueChange: (value: AttendanceStatus) => void;
  disabled?: boolean;
}

const AttendanceStatusRadioGroup = ({
  studentId,
  value,
  onValueChange,
  disabled = false,
}: AttendanceStatusRadioGroupProps) => {
  return (
    <RadioGroup
      value={value}
      onValueChange={(value) => onValueChange(value as AttendanceStatus)}
      disabled={disabled}
      className="flex flex-wrap items-center gap-2"
    >
      {Object.entries(ATTENDANCE_STATUS_STYLES).map(([status, style]) => {
        const isSelected = value === status;

        return (
          <label
            key={status}
            htmlFor={`${studentId}-${status}`}
            className={`flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 transition-colors
              ${style.color}
              ${
                isSelected
                  ? `${style.background} ${style.border}`
                  : "border-border bg-background hover:bg-muted"
              }
              ${disabled ? "cursor-not-allowed opacity-80" : ""}
            `}
          >
            <RadioGroupItem
              id={`${studentId}-${status}`}
              value={status}
              className={style.radio}
            />

            <span className="text-xs font-medium">{style.label}</span>
          </label>
        );
      })}
    </RadioGroup>
  );
};

export default AttendanceStatusRadioGroup;