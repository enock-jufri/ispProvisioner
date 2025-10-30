import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "active" | "suspended" | "pending" | "offline" | "online" | "paid" | "overdue" | "open" | "closed" | "high" | "medium" | "low";
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const variants: Record<typeof status, { label: string; className: string }> = {
    active: { label: "Active", className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" },
    online: { label: "Online", className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" },
    paid: { label: "Paid", className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" },
    suspended: { label: "Suspended", className: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400" },
    pending: { label: "Pending", className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400" },
    medium: { label: "Medium", className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400" },
    offline: { label: "Offline", className: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400" },
    closed: { label: "Closed", className: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400" },
    overdue: { label: "Overdue", className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" },
    high: { label: "High", className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" },
    open: { label: "Open", className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" },
    low: { label: "Low", className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" },
  };

  const variant = variants[status];

  return (
    <Badge
      variant="secondary"
      className={cn(
        "rounded-full px-3 py-1 text-xs font-medium",
        variant.className,
        className
      )}
      data-testid={`badge-status-${status}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current inline-block mr-1.5"></span>
      {variant.label}
    </Badge>
  );
}
