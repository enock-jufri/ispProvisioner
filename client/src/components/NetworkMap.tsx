import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline } from "react-leaflet";
import { Icon, LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/StatusBadge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import type { AccessPoint, Customer } from "@shared/schema";

interface NetworkMapProps {
  accessPoints: AccessPoint[];
  customers: Customer[];
  className?: string;
}

const createIcon = (color: string, iconType: "ap" | "customer") => {
  const svgAP = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="11" fill="${color}" stroke="white" stroke-width="2"/>
      <path d="M12 6v12M6 12h12" stroke="white" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `;

  const svgCustomer = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" fill="${color}" stroke="white" stroke-width="2"/>
      <circle cx="12" cy="12" r="3" fill="white"/>
    </svg>
  `;

  return new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(iconType === "ap" ? svgAP : svgCustomer)}`,
    iconSize: iconType === "ap" ? [32, 32] : [24, 24],
    iconAnchor: iconType === "ap" ? [16, 16] : [12, 12],
    popupAnchor: [0, iconType === "ap" ? -16 : -12],
  });
};

const apOnlineIcon = createIcon("#22c55e", "ap");
const apOfflineIcon = createIcon("#ef4444", "ap");
const customerActiveIcon = createIcon("#3b82f6", "customer");
const customerInactiveIcon = createIcon("#9ca3af", "customer");

export function NetworkMap({ accessPoints, customers, className }: NetworkMapProps) {
  const [activeLayer, setActiveLayer] = useState<"all" | "aps" | "customers" | "coverage">("all");
  const [selectedAP, setSelectedAP] = useState<string | null>(null);

  const center: LatLngExpression = accessPoints.length > 0
    ? [accessPoints[0].latitude, accessPoints[0].longitude]
    : [40.7539, -73.9801];

  const bounds = accessPoints.length > 0
    ? accessPoints.map(ap => [ap.latitude, ap.longitude] as LatLngExpression)
    : undefined;

  const getConnectedCustomers = (apId: string) => {
    return customers.filter(c => c.connectedApId === apId);
  };

  const getCoverageRadius = (ap: AccessPoint) => {
    const baseRadius = 200;
    const signalMultiplier = ap.signalStrength / 100;
    return baseRadius * signalMultiplier;
  };

  const showAPs = activeLayer === "all" || activeLayer === "aps" || activeLayer === "coverage";
  const showCustomers = activeLayer === "all" || activeLayer === "customers";
  const showCoverage = activeLayer === "coverage" || activeLayer === "all";
  const showConnections = selectedAP !== null;

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Network Coverage Map</CardTitle>
          <Tabs value={activeLayer} onValueChange={(v) => setActiveLayer(v as typeof activeLayer)}>
            <TabsList>
              <TabsTrigger value="all" data-testid="tab-all">All</TabsTrigger>
              <TabsTrigger value="aps" data-testid="tab-aps">Access Points</TabsTrigger>
              <TabsTrigger value="customers" data-testid="tab-customers">Customers</TabsTrigger>
              <TabsTrigger value="coverage" data-testid="tab-coverage">Coverage</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg overflow-hidden border" style={{ height: "600px" }}>
          <MapContainer
            center={center}
            zoom={14}
            style={{ height: "100%", width: "100%" }}
            bounds={bounds}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {showAPs && accessPoints.map((ap) => (
              <Marker
                key={ap.id}
                position={[ap.latitude, ap.longitude]}
                icon={ap.status === "online" ? apOnlineIcon : apOfflineIcon}
                eventHandlers={{
                  click: () => setSelectedAP(ap.id),
                }}
              >
                <Popup>
                  <div className="p-2 min-w-[200px]">
                    <h3 className="font-semibold text-base mb-2">{ap.name}</h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Location:</span>
                        <span className="font-medium">{ap.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <StatusBadge status={ap.status as "online" | "offline"} />
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Users:</span>
                        <Badge variant="secondary">{ap.connectedUsers}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Signal:</span>
                        <span className="font-medium">{ap.signalStrength}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Bandwidth:</span>
                        <span className="font-mono text-xs">{ap.bandwidth}</span>
                      </div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}

            {showCoverage && accessPoints.map((ap) => (
              <Circle
                key={`coverage-${ap.id}`}
                center={[ap.latitude, ap.longitude]}
                radius={getCoverageRadius(ap)}
                pathOptions={{
                  color: ap.status === "online" ? "#22c55e" : "#ef4444",
                  fillColor: ap.status === "online" ? "#22c55e" : "#ef4444",
                  fillOpacity: 0.1,
                  weight: 2,
                }}
              />
            ))}

            {showCustomers && customers.map((customer) => (
              <Marker
                key={customer.id}
                position={[customer.latitude, customer.longitude]}
                icon={customer.status === "active" ? customerActiveIcon : customerInactiveIcon}
              >
                <Popup>
                  <div className="p-2 min-w-[180px]">
                    <h3 className="font-semibold text-base mb-2">{customer.name}</h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Email:</span>
                        <span className="text-xs">{customer.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Plan:</span>
                        <Badge variant="secondary">{customer.plan}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <StatusBadge status={customer.status as "active" | "suspended" | "pending"} />
                      </div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}

            {showConnections && selectedAP && (() => {
              const ap = accessPoints.find(a => a.id === selectedAP);
              if (!ap) return null;
              const connectedCustomers = getConnectedCustomers(selectedAP);
              return connectedCustomers.map(customer => (
                <Polyline
                  key={`connection-${customer.id}`}
                  positions={[
                    [ap.latitude, ap.longitude],
                    [customer.latitude, customer.longitude],
                  ]}
                  pathOptions={{
                    color: "#3b82f6",
                    weight: 2,
                    opacity: 0.6,
                    dashArray: "5, 10",
                  }}
                />
              ));
            })()}
          </MapContainer>
        </div>

        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
            <span className="text-sm text-muted-foreground">Online AP</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-500"></div>
            <span className="text-sm text-muted-foreground">Offline AP</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-500"></div>
            <span className="text-sm text-muted-foreground">Active Customer</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gray-400"></div>
            <span className="text-sm text-muted-foreground">Inactive Customer</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
