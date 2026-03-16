"use client";
import { createContext, useState } from "react";

export interface User {
  id: number;
  email: string;
  role: string;
  token: string;
  expiresAt?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  hasRole: (role: string) => boolean;
  //   login: (email: string, password: string) => Promise<void | User>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const hasRole = (role: string) =>
    user?.role?.toLowerCase() === role.toLowerCase();

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role?.toLowerCase() === "admin",
        hasRole,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


