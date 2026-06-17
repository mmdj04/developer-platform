"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

interface User {
  email: string;
  password: string;
  name: string;
  createdAt: string;
}

interface AuthContextType {
  user: Omit<User, "password"> | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  signUp: (email: string, password: string, name: string) => { success: boolean; error?: string };
  logout: () => void;
}

const USERS_KEY = "sdk_auth_users";
const SESSION_KEY = "sdk_auth_session";

function getUsers(): User[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getSession(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(SESSION_KEY);
}

function saveSession(email: string) {
  localStorage.setItem(SESSION_KEY, email);
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Omit<User, "password"> | null>(null);

  useEffect(() => {
    const sessionEmail = getSession();
    if (sessionEmail) {
      const users = getUsers();
      const found = users.find((u) => u.email === sessionEmail);
      if (found) {
        const { password: _, ...safe } = found;
        setUser(safe);
      } else {
        clearSession();
      }
    }
  }, []);

  const login = useCallback(
    (email: string, password: string): { success: boolean; error?: string } => {
      const users = getUsers();
      const found = users.find((u) => u.email === email);

      if (!found) {
        return { success: false, error: "Usuário não encontrado. Verifique seu email." };
      }

      if (found.password !== password) {
        return { success: false, error: "Senha incorreta. Tente novamente." };
      }

      const { password: _, ...safe } = found;
      setUser(safe);
      saveSession(email);
      return { success: true };
    },
    [],
  );

  const signUp = useCallback(
    (email: string, password: string, name: string): { success: boolean; error?: string } => {
      const users = getUsers();

      if (users.some((u) => u.email === email)) {
        return { success: false, error: "Este email já está cadastrado." };
      }

      const newUser: User = {
        email,
        password,
        name: name || email.split("@")[0] || "",
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      saveUsers(users);

      const { password: _, ...safe } = newUser;
      setUser(safe);
      saveSession(email);
      return { success: true };
    },
    [],
  );

  const logout = useCallback(() => {
    setUser(null);
    clearSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signUp,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
