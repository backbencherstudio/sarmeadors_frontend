import PostedJobCard from "@/components/clients/AgencyLongTermJob/PostedJobCard";
import RequestedLongTermJobHeader from "@/components/clients/AgencyLongTermJob/RequestedLongTermJobHeader";

export const jobListings = [
  {
    id: "1",
    title:
      "Full-Time Housekeeper / Family Assistant (Cooking + Deep Cleaning Focus)",
    manager: "Darrell Steward",
    managerImage: "https://randomuser.me/api/portraits/men/32.jpg",
    status: "Broadcasted" as const,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    start: "ASAP",
    locations: "DC Metro Area",
    address: "Mclean, VA",
    compensation: "$35 hour",
    schedule: "12PM-8PM Could do anywhere between 30-40 hours a week.",
    children: "7, 5, and 2 years old",
    jobId: "3896225",
    createdDate: "Wed Nov 12 2025 (4 days ago)",
    notes: [
      "Client prefers female applicants only.",
      "Background check required before interview.",
    ],
  },
  {
    id: "2",
    title: "Live In Nanny in Miami",
    manager: "Guy Hawkins",
    managerImage: "https://randomuser.me/api/portraits/men/45.jpg",
    status: "Filled" as const,
    start: "Jan 1, 2026",
    locations: "Miami, FL",
    address: "Coral Gables, FL",
    compensation: "$25 hour + room & board",
    schedule: "Monday–Friday, 7AM–6PM",
    children: "4 and 6 years old",
    jobId: "3896310",
    createdDate: "Mon Nov 10 2025 (6 days ago)",
    notes: [],
  },
  {
    id: "3",
    title: "Part-Time Nanny for Infant in Brooklyn",
    manager: "Leslie Alexander",
    managerImage: "https://randomuser.me/api/portraits/women/68.jpg",
    status: "Closed" as const,
    start: "Immediately",
    locations: "Brooklyn, NY",
    address: "Park Slope, Brooklyn",
    compensation: "$22 hour",
    schedule: "Tuesdays and Thursdays, 9AM–3PM",
    children: "8 months old",
    jobId: "3896401",
    createdDate: "Fri Nov 14 2025 (2 days ago)",
    notes: ["Infant CPR certification preferred."],
  },
  {
    id: "4",
    title: "Executive Housekeeper – Beverly Hills Estate",
    manager: "Robert Fox",
    managerImage: "https://randomuser.me/api/portraits/men/12.jpg",
    status: "Closed" as const,
    start: "TBD",
    locations: "Beverly Hills, CA",
    address: "Beverly Hills, CA 90210",
    compensation: "$50 hour",
    schedule: "Full-time, 40 hours/week. Flexible weekends.",
    children: "No children",
    jobId: "3896512",
    createdDate: "Thu Nov 13 2025 (3 days ago)",
    notes: [
      "High-profile client — strict NDA required.",
      "Live-out preferred but live-in considered.",
    ],
  },
  {
    id: "5",
    title: "After-School Nanny + Homework Help – Chicago",
    manager: "Savannah Nguyen",
    managerImage: "https://randomuser.me/api/portraits/women/22.jpg",
    status: "Closed" as const,
    start: "Sep 1, 2025",
    locations: "Chicago, IL",
    address: "Lincoln Park, Chicago",
    compensation: "$20 hour",
    schedule: "Mon–Fri, 2:30PM–6:30PM",
    children: "9 and 11 years old",
    jobId: "3896098",
    createdDate: "Tue Oct 28 2025 (19 days ago)",
    notes: [],
  },
];

export default function page() {
  return (
    <div>
      <div className="my-4">
        <RequestedLongTermJobHeader
          title="567 Posted Long Term Jobs"
          description="List of all current long term job and their details."
          buttonTitle="Post Jobs"
        />
      </div>
      <div className="p-6 border rounded-lg space-y-2">
        {jobListings.map((job) => (
          <PostedJobCard key={job.id} {...job} />
        ))}
      </div>
    </div>
  );
}
