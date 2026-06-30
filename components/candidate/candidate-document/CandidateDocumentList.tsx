"use client";

import DocumentList from "@/components/clients/AdminTabs/Documents/DocumentList";
import { useGetCandidateDocumentQuery } from "@/feature/slice/candidate/candidate-dashboard/candidateDocumentSlice";

function CandidateDocumentList() {
  const { data: documents, isLoading } =
    useGetCandidateDocumentQuery("Documents");

  return (
    <div>
      <DocumentList data={documents?.data?.agreements} isLoading={isLoading} />
    </div>
  );
}

export default CandidateDocumentList;
