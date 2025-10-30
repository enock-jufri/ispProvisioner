import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/StatusBadge";
import { Search, RotateCw, Download, Wifi, Signal, MoreVertical, Settings } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

//todo: remove mock functionality
const mockAccessPoints = [
  { id: 1, name: "AP-North-01", location: "North Tower", status: "online" as const, uptime: "99.9%", users: 42, signal: 85, bandwidth: "245 MB/s", firmware: "v2.4.1" },
  { id: 2, name: "AP-South-02", location: "South Building", status: "online" as const, uptime: "98.5%", users: 38, signal: 92, bandwidth: "198 MB/s", firmware: "v2.4.1" },
  { id: 3, name: "AP-East-03", location: "East Wing", status: "offline" as const, uptime: "0%", users: 0, signal: 0, bandwidth: "0 MB/s", firmware: "v2.3.8" },
  { id: 4, name: "AP-West-04", location: "West Campus", status: "online" as const, uptime: "97.2%", users: 55, signal: 78, bandwidth: "312 MB/s", firmware: "v2.4.1" },
];

export default function AccessPoints() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAP, setSelectedAP] = useState<typeof mockAccessPoints[0] | null>(null);

  const filteredAPs = mockAccessPoints.filter((ap) =>
    ap.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ap.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-semibold" data-testid="text-page-title">Access Points</h1>
          <p className="text-muted-foreground mt-2">Monitor and manage network access points</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total APs</p>
                <p className="text-2xl font-bold mt-1">{mockAccessPoints.length}</p>
              </div>
              <Wifi className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Online</p>
                <p className="text-2xl font-bold mt-1 text-green-600 dark:text-green-400">
                  {mockAccessPoints.filter(ap => ap.status === "online").length}
                </p>
              </div>
              <Signal className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Offline</p>
                <p className="text-2xl font-bold mt-1 text-red-600 dark:text-red-400">
                  {mockAccessPoints.filter(ap => ap.status === "offline").length}
                </p>
              </div>
              <Signal className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Uptime</p>
                <p className="text-2xl font-bold mt-1">98.9%</p>
              </div>
              <RotateCw className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="glass">
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search access points..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-testid="input-search-aps"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredAPs.map((ap) => (
              <Card 
                key={ap.id} 
                className={`hover-elevate border-l-4 glass-subtle ${
                  ap.status === "online" 
                    ? "border-l-green-500" 
                    : "border-l-red-500"
                }`} 
                data-testid={`card-ap-${ap.id}`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{ap.name}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{ap.location}</p>
                    </div>
                    <StatusBadge status={ap.status} />
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Connected Users</p>
                      <p className={`text-lg font-semibold ${
                        ap.status === "offline" 
                          ? "text-muted-foreground" 
                          : ""
                      }`}>
                        {ap.users}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Uptime</p>
                      <p className={`text-lg font-semibold ${
                        ap.status === "offline" 
                          ? "text-red-600 dark:text-red-400" 
                          : parseFloat(ap.uptime) >= 99 
                            ? "text-green-600 dark:text-green-400" 
                            : parseFloat(ap.uptime) >= 95 
                              ? "text-yellow-600 dark:text-yellow-400" 
                              : "text-orange-600 dark:text-orange-400"
                      }`}>
                        {ap.uptime}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Signal Strength</p>
                      <p className={`text-lg font-semibold ${
                        ap.status === "offline" 
                          ? "text-muted-foreground" 
                          : ap.signal >= 80 
                            ? "text-green-600 dark:text-green-400" 
                            : ap.signal >= 60 
                              ? "text-yellow-600 dark:text-yellow-400" 
                              : "text-orange-600 dark:text-orange-400"
                      }`}>
                        {ap.signal}%
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Bandwidth</p>
                      <p className={`text-lg font-semibold font-mono text-sm ${
                        ap.status === "offline" 
                          ? "text-muted-foreground" 
                          : ""
                      }`}>
                        {ap.bandwidth}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => setSelectedAP(ap)}
                      data-testid={`button-details-${ap.id}`}
                    >
                      Details
                    </Button>
                    <Button variant="outline" size="sm" data-testid={`button-restart-${ap.id}`}>
                      <RotateCw className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" data-testid={`button-more-${ap.id}`}>
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Update Firmware
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Settings className="mr-2 h-4 w-4" />
                          Configure
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <RotateCw className="mr-2 h-4 w-4" />
                          Reboot
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedAP} onOpenChange={() => setSelectedAP(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedAP?.name}</DialogTitle>
            <DialogDescription>{selectedAP?.location}</DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="overview" className="mt-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="users">Connected Users</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">Status</p>
                  <div className="mt-2">
                    <StatusBadge status={selectedAP?.status || "offline"} />
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">Firmware</p>
                  <p className="text-lg font-semibold font-mono mt-2">{selectedAP?.firmware}</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">Signal Strength</p>
                  <p className="text-lg font-semibold mt-2">{selectedAP?.signal}%</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">Current Bandwidth</p>
                  <p className="text-lg font-semibold font-mono mt-2">{selectedAP?.bandwidth}</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="users" className="mt-4">
              <p className="text-muted-foreground text-center py-8">
                {selectedAP?.users} users currently connected
              </p>
            </TabsContent>
            <TabsContent value="settings" className="mt-4">
              <p className="text-muted-foreground text-center py-8">
                Access point configuration settings
              </p>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
}
