// src/components/admin/AdminAuthContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiLogin } from '@/lib/api';

interface AuthCtx {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AdminAuthContext = createContext<AuthCtx>({
  isAuthenticated: false,
  login: async () => false,
  logout: () => {},
});

const SESSION_KEY = 'mp_admin_auth';

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem(SESSION_KEY) === 'true';
  });

  useEffect(() => {
    sessionStorage.setItem(SESSION_KEY, String(isAuthenticated));
  }, [isAuthenticated]);

  const login = async (username: string, password: string) => {
    try {
      const res = await apiLogin(username, password);
      if (res.success) {
        setIsAuthenticated(true);
        return true;
      }
    } catch {
      // server not available — allow hardcoded fallback
      if (username === 'jeff' && password === '123456') {
        setIsAuthenticated(true);
        return true;
      }
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(SESSION_KEY);
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}
