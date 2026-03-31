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
      </div>
    </div>
  );
}
