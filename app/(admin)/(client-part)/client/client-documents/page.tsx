"use client";

import DocumentCard from "@/components/client/Documents/DocumentCard";
import { useState } from "react";

interface Document {
  id: string;
  title: string;
  addedDate: string;
  signedDate?: string;
  isSigned: boolean;
  linkText: string;
}

export default function DocumentsPage() {
  const [documents] = useState<Document[]>([
    {
      id: "1",
      title: "Client - Agency Agreement Placement Fee & Refund Policy",
      addedDate: "Please review and sign this agreement.",
      isSigned: false,
      linkText: "Sign Agreement",
    },
    {
      id: "2",
      title: "Client - Agency Agreement Placement Fee & Refund Policy",
      addedDate: "Please review and sign this agreement.",
      signedDate: "Tue Dec 02 2025",
      isSigned: true,
      linkText: "Sign Agreement",
    },
  ]);

  const handleAction = (id: string) => {
    console.log("Document clicked:", id);
  };

  return (
    <div className="w-full space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 md:items-end justify-between items-start">
        <div className="space-y-4 w-full">
          <h1 className="text-2xl font-bold text-gray-900">Agreements</h1>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {documents.map((doc) => (
          <DocumentCard
            key={doc.id}
            id={doc.id}
            title={doc.title}
            addedDate={doc.addedDate}
            isSigned={doc.isSigned}
            link={`/client/client-documents/document-details?id=${doc.id}`}
            onAction={handleAction}
            linkText={doc?.linkText}
          />
        ))}
      </div>
    </div>
  );
}
