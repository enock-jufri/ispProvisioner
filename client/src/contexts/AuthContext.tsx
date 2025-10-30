import { createContext, useContext, useState, useEffect } from "react";

export type UserRole = "super_admin" | "network_admin" | "billing_admin" | "support_agent" | "customer";

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  hasPermission: (requiredRoles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

//todo: remove mock functionality
const MOCK_USERS: Record<string, { password: string; user: User }> = {
  admin: {
    password: "admin",
    user: {
      id: "1",
      username: "admin",
      email: "admin@netconnect.com",
      role: "super_admin",
      name: "System Administrator",
    },
  },
  network: {
    password: "network",
    user: {
      id: "2",
      username: "network",
      email: "network@netconnect.com",
      role: "network_admin",
      name: "Network Admin",
    },
  },
  billing: {
    password: "billing",
    user: {
      id: "3",
      username: "billing",
      email: "billing@netconnect.com",
      role: "billing_admin",
      name: "Billing Manager",
    },
  },
  support: {
    password: "support",
    user: {
      id: "4",
      username: "support",
      email: "support@netconnect.com",
      role: "support_agent",
      name: "Support Agent",
    },
  },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const userData = localStorage.getItem("user_data");
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user_data");
      }
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    //todo: remove mock functionality
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    const mockUser = MOCK_USERS[username];
    if (mockUser && mockUser.password === password) {
      const token = `mock_jwt_${Date.now()}`;
      localStorage.setItem("auth_token", token);
      localStorage.setItem("user_data", JSON.stringify(mockUser.user));
      setUser(mockUser.user);
    } else {
      throw new Error("Invalid credentials");
    }
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");
    setUser(null);
  };

  const hasPermission = (requiredRoles: UserRole[]) => {
    if (!user) return false;
    return requiredRoles.includes(user.role);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        logout,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
