"use client";

import ButtonReuseable from "@/components/reusable/CustomButton";
import ArrowLeftIcon from "@/public/icon/ArrowLeftIcon";
import { Download } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DocumentDetailsPage() {
  const router = useRouter();

  const handleDownloadPDF = () => {
    // Implement PDF download logic here
    console.log("Download PDF");
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
          COAST TO COAST NANNIES
        </h1>
        <p className="text-sm text-gray-600 mb-4">
          YOUR JOURNEY TO PARENTHOOD STARTS HERE
        </p>
        <h2 className="text-2xl font-bold text-gray-900">
          CLIENT AGENCY AGREEMENT MIDWEST NANNIES
        </h2>
      </div>

      {/* Document Content */}
      <div className="space-y-6 text-gray-900 leading-relaxed">
        {/* Introduction */}
        <div>
          <p className="mb-4">
            This agreement is made between Midwest Nannies (referred to as
            Agency) and the Client (name placeholder).
          </p>
          <div className="space-y-2 mb-4">
            <p>
              <strong>Client Name:</strong> [Client Name]
            </p>
            <p>
              <strong>Address:</strong> [Client Address]
            </p>
            <p>
              <strong>Phone:</strong> [Client Phone]
            </p>
            <p>
              <strong>Email:</strong> [Client Email]
            </p>
          </div>
        </div>

        {/* Section 1 */}
        <div>
          <h3 className="font-bold text-lg mb-2">1. Placement</h3>
          <p>
            The agency will work to find candidates (full-time, part-time,
            live-in/out Nanny, Household Manager), screen them, and match them
            with client expectations.
          </p>
        </div>

        {/* Section 2 */}
        <div>
          <h3 className="font-bold text-lg mb-2">2. Interviewing/Hiring</h3>
          <div className="space-y-3 ml-4">
            <p>
              <strong>A)</strong> Communication is facilitated by Midwest
              Nannies.
            </p>
            <p>
              <strong>B)</strong> If the client doesn't hire within the first
              five candidates, a re-evaluation meeting will be held and the
              search will continue.
            </p>
            <p>
              <strong>C)</strong> Job offer negotiations are facilitated by
              Midwest Nannies.
            </p>
            <p>
              <strong>D)</strong> Agency reserves the right to end the working
              relationship and not refund fees if the client contacts candidates
              outside of the agency.
            </p>
            <p>
              <strong>E)</strong> Agency is not responsible for lost potential
              candidates due to unresponsive clients.
            </p>
            <p>
              <strong>F)</strong> See bottom of page for a step-by-step outline
              of the process.
            </p>
          </div>
        </div>

        {/* Section 3 */}
        <div>
          <h3 className="font-bold text-lg mb-2">3. Fees</h3>
          <div className="space-y-3 ml-4">
            <p>
              <strong>A)</strong> The client agrees to pay agency fees for
              referred candidates. A deposit of $200 is due at the time of
              signing.
            </p>
            <div className="ml-4 space-y-1">
              <p>Long term placement fee: $8000.</p>
              <p>Short term placement (3 months or less) fee: $400.</p>
              <p>The initial fee and placement fee are separate.</p>
            </div>
            <p>
              <strong>B)</strong> The client agrees to pay the placement fee in
              full upon hiring a candidate.
            </p>
          </div>
        </div>

        {/* Non-Payment Section */}
        <div>
          <h3 className="font-bold text-lg mb-2">Non-Payment of Fees</h3>
          <div className="space-y-3 ml-4">
            <p>
              If a client hires a candidate referred by the agency within one
              year without proper notification or payment, a $15,000 liquidated
              damages fee will apply.
            </p>
            <p>
              <strong>B)</strong> The client must pay the placement fee before
              employment begins, and the agency is not obligated to provide
              replacement/guarantee service if the client fails to pay.
            </p>
          </div>
        </div>

        {/* Refund Policy */}
        <div>
          <h3 className="font-bold text-lg mb-2">Refund Policy</h3>
          <div className="space-y-3 ml-4">
            <p>
              <strong>A)</strong> Fees are non-refundable, but Midwest Nannies
              offers a 30-day guarantee policy. If employment ends within 30
              days, the agency will work to find replacement candidates.
            </p>
            <p>
              <strong>B)</strong> If the client terminates employment without
              notice within the first 30 days, they will be charged a temporary
              nanny fee, and Midwest Nannies is not responsible for payroll,
              taxes, or work environment issues.
            </p>
          </div>
        </div>

        {/* Relationship Section */}
        <div>
          <h3 className="font-bold text-lg mb-2">
            Relationship to Client and Candidate
          </h3>
          <div className="space-y-3 ml-4">
            <p>
              <strong>A)</strong> Midwest Nannies is a referral service, not an
              employer, and is not responsible for damages, payroll, or
              employment relationships.
            </p>
            <p>
              <strong>B)</strong> Clients are responsible for ensuring
              candidates are aware of household rules, safety, and hazards.
            </p>
            <p>
              <strong>C)</strong> The client agrees to pay appropriate fees and
              follow policies.
            </p>
          </div>
        </div>

        {/* Agreement Scope */}
        <div>
          <h3 className="font-bold text-lg mb-2">Agreement Scope</h3>
          <p>
            This document constitutes the entire agreement between Midwest
            Nannies and the Client, superseding all other prior agreements or
            understandings.
          </p>
        </div>

        {/* Step by Step Process */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="font-bold text-lg mb-3">Step by Step Process</h3>
          <p className="text-sm">
            Provides a concise outline of the engagement process, from the
            initial discovery call to ongoing support.
          </p>
        </div>
      </div>

      {/* Signature Section */}
      <div className="mt-12 space-y-8">
        {/* Client Signature */}
        <div className="space-y-4">
          <div className="border-t border-gray-400 pt-4">
            <p className="font-semibold mb-2">Client Signature:</p>
            <div className="h-12 border-b border-gray-400 mb-2"></div>
            <div className="space-y-1 text-sm">
              <p>Date: Tue Dec 02 2023</p>
              <p>Client Name: _________________________</p>
              <p>Email: _________________________</p>
            </div>
          </div>
        </div>

        {/* Agency Signature */}
        <div className="space-y-4">
          <div className="border-t border-gray-400 pt-4">
            <p className="font-semibold mb-2">Agency Signature:</p>
            <p className="mb-1">Coast to Coast Nannies</p>
            <p className="mb-1">Sarah Meadows</p>
            <p className="text-sm">Per: Sarah Meadows</p>
          </div>
        </div>
      </div>

      {/* Audit Trail */}
      <div className="mt-8 pt-6 border-t border-gray-200 text-sm text-gray-600 space-y-1">
        <p>Added: Sat Nov 29 2023 at 9:24:13 AM</p>
        <p>Signed: Tue Dec 02 2023 at 1:29:31 PM (IP: 18.189.241.15)</p>
      </div>
    </div>
  );
}
