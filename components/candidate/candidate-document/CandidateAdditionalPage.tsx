"use client";

import UploadIcon from "@/components/icon/UploadIcon";
import ButtonReuseable from "@/components/reusable/CustomButton";
import documentBlackIcon from "@/public/icon/RequiredBalackIcon.png";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import CandidateDocumentCard, {
  type CandidateDocumentItem,
} from "./CandidateDocumentCard";

type UploadedDocument = CandidateDocumentItem & {
  sourceFile?: File;
};

function CandidateAdditionalPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedDocuments, setUploadedDocuments] = useState<
    UploadedDocument[]
  >([]);

  useEffect(() => {
    return () => {
      uploadedDocuments.forEach((doc) => {
        if (doc.previewUrl?.startsWith("blob:")) {
          URL.revokeObjectURL(doc.previewUrl);
        }
      });
    };
  }, [uploadedDocuments]);

  const handleFileSelect = (file?: File) => {
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    const newDocument: UploadedDocument = {
      id: Date.now(),
      title: "Additional Letter(s) of recommendation",
      subtitle: "You’ve already signed this agreement.",
      isUploaded: true,
      previewUrl,
      previewName: file.name,
      previewType: file.type,
      sourceFile: file,
    };

    setUploadedDocuments((prev) => [newDocument, ...prev]);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    handleFileSelect(file);
    event.target.value = "";
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    handleFileSelect(file);
  };

  const handleDelete = (item: CandidateDocumentItem) => {
    setUploadedDocuments((prev) => {
      const target = prev.find((doc) => doc.id === item.id);
      if (target?.previewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(target.previewUrl);
      }
      return prev.filter((doc) => doc.id !== item.id);
    });
  };

  const handleView = (item: CandidateDocumentItem) => {
    if (item.previewUrl) {
      window.open(item.previewUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div>
      <p className="mb-2 text-sm text-lightblackColor">
        Upload any additional documents you want to add
      </p>

      <div
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`rounded-xl border-2 border-dashed bg-bgColor px-4 py-10 text-center transition-colors ${
          isDragging ? "border-headerColor" : "border-borderColor"
        }`}
      >
        <div className="mx-auto flex max-w-[240px] flex-col items-center">
          <Image
            src={documentBlackIcon}
            alt="Upload"
            width={102}
            height={102}
          />
          <h3 className="mt-3 text-2xl! font-semibold text-headerColor">
            Drag and drop Here
          </h3>
          <p className="mt-1 text-base! text-secondaryColor">
            Maximum 5MB file size
          </p>

          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleInputChange}
            accept=".png,.jpg,.jpeg,.pdf,.doc,.docx"
          />

          <ButtonReuseable
            type="button"
            title="Select File"
            icon={<UploadIcon />}
            onClick={() => fileInputRef.current?.click()}
            className="mt-4 rounded-lg border border-borderColor bg-whiteColor px-4! py-2! text-sm! text-headerColor!"
          />
        </div>
      </div>

      <h2 className="mt-8 text-3xl! font-semibold text-headerColor">
        Additional Documents
      </h2>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        {uploadedDocuments.map((item) => (
          <CandidateDocumentCard
            key={item.id}
            item={item}
            onView={handleView}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default CandidateAdditionalPage;
