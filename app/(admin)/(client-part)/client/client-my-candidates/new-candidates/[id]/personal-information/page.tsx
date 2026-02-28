export default function PersonalInfoemation() {
  return (
    <div className="mt-6">
      <div className="p-6 border border-[#E5E7EB] rounded-[20px]">
        <h1 className="text-lg text-[#111927] font-semibold leading-[111.111%]">
          First Parent (Primary Contact)
        </h1>
        <div className="grid grid-cols-2 gap-4">
          <div className="mt-3 space-y-4">
            <div>
              <p className="text-[#778593] text-sm leading-[142.857%]">
                First Name
              </p>
              <p className="text-[#384250] text-[16px] leading-[137.5%] font-medium">
                Kristin
              </p>
            </div>
            <div>
              <p className="text-[#778593] text-sm leading-[142.857%]">
                Email Address
              </p>
              <p className="text-[#384250] text-[16px] leading-[137.5%] font-medium">
                binhan628@gmail.com
              </p>
            </div>
            <div>
              <p className="text-[#778593] text-sm leading-[142.857%]">
                Nationality
              </p>
              <p className="text-[#384250] text-[16px] leading-[137.5%] font-medium">
                Americans
              </p>
            </div>
          </div>
          <div className="mt-3 space-y-4">
            <div>
              <p className="text-[#778593] text-sm leading-[142.857%]">
                Last Name
              </p>
              <p className="text-[#384250] text-[16px] leading-[137.5%] font-medium">
                Ben
              </p>
            </div>
            <div>
              <p className="text-[#778593] text-sm leading-[142.857%]">
                Date of Birth
              </p>
              <p className="text-[#384250] text-[16px] leading-[137.5%] font-medium">
                12/12/2025
              </p>
            </div>
            <div>
              <p className="text-[#778593] text-sm leading-[142.857%]">
                Phone Number
              </p>
              <p className="text-[#384250] text-[16px] leading-[137.5%] font-medium">
                +14842918883
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between w-full mt-4">
          <div>
            <p className="text-[#778593] text-sm leading-[142.857%]">
              Street Address
            </p>
            <p className="text-[#384250] text-[16px] leading-[137.5%] font-medium">
              26 Berkshire Ave.
            </p>
          </div>
          <div>
            <p className="text-[#778593] text-sm leading-[142.857%]">City</p>
            <p className="text-[#384250] text-[16px] leading-[137.5%] font-medium">
              Atlantic City
            </p>
          </div>
          <div>
            <p className="text-[#778593] text-sm leading-[142.857%]">
              Province/State
            </p>
            <p className="text-[#384250] text-[16px] leading-[137.5%] font-medium">
              NJ
            </p>
          </div>
          <div>
            <p className="text-[#778593] text-sm leading-[142.857%]">
              Postal Code
            </p>
            <p className="text-[#384250] text-[16px] leading-[137.5%] font-medium">
              08401
            </p>
          </div>
          <div>
            <p className="text-[#778593] text-sm leading-[142.857%]">Country</p>
            <p className="text-[#384250] text-[16px] leading-[137.5%] font-medium">
              USA
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
