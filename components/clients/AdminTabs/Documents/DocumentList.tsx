"use client";

import CandidateDocumentCardSkeleton from "@/components/candidate/candidate-document/CandidateDocumentCardSkeleton";
import { UserDocument } from "@/types";
import DocumentCard from "./DocumentCard";

function DocumentList({
  data,
  isLoading,
}: {
  data: UserDocument[] | undefined;
  isLoading?: boolean;
}) {
  const handleAction = (id: string) => {
    // console.log("Document clicked:", id);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {isLoading
          ? [...Array(4)].map((_, index) => (
              <CandidateDocumentCardSkeleton key={index} />
            ))
          : data?.map((agreement: UserDocument) => (
              <DocumentCard
                key={agreement.id}
                id={String(agreement.id)}
                title={agreement.title}
                addedDate={agreement.description}
                isSigned={agreement?.can_sign}
                link={`/client/client-documents/document-details?id=${agreement.id}`}
                fileUrl={agreement.file_url}
                onAction={handleAction}
                linkText={
                  agreement.can_sign ? "Sign Agreement" : "View Agreement"
                }
              />
            ))}
      </div>
    </div>
  );
}

export default DocumentList;
