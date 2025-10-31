// SidebarContext.tsx
import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

// Define the context type
interface SidebarContextType {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  SIDEBAR_WIDTH: number;
}

// Create context with undefined as initial value
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

// Custom hook with type checking
export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within SidebarProvider');
  }
  return context;
};

// Provider props type
interface SidebarProviderProps {
  children: ReactNode;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const SIDEBAR_WIDTH = 296; // 74 * 4 = 296px (w-74 in Tailwind)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const value: SidebarContextType = {
    isSidebarOpen,
    toggleSidebar,
    SIDEBAR_WIDTH
  };

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
};