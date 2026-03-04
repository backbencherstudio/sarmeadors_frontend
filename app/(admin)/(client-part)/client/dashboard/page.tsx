import ClientJobList from "@/components/client/ClientMyJobs/ClientJobList";
import StatCards from "@/components/dashboard/StatCards";
import SearchIcon from "@/components/icon/SearchIcon";
import ProgressAvatar from "@/components/ProgressAvatar";
import ButtonReuseable from "@/components/reusable/CustomButton";
import { PlusIcon } from "lucide-react";

import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import NewCandidatesPage from "../client-my-candidates/new-candidates/page";

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
    <div className="md:p-6 p-3">
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
          <p className="text-sm text-descriptionColor">Welcome back, Alex</p>
          <p className="text-lg md:text-xl font-semibold text-blackColor">
            Welcome, Alex 👋
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-t px-3 lg:px-8 from-[#049EC0]/5 to-[#049EC0]/30 rounded-2xl  mb-8 flex items-center justify-between">
        <div>
          <h2 className="md:text-xl text-lg lg:text-2xl font-bold text-blackColor mb-2">
            All your nannies needs in one place
          </h2>
          <p className="text-gray-600 mb-6">
            Source, discover, manage, and pay your flexible workforce.
          </p>
          <div className="flex gap-4">
            <ButtonReuseable
              title="Post a job"
              icon={<PlusIcon className="inline w-4 h-4 lg:w-5 lg:h-5" />}
              className="px-4! py-2.5! lg:px-5! lg:py-3 lg:rounded-lg! rounded-sm! text-sm! lg:text-base! font-medium transition"
            />
            <ButtonReuseable
              title=" Discover Candaidates"
              icon={<SearchIcon className="inline w-4 h-4 lg:w-5 lg:h-5 " />}
              className=" text-blackColor! px-4! py-2.5! lg:px-5! lg:py-3 lg:rounded-lg! text-sm! lg:text-base! rounded-sm! font-medium bg-whiteColor! transition"
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
          <ClientJobList />
        </div>
      </div>
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-blackColor mb-4">
            Recommended Candidates
          </h3>
          <ButtonReuseable
            title="Discover Candidates"
            icon={<SearchIcon className="w-4 h-4" />}
            className=""
          />
        </div>
        <div className="space-y-4">
          <NewCandidatesPage />
        </div>
      </div>
    </div>
  );
}

export default CandidatesDashboard;
