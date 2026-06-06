"use client";

import LongTermJobCard from "@/components/clients/AgencyLongTermJob/LongTermJobCard";
import RequestedLongTermJobHeader from "@/components/clients/AgencyLongTermJob/RequestedLongTermJobHeader";

const jobs = [
  {
    id: 0,
    name: "Jerome Bell",
    profile: "/profile.png",
    title: "After a school Nanny",
    rate: 35,
    description:
      "Full responsibility for three energetic children, ages 2, 5, and 7, including crafting delicious and...",
    location: "71 Raglan Street, CROWNTHORPE, Queensland(QLD), 4605",
  },
  {
    id: 1,
    name: "Jerome Bell",
    profile: "/profile.png",
    title: "After a school Nanny",
    rate: 35,
    description:
      "Full responsibility for three energetic children, ages 2, 5, and 7, including crafting delicious and...",
    location: "71 Raglan Street, CROWNTHORPE, Queensland(QLD), 4605",
  },
  {
    id: 2,
    name: "Jerome Bell",
    profile: "/profile.png",
    title: "After a school Nanny",
    rate: 35,
    description:
      "Full responsibility for three energetic children, ages 2, 5, and 7, including crafting delicious and...",
    location: "71 Raglan Street, CROWNTHORPE, Queensland(QLD), 4605",
  },
];

export default function page() {
  return (
    <div>
      <div className="my-4">
        <RequestedLongTermJobHeader
          title="12 Requested Long-Term Jobs"
          description="List of all request for long term job from clients"
          buttonTitle="Post Jobs"
        />
      </div>
      <div className="p-5 rounded-[20px] border space-y-5">
        {jobs.map((job) => (
          <LongTermJobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}
