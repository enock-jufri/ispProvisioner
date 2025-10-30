import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AppSidebar } from "@/components/AppSidebar";
import { UserMenu } from "@/components/UserMenu";
import { ThemeToggle } from "@/components/ThemeToggle";

import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import UserManagement from "@/pages/UserManagement";
import AccessPoints from "@/pages/AccessPoints";
import Billing from "@/pages/Billing";
import Reports from "@/pages/Reports";
import Support from "@/pages/Support";
import Unauthorized from "@/pages/Unauthorized";
import NotFound from "@/pages/not-found";

function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex items-center justify-between px-6 py-4 border-b bg-background">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <UserMenu />
            </div>
          </header>
          <main className="flex-1 overflow-auto px-8 py-8">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function Router() {
  const { isAuthenticated } = useAuth();
  const [location] = useLocation();

  if (!isAuthenticated && location !== "/login") {
    return <Route path="*" component={Login} />;
  }

  if (isAuthenticated && location === "/login") {
    window.location.href = "/";
    return null;
  }

  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/unauthorized" component={Unauthorized} />
      
      <Route path="/">
        <ProtectedRoute>
          <AuthenticatedLayout>
            <Dashboard />
          </AuthenticatedLayout>
        </ProtectedRoute>
      </Route>

      <Route path="/users">
        <ProtectedRoute allowedRoles={["super_admin", "network_admin"]}>
          <AuthenticatedLayout>
            <UserManagement />
          </AuthenticatedLayout>
        </ProtectedRoute>
      </Route>

      <Route path="/access-points">
        <ProtectedRoute allowedRoles={["super_admin", "network_admin"]}>
          <AuthenticatedLayout>
            <AccessPoints />
          </AuthenticatedLayout>
        </ProtectedRoute>
      </Route>

      <Route path="/billing">
        <ProtectedRoute allowedRoles={["super_admin", "billing_admin"]}>
          <AuthenticatedLayout>
            <Billing />
          </AuthenticatedLayout>
        </ProtectedRoute>
      </Route>

      <Route path="/reports">
        <ProtectedRoute allowedRoles={["super_admin", "billing_admin", "network_admin"]}>
          <AuthenticatedLayout>
            <Reports />
          </AuthenticatedLayout>
        </ProtectedRoute>
      </Route>

      <Route path="/support">
        <ProtectedRoute allowedRoles={["super_admin", "support_agent"]}>
          <AuthenticatedLayout>
            <Support />
          </AuthenticatedLayout>
        </ProtectedRoute>
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
          <AuthProvider>
            <Router />
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
