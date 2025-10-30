import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatusBadge } from "@/components/StatusBadge";
import { Search, Plus, Download, DollarSign, TrendingUp, CreditCard } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

//todo: remove mock functionality
const subscriptionPlans = [
  { id: 1, name: "Basic", price: "$29.99", speed: "50 Mbps", features: ["Unlimited Data", "Email Support", "1 Device"], subscribers: 842, color: "border-blue-500" },
  { id: 2, name: "Standard", price: "$49.99", speed: "100 Mbps", features: ["Unlimited Data", "Priority Support", "3 Devices", "Free Installation"], subscribers: 1256, color: "border-primary", featured: true },
  { id: 3, name: "Premium", price: "$79.99", speed: "500 Mbps", features: ["Unlimited Data", "24/7 Support", "5 Devices", "Free Installation", "Static IP"], subscribers: 747, color: "border-purple-500" },
];

//todo: remove mock functionality
const transactions = [
  { id: 1, customer: "John Smith", plan: "Premium", amount: "$79.99", date: "2024-10-28", status: "paid" as const },
  { id: 2, customer: "Sarah Johnson", plan: "Basic", amount: "$29.99", date: "2024-10-28", status: "paid" as const },
  { id: 3, customer: "Mike Wilson", plan: "Standard", amount: "$49.99", date: "2024-10-27", status: "pending" as const },
  { id: 4, customer: "Emma Davis", plan: "Premium", amount: "$79.99", date: "2024-10-26", status: "paid" as const },
  { id: 5, customer: "David Brown", plan: "Basic", amount: "$29.99", date: "2024-10-25", status: "overdue" as const },
];

export default function Billing() {
  const [searchQuery, setSearchQuery] = useState("");
  const [planDialogOpen, setPlanDialogOpen] = useState(false);

  const filteredTransactions = transactions.filter((t) =>
    t.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-semibold" data-testid="text-page-title">Billing & Subscriptions</h1>
          <p className="text-muted-foreground mt-2">Manage plans, pricing, and transactions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold mt-1">$54,280</p>
                <p className="text-xs text-green-600 dark:text-green-400 mt-1">↑ 8.2% this month</p>
              </div>
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Subscriptions</p>
                <p className="text-2xl font-bold mt-1">2,845</p>
                <p className="text-xs text-green-600 dark:text-green-400 mt-1">↑ 12.5% this month</p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Payments</p>
                <p className="text-2xl font-bold mt-1">$1,249</p>
                <p className="text-xs text-muted-foreground mt-1">12 invoices</p>
              </div>
              <CreditCard className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="plans" className="space-y-6">
        <TabsList>
          <TabsTrigger value="plans">Subscription Plans</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>

        <TabsContent value="plans" className="space-y-6">
          <div className="flex justify-end">
            <Dialog open={planDialogOpen} onOpenChange={setPlanDialogOpen}>
              <DialogTrigger asChild>
                <Button data-testid="button-add-plan">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Plan
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Plan</DialogTitle>
                  <DialogDescription>Add a new subscription plan for customers</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label>Plan Name</Label>
                    <Input placeholder="e.g., Enterprise" data-testid="input-plan-name" />
                  </div>
                  <div className="space-y-2">
                    <Label>Price</Label>
                    <Input placeholder="e.g., $99.99" data-testid="input-plan-price" />
                  </div>
                  <div className="space-y-2">
                    <Label>Speed</Label>
                    <Input placeholder="e.g., 1 Gbps" data-testid="input-plan-speed" />
                  </div>
                  <Button className="w-full" onClick={() => setPlanDialogOpen(false)}>Create Plan</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subscriptionPlans.map((plan) => (
              <Card
                key={plan.id}
                className={`${plan.featured ? "border-2 border-primary" : ""} relative`}
                data-testid={`card-plan-${plan.id}`}
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.speed}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <div className="space-y-2">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-sm text-muted-foreground">
                      {plan.subscribers} active subscribers
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">Edit</Button>
                    <Button variant="outline" className="flex-1">Archive</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search transactions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                    data-testid="input-search-transactions"
                  />
                </div>
                <Button variant="outline" data-testid="button-export-transactions">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions.map((transaction) => (
                      <TableRow key={transaction.id} data-testid={`row-transaction-${transaction.id}`}>
                        <TableCell className="font-medium">{transaction.customer}</TableCell>
                        <TableCell>{transaction.plan}</TableCell>
                        <TableCell className="font-mono">{transaction.amount}</TableCell>
                        <TableCell className="text-muted-foreground">{transaction.date}</TableCell>
                        <TableCell>
                          <StatusBadge status={transaction.status} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
