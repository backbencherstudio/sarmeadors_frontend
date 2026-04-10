import StarIcon from "@/components/icon/StarIcon";
import Image from "next/image";

export default function CandidateReviewCard({ data }) {
  return (
    <div>
      <div className="p-6 border rounded-[12px]">
        <div className="flex items-center gap-5">
          <Image
            src={data?.image}
            alt="profile-pic"
            height={100}
            width={100}
            className="h-14 w-14"
          />
          <div>
            <h1 className="text-[#111927] font-medium">{data?.name}</h1>
            <p className="text-[#B9BDC2] ">{data?.role}</p>
          </div>
        </div>
        <div>
          <p className="text-[#111927] mt-4">{data?.description}</p>
          <div className="mt-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <StarIcon className="text-[#E5B400]" />
              <p className="text-[#111927]">(5.0)</p>
            </div>
            <p className="text-[#111927]">{data?.date}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
