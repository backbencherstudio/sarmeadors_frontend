import { Phone, X } from "lucide-react";

interface JobPosting {
  id: string;
  title: string;
  clientName: string;
  interviewSchedule: string;
  meetingType: string;
  status: "Awaiting Confirmation" | "Declined" | "Confirmed";
  meetingLink?: string;
}

const jobPostings: JobPosting[] = [
  {
    id: "1",
    title: "Nanny House Manager needed in McLean, VA",
    clientName: "Jennifer Williams",
    interviewSchedule: "2024-12-10 at 2:30 PM",
    meetingType: "zoom Meeting",
    status: "Awaiting Confirmation",
    meetingLink: "https://google.meet.us/xyzxyz123",
  },
  {
    id: "2",
    title: "Nanny House Manager needed in McLean, VA",
    clientName: "Jennifer Williams",
    interviewSchedule: "2024-12-10 at 2:30 PM",
    meetingType: "zoom Meeting",
    status: "Confirmed",
    meetingLink: "https://google.meet.us/xyzxyz123",
  },
  {
    id: "3",
    title: "Nanny House Manager needed in McLean, VA",
    clientName: "Jennifer Williams",
    interviewSchedule: "2024-12-10 at 2:30 PM",
    meetingType: "zoom Meeting",
    status: "Declined",
    meetingLink: "https://google.meet.us/xyzxyz123",
  },
  {
    id: "4",
    title: "Nanny House Manager needed in McLean, VA",
    clientName: "Jennifer Williams",
    interviewSchedule: "2024-12-10 at 2:30 PM",
    meetingType: "zoom Meeting",
    status: "Awaiting Confirmation",
    meetingLink: "https://google.meet.us/xyzxyz123",
  },
];

export default function JobPostingCard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      {jobPostings.map((job) => (
        <div key={job.id} className="bg-white rounded-lg p-6 border">
          {/* Title */}
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {job.title}
          </h2>

          {/* Client Info */}
          <div className="space-y-3 mb-6">
            <div className="grid grid-cols-2">
              <p className="text-sm text-[#384250] font-medium">Client Name:</p>
              <p className="text-[#111927] text-sm font-medium">
                {job.clientName}
              </p>
            </div>

            {/* Interview Schedule */}
            <div className="grid grid-cols-2">
              <p className="text-sm text-[#384250] font-medium">
                Interview Schedules
              </p>
              <p className="text-[#111927] text-sm font-medium">
                {job.interviewSchedule}
              </p>
            </div>

            {/* Meeting Type */}
            <div className="grid grid-cols-2">
              <p className="text-sm text-[#384250] font-medium">Meeting Type</p>
              <p className="text-[#111927] text-sm font-medium">
                {job.meetingType}
              </p>
            </div>

            {/* Status */}
            <div className="grid grid-cols-2">
              <p className="text-sm text-[#384250] font-medium">Status</p>
              <p
                className={`w-fit px-4 py-1 rounded-md text-sm font-medium
      ${
        job.status === "Awaiting Confirmation"
          ? "bg-[#FFFAE5] text-[#E5B400]"
          : job.status === "Confirmed"
            ? "bg-[#EBFEF2] text-[#04A755]"
            : job.status === "Declined"
              ? "bg-[#FEF1F1] text-[#CB121D]"
              : "bg-gray-100 text-gray-700"
      }
    `}
              >
                {job.status}
              </p>
            </div>
          </div>

          {/* Meeting Link Section */}
          {job.status === "Confirmed" && (
            <div className="bg-[#E6F0FF] rounded-[4px] px-3 py-2 mb-6">
              <p className="text-sm text-[#111927] font-medium">
                Meeting Link:
              </p>
              <a
                href={job.meetingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0065FF] underline font-medium text-sm flex items-center gap-1 break-all"
              >
                {job.meetingLink}
              </a>
            </div>
          )}

          {/* Action Buttons */}
          {job?.status === "Awaiting Confirmation" && (
            <div className="flex gap-3 max-w-sm">
              <button className="flex-1 px-6 py-3 bg-[#111927] border border-[#384250] text-white cursor-pointer font-semibold flex items-center rounded-md">
                <Phone className="w-4 h-4 mr-2" />
                <span className="text-nowrap">Confirm Interview</span>
              </button>
              <button className="flex-1 px-6 py-3 bg-[#FEF1F1] text-[#CB121D] cursor-pointer font-semibold flex items-center rounded-md">
                <X className="w-4 h-4 mr-2" />
                <span>Decline</span>
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
