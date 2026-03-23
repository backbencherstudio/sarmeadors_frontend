function ProfilePersonalInformation() {
  return (
    <div>
      <div className="p-4 sm:p-5 md:p-6 border border-[#E5E7EB] rounded-[20px]">
        <h2 className="text-lg text-headerColor font-semibold leading-[20px]">
          First Parent (Primary Contact)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="mt-3 space-y-4">
            <div>
              <p className="text-secondaryColor text-sm leading-[142.857%]">
                First Name
              </p>
              <p className="text-lightblackColor text-[16px] leading-[137.5%] font-medium">
                Kristin
              </p>
            </div>
            <div>
              <p className="text-secondaryColor text-sm leading-[142.857%]">
                Email Address
              </p>
              <p className="text-lightblackColor text-[16px] leading-[137.5%] font-medium">
                binhan628@gmail.com
              </p>
            </div>
            <div>
              <p className="text-secondaryColor text-sm leading-[142.857%]">
                Nationality
              </p>
              <p className="text-lightblackColor text-[16px] leading-[137.5%] font-medium">
                Americans
              </p>
            </div>
          </div>
          <div className="mt-3 space-y-4">
            <div>
              <p className="text-secondaryColor text-sm leading-[142.857%]">
                Last Name
              </p>
              <p className="text-lightblackColor text-[16px] leading-[137.5%] font-medium">
                Ben
              </p>
            </div>
            <div>
              <p className="text-secondaryColor text-sm leading-[142.857%]">
                Date of Birth
              </p>
              <p className="text-lightblackColor text-[16px] leading-[137.5%] font-medium">
                12/12/2025
              </p>
            </div>
            <div>
              <p className="text-secondaryColor text-sm leading-[142.857%]">
                Phone Number
              </p>
              <p className="text-lightblackColor text-[16px] leading-[137.5%] font-medium">
                +14842918883
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mt-6">
          <div>
            <p className="text-secondaryColor text-sm leading-[142.857%]">
              Street Address
            </p>
            <p className="text-lightblackColor text-[16px] leading-[137.5%] font-medium">
              26 Berkshire Ave.
            </p>
          </div>
          <div>
            <p className="text-secondaryColor text-sm leading-[142.857%]">City</p>
            <p className="text-lightblackColor text-[16px] leading-[137.5%] font-medium">
              Atlantic City
            </p>
          </div>
          <div>
            <p className="text-secondaryColor text-sm leading-[142.857%]">
              Province/State
            </p>
            <p className="text-lightblackColor text-[16px] leading-[137.5%] font-medium">
              NJ
            </p>
          </div>
          <div>
            <p className="text-secondaryColor text-sm leading-[142.857%]">
              Postal Code
            </p>
            <p className="text-lightblackColor text-[16px] leading-[137.5%] font-medium">
              08401
            </p>
          </div>
          <div>
            <p className="text-secondaryColor text-sm leading-[142.857%]">Country</p>
            <p className="text-lightblackColor text-[16px] leading-[137.5%] font-medium">
              USA
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePersonalInformation;
