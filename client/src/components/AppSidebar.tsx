import {
  LayoutDashboard,
  Users,
  Wifi,
  CreditCard,
  BarChart3,
  Headphones,
  Network,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuth, type UserRole } from "@/contexts/AuthContext";
import { useLocation } from "wouter";

interface NavItem {
  title: string;
  url: string;
  icon: typeof LayoutDashboard;
  allowedRoles?: UserRole[];
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "User Management",
    url: "/users",
    icon: Users,
    allowedRoles: ["super_admin", "network_admin"],
  },
  {
    title: "Access Points",
    url: "/access-points",
    icon: Wifi,
    allowedRoles: ["super_admin", "network_admin"],
  },
  {
    title: "Billing",
    url: "/billing",
    icon: CreditCard,
    allowedRoles: ["super_admin", "billing_admin"],
  },
  {
    title: "Reports",
    url: "/reports",
    icon: BarChart3,
    allowedRoles: ["super_admin", "billing_admin", "network_admin"],
  },
  {
    title: "Support",
    url: "/support",
    icon: Headphones,
    allowedRoles: ["super_admin", "support_agent"],
  },
];

export function AppSidebar() {
  const { hasPermission } = useAuth();
  const [location] = useLocation();

  const filteredItems = navItems.filter(
    (item) => !item.allowedRoles || hasPermission(item.allowedRoles)
  );

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2 px-4 py-6">
            <Network className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">NetConnect ISP</span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location === item.url}
                    data-testid={`nav-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <a href={item.url}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
