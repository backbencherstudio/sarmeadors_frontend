import { CandidatesDetailsTab } from "@/components/client/MyCandidates/CandidatesDetailsTab";
import SendIcon from "@/components/icon/SendIcon";
import Image from "next/image";

export default function MyCandidatesDetails() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src={"/candidates/candidates-profile.png"}
            alt="candidates-profile"
            height={100}
            width={100}
            className="h-[56px] w-[56px]"
          />
          <div>
            <h1 className="text-[#111927] text-[20px] leading-[120%] font-semibold">
              Darlene Robertson
            </h1>
            <p className="text-[16px] text-[#384250] leading-[137.5%]">
              Nanny | Baby/Night Nurse
            </p>
          </div>
        </div>
        <div>
          <button className="flex items-center text-white gap-1.5 p-4 bg-[#111927] hover:bg-[#111927]/90 border border-[#384250] rounded-[12px] cursor-pointer">
            <SendIcon />
            <span>Hire Request</span>
          </button>
        </div>
      </div>
      <div className="mt-6">
        <CandidatesDetailsTab />
      </div>
    </div>
  );
}
