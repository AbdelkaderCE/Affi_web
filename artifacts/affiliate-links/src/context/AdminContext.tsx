import { createContext, useContext, useState } from "react";

interface AdminContextValue {
  isAdminOpen: boolean;
  openAdmin: () => void;
  closeAdmin: () => void;
  toggleAdmin: () => void;
}

const AdminContext = createContext<AdminContextValue | null>(null);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <AdminContext.Provider value={{
      isAdminOpen,
      openAdmin: () => setIsAdminOpen(true),
      closeAdmin: () => setIsAdminOpen(false),
      toggleAdmin: () => setIsAdminOpen(p => !p),
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
}
