"use client";

import UploadIcon from "@/components/icon/UploadIcon";
import ButtonReuseable from "@/components/reusable/CustomButton";
import { useGetCandidateDocumentQuery } from "@/feature/slice/candidate/candidate-dashboard/candidateDocumentSlice";
import documentBlackIcon from "@/public/icon/RequiredBalackIcon.png";
import { RequiredDocument } from "@/types";
import Image from "next/image";
import { useState } from "react";
import CandidateAdditionalDocDelete from "./CandidateAdditionalDocDelete";
import CandidateAdditonalDocumentUploadFrom from "./CandidateAdditonalDocumentUploadFrom";
import CandidateDocumentCard from "./CandidateDocumentCard";
import CandidateDocumentCardSkeleton from "./CandidateDocumentCardSkeleton";

function CandidateAdditionalPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDocumentKey, setSelectedDocumentKey] = useState<number | null>(
    null,
  );
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const { data: documents, isLoading } =
    useGetCandidateDocumentQuery("Documents");
  const handleDelete = (id: number) => {
    console.log(id, "cdsasfd");

    setSelectedDocumentKey(id);
    setIsDeleteOpen(true);
  };
  const handleView = (item: RequiredDocument) => {
    console.log("view open ");
  };

  return (
    <div>
      <p className="mb-2 text-sm text-lightblackColor">
        Upload any additional documents you want to add
      </p>

      <div
        className={`rounded-xl border-2 border-dashed bg-bgColor px-4 py-10 text-center transition-colors ${
          isOpen ? "border-headerColor" : "border-borderColor"
        }`}
      >
        <div className="mx-auto flex max-w-[400px] flex-col items-center">
          <Image
            src={documentBlackIcon}
            alt="Upload"
            width={102}
            height={102}
          />
          <h3 className="mt-3 text-lg md:text-2xl! font-semibold text-headerColor">
            Upload Additional Document
          </h3>
          <p className="mt-1 text-base! text-secondaryColor">
            Maximum 5MB file size
          </p>

          <ButtonReuseable
            type="button"
            title="Upload Document"
            icon={<UploadIcon />}
            onClick={() => setIsOpen(true)}
            className="mt-4 rounded-lg border border-borderColor bg-whiteColor px-4! py-2! text-sm! text-headerColor!"
          />
        </div>
      </div>

      <h2 className="mt-8 text-3xl! font-semibold text-headerColor">
        Additional Documents
      </h2>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        {isLoading ? (
          [...Array(4)].map((_, index) => (
            <CandidateDocumentCardSkeleton key={index} />
          ))
        ) : documents?.data?.additional_documents.length > 0 ? (
          documents?.data?.additional_documents?.map(
            (item: RequiredDocument) => (
              <CandidateDocumentCard
                key={item.key}
                item={item}
                onView={handleView}
                onDelete={handleDelete}
              />
            ),
          )
        ) : (
          <p className="text-center py-10 text-gray-500">
            No additional documents found.
          </p>
        )}
      </div>

      {isOpen && (
        <CandidateAdditonalDocumentUploadFrom
          open={isOpen}
          setOpen={setIsOpen}
        />
      )}
      {isDeleteOpen && selectedDocumentKey && (
        <CandidateAdditionalDocDelete
          open={isDeleteOpen}
          setOpen={setIsDeleteOpen}
          documentKey={selectedDocumentKey}
        />
      )}
    </div>
  );
}

export default CandidateAdditionalPage;
