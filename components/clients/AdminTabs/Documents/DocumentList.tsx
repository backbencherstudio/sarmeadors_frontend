"use client";

import DocumentCard from "./DocumentCard";

function DocumentList({ data }) {
  const handleAction = (id: string) => {
    // console.log("Document clicked:", id);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data?.map((agreement: any) => (
          <DocumentCard
            key={agreement.id}
            id={String(agreement.id)}
            title={agreement.title}
            addedDate={agreement.description}
            isSigned={agreement?.can_sign}
            link={`/client/client-documents/document-details?id=${agreement.id}`}
            fileUrl={agreement.file_url}
            onAction={handleAction}
            linkText={agreement.can_sign ? "Sign Agreement" : "View Agreement"}
          />
        ))}
      </div>
    </div>
  );
}

export default DocumentList;
