"use client";

import MyProfileInformation from "@/components/candidate/my-profile/MyProfileInformation";
import { useGetCandidateMyProfileQuery } from "@/feature/slice/candidate/candidate-dashboard/CandidateMyProfileSlice";
import { useParams } from "next/navigation";

function CandidateMyProfileSlugPage() {
  const params = useParams();
  const slug = params.slug as string;

  const { data, isLoading, isError } = useGetCandidateMyProfileQuery(slug, {
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-10">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center py-10">
        <p className="text-red-500">Failed to load profile data.</p>
      </div>
    );
  }

  const block = data?.data?.blocks?.find(
    (b: { slug: string }) => b.slug === slug,
  );

  if (!block) {
    return (
      <div className="flex items-center justify-center py-10">
        <p className="text-gray-500">Section not found.</p>
      </div>
    );
  }

  return <MyProfileInformation block={block} />;
}

export default CandidateMyProfileSlugPage;
