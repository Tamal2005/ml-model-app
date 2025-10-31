import React from 'react';
import { useSidebar } from './SidebarContext';

export default function ContentLayout({ children }: { children: React.ReactNode }) {
  const { isSidebarOpen } = useSidebar();


  return (
    <div
      className={`transition-all duration-300 min-h-screen p-2 md:p-5 ${isSidebarOpen ? `md:ml-[296px]` : "ml-0"}
    ${isSidebarOpen ? "fixed inset-0 md:static" : ""}`}
      >
      {children}
    </div>
  );
}