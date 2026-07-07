"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import api, { setAccessToken } from "@/services/api";

interface UserProfile {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const initializeAuth = async () => {
    try {
      // Try to refresh token on initial load
      const response = await api.post("/auth/refresh");
      if (response.data.accessToken) {
        setAccessToken(response.data.accessToken);
        setUser(response.data.user);
      }
    } catch (error) {
      console.log("No active session found on initial load.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initializeAuth();
  }, []);

  // Protect client side routes
  useEffect(() => {
    if (!loading) {
      const publicPaths = ["/", "/login", "/register"];
      const isPublicPath = publicPaths.includes(pathname);
      if (!user && !isPublicPath) {
        router.push("/login");
      } else if (user && (pathname === "/login" || pathname === "/register")) {
        router.push("/analyze");
      }
    }
  }, [user, loading, pathname, router]);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await api.post("/auth/login", { email, password });
      if (response.data.success) {
        setAccessToken(response.data.accessToken);
        setUser(response.data.user);
        router.push("/analyze");
      }
    } catch (error: any) {
      throw error.response?.data?.message || "Failed to login.";
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      const response = await api.post("/auth/register", { name, email, password });
      if (response.data.success) {
        setAccessToken(response.data.accessToken);
        setUser(response.data.user);
        router.push("/analyze");
      }
    } catch (error: any) {
      throw error.response?.data?.message || "Failed to register.";
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout request failed:", error);
    } finally {
      setAccessToken(null);
      setUser(null);
      setLoading(false);
      router.push("/login");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
