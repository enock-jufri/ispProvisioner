import { StatCard } from "../StatCard";
import { Users, Activity, DollarSign, Ticket } from "lucide-react";

export default function StatCardExample() {
  return (
    <div className="p-8 bg-background">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Active Users"
          value="2,845"
          icon={Users}
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatCard
          title="Bandwidth Usage"
          value="847 GB"
          icon={Activity}
          trend={{ value: 8.2, isPositive: true }}
        />
        <StatCard
          title="Monthly Revenue"
          value="$54,280"
          icon={DollarSign}
          trend={{ value: 3.1, isPositive: false }}
        />
        <StatCard
          title="Support Tickets"
          value="24"
          icon={Ticket}
        />
      </div>
    </div>
  );
}
