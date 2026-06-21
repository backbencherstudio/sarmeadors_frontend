import ReusableTabs from "@/components/reusable/ReusableTabs";

const tabs = [
  {
    label: "Short-Term Booking",
    link: "/client/post-job/short-term-booking",
  },
  {
    label: "Logn-Term Booking",
    link: "/client/post-job/long-term-booking",
  },
];

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-5">
      <div className="text-center space-y-7 py-10">
        <div>
          <h1 className="text-3xl ">COAST TO COAST NANNIES</h1>
          <h5 className="text-[12px] text-gray-500 mt-2">
            YOUR JOURNEY TO PARENTHOOD STARTS HERE
          </h5>
        </div>
        <div>
          <h1 className="text-5xl font-semibold">Create job</h1>
          <h3 className="text-xl">
            Define details, set the budget, and outline preferences
          </h3>
        </div>
        <button className="px-4 py-[14px] bg-[#111927] border border-[#384250] rounded-[12px] text-[#FCFCFD] text-[16px] leading-[137.5%] font-semibold cursor-pointer h-[52px] text-nowrap">
          Book a call with us
        </button>
      </div>
      <ReusableTabs
        tabs={tabs}
        initialPath={"/client/client-my-jobs/short-term-job"}
      />
      <div>{children}</div>
    </div>
  );
}
