function ProfileProfessionalInformation({ professionalInfo, reference }) {

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 p-4 sm:p-5 md:p-6 border border-borderColor rounded-[20px]">
        {/* Left Column */}
        <div className="mt-3 space-y-4">
          <div>
            <p className="text-secondaryColor text-sm leading-[142.857%]">
              How many hours you would like?
            </p>
            <p className="text-lightblackColor text-[16px] leading-[137.5%] font-medium">
              {professionalInfo?.hours_per_week || "-"}
            </p>
          </div>

          <div>
            <p className="text-secondaryColor text-sm leading-[142.857%]">
              Pay range per hour
            </p>
            <p className="text-lightblackColor text-[16px] leading-[137.5%] font-medium">
              {professionalInfo?.pay_range_per_hour || "-"}
            </p>
          </div>

          <div>
            <p className="text-secondaryColor text-sm leading-[142.857%]">
              Why did our last position end?
            </p>
            <p className="text-lightblackColor text-[16px] leading-[137.5%] font-medium">
              {professionalInfo?.last_position_end_reason || "-"}
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="mt-3 space-y-4">
          <div>
            <p className="text-secondaryColor text-sm leading-[142.857%]">
              Fluent in another languages?
            </p>
            <p className="text-lightblackColor text-[16px] leading-[137.5%] font-medium">
              {professionalInfo?.bilingual || "-"}
            </p>
          </div>

          <div>
            <p className="text-secondaryColor text-sm leading-[142.857%]">
              Start Date
            </p>
            <p className="text-lightblackColor text-[16px] leading-[137.5%] font-medium">
              {professionalInfo?.start_date || "-"}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h2 className="mb-4 text-headerColor text-xl font-semibold">
          Reference
        </h2>

        <div className="p-4 sm:p-5 md:p-6 border border-borderColor rounded-[20px]">
          <h3 className="text-lg text-headerColor font-semibold leading-[111.111%] mb-4">
            First Parent (Primary Contact)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Left Column */}
            <div className="mt-3 space-y-4">
              <div>
                <p className="text-secondaryColor text-sm leading-[142.857%]">
                  First Name
                </p>
                <p className="text-lightblackColor text-[16px] leading-[137.5%] font-medium">
                  {reference?.first_name || "-"}
                </p>
              </div>

              <div>
                <p className="text-secondaryColor text-sm leading-[142.857%]">
                  Email Address
                </p>
                <p className="text-lightblackColor text-[16px] leading-[137.5%] font-medium">
                  {reference?.email || "-"}
                </p>
              </div>

              <div>
                <p className="text-secondaryColor text-sm leading-[142.857%]">
                  Relation
                </p>
                <p className="text-lightblackColor text-[16px] leading-[137.5%] font-medium">
                  {reference?.relation || "-"}
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div className="mt-3 space-y-4">
              <div>
                <p className="text-secondaryColor text-sm leading-[142.857%]">
                  Last Name
                </p>
                <p className="text-lightblackColor text-[16px] leading-[137.5%] font-medium">
                  {reference?.last_name || "-"}
                </p>
              </div>

              <div>
                <p className="text-secondaryColor text-sm leading-[142.857%]">
                  Phone Number
                </p>
                <p className="text-lightblackColor text-[16px] leading-[137.5%] font-medium">
                  {reference?.phone || "-"}
                </p>
              </div>

              <div>
                <p className="text-secondaryColor text-sm leading-[142.857%]">
                  Description
                </p>
                <p className="text-lightblackColor text-[16px] leading-[137.5%] font-medium">
                  {reference?.description || "-"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileProfessionalInformation;
