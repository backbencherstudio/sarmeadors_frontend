"use client";

import CandidatejobsCard from "@/components/candidate/CandidatejobsCard";
import LocationIcon from "@/components/icon/LocationIcon";
import CallIcon from "@/public/icon/CallIcon";
import EmailIcon from "@/public/icon/EmailIcon";
import { ChevronLeft, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useGetCandidateMyClientsDetailsQuery } from "@/feature/slice/candidate/candidate-dashboard/CandidateMyClientsSlice";
import { useParams } from "next/navigation";

function ClientDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const { data, isLoading, isError } = useGetCandidateMyClientsDetailsQuery({
    clientId: id,
  });

  const client = data?.data?.client;
  const jobHistory = data?.data?.job_history || [];
  const rating = client?.rating?.average ?? 0;
  const ratingCount = client?.rating?.count ?? 0;

  return (
    <section className="space-y-5 p-3 sm:p-4 lg:p-6 h-full">
      <Link
        href="/candidate/my-clients"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-blackColor"
      >
        <ChevronLeft className="h-4 w-4" />
        Client details
      </Link>

      {isLoading && (
        <div className="flex items-center justify-center py-10">
          <p className="text-gray-500">Loading client details...</p>
        </div>
      )}

      {isError && (
        <div className="flex items-center justify-center py-10">
          <p className="text-red-500">Failed to load client details.</p>
        </div>
      )}

      {!isLoading && !isError && client && (
        <>
          <div className="bg-white p-4 md:p-5 border-b border-borderColor">
            <div className="flex flex-col md:flex-row items-center gap-3">
              <div className="relative h-14 w-14 overflow-hidden rounded-full border border-borderColor">
                <Image
                  src={client?.image_url || "/empty-user.png"}
                  alt={client?.name}
                  width={50}
                  height={50}
                  className="object-cover h-full w-full"
                  unoptimized
                />
              </div>
              <div>
                <div className="flex flex-col md:flex-row items-center md:gap-2">
                  <h2 className="md:text-2xl text-lg font-semibold text-blackColor">
                    {client?.name}
                  </h2>
                  <p className="text-sm text-headerColor font-medium underline flex items-center md:items-end gap-2">
                    <Star className="text-ratingColor" size={16} /> {rating}{" "}
                    Rating ({ratingCount})
                  </p>
                </div>
                <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-2 text-sm text-headerColor font-medium mt-2.5">
                  <span className="flex items-center gap-1.5">
                    <EmailIcon className="h-4 w-4 stroke-gray2Color!" />
                    {client?.email}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CallIcon className="h-4 w-4 stroke-gray2Color!" />
                    {client?.mobile}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <LocationIcon className="h-4 w-4 stroke-gray2Color!" />
                    {client?.area}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-blackColor">
              Job History
            </h3>
            {jobHistory.map((job: any) => (
              <CandidatejobsCard key={job.id} job={job} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default ClientDetailsPage;
