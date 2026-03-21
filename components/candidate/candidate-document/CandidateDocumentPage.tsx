"use client";

import { useEffect, useState } from "react";
import CandidateDocumentCard, {
  type CandidateDocumentItem,
} from "./CandidateDocumentCard";

const candidateDocuments: CandidateDocumentItem[] = [
  {
    id: 1,
    title: "Please upload a headshot of yourself",
    subtitle: "You’ve already signed this agreement.",
    isUploaded: false,
  },
  {
    id: 2,
    title: "Driver's license or government issued card",
    subtitle: "You’ve already signed this agreement.",
    isUploaded: true,
  },
  {
    id: 3,
    title: "Letter(s) of recommendation",
    subtitle: "You’ve already signed this agreement.",
    isUploaded: true,
  },
  {
    id: 4,
    title: "Additional Letter(s) of recommendation",
    subtitle: "You’ve already signed this agreement.",
    isUploaded: true,
  },
  {
    id: 5,
    title: "Additional Letter(s) of recommendation",
    subtitle: "You’ve already signed this agreement.",
    isUploaded: false,
  },
  {
    id: 6,
    title: "Nanny Resume",
    subtitle:
      "Make sure your resume highlights your nanny and other childcare experience",
    isUploaded: true,
  },
];

function CandidateDocumentPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {candidateDocuments.map((item) => (
        <CandidateDocumentCard
          key={item.id}
          item={item}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
}

export default CandidateDocumentPage;
