import ClockICon from "@/components/icon/ClockICon";
import dayjs from "dayjs";
import CandidateInterviewListCard from "./CandidateInterviewListCard";

type InterviewItem = {
  id: number;
  dateNumber: string;
  dateMeta: string;
  title: string;
  status?: "Upcoming" | "Completed";
  participants: string;
  participantInitials: string;
  participantBadgeClass?: string;
  description: string;
  timeRange: string;
  actionLabel: string;
  actionType?: "primary" | "secondary";
  highlighted?: boolean;
  section: string;
};

const interviewItems: InterviewItem[] = [
  {
    id: 1,
    dateNumber: "18",
    dateMeta: "JAN,SUN",
    title: "After School Nanny",
    status: "Upcoming",
    participants: "Charlotte Hamlin",
    participantInitials: "OP",
    participantBadgeClass: "bg-blueColor/20 text-blueColor",
    description:
      "Full responsibility for three energetic children, ages 2, 5, and 7, including crafting delicious and... ",
    timeRange: "10:00AM - 11:00AM",
    actionLabel: "Join Google Meet",
    actionType: "primary",
    highlighted: true,
    section: "top",
  },
  {
    id: 2,
    dateNumber: "18",
    dateMeta: "JAN,SUN",
    title: "Morning Babysitter",
    status: "Upcoming",
    participants: "Phoebe Ehrman",
    participantInitials: "FY",
    participantBadgeClass: "bg-greenColor/20 text-greenColor",
    description:
      "Provide homework assistance and create a supportive learning environment for two bright, school-aged children, ages 6 and 9, ensuring they stay on track with their studies and enjoy fun educational activi View ",
    timeRange: "1:00PM - 2:00PM",
    actionLabel: "Join Zoom Meeting",
    actionType: "secondary",
    section: "TODAY - JAN 18, 2026",
  },
  {
    id: 3,
    dateNumber: "19",
    dateMeta: "JAN,MON",
    title: "Weekend Nanny",
    status: "Upcoming",
    participants: "Marlie Wigleton",
    participantInitials: "MW",
    participantBadgeClass: "bg-grayColor1 text-headerColor",
    description:
      "Plan and execute stimulating and age-appropriate activities for active toddlers, fostering their dev Provide homework assistance and create a supportive learning environment for two bright, school-aged children, ages 6 and 9, ensuring they stay on track with their studies and enjoy fun educational activi View",
    timeRange: "1:00PM - 2:00PM",
    actionLabel: "In Person",
    actionType: "secondary",
    section: "JAN 19, 2026",
  },
  {
    id: 4,
    dateNumber: "20",
    dateMeta: "JAN,TUE",
    title: "Temporary Nanny",
    status: "Upcoming",
    participants: "Tynisha Obey",
    participantInitials: "TO",
    participantBadgeClass: "bg-[#FDE68A] text-[#92400E]",
    description:
      "Design and lead engaging art projects, creative crafts, and fun outdoor games to keep children enter",
    timeRange: "3:00PM - 4:00PM",
    actionLabel: "Join Google Meet",
    actionType: "secondary",
    section: "JAN 20, 2026",
  },
  {
    id: 5,
    dateNumber: "20",
    dateMeta: "JAN,TUE",
    title: "Full-time Nanny",
    status: "Upcoming",
    participants: "Danell Balkentine",
    participantInitials: "DB",
    participantBadgeClass: "bg-purpleColor/20 text-purpleColor",
    description:
      "Create and serve nutritious and appealing snacks and meals for children, accommodating dietary rest",
    timeRange: "3:00PM - 4:00PM",
    actionLabel: "In Person",
    actionType: "secondary",
    section: "JAN 20, 2026",
  },
  {
    id: 6,
    dateNumber: "21",
    dateMeta: "JAN,WED",
    title: "Newborn Caregiver",
    status: "Upcoming",
    participants: "Georgette Strobel",
    participantInitials: "GS",
    participantBadgeClass: "bg-[#E5E7EB] text-headerColor",
    description:
      "Assist with bath time routines and create a calming bedtime routine, including stories and lullabies",
    timeRange: "4:00PM - 5:00PM",
    actionLabel: "Join Zoom Meeting",
    actionType: "secondary",
    section: "JAN 21, 2026",
  },
];

function CandidateInterviewList() {
  const featuredItem = interviewItems.find((item) => item.section === "top");
  const groupedEntries = interviewItems.filter(
    (item) => item.section !== "top",
  );

  return (
    <div className="w-full rounded-xl border border-borderColor bg-white p-3 sm:p-4">
      <div className="space-y-5">
        <div>
          <h3 className="mb-2 flex items-center gap-2 text-base md:text-lg font-medium  text-headerColor">
            <ClockICon /> Next Interview
          </h3>
          {featuredItem && <CandidateInterviewListCard {...featuredItem} />}
        </div>

        <div>
          <h3 className="mb-2 text-base md:text-lg font-medium  text-headerColor">
            Today - {dayjs().format("MMM D, YYYY")}
          </h3>
          <div className="space-y-3">
            {groupedEntries.map((item) => (
              <CandidateInterviewListCard key={item.id} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CandidateInterviewList;
