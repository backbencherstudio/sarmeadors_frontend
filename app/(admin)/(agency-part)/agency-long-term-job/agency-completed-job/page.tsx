import RequestedLongTermJobHeader from "@/components/clients/AgencyLongTermJob/RequestedLongTermJobHeader";
import { RunningJobCard } from "@/components/clients/AgencyLongTermJob/Running/RunningJobCard";

export const completedJob = [
  {
    id: "1",
    completed: true,
    title: "After School Nanny",
    commitment: "Long-term",
    date: "Today: JAN 18, 2026",
    rate: "$35/hr",
    nanny: "Arlene McCoy",
    nannyInitials: "OP",
    nannyColor: "bg-teal-500",
    description:
      "Full responsibility for three energetic children, ages 2, 5, and 7, including crafting delicious and...",
    address: "71 Raglan Street, CROWNTHORPE, Queensland(QLD), 4605",
    time: "10:00AM - 11:00PM",
    workingHohur: "2h 05m",
  },
  {
    id: "2",
    completed: true,
    title: "Live-In Nanny",
    commitment: "Long-term",
    date: "Today: JAN 18, 2026",
    rate: "$28/hr",
    nanny: "Savannah Nguyen",
    nannyInitials: "SN",
    nannyColor: "bg-purple-500",
    description:
      "Care for a newborn and a 3-year-old in a warm family home. Duties include feeding, nap schedules and...",
    address: "14 Maple Drive, BRISBANE, Queensland(QLD), 4000",
    time: "07:00AM - 07:00PM",
    workingHohur: "12h 00m",
  },
  {
    id: "3",
    completed: true,
    title: "Part-Time Babysitter",
    commitment: "Short-term",
    date: "Today: JAN 18, 2026",
    rate: "$22/hr",
    nanny: "Leslie Alexander",
    nannyInitials: "LA",
    nannyColor: "bg-rose-500",
    description:
      "Weekend babysitting for one child, age 5. Light meal preparation and outdoor play supervision...",
    address: "8 Ocean View Terrace, SURFERS PARADISE, Queensland(QLD), 4217",
    time: "09:00AM - 01:00PM",
    workingHohur: "4h 00m",
  },
  {
    id: "4",
    completed: true,
    title: "Housekeeper & Nanny",
    commitment: "Long-term",
    date: "Today: JAN 18, 2026",
    rate: "$40/hr",
    nanny: "Eleanor Pena",
    nannyInitials: "EP",
    nannyColor: "bg-amber-500",
    description:
      "Combined housekeeper and childcare role for a family of four. Children aged 4 and 8, light cooking...",
    address: "22 Fern Grove Road, TOOWOOMBA, Queensland(QLD), 4350",
    time: "08:00AM - 04:00PM",
    workingHohur: "8h 00m",
  },
  {
    id: "5",
    completed: true,
    title: "Newborn Care Specialist",
    commitment: "Short-term",
    date: "Today: JAN 18, 2026",
    rate: "$55/hr",
    nanny: "Courtney Henry",
    nannyInitials: "CH",
    nannyColor: "bg-sky-500",
    description:
      "Overnight newborn care for parents of a 6-week-old baby. Sleep training support and feeding logs...",
    address: "3 Hibiscus Lane, CAIRNS, Queensland(QLD), 4870",
    time: "10:00PM - 06:00AM",
    workingHohur: "8h 00m",
  },
  {
    id: "6",
    completed: true,
    title: "After School Tutor & Nanny",
    commitment: "Long-term",
    date: "Today: JAN 18, 2026",
    rate: "$32/hr",
    nanny: "Darrell Steward",
    nannyInitials: "DS",
    nannyColor: "bg-green-600",
    description:
      "Homework help and supervision for two school-age children, grades 3 and 5. Light snack preparation...",
    address: "56 Rosewood Avenue, TOWNSVILLE, Queensland(QLD), 4810",
    time: "03:00PM - 07:00PM",
    workingHohur: "4h 00m",
  },
];

export default function page() {
  return (
    <div>
      <div className="my-4">
        <RequestedLongTermJobHeader
          title="1224 Completed Long Term Jobs"
          description="List of all current long term job and their details."
          buttonTitle="Post Jobs"
        />
      </div>
      <div className="border rounded-[20px] p-6">
        <div className="space-y-5 mt-5">
          {completedJob.map((completed) => (
            <RunningJobCard key={completed.id} {...completed} />
          ))}
        </div>
      </div>
    </div>
  );
}
