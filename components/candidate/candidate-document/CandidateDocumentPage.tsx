"use client";

import { useGetCandidateDocumentQuery } from "@/feature/slice/candidate/candidate-dashboard/candidateDocumentSlice";
import { RequiredDocument } from "@/types";
import { useState } from "react";
import CandidateDocumentCard from "./CandidateDocumentCard";
import CandidateDocumentCardSkeleton from "./CandidateDocumentCardSkeleton";
import CandidateUploadFrom from "./CandidateUploadFrom";

function CandidateDocumentPage() {
  const { data: documents, isLoading } =
    useGetCandidateDocumentQuery("Documents");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDocumentKey, setSelectedDocumentKey] = useState<string | null>(
    null,
  );
  const handleUpload = (key: string) => {
    console.log(key);

    setSelectedDocumentKey(key);
    setIsOpen(true);
  };
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {isLoading
        ? [...Array(4)].map((_, index) => (
            <CandidateDocumentCardSkeleton key={index} />
          ))
        : documents?.data?.required_documents?.map((item: RequiredDocument) => (
            <CandidateDocumentCard
              key={item.key}
              item={item}
              isLoading={isLoading}
              onUpload={handleUpload}
            />
          ))}

      {isOpen && (
        <CandidateUploadFrom
          open={isOpen}
          setOpen={setIsOpen}
          documentKey={selectedDocumentKey}
        />
      )}
    </div>
  );
}

export default CandidateDocumentPage;
