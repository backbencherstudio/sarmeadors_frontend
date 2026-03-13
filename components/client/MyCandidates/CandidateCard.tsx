"use client";
import { Clock, EyeIcon, FileIcon, Trash } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import ClientNoteModal from "./ClientNoteModal";
import { Toggle } from "./Toggle";

function CandidateCard({ profile }: any) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className="border flex flex-col justify-between h-full border-[#E5E7EB] rounded-2xl md:rounded-[24px]">
        <div className="md:p-6 p-4 bg-[#F9FAFB] rounded-2xl md:rounded-[24px] flex items-start justify-between">
          <div className="flex flex-col md:flex-row items-start gap-x-6">
            <div className="overflow-hidden rounded-full">
              <Image
                src={profile?.image}
                alt="image"
                height={180}
                width={132}
                className="h-[124px] w-[124px] object-cover"
              />
            </div>
            <div className="flex md:h-full flex-col mt-3 md:mt-0 gap-4 md:justify-between">
              <div>
                <h1 className="text-[20px] text-[#111927] font-semibold">
                  {profile?.name}
                </h1>
                <p className="text-[16px] text-[#384250]">
                  {profile?.locations.join(", ")}
                </p>
              </div>
              <div>
                <p className="text-[16px] text-[#384250]">
                  {profile?.roles?.map((role, index) => (
                    <span key={index}>
                      {role}
                      {index < profile?.roles?.length - 1 && " | "}
                    </span>
                  ))}
                </p>
                <button className="mt-2 px-3 py-1.5 bg-[#E6F0FF] rounded-lg">
                  Experience: {profile?.experience}
                </button>
              </div>
            </div>
          </div>
          <div>
            <Toggle />
          </div>
        </div>
        <div className="md:p-6 p-4">
          {/* <div className="mt-10">
            <p className="text-[#384250] text-[16px]">{profile?.description}</p>
          </div> */}
          <div>
            <p className="text-[#111927] font-semibold">
              Status: {profile?.status}
            </p>
            <p className="text-gray-500">Linked: {profile?.linked}</p>
          </div>
          {profile?.clientInterviewPrefeRence && (
            <div className="my-3">
              <p className="text-[#111927] font-semibold">
                Client Interview Preference
              </p>
              <p className="text-gray-500">
                {profile?.clientInterviewPrefeRence}
              </p>
            </div>
          )}
          {profile?.clientInterviewAvailability && (
            <div className="my-3">
              <p className="text-[#111927] font-semibold">
                Client Interview Availability
              </p>
              <p className="text-gray-500">
                {profile?.clientInterviewAvailability}
              </p>
            </div>
          )}
          <div className="mt-10 w-full">
            {/* <Link
              href={
                "/client/client-my-candidates/new-candidates/1/personal-information"
              }
              className="text-[16px] text-[#111927] font-semibold px-6 py-4 border border-[#384250] rounded-[12px] block w-full cursor-pointer text-center"
            >
              View profile
            </Link> */}
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1">
              <button className="flex items-center gap-1 text-nowrap p-1 rounded-[8px] hover:bg-[#111927] border hover:text-white hover:border-black cursor-pointer mx-auto">
                <EyeIcon size={15} />
                <span>View Details</span>
              </button>
              <button
                onClick={() => setOpen(true)}
                className="flex items-center gap-1 text-nowrap p-1 rounded-[8px] hover:bg-[#111927] border hover:text-white hover:border-black cursor-pointer mx-auto"
              >
                <FileIcon size={15} />
                <span>Add Note</span>
              </button>
              <button className="flex items-center gap-1 text-nowrap p-1 rounded-[8px] hover:bg-[#111927] border hover:text-white hover:border-black cursor-pointer mx-auto">
                <Clock size={15} />
                <span>View History</span>
              </button>
              <button className="flex items-center gap-1 text-nowrap p-1 rounded-[8px] border cursor-pointer text-[#CB121D] mx-auto">
                <Trash size={15} />
                <span>Remove</span>
              </button>
            </div>
          </div>
          <ClientNoteModal open={open} setOpen={setOpen} />
        </div>
      </div>
    </div>
  );
}

export default CandidateCard;
