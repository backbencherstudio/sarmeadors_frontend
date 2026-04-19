import ButtonReuseable from "@/components/reusable/CustomButton";
import ReusableTabs from "@/components/reusable/ReusableTabs";
import ArrowLeftIcon from "@/public/icon/ArrowLeftIcon";

export default function LongTermJobProfileHeader() {
  const tabs = [
    {
      label: "Contact & Address",
      link: "/long-term-requested-job/contact-address",
    },
    {
      label: "Children Information",
      link: "/long-term-requested-job/children-information",
    },
    {
      label: "Requirements",
      link: "/long-term-requested-job/requirements",
    },
    {
      label: "Additional Information",
      link: "/long-term-requested-job/additional-information",
    },
  ];
  return (
    <div>
      <div>
        <div className="mb-6 flex items-center justify-between">
          <button className="cursor-pointer text-[#111927] font-bold">
            <ArrowLeftIcon className="inline-block mr-2" />
            <span>Requested Job Details</span>
          </button>
          <ButtonReuseable title="Publish This job" />
        </div>
      </div>
      <div>
        <ReusableTabs tabs={tabs} initialPath={""} />
      </div>
    </div>
  );
}
