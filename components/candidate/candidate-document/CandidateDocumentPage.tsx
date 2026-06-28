"use client";

import { useGetCandidateDocumentQuery } from "@/feature/slice/candidate/candidate-dashboard/candidateDocumentSlice";
import { RequiredDocument } from "@/types";
import CandidateDocumentCard from "./CandidateDocumentCard";
import CandidateDocumentCardSkeleton from "./CandidateDocumentCardSkeleton";

function CandidateDocumentPage() {
  const { data: documents, isLoading } =
    useGetCandidateDocumentQuery("Documents");

  console.log(documents);

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
            />
          ))}
    </div>
  );
}

export default CandidateDocumentPage;
