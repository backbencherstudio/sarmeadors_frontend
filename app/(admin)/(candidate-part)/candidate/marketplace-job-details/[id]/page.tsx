"use client";
import JobDescription from "@/components/candidate/JobDescription";
import { useGetCandidateMarketPlaceJobsDetailsQuery } from "@/feature/slice/candidate/candidate-dashboard/CandidateMarketPlaceJobSlice";
import { useParams } from "next/navigation";

export default function MarketPlaceDetailsPage() {
  const params = useParams();
  const id = params?.id as string | undefined;

  const { data, isLoading, error } = useGetCandidateMarketPlaceJobsDetailsQuery(
    id,
    {
      skip: !id,
    },
  );

  const job = data?.data;

  return (
    <JobDescription
      job={job}
      jobType="marketplace-job"
      isLoading={isLoading}
      error={error}
    />
  );
}
