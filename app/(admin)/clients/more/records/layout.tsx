import RecordFilter from "@/components/clients/MoreTabs/Records/RecordFilter";
import Records from "@/components/clients/MoreTabs/Records/Records";
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4 lg:space-y-6">
      <Records />
      <RecordFilter />
      {children}
    </div>
  );
}
