import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldAlert } from "lucide-react";
import { useLocation } from "wouter";

export default function Unauthorized() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
              <ShieldAlert className="w-10 h-10 text-destructive" />
            </div>
          </div>
          <div>
            <CardTitle className="text-2xl">Access Denied</CardTitle>
            <CardDescription className="mt-2">
              You don't have permission to access this page
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Button onClick={() => setLocation("/")} data-testid="button-go-back">
            Go to Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
