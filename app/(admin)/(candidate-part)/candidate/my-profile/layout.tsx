"use client";
import UserInfo from "@/components/clients/UserInfo";
import ReusableTabs from "@/components/reusable/ReusableTabs";
import { useGetCandidateMyProfileQuery } from "@/feature/slice/candidate/candidate-dashboard/CandidateMyProfileSlice";
import React from "react";

function CandidateMyProfileLayout({ children }: { children: React.ReactNode }) {
  const { data, isLoading, isError } = useGetCandidateMyProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const dynamicTabs =
    data?.data?.blocks?.map((block: { name: string; slug: string }) => ({
      label: block.name,
      link: `/candidate/my-profile/${block.slug}`,
    })) || [];

  const tabs = [
    ...dynamicTabs,
    {
      label: "Change Password",
      link: "/candidate/my-profile/change-password",
    },
  ];

  return (
    <div className="mt-4 space-y-4 p-4 md:p-6">
      <ReusableTabs tabs={tabs} initialPath="" />
      <div>
        <UserInfo />

        {/* <div>
          <ButtonReuseable
            icon={<EditeIcon className=" text-blackColor" />}
            className="bg-whiteColor! border px-4! py-4! border-borderColor"
          />
          <ButtonReuseable icon={<LinkIcon />} title="Share Profile" />
        </div> */}
      </div>
      {children}
    </div>
  );
}

export default CandidateMyProfileLayout;
