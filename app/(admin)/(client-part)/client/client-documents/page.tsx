"use client";

import { Card } from "@/components/ui/card";
import ListBlackIcon from "@/public/icon/ListBlackIcon";
import ListGreenIcon from "@/public/icon/ListGreenIcon";
import Link from "next/link";
import { useState } from "react";

import { toast } from "react-toastify";

interface Document {
  id: string;
  title: string;
  addedDate: string;
  signedDate?: string;
  isSigned: boolean;
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      title: "Client - Agency Agreement Placement Fee & Refund Policy",
      addedDate: "Please review and sign this agreement.",
      isSigned: false,
    },
    {
      id: "2",
      title: "Client - Agency Agreement Placement Fee & Refund Policy",
      addedDate: "Please review and sign this agreement.",
      signedDate: "Tue Dec 02 2025",
      isSigned: true,
    },
  ]);

  const toggleDocumentStatus = (id: string) => {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === id ? { ...doc, isSigned: !doc.isSigned } : doc,
      ),
    );
  };

  const handleAction = (id: string, action: string) => {
    console.log(`Action: ${action} for document ${id}`);
  };

  const handleCopyLink = async (documentId: string) => {
    try {
      const documentUrl = `${window.location.origin}/clients/document/document-details?id=${documentId}`;
      await navigator.clipboard.writeText(documentUrl);
      toast.success("Link copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy link. Please try again.");
    }
  };

  return (
    <div className="w-full space-y-6 p-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row gap-4 md:items-end justify-between items-start">
        <div className="space-y-4 w-full">
          <h1 className="text-2xl font-bold text-gray-900">Agreements</h1>
          {/* <Select>
            <SelectTrigger className="w-full md:w-1/2 h-12!">
              <SelectValue placeholder="Select template to add" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="template1">Template 1</SelectItem>
              <SelectItem value="template2">Template 2</SelectItem>
              <SelectItem value="template3">Template 3</SelectItem>
            </SelectContent>
          </Select> */}
        </div>
        {/* <ButtonReuseable
          title="Manage and edit Templates"
          className=" px-4 py-2 cursor-pointer text-nowrap"
        /> */}
      </div>

      {/* Document Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {documents.map((document) => (
          <Card
            key={document.id}
            className="relative p-6 gap-0 bg-white border border-gray-200 shadow-sm"
          >
            {/* Document Icon */}
            <div className="flex justify-center mb-6 mt-2">
              <div className="relative">
                {/* Document Stack */}
                {document.isSigned ? <ListGreenIcon /> : <ListBlackIcon />}
              </div>
            </div>

            {/* Document Title */}
            <h3 className="text-base font-semibold text-gray-900 text-center px-4">
              {document.title}
            </h3>

            {/* Dates */}
            <div className="space-y-1 mb-4 text-center">
              <p className="text-sm text-gray-600">
                Added: {document.addedDate}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-2">
              <Link
                href={`/client/client-documents/document-details?id=${document.id}`}
                className="inline-flex items-center justify-center rounded-[12px] bg-black text-white px-4 py-3.5 border-0 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                onClick={() => handleAction(document.id, "edit")}
              >
                Sign Agreement
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
