"use client";

import DocumentList from "@/components/clients/AdminTabs/Documents/DocumentList";
import { useGetClientDocumentsQuery } from "@/feature/dashboard/client/documents";

export default function DocumentsPage() {
  const { data } = useGetClientDocumentsQuery({});

  const agreements = data?.data?.agreements ?? [];
  return (
    <div className="w-full space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 md:items-end justify-between items-start">
        <div className="space-y-4 w-full">
          <h1 className="text-2xl font-bold text-gray-900">Agreements</h1>
        </div>
      </div>

      {/* Cards */}
      <DocumentList data={agreements} />
    </div>
  );
}
