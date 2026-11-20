"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { TokenStorage, AUTH_ROLE_KEY, AUTH_USER_ID_KEY } from "@/lib/api/client";
import { AuthService, LoginCredentials, RoleType } from "@/lib/api/auth-service";
import { DemoService } from "@/lib/demo/demo-service";
import { DemoAccount, INITIAL_DEMO_ACCOUNTS } from "@/lib/demo/demo-data";

export type UserRole = RoleType;

/**
 * 5-state authentication lifecycle model:
 * 1. initializing: Reading token from storage on initial mount.
 * 2. unauthenticated: No active session or token purged.
 * 3. authenticated-unverified: Token loaded from storage, not yet validated against backend.
 * 4. authenticated-verified: Session confirmed by live backend response.
 * 5. auth-error: Login failed or authentication rejected.
 */
export type AuthStatus =
  | "initializing"
  | "unauthenticated"
  | "authenticated-unverified"
  | "authenticated-verified"
  | "auth-error";

export const DEMO_SESSION_KEY = "pulseid_demo_session";

export interface AuthState {
  token: string | null;
  userId: string | null;
  userRole: UserRole | null;
  isAuthenticated: boolean;
  isTokenVerified: boolean;
  isLoading: boolean;
  status: AuthStatus;
  error: string | null;
  authMode: "real" | "demo";
  isDemo: boolean;
}

export interface AuthContextValue extends AuthState {
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; role?: UserRole; error?: string }>;
  loginDemo: (role: "patient" | "doctor" | "pharmacist", account?: DemoAccount) => void;
  logout: () => void;
  clearError: () => void;
  setVerified: (verified: boolean) => void;
  getDashboardPath: () => string;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function getDashboardPathForRole(role?: UserRole | null): string {
  if (role === "doctor") return "/doctor";
  if (role === "pharmacist") return "/pharmacist";
  return "/patient";
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isTokenVerified, setIsTokenVerified] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [status, setStatus] = useState<AuthStatus>("initializing");
  const [error, setError] = useState<string | null>(null);
  const [authMode, setAuthMode] = useState<"real" | "demo">("real");
  const [isDemo, setIsDemo] = useState<boolean>(false);

  /**
   * Conservative Session Initialization
   * Reads from browser storage on client mount.
   *
   * Operational Rule:
   * - Restores isolated demo session if pulseid_demo_session is set.
   * - Otherwise checks real backend token via TokenStorage.
   */
  useEffect(() => {
    const initTimer = setTimeout(() => {
      try {
        // 1. Check for isolated demo session first
        const demoSessionStr = localStorage.getItem(DEMO_SESSION_KEY);
        if (demoSessionStr) {
          try {
            const demo = JSON.parse(demoSessionStr);
            if (demo && demo.active && (demo.role === "patient" || demo.role === "doctor" || demo.role === "pharmacist")) {
              setToken(null);
              setUserRole(demo.role);
              setUserId(demo.userId);
              setIsAuthenticated(true);
              setIsTokenVerified(true);
              setAuthMode("demo");
              setIsDemo(true);
              setStatus("authenticated-verified");
              setIsLoading(false);
              if (demo.userId) {
                const found = DemoService.getAccounts().find((a) => a.id === demo.userId);
                if (found) {
                  DemoService.setActiveAccount(found);
                }
              }
              return;
            }
          } catch {}
        }

        // 2. Otherwise restore real session from storage
        const storedToken = TokenStorage.get();
        const storedRole = (localStorage.getItem(AUTH_ROLE_KEY) as UserRole) || null;
        const storedUserId = localStorage.getItem(AUTH_USER_ID_KEY) || null;

        if (storedToken && !TokenStorage.isFakeToken(storedToken)) {
          setToken(storedToken);
          setUserRole(storedRole);
          setUserId(storedUserId);
          setIsAuthenticated(true);
          setIsTokenVerified(false);
          setAuthMode("real");
          setIsDemo(false);
          setStatus("authenticated-unverified");
        } else {
          TokenStorage.clear();
          setToken(null);
          setUserRole(null);
          setUserId(null);
          setIsAuthenticated(false);
          setIsTokenVerified(false);
          setAuthMode("real");
          setIsDemo(false);
          setStatus("unauthenticated");
        }
      } catch {
        setToken(null);
        setIsAuthenticated(false);
        setIsTokenVerified(false);
        setAuthMode("real");
        setIsDemo(false);
        setStatus("unauthenticated");
      } finally {
        setIsLoading(false);
      }
    }, 0);

    return () => clearTimeout(initTimer);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const setVerified = useCallback((verified: boolean) => {
    setIsTokenVerified(verified);
    if (verified) {
      setStatus("authenticated-verified");
    }
  }, []);

  /**
   * Explicit Demo Login Action
   * Activates an isolated demo session without sending credentials or tokens to the backend.
   */
  const loginDemo = useCallback((role: "patient" | "doctor" | "pharmacist", account?: DemoAccount) => {
    // Purge any real token so sessions are never mixed
    TokenStorage.clear();
    const targetAccount =
      account ||
      (role === "patient"
        ? INITIAL_DEMO_ACCOUNTS[0]
        : role === "doctor"
        ? INITIAL_DEMO_ACCOUNTS[1]
        : INITIAL_DEMO_ACCOUNTS[2]);
    const demoUserId = targetAccount.id;
    const demoRole = targetAccount.role;
    const demoSession = {
      active: true,
      role: demoRole,
      userId: demoUserId,
      name: targetAccount.fullName,
      enteredAt: new Date().toISOString(),
    };
    try {
      localStorage.setItem(DEMO_SESSION_KEY, JSON.stringify(demoSession));
      localStorage.setItem("pulseid_patient_profile_completed", "true");
      DemoService.setActiveAccount(targetAccount);
    } catch {}

    setToken(null);
    setUserId(demoUserId);
    setUserRole(demoRole as UserRole);
    setIsAuthenticated(true);
    setIsTokenVerified(true);
    setAuthMode("demo");
    setIsDemo(true);
    setStatus("authenticated-verified");
    setError(null);
    setIsLoading(false);
  }, []);

  /**
   * Real Login Action
   * All roles authenticate through the single centralized endpoint POST /api/v1/Users/Login.
   * Role is derived from backend response (typeId: 1 = patient, 2 = doctor, 3 = pharmacist).
   */
  const login = useCallback(
    async (credentials: LoginCredentials): Promise<{ success: boolean; role?: UserRole; error?: string }> => {
      setError(null);
      setIsLoading(true);

      // Clear any prior demo session
      try {
        localStorage.removeItem(DEMO_SESSION_KEY);
      } catch {}
      setAuthMode("real");
      setIsDemo(false);

      try {
        const response = await AuthService.login(credentials);

        if (response.success && response.token) {
          TokenStorage.set(response.token);
          setToken(response.token);
          setIsAuthenticated(true);
          setIsTokenVerified(true);
          setAuthMode("real");
          setIsDemo(false);
          setStatus("authenticated-verified");

          // Extract role confirmed by backend
          const confirmedRole = response.role || null;
          setUserRole(confirmedRole);

          if (confirmedRole) {
            try {
              localStorage.setItem(AUTH_ROLE_KEY, confirmedRole);
            } catch {}
          } else {
            try {
              localStorage.removeItem(AUTH_ROLE_KEY);
            } catch {}
          }

          if (response.user?.id) {
            setUserId(response.user.id);
            try {
              localStorage.setItem(AUTH_USER_ID_KEY, response.user.id);
            } catch {}
          }

          setIsLoading(false);
          return { success: true, role: confirmedRole || undefined };
        }

        const errorMessage = response.error || "Authentication failed.";
        setError(errorMessage);
        setStatus("auth-error");
        setIsLoading(false);
        return { success: false, error: errorMessage };
      } catch (err) {
        const message = err instanceof Error ? err.message : "An unexpected error occurred during login.";
        setError(message);
        setStatus("auth-error");
        setIsLoading(false);
        return { success: false, error: message };
      }
    },
    []
  );

  /**
   * Logout Action
   * Clears state and storage, resets status to unauthenticated.
   */
  const logout = useCallback(() => {
    TokenStorage.clear();
    try {
      localStorage.removeItem(DEMO_SESSION_KEY);
      localStorage.removeItem("pulseid_demo_active_account_id");
    } catch {}
    setToken(null);
    setUserId(null);
    setUserRole(null);
    setIsAuthenticated(false);
    setIsTokenVerified(false);
    setAuthMode("real");
    setIsDemo(false);
    setStatus("unauthenticated");
    setError(null);
  }, []);

  const getDashboardPath = useCallback(() => {
    return getDashboardPathForRole(userRole);
  }, [userRole]);

  const value = useMemo<AuthContextValue>(
    () => ({
      token,
      userId,
      userRole,
      isAuthenticated,
      isTokenVerified,
      isLoading,
      status,
      error,
      authMode,
      isDemo,
      login,
      loginDemo,
      logout,
      clearError,
      setVerified,
      getDashboardPath,
    }),
    [
      token,
      userId,
      userRole,
      isAuthenticated,
      isTokenVerified,
      isLoading,
      status,
      error,
      authMode,
      isDemo,
      login,
      loginDemo,
      logout,
      clearError,
      setVerified,
      getDashboardPath,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
