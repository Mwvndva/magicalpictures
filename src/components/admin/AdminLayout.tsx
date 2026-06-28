// src/components/admin/AdminLayout.tsx
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from './AdminAuthContext';

interface Props { children: ReactNode }

export default function AdminLayout({ children }: Props) {
  const { isAuthenticated } = useAdminAuth();

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {children}
    </div>
  );
}
