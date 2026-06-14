"use client";
import { ReduxProvider } from "@/feature/provider";
import { TokenProvider } from "@/hooks/useToken";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
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
      <QueryClientProvider client={queryClient}>
        <TokenProvider>
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </TokenProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ReduxProvider>
  );
};

export default ClientLayout;
