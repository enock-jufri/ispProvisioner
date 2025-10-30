import { StatCard } from "@/components/StatCard";
import { StatusBadge } from "@/components/StatusBadge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Activity, DollarSign, Ticket, TrendingUp, TrendingDown } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

//todo: remove mock functionality
const bandwidthData = [
  { name: "Mon", usage: 420 },
  { name: "Tue", usage: 380 },
  { name: "Wed", usage: 510 },
  { name: "Thu", usage: 490 },
  { name: "Fri", usage: 560 },
  { name: "Sat", usage: 620 },
  { name: "Sun", usage: 580 },
];

//todo: remove mock functionality
const revenueData = [
  { month: "Jan", revenue: 48000 },
  { month: "Feb", revenue: 51000 },
  { month: "Mar", revenue: 49000 },
  { month: "Apr", revenue: 53000 },
  { month: "May", revenue: 52000 },
  { month: "Jun", revenue: 54280 },
];

//todo: remove mock functionality
const recentActivity = [
  { id: 1, user: "John Smith", action: "Service activated", status: "active" as const, time: "2 min ago" },
  { id: 2, user: "Sarah Johnson", action: "Payment received", status: "paid" as const, time: "15 min ago" },
  { id: 3, user: "Mike Wilson", action: "Support ticket opened", status: "open" as const, time: "1 hour ago" },
  { id: 4, user: "Emma Davis", action: "Service suspended", status: "suspended" as const, time: "2 hours ago" },
  { id: 5, user: "David Brown", action: "Plan upgraded", status: "active" as const, time: "3 hours ago" },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-semibold" data-testid="text-page-title">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome to your network management platform</p>
      </div>

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
          title="Open Tickets"
          value="24"
          icon={Ticket}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Bandwidth Usage</CardTitle>
            <CardDescription>Daily bandwidth consumption (GB)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={bandwidthData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="name" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "6px",
                    }}
                  />
                  <Bar dataKey="usage" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Revenue Trend</CardTitle>
            <CardDescription>Monthly revenue over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "6px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--primary))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Recent Activity</CardTitle>
          <CardDescription>Latest customer and system events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-4 rounded-lg border hover-elevate"
                data-testid={`activity-${activity.id}`}
              >
                <div className="flex-1">
                  <p className="font-medium">{activity.user}</p>
                  <p className="text-sm text-muted-foreground">{activity.action}</p>
                </div>
                <div className="flex items-center gap-4">
                  <StatusBadge status={activity.status} />
                  <span className="text-sm text-muted-foreground min-w-20 text-right">
                    {activity.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
