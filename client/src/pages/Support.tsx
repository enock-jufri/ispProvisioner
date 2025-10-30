import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { StatusBadge } from "@/components/StatusBadge";
import { Search, Plus, Send } from "lucide-react";
import { Label } from "@/components/ui/label";

//todo: remove mock functionality
const tickets = [
  { id: 1, title: "Connection drops frequently", customer: "John Smith", priority: "high" as const, status: "open" as const, assignee: "Sarah T.", created: "2 hours ago" },
  { id: 2, title: "Slow speeds during peak hours", customer: "Mike Wilson", priority: "medium" as const, status: "open" as const, assignee: "Mike R.", created: "5 hours ago" },
  { id: 3, title: "Billing inquiry", customer: "Emma Davis", priority: "low" as const, status: "closed" as const, assignee: "Sarah T.", created: "1 day ago" },
  { id: 4, title: "Router configuration help", customer: "David Brown", priority: "medium" as const, status: "open" as const, assignee: "John D.", created: "3 hours ago" },
  { id: 5, title: "Service upgrade request", customer: "Lisa Anderson", priority: "low" as const, status: "open" as const, assignee: "Mike R.", created: "6 hours ago" },
];

//todo: remove mock functionality
const recentNotifications = [
  { id: 1, message: "Scheduled maintenance on Oct 31", type: "Maintenance", sent: "2 hours ago", recipients: 2845 },
  { id: 2, message: "New premium plan available", type: "Promotion", sent: "1 day ago", recipients: 2845 },
  { id: 3, message: "Payment reminder", type: "Billing", sent: "2 days ago", recipients: 128 },
];

export default function Support() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [ticketDialogOpen, setTicketDialogOpen] = useState(false);

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-semibold" data-testid="text-page-title">Support</h1>
          <p className="text-muted-foreground mt-2">Manage customer support tickets and notifications</p>
        </div>
        <Dialog open={ticketDialogOpen} onOpenChange={setTicketDialogOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-new-ticket">
              <Plus className="h-4 w-4 mr-2" />
              New Ticket
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Support Ticket</DialogTitle>
              <DialogDescription>Create a new support ticket for a customer</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Customer</Label>
                <Input placeholder="Customer name or email" data-testid="input-ticket-customer" />
              </div>
              <div className="space-y-2">
                <Label>Title</Label>
                <Input placeholder="Brief description of the issue" data-testid="input-ticket-title" />
              </div>
              <div className="space-y-2">
                <Label>Priority</Label>
                <Select>
                  <SelectTrigger data-testid="select-ticket-priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  placeholder="Detailed description of the issue"
                  rows={4}
                  data-testid="textarea-ticket-description"
                />
              </div>
              <Button className="w-full" onClick={() => setTicketDialogOpen(false)}>Create Ticket</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="tickets" className="space-y-6">
        <TabsList>
          <TabsTrigger value="tickets">Support Tickets</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="tickets" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search tickets..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                    data-testid="input-search-tickets"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-48" data-testid="select-ticket-status">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Assignee</TableHead>
                      <TableHead>Created</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTickets.map((ticket) => (
                      <TableRow key={ticket.id} className="cursor-pointer hover-elevate" data-testid={`row-ticket-${ticket.id}`}>
                        <TableCell className="font-medium">{ticket.title}</TableCell>
                        <TableCell>{ticket.customer}</TableCell>
                        <TableCell>
                          <StatusBadge status={ticket.priority} />
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={ticket.status} />
                        </TableCell>
                        <TableCell className="text-muted-foreground">{ticket.assignee}</TableCell>
                        <TableCell className="text-muted-foreground">{ticket.created}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">Send Notification</CardTitle>
              <CardDescription>Send a notification to all customers or a specific group</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Recipients</Label>
                  <Select>
                    <SelectTrigger data-testid="select-recipients">
                      <SelectValue placeholder="Select recipients" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Customers</SelectItem>
                      <SelectItem value="active">Active Customers</SelectItem>
                      <SelectItem value="suspended">Suspended Customers</SelectItem>
                      <SelectItem value="premium">Premium Plan Users</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Message Type</Label>
                  <Select>
                    <SelectTrigger data-testid="select-message-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="promotion">Promotion</SelectItem>
                      <SelectItem value="billing">Billing</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Message</Label>
                  <Textarea
                    placeholder="Type your notification message..."
                    rows={4}
                    data-testid="textarea-notification-message"
                  />
                </div>
                <Button data-testid="button-send-notification">
                  <Send className="h-4 w-4 mr-2" />
                  Send Notification
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">Recent Notifications</CardTitle>
              <CardDescription>Previously sent notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="flex items-center justify-between p-4 rounded-lg border"
                    data-testid={`notification-${notification.id}`}
                  >
                    <div className="flex-1">
                      <p className="font-medium">{notification.message}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {notification.type} • Sent {notification.sent} to {notification.recipients.toLocaleString()} customers
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
