export const ATTENDANCE_STATUS = {
  PRESENT : "PRESENT",
  ABSENT : "ABSENT",
  LATE : "LATE",
  EXCUSED : "EXCUSED",
} as const;

export type AttendanceStatus =
  (typeof ATTENDANCE_STATUS)[keyof typeof ATTENDANCE_STATUS];

  export const ATTENDANCE_STATUS_STYLES = {
  [ATTENDANCE_STATUS.PRESENT]: {
    label: "Present",
    color: "text-green-700",
    background: "bg-green-50",
    border: "border-green-500",
    radio: "border-green-600 text-green-600",
  },
  [ATTENDANCE_STATUS.ABSENT]: {
    label: "Absent",
    color: "text-red-700",
    background: "bg-red-50",
    border: "border-red-500",
    radio: "border-red-600 text-red-600",
  },
  [ATTENDANCE_STATUS.LATE]: {
    label: "Late",
    color: "text-amber-700",
    background: "bg-amber-50",
    border: "border-amber-500",
    radio: "border-amber-600 text-amber-600",
  },
  [ATTENDANCE_STATUS.EXCUSED]: {
    label: "Excused",
    color: "text-blue-700",
    background: "bg-blue-50",
    border: "border-blue-500",
    radio: "border-blue-600 text-blue-600",
  },
} as const;