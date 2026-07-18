"use client";

import DocumentList from "@/components/clients/AdminTabs/Documents/DocumentList";
import { useGetSingleApplicantQuery } from "@/feature/dashboard/client/myJob";
import { useSearchParams } from "next/navigation";

// interface Document {
//   id: string;
//   title: string;
//   addedDate: string;
//   signedDate?: string;
//   isSigned: boolean;
//   linkText: string;
// }

function DocumentListPage() {
  const params = useSearchParams();
  const jobId = params.get("jobId");
  const candidateId = params.get("candidateId");

  const { data } = useGetSingleApplicantQuery({
    jobId: jobId,
    applicantId: candidateId,
  });
  const documents = data?.data?.candidate?.documents;

  return (
    <div>
      <DocumentList data={documents} />
    </div>
  );
}

export default DocumentListPage;
