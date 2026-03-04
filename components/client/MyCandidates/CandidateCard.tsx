import Image from "next/image";
import Link from "next/link";

function CandidateCard({ profile }: any) {
  return (
    <div>
      <div className="md:p-6 p-4 border flex flex-col justify-between h-full border-[#E5E7EB] rounded-2xl md:rounded-[24px]">
        <div className="flex flex-col md:flex-row items-start gap-x-6">
          <div className="md:w-[132px] w-full h-[200px] md:h-[180px] overflow-hidden rounded-[12px]">
            <Image
              src={profile?.image}
              alt="image"
              height={180}
              width={132}
              className="w-full h-full object-cover"
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
              <button className="mt-2 px-3 py-1.5 bg-[#E6F0FF] rounded-full">
                Experience: {profile?.experience}
              </button>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <p className="text-[#384250] text-[16px]">{profile?.description}</p>
        </div>
        <div className="mt-10 w-full">
          <Link
            href={
              "/client/client-my-candidates/new-candidates/1/personal-information"
            }
            className="text-[16px] text-[#111927] font-semibold px-6 py-4 border border-[#384250] rounded-[12px] block w-full cursor-pointer text-center"
          >
            View profile
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CandidateCard;
