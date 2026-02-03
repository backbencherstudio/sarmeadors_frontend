import ReusableTabs from "@/components/reusable/ReusableTabs";
import MyProfile from "./MyProfile/MyProfile";
import ShortTermJob from "./ShortTermJob/ShortTermJob";
import LongTermJob from "./LongTermJob/LongTermJob";

export default function ProfileTabs() {
  const tabs = [
    {
      label: "My profile",
      value: "My profile",
      component: <MyProfile />,
    },
    {
      label: "Short-Term Job",
      value: "Short-Term Job",
      component: <ShortTermJob />,
    },
    {
      label: "Long-Term Job",
      value: "Long-Term Job",
      component: <LongTermJob/>,
    },
    {
      label: "My Schedule",
      value: "My Schedule",
      component: <p>My Schedule</p>,
    },
    {
      label: "MY Jobs",
      value: "MY Jobs",
      component: <p>MY Jobs</p>,
    },
    {
      label: "My Families",
      value: "My Families",
      component: <p>My Families</p>,
    },
  ];
  return (
    <div>
      <ReusableTabs tabs={tabs} />
    </div>
  );
}
