"use client";
import { useState } from "react";
import DocumentCard from "../AdminTabs/Documents/DocumentCard";
interface Document {
  id: string;
  title: string;
  addedDate: string;
  signedDate?: string;
  isSigned: boolean;
  linkText: string;
}
export default function Document() {
  const [documents] = useState<Document[]>([
    {
      id: "1",
      title: "Nanny Resume",
      addedDate:
        "Moke sure your resume highlights your nonny ond other childcare experience",
      isSigned: false,
      linkText: "View",
    },
    {
      id: "2",
      title: "Driver's license or government issued card",
      addedDate: "You've already signed this agreement.",
      isSigned: true,
      linkText: "View",
    },
    {
      id: "3",
      title: "Letter(s) of recommendation",
      addedDate: "You've already signed this agreement.",
      isSigned: true,
      linkText: "View",
    },
    {
      id: "4",
      title: "Additional Letter(s) of recommendation",
      addedDate: "You've already signed this agreement.",
      isSigned: true,
      linkText: "View",
    },
  ]);

  const handleAction = (id: string) => {
    console.log("Document clicked:", id);
  };

  return (
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
  );
}
