import { StatusBadge } from "../StatusBadge";

export default function StatusBadgeExample() {
  return (
    <div className="p-8 space-y-4 bg-background">
      <div className="flex flex-wrap gap-2">
        <StatusBadge status="active" />
        <StatusBadge status="online" />
        <StatusBadge status="paid" />
      </div>
      <div className="flex flex-wrap gap-2">
        <StatusBadge status="suspended" />
        <StatusBadge status="pending" />
        <StatusBadge status="medium" />
      </div>
      <div className="flex flex-wrap gap-2">
        <StatusBadge status="offline" />
        <StatusBadge status="overdue" />
        <StatusBadge status="high" />
      </div>
    </div>
  );
}
