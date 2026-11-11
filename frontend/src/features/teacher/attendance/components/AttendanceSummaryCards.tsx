import {
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  ShieldCheck,
} from "lucide-react";

import { Card, CardContent } from "@/shared/ui/card";

export interface AttendanceSummary {
  total: number;
  present: number;
  absent: number;
  late: number;
  excused: number;
}

interface AttendanceSummaryCardsProps {
  summary: AttendanceSummary;
}

const AttendanceSummaryCards = ({
  summary,
}: AttendanceSummaryCardsProps) => {
  const summaryCards = [
    {
      title: "Total Students",
      count: summary.total,
      icon: Users,
      color: "text-primary",
      background: "bg-primary/10",
    },
    {
      title: "Present",
      count: summary.present,
      icon: CheckCircle2,
      color: "text-green-600",
      background: "bg-green-100",
    },
    {
      title: "Absent",
      count: summary.absent,
      icon: XCircle,
      color: "text-red-600",
      background: "bg-red-100",
    },
    {
      title: "Late",
      count: summary.late,
      icon: Clock,
      color: "text-amber-600",
      background: "bg-amber-100",
    },
    {
      title: "Excused",
      count: summary.excused,
      icon: ShieldCheck,
      color: "text-blue-600",
      background: "bg-blue-100",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {summaryCards.map((item) => {
        const Icon = item.icon;

        return (
          <Card key={item.title}>
            <CardContent className="flex items-center gap-3 p-4">
              <div className={`rounded-lg p-3 ${item.background}`}>
                <Icon className={`h-5 w-5 ${item.color}`} />
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  {item.title}
                </p>

                <p className="text-2xl font-bold">{item.count}</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default AttendanceSummaryCards;