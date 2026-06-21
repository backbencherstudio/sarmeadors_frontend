"use client";

import ButtonReuseable from "@/components/reusable/CustomButton";
import { useGetDocumentDetailsQuery } from "@/feature/dashboard/client/documents";
import ArrowLeftIcon from "@/public/icon/ArrowLeftIcon";
import { Download } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

type DocumentDetails = {
  agreement?: {
    title?: string;
    description?: string;
    status?: string;
    signed_at?: string | null;
    content_type?: string;
    file_url?: string | null;
    can_view?: boolean;
  };
  content_html?: string | null;
  file_url?: string | null;
  organization?: {
    name?: string;
    signer_name?: string;
  };
  client_signature?: {
    signature?: string;
    signed_at?: string;
    signed_at_label?: string;
  } | null;
  audit_trail?: {
    added_at?: string;
    added_at_label?: string;
    signed_at?: string;
    signed_at_label?: string;
    ip?: string;
  } | null;
};

export default function DocumentDetailsPage() {
  const router = useRouter();
  const result = useSearchParams();
  const id = result.get("id");
  const { data } = useGetDocumentDetailsQuery(id);
  const documentDetails = data?.data as DocumentDetails | undefined;
  const agreement = documentDetails?.agreement;
  const fileUrl = documentDetails?.file_url || agreement?.file_url;

  const handleDownloadPDF = () => {
    if (fileUrl) {
      window.open(fileUrl, "_blank");
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="w-full mx-auto bg-white p-8">
      <div className="flex justify-between items-center">
        {/* Edit Document Link */}
        <div className="mb-6">
          <Link
            href="/clients/document/edit-document"
            className="text-lg font-semibold flex items-center gap-3 w-fit"
          >
            <ArrowLeftIcon />
            <span>Edit Document</span>
          </Link>
        </div>
        {/* Action Buttons */}
        <div className="flex justify-end gap-4 ">
          <ButtonReuseable
            title="Cancel"
            onClick={handleCancel}
            className="px-6 py-2 bg-white! text-[#111927]!"
          />
          <ButtonReuseable
            icon={<Download className="w-4 h-4 mr-2" />}
            title="Download PDF"
            onClick={handleDownloadPDF}
            className="px-6 py-2 bg-gray-900 text-white hover:bg-gray-800"
          />
        </div>
      </div>

      {/* Document Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {documentDetails?.organization?.name || "COAST TO COAST NANNIES"}
        </h1>
        <p className="text-sm text-gray-600 mb-4">
          {agreement?.description || "YOUR JOURNEY TO PARENTHOOD STARTS HERE"}
        </p>
        <h2 className="text-2xl font-bold text-gray-900">
          {agreement?.title || "CLIENT AGENCY AGREEMENT MIDWEST NANNIES"}
        </h2>
      </div>

      {/* Document Content */}
      <div className="space-y-6 text-gray-900 leading-relaxed">
        {documentDetails?.content_html ? (
          <div
            dangerouslySetInnerHTML={{ __html: documentDetails.content_html }}
          />
        ) : fileUrl ? (
          <Link
            href={fileUrl}
            target="_blank"
            className="font-semibold text-gray-900 underline"
          >
            View Document
          </Link>
        ) : null}
      </div>

      {/* Signature Section */}
      <div className="mt-12 space-y-8">
        {/* Client Signature */}
        <div className="space-y-4">
          <div className="border-t border-gray-400 pt-4">
            <p className="font-semibold mb-2">Client Signature:</p>
            <div className="h-12 border-b border-gray-400 mb-2">
              {documentDetails?.client_signature?.signature}
            </div>
            <div className="space-y-1 text-sm">
              <p>
                Date:{" "}
                {documentDetails?.client_signature?.signed_at_label ||
                  agreement?.signed_at ||
                  "_________________________"}
              </p>
              <p>
                Client Name:{" "}
                {documentDetails?.client_signature?.signature ||
                  "_________________________"}
              </p>
            </div>
          </div>
        </div>

        {/* Agency Signature */}
        <div className="space-y-4">
          <div className="border-t border-gray-400 pt-4">
            <p className="font-semibold mb-2">Agency Signature:</p>
            <p className="mb-1">{documentDetails?.organization?.name}</p>
            <p className="mb-1">{documentDetails?.organization?.signer_name}</p>
            <p className="text-sm">
              Per: {documentDetails?.organization?.signer_name}
            </p>
          </div>
        </div>
      </div>

      {/* Audit Trail */}
      <div className="mt-8 pt-6 border-t border-gray-200 text-sm text-gray-600 space-y-1">
        <p>Added: {documentDetails?.audit_trail?.added_at_label}</p>
        <p>
          Signed: {documentDetails?.audit_trail?.signed_at_label} (IP:{" "}
          {documentDetails?.audit_trail?.ip})
        </p>
      </div>
    </div>
  );
}
