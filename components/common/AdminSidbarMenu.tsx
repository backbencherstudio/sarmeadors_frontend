"use client";

import Header from "@/components/common/Header";
import Sidebar from "@/components/common/Sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
interface AdminSidbarMenuProps {
  children: React.ReactNode;
}
const AdminSidbarMenu: React.FC<AdminSidbarMenuProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const queryClient = new QueryClient();
  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-full h-screen overflow-hidden relative">
        {/* Centered layout container */}
        <div className="relative  flex h-full">
          {/* Sidebar */}
          <div
            className={`
              fixed top-0 left-0 h-screen z-30 bg-white border-r border-borderColor
              transition-transform duration-300 ease-in-out
              ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
              xl:static xl:translate-x-0 z-50
              ${isCollapsed ? "xl:w-20 w-[300px]" : "w-[300px]"}
            `}
          >
            <Sidebar
              isOpen={sidebarOpen}
              onClose={closeSidebar}
              isCollapsed={isCollapsed}
              onToggleCollapse={toggleCollapse}
            />
          </div>

          {/* Overlay for mobile */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 backdrop-blur-[1.5px] w-full h-full bg-black/50 xl:hidden z-20"
              onClick={closeSidebar}
            />
          )}

          {/* Main Content Area */}
          <div className="flex-1 w-full h-full flex flex-col min-h-0">
            {/* Header */}
            <div className="w-full sticky top-0 left-0 z-10">
              <Header onMenuClick={openSidebar} sidebarOpen={sidebarOpen} />
            </div>

            {/* Scrollable content area */}
            <main className="flex-1 overflow-y-auto overflow-x-hidden  text-headerColor">
              {children}
              <ToastContainer />
            </main>
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default AdminSidbarMenu;
