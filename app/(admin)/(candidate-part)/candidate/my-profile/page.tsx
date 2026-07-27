"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGetCandidateMyProfileQuery } from "@/feature/slice/candidate/candidate-dashboard/CandidateMyProfileSlice";

function CandidateMyProfileRedirectPage() {
  const router = useRouter();
  const { data } = useGetCandidateMyProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  console.log("data===========", data?.data?.blocks);

  const firstSlug = data?.data?.blocks?.[0]?.slug;

  useEffect(() => {
    if (firstSlug) {
      router.replace(`/candidate/my-profile/${firstSlug}`);
    }
  }, [firstSlug, router]);

  return null;
}

export default CandidateMyProfileRedirectPage;
