import InterviewTab from "./InterviewTab";

export default function ClientInterviewTopbar() {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-[20px] text-[#111927] font-semibold leading-[120%]">
        Interviews
      </h1>
      <div>
        <InterviewTab />
      </div>
    </div>
  );
}
