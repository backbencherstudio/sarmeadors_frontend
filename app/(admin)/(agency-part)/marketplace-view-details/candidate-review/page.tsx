import CandidateReviewCard from "@/components/clients/AgencyShortTermJob/CandidateReviewCard";
import CandidateReviewTopBar from "@/components/clients/AgencyShortTermJob/CandidateReviewTopBar";

type CandidateReview = {
  id: number;
  name: string;
  role: string;
  description: string;
  rating: number;
  date: string;
  image: string;
};

const CandidateReviewData: CandidateReview[] = [
  {
    id: 1,
    name: "Muhammad",
    role: "Chef cooking",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa, lectus elementum consectetur morbi diam curabitur phasellus.",
    rating: 5.0,
    date: "04 March 2021",
    image: "/candidates/candidates-profile.png",
  },
  {
    id: 2,
    name: "Muhammad",
    role: "CXC",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa, lectus elementum consectetur morbi diam curabitur phasellus.",
    rating: 5.0,
    date: "04 March 2021",
    image: "/candidates/candidates-profile.png",
  },
  {
    id: 3,
    name: "Muhammad",
    role: "Chef cooking",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa, lectus elementum consectetur morbi diam curabitur phasellus.",
    rating: 5.0,
    date: "04 March 2021",
    image: "/candidates/candidates-profile.png",
  },
];

export default function page() {
  return (
    <div className="p-6">
      <CandidateReviewTopBar />
      <div className="mt-6 grid grid-cols-3 gap-4">
        {CandidateReviewData?.map((item) => (
          <CandidateReviewCard key={item?.id} data={item} />
        ))}
      </div>
    </div>
  );
}
