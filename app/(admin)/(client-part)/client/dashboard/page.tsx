import StatCards from "@/components/dashboard/StatCards";
import ProgressAvatar from "@/components/ProgressAvatar";
import ButtonReuseable from "@/components/reusable/CustomButton";
import { PlusIcon, SearchIcon } from "lucide-react";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

async function CandidatesDashboard() {
  const cookieStore = await cookies();
  const token = cookieStore?.get("jobtoken")?.value;

  const statCards = [
    {
      title: "Total Job Post",
      value: 0,
      percentage: "0%",
    },
    {
      title: "Applications",
      value: 0,
      percentage: "0%",
    },
    {
      title: "Messages",
      value: 0,
      percentage: "0%",
    },
    {
      title: "Interviews",
      value: 0,
      percentage: "0%",
    },
  ];

  const myJobs = [
    {
      id: 1,
      candidateName: "Darlene Robertson",
      position: "Nanny",
      roles: ["House Manager", "Baby/Night Nurse"],
      location: "Miami, New York, Other Locations",
      price: "$34/hr",
      status: "Pending",
      image: "/jobImage/nanny.jpg",
    },
  ];

  if (token) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Link
          href="/login"
          className="text-xl underline text-primaryColor text-center"
        >
          Please log in to view the dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Welcome Header */}
      <div className="flex items-center gap-3 mb-6">
        <ProgressAvatar
          src="/profile.png"
          alt="User Avatar"
          percentage={70}
          width={66}
          height={66}
        />
        <div>
          <p className="text-sm text-gray-600">Welcome back, Alex</p>
          <p className="text-lg font-semibold text-blackColor">
            Welcome, Alex 👋
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-t px-8 from-[#049EC0]/5 to-[#049EC0]/30 rounded-2xl  mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-blackColor mb-2">
            All your nannies needs in one place
          </h2>
          <p className="text-gray-600 mb-6">
            Source, discover, manage, and pay your flexible workforce.
          </p>
          <div className="flex gap-4">
            <ButtonReuseable
              title="Post a job"
              icon={<PlusIcon className="inline " />}
              className="  px-6 py-2 rounded-lg font-medium transition"
            />
            <ButtonReuseable
              title=" Discover Candaidates"
              icon={<SearchIcon className="inline " />}
              className=" text-blackColor! px-6 py-2 rounded-lg font-medium bg-whiteColor! transition"
            />
          </div>
        </div>
        <div className="max-w-[551px] h-[190px]">
          <Image
            src="/client/client-dashboard.png"
            alt="Hero illustration"
            width={500}
            height={550}
            className="w-full h-full "
          />
        </div>
      </div>

      {/* Status Statistics */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-blackColor mb-4">
          Status Statistics
        </h3>
        <StatCards statCards={statCards} />
      </div>

      {/* My Job Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-blackColor mb-4">My Job</h3>
        <div className="space-y-4">
          {myJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white border border-gray-200 rounded-lg p-6 flex gap-6 hover:shadow-lg transition"
            >
              {/* Job Image */}
              <div className="w-40 h-40 flex-shrink-0">
                <Image
                  src={job.image}
                  alt={job.candidateName}
                  width={160}
                  height={160}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {/* Job Details */}
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-blackColor">
                  {job.candidateName}
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  {job.position} | {job.roles.join(" | ")}
                </p>
                <p className="text-sm text-gray-500 mt-2 flex items-center gap-1">
                  📍 {job.location}
                </p>

                {/* View Details Button */}
                <Link
                  href="#"
                  className="text-primaryColor text-sm font-medium mt-4 inline-flex items-center gap-1 hover:underline"
                >
                  View Details →
                </Link>
              </div>

              {/* Price and Status */}
              <div className="flex flex-col items-end justify-between">
                <span className="text-2xl font-bold text-blackColor">
                  {job.price}
                </span>
                <span className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold">
                  {job.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CandidatesDashboard;
