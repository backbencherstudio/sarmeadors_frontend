import ButtonReuseable from "@/components/reusable/CustomButton";

function CandidateSingleJobsCancel() {
  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:items-center md:justify-between gap-4 w-full my-6">
        <div className="max-w-xl w-full">
          <h4 className="text-xl font-medium text-gray-800">Cancel your Job</h4>
          <p className="text-base text-secondaryColor mt-0.5">
            All your data, preferences, and activity history will be permanently
            removed.
          </p>
        </div>
        <div>
          <ButtonReuseable
            title="Cancel"
            className="bg-white! border py-2! px-8! border-redColor! text-redColor!"
          />
        </div>
      </div>
    </div>
  );
}

export default CandidateSingleJobsCancel;
