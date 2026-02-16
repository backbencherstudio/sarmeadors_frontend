"use client";
import Image from "next/image";

const jobCards = [
  {
    id: 1,
    title: "Nanny House Manager needed in McLean, VA",
    image: "/maids/Image.png",
    start: "January",
    locations: "DC Metro Area",
    address: "McLean, VA",
    compensation: "$35 / hour",
    schedule: "12PM–8PM. 30–40 hours per week.",
    children: "7, 5, and 2 years old",
    createdDate: "Wed Nov 12 2025 (4 days ago)",
  },
  {
    id: 2,
    title: "Part Time Housekeeper",
    image: "/maids/Image.png",
    start: "ASAP",
    locations: "Northern Virginia",
    address: "Arlington, VA",
    compensation: "$30 / hour",
    schedule: "9AM–6PM. 40 hours per week.",
    children: "3 and 1 years old",
    createdDate: "Mon Nov 10 2025 (6 days ago)",
  },
  {
    id: 3,
    title: "Full Time Nanny in River North",
    image: "/maids/Image.png",
    start: "ASAP",
    locations: "Northern Virginia",
    address: "Arlington, VA",
    compensation: "$30 / hour",
    schedule: "9AM–6PM. 40 hours per week.",
    children: "3 and 1 years old",
    createdDate: "Mon Nov 10 2025 (6 days ago)",
  },
  {
    id: 4,
    title: "Full Time Nanny in River North",
    image: "/maids/Image.png",
    start: "ASAP",
    locations: "Northern Virginia",
    address: "Arlington, VA",
    compensation: "$30 / hour",
    schedule: "9AM–6PM. 40 hours per week.",
    children: "3 and 1 years old",
    createdDate: "Mon Nov 10 2025 (6 days ago)",
  },
];

export default function JobCard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {jobCards?.map((job) => (
        <div key={job?.id} className="p-6 rounded-lg border">
          <h1 className="text-[20px] text-[#111927] font-bold text-nowrap">
            {job?.title}
          </h1>
          <div className="grid grid-cols-2 mt-5">
            <p className="text-[#384250] text-[14px]">Image</p>
            <Image
              src={job?.image}
              alt="img"
              height={400}
              width={400}
              className="h-10 w-10"
            />
          </div>
          <div className="grid grid-cols-2 mt-5">
            <p className="text-[#384250] text-[14px]">Start</p>
            <p className="text-[#111927)] text-[14px]">{job?.start}</p>
          </div>
          <div className="grid grid-cols-2 mt-5">
            <p className="text-[#384250] text-[14px]">Locations</p>
            <p className="text-[#111927)] text-[14px]">{job?.locations}</p>
          </div>
          <div className="grid grid-cols-2 mt-5">
            <p className="text-[#384250] text-[14px]">Address</p>
            <p className="text-[#111927)] text-[14px]">{job?.address}</p>
          </div>
          <div className="grid grid-cols-2 mt-5">
            <p className="text-[#384250] text-[14px]">Compensation</p>
            <p className="text-[#111927)] text-[14px]">{job?.compensation}</p>
          </div>
          <div className="grid grid-cols-2 mt-5">
            <p className="text-[#384250] text-[14px]">Schedule</p>
            <p className="text-[#111927)] text-[14px]">{job?.schedule}</p>
          </div>
          <div className="grid grid-cols-2 mt-5">
            <p className="text-[#384250] text-[14px]">Children</p>
            <p className="text-[#111927)] text-[14px]">{job?.children}</p>
          </div>
          <div className="grid grid-cols-2 mt-5">
            <p className="text-[#384250] text-[14px]">Created Date</p>
            <p className="text-[#111927)] text-[14px]">{job?.createdDate}</p>
          </div>
          <div className="mt-5">
            <button className="px-6 py-3 bg-[#111927] text-white font-bold border border-[#384250] rounded-lg cursor-pointer">
              View Applicants
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
