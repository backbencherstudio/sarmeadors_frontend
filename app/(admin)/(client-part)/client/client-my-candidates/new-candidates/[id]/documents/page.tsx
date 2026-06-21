"use client";

import DocumentList from "@/components/clients/AdminTabs/Documents/DocumentList";
import { useGetSingleClientMyCandidateQuery } from "@/feature/dashboard/client/myCandidate";
import { useParams } from "next/navigation";

export default function page() {
  const { id } = useParams();
  const { data } = useGetSingleClientMyCandidateQuery(id);

  const documents = data?.data?.candidate?.documents;

  return (
    <div>
      <DocumentList data={documents} />
    </div>
  );
}
