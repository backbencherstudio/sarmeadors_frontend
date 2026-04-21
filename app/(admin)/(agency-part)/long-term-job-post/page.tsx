import JobPostForm from "@/components/clients/AgencyLongTermJob/JobPostForm";
import ArrowLeftIcon from "@/public/icon/ArrowLeftIcon";

export default function page() {
  return (
    <div className="p-6">
      <button className="cursor-pointer text-[#111927] font-bold">
        <ArrowLeftIcon className="inline-block mr-2" />
        <span>Post Job</span>
      </button>
      <div className="mt-6">
        <JobPostForm />
      </div>
    </div>
  );
}
