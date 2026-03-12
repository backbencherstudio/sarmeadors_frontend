import JobsIcon from "@/public/icon/JobsIcon";
import Image from "next/image";
import GiftIcon from "../icon/GiftIcon";
import ButtonReuseable from "../reusable/CustomButton";

function CandidateHeroSection({
  title,
  description,
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div>
      <div>
        <div className="bg-gradient-to-t px-3 lg:px-8 from-[#049EC0]/5 to-[#049EC0]/30 rounded-2xl  mb-8 flex items-center justify-between">
          <div>
            <h2 className="md:text-xl text-lg lg:text-2xl font-bold text-blackColor mb-2">
              {title || "All your nannies needs in one place"}
            </h2>
            <p className="text-gray-600 mb-6">
              {description ||
                "Source, discover, manage, and pay your flexible workforce."}
            </p>
            <div className="flex gap-2 sm:gap-4">
              <ButtonReuseable
                title="My Applications"
                icon={<JobsIcon className="inline w-4 h-4 lg:w-4.5 lg:h-4.5" />}
                className="px-2! py-2.5! lg:px-5! lg:py-3 lg:rounded-lg! rounded-sm! text-sm! lg:text-base! font-medium transition"
              />
              <ButtonReuseable
                title=" Discover Candaidates"
                icon={
                  <GiftIcon className="inline w-4 h-4 lg:w-4.5 lg:h-4.5 " />
                }
                className=" text-blackColor! px-2! py-2.5! lg:px-5! lg:py-3 lg:rounded-lg! text-sm! lg:text-base! rounded-sm! font-medium bg-whiteColor! transition"
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
      </div>
    </div>
  );
}

export default CandidateHeroSection;
