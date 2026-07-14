"use client";
import JobDescription from "@/components/candidate/JobDescription";
import { useGetCandidateAppliedShortTermJobDetailsQuery } from "@/feature/slice/candidate/candidate-dashboard/CandidateAppliedJobSlice";
import { useParams } from "next/navigation";
import React from "react";

export default function AppliedShortTermJobDetailsPage() {
  const params = useParams();
  const id = params?.id as string | undefined;

  const { data, isLoading, error } =
    useGetCandidateAppliedShortTermJobDetailsQuery(id, {
      skip: !id,
    });

  const job = data?.data;

  return <JobDescription job={job} isLoading={isLoading} error={error} />;
}
