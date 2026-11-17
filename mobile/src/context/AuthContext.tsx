/**
 * AuthContext.tsx — Global authentication state for Nocturne Mobile
 */

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { apiPost } from "@/lib/api";
import {
  clearAllStorage,
  getToken,
  getUser,
  saveToken,
  saveUser,
  StoredUser,
} from "@/lib/storage";

type AuthContextType = {
  user: StoredUser | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<StoredUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [storedToken, storedUser] = await Promise.all([
          getToken(),
          getUser(),
        ]);
        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(storedUser);
        }
      } catch {
        // Ignore storage errors
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await apiPost<{
      token: string;
      user: StoredUser;
    }>("/api/auth/login", { email, password });

    if (!res.success || !res.data) {
      throw new Error(res.message || "Login gagal");
    }

    const { token: newToken, user: newUser } = res.data;
    await Promise.all([saveToken(newToken), saveUser(newUser)]);
    setToken(newToken);
    setUser(newUser);
  }, []);

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      const res = await apiPost("/api/auth/register", { name, email, password });
      if (!res.success) {
        throw new Error(res.message || "Registrasi gagal");
      }
    },
    []
  );

  const logout = useCallback(async () => {
    await clearAllStorage();
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!token && !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

const defaultAuthContext: AuthContextType = {
  user: null,
  token: null,
  isLoading: false,
  isAuthenticated: false,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  return ctx || defaultAuthContext;
}
