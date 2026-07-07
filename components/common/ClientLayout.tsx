"use client";
import { ReduxProvider } from "@/feature/provider";
import { TokenProvider } from "@/hooks/useToken";
import { QueryClient } from "@tanstack/react-query";
import React, { Suspense, useState } from "react";

interface ClientLayoutProps {
  children: React.ReactNode;
}
const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const queryClient = new QueryClient();
  const openSidebar = () => setSidebarOpen(true);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <ReduxProvider>
      <TokenProvider>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </TokenProvider>
    </ReduxProvider>
  );
};

export default ClientLayout;
