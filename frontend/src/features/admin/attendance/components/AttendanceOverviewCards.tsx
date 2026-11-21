import {
  Users,
  UserCheck,
  UserX,
  ChartColumnIncreasing,
} from "lucide-react";

import { Card, CardContent } from "@/shared/ui/card";

interface AttendanceOverviewCardsProps {
  totalStudents: number;
  present: number;
  absent: number;
  attendancePercentage: number;
}

const AttendanceOverviewCards = ({
  totalStudents,
  present,
  absent,
  attendancePercentage,
}: AttendanceOverviewCardsProps) => {
  const cards = [
    {
      title: "Total Students",
      value: totalStudents,
      icon: Users,
      description: "Active students",
    },
    {
      title: "Present Today",
      value: present,
      icon: UserCheck,
      description: "Students present",
    },
    {
      title: "Absent Today",
      value: absent,
      icon: UserX,
      description: "Students absent",
    },
    {
      title: "Attendance Percentage",
      value: `${attendancePercentage.toFixed(2)}%`,
      icon: ChartColumnIncreasing,
      description: "Overall attendance",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardContent className="flex items-center justify-between p-5">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                {card.title}
              </p>

              <p className="text-2xl font-bold">
                {card.value}
              </p>

              <p className="text-xs text-muted-foreground">
                {card.description}
              </p>
            </div>

            <div className="rounded-lg bg-primary/10 p-3 text-primary">
              <card.icon className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AttendanceOverviewCards;