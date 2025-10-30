import { UserMenu } from "../UserMenu";
import { AuthProvider } from "@/contexts/AuthContext";

export default function UserMenuExample() {
  return (
    <AuthProvider>
      <div className="p-8 bg-background flex justify-end">
        <UserMenu />
      </div>
    </AuthProvider>
  );
}
