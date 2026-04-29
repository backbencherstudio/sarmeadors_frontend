import ReusableTabs from "@/components/reusable/ReusableTabs";

export default function CandidateProfileTabs({ id }: { id: string }) {
  const tabs = [
    {
      label: "My profile",
      value: "My profile",
      link: `/candidates/${id}/profile/my-profile`,
    },
    {
      label: "Short-Term Job",
      value: "Short-Term Job",
      link: `/candidates/${id}/profile/short-term-job`,
    },
    {
      label: "Long-Term Job",
      value: "Long-Term Job",
      link: `/candidates/${id}/profile/long-term-job`,
    },
    {
      label: "My Schedule",
      link: `/candidates/${id}/profile/my-schedule`,
      value: "My Schedule",
    },
    {
      label: "MY Jobs",
      link: `/candidates/${id}/profile/my-jobs`,
      value: "MY Jobs",
    },
    {
      label: "My Families",
      link: `/candidates/${id}/profile/my-families`,
      value: "My Families",
    },
  ];
  return (
    <div>
      <ReusableTabs tabs={tabs} initialPath={tabs[0]?.link} />
    </div>
  );
}
