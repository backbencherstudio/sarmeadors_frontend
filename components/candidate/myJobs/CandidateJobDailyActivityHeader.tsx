import InvoiceIcon from "@/components/icon/InvoiceIcon";
import ButtonReuseable from "@/components/reusable/CustomButton";

function CandidateJobDailyActivityHeader() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 bg-blackColor px-4 py-3 text-white lg:flex-nowrap">
      <div className="flex w-fit flex-wrap items-center justify-between md:justify-start gap-3 lg:flex-nowrap">
        <div className="border-borderColor/30 md:border-r md:pr-4">
          <p className="lg:text-xl md:text-lg text-base font-medium">$35/hr</p>
          <p className="text-sm text-secondaryColor">Compensation</p>
        </div>
        <div className="border-borderColor/30 md:border-r md:pr-4">
          <p className="lg:text-xl md:text-lg text-base font-medium">100 hr</p>
          <p className="text-sm text-secondaryColor">Total Worked Hour</p>
        </div>
        <div className="border-borderColor/30 md:border-r md:pr-4">
          <p className="lg:text-xl md:text-lg text-base font-medium">$35000</p>
          <p className="text-sm text-secondaryColor">
            <span className="mr-1 inline-block h-2.5 w-2.5 rounded-full bg-blueColor" />
            Total Earning
          </p>
        </div>
        <div className="border-borderColor/30 md:border-r md:pr-4">
          <p className="lg:text-xl md:text-lg text-base font-medium">$25000</p>
          <p className="text-sm text-secondaryColor">
            <span className="mr-1 inline-block h-2.5 w-2.5 rounded-full bg-greenColor" />
            Total Payment
          </p>
        </div>
        <div>
          <p className="lg:text-xl md:text-lg text-base font-medium">$10000</p>
          <p className="text-sm text-secondaryColor">
            <span className="mr-1 inline-block h-2.5 w-2.5 rounded-full bg-redColor" />
            Due Payment
          </p>
        </div>
      </div>
      <div className="mt-2 flex w-full lg:w-auto justify-end lg:mt-0">
        <ButtonReuseable
          icon={<InvoiceIcon className="h-4 w-4" />}
          title="View Invoice"
          className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-[#384250]/50! px-4 py-2 text-sm font-medium text-white"
        />
      </div>
    </div>
  );
}

export default CandidateJobDailyActivityHeader;
