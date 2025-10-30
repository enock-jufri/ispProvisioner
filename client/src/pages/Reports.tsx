import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Calendar } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
const userActivityData = [
  { day: "Mon", active: 2640, new: 120 },
  { day: "Tue", active: 2720, new: 145 },
  { day: "Wed", active: 2800, new: 132 },
  { day: "Thu", active: 2750, new: 98 },
  { day: "Fri", active: 2845, new: 156 },
  { day: "Sat", active: 2680, new: 87 },
  { day: "Sun", active: 2590, new: 92 },
];

//todo: remove mock functionality
const paymentMethodsData = [
  { name: "Credit Card", value: 62, color: "hsl(var(--chart-1))" },
  { name: "Bank Transfer", value: 24, color: "hsl(var(--chart-2))" },
  { name: "PayPal", value: 10, color: "hsl(var(--chart-3))" },
  { name: "Other", value: 4, color: "hsl(var(--chart-4))" },
];

//todo: remove mock functionality
const bandwidthData = [
  { hour: "00:00", usage: 320 },
  { hour: "04:00", usage: 180 },
  { hour: "08:00", usage: 520 },
  { hour: "12:00", usage: 680 },
  { hour: "16:00", usage: 720 },
  { hour: "20:00", usage: 850 },
  { hour: "23:00", usage: 640 },
];

export default function Reports() {
  const [dateRange, setDateRange] = useState("30days");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-semibold" data-testid="text-page-title">Reports & Analytics</h1>
          <p className="text-muted-foreground mt-2">Comprehensive insights and performance metrics</p>
        </div>
        <div className="flex gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-48" data-testid="select-date-range">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">This year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" data-testid="button-export-report">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <p className="text-3xl font-bold mt-2">$54,280</p>
            <p className="text-sm text-green-600 dark:text-green-400 mt-1">↑ 8.2% vs last period</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">New Customers</p>
            <p className="text-3xl font-bold mt-2">830</p>
            <p className="text-sm text-green-600 dark:text-green-400 mt-1">↑ 12.5% vs last period</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Avg Bandwidth/User</p>
            <p className="text-3xl font-bold mt-2">297 GB</p>
            <p className="text-sm text-red-600 dark:text-red-400 mt-1">↓ 3.1% vs last period</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Customer Retention</p>
            <p className="text-3xl font-bold mt-2">94.2%</p>
            <p className="text-sm text-green-600 dark:text-green-400 mt-1">↑ 1.8% vs last period</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Revenue Trend</CardTitle>
            <CardDescription>Monthly revenue over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
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
                  <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">User Activity</CardTitle>
            <CardDescription>Active and new users this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userActivityData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="day" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "6px",
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="active" stroke="hsl(var(--chart-1))" strokeWidth={2} name="Active Users" />
                  <Line type="monotone" dataKey="new" stroke="hsl(var(--chart-2))" strokeWidth={2} name="New Users" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Bandwidth Usage</CardTitle>
            <CardDescription>Average hourly bandwidth consumption (GB)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={bandwidthData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="hour" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "6px",
                    }}
                  />
                  <Bar dataKey="usage" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Payment Methods</CardTitle>
            <CardDescription>Distribution of payment methods used</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentMethodsData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {paymentMethodsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "6px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
