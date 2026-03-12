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

export default function page() {
  const [documents] = useState<Document[]>([
    {
      id: "1",
      title: "Nanny Resume",
      addedDate:
        "Make sure highlights your nanny and other childcare experience",
      isSigned: false,
      linkText: "View",
    },
    {
      id: "2",
      title: "Driver's License or government issued card",
      addedDate: "You've already signed this agreement.",
      signedDate: "Tue Dec 02 2025",
      isSigned: true,
      linkText: "View",
    },
    {
      id: "3",
      title: "Letter(S) of recommendation",
      addedDate: "You've already signed this agreement.",
      signedDate: "Tue Dec 02 2025",
      isSigned: true,
      linkText: "View",
    },
    {
      id: "4",
      title: "Letter(S) of recommendation",
      addedDate: "You've already signed this agreement.",
      signedDate: "Tue Dec 02 2025",
      isSigned: true,
      linkText: "View",
    },
  ]);

  const handleAction = (id: string) => {
    console.log("Document clicked:", id);
  };

  return (
    <div>
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
