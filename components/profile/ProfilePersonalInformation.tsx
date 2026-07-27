"use client";

import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import ButtonReuseable from "../reusable/CustomButton";

function ProfilePersonalInformation({ personalInfo }: { personalInfo?: any }) {
  const [isHidden, setIsHidden] = useState(false);
  const [hiddenField, setHiddenField] = useState("");

  const address = personalInfo?.address || {};

  const handleHidden = (field: string) => {
    setHiddenField(field);
    setIsHidden(!isHidden);
  };

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
                {personalInfo?.first_name || "-"}
              </p>
            </div>
            <div>
              <p className="text-secondaryColor text-sm leading-[142.857%]">
                Email Address
              </p>
              <p className="text-lightblackColor text-[16px] leading-[137.5%] font-medium">
                {personalInfo?.email || "-"}
              </p>
            </div>
            <div>
              <p className="text-secondaryColor text-sm leading-[142.857%]">
                Nationality
              </p>
              <p className="text-lightblackColor text-[16px] leading-[137.5%] font-medium">
                {personalInfo?.nationality || "-"}
              </p>
            </div>
          </div>
          <div className="mt-3 space-y-4">
            <div>
              <p className="text-secondaryColor text-sm leading-[142.857%]">
                Last Name
              </p>
              <p className="text-lightblackColor text-[16px] leading-[137.5%] font-medium">
                {personalInfo?.last_name || "-"}
              </p>
            </div>
            <div>
              <p className="text-secondaryColor text-sm leading-[142.857%]">
                Date of Birth
              </p>
              <p className="text-lightblackColor text-[16px] leading-[137.5%] font-medium">
                {personalInfo?.date_of_birth || "-"}
              </p>
            </div>
            <div>
              <p className="text-secondaryColor text-sm leading-[142.857%]">
                Phone Number
              </p>
              <p className="text-lightblackColor text-[16px] leading-[137.5%] font-medium">
                {personalInfo?.mobile || "-"}
              </p>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-lg text-headerColor font-semibold leading-[20px] mt-6">
            Address
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mt-4 ">
            <div>
              <div className="text-secondaryColor flex items-center gap-1 text-sm leading-[142.857%]">
                <span>Street Address</span>{" "}
                <ButtonReuseable
                  onClick={() => handleHidden("street")}
                  icon={
                    isHidden && hiddenField === "street" ? (
                      <FiEyeOff className="text-sm" size={18} />
                    ) : (
                      <FiEye className="text-sm" size={18} />
                    )
                  }
                  className="bg-transparent  text-lightblackColor! px-1! py-0! text-sm!"
                />
              </div>
              <p className="text-lightblackColor text-[16px] leading-[137.5%] font-medium">
                {address?.street || "-"}
              </p>
            </div>
            <div>
              <div className="text-secondaryColor flex items-center gap-1 text-sm leading-[142.857%]">
                <span>City</span>{" "}
                <ButtonReuseable
                  onClick={() => handleHidden("city")}
                  icon={
                    isHidden && hiddenField === "city" ? (
                      <FiEyeOff className="text-sm" size={18} />
                    ) : (
                      <FiEye className="text-sm" size={18} />
                    )
                  }
                  className="bg-transparent  text-lightblackColor! px-1! py-0! text-sm!"
                />
              </div>
              <p className="text-lightblackColor text-[16px] leading-[137.5%] font-medium">
                {address?.city || "-"}
              </p>
            </div>
            <div>
              <div className="text-secondaryColor flex items-center gap-1 text-sm leading-[142.857%]">
                <span>Province/State</span>{" "}
                <ButtonReuseable
                  onClick={() => handleHidden("province")}
                  icon={
                    isHidden && hiddenField === "province" ? (
                      <FiEyeOff className="text-sm" size={18} />
                    ) : (
                      <FiEye className="text-sm" size={18} />
                    )
                  }
                  className="bg-transparent  text-lightblackColor! px-1! py-0! text-sm!"
                />
              </div>
              <p className="text-lightblackColor text-[16px] leading-[137.5%] font-medium">
                {address?.province || "-"}
              </p>
            </div>
            <div>
              <div className="text-secondaryColor flex items-center gap-1 text-sm leading-[142.857%]">
                <span>Postal Code</span>{" "}
                <ButtonReuseable
                  onClick={() => handleHidden("postalCode")}
                  icon={
                    isHidden && hiddenField === "postalCode" ? (
                      <FiEyeOff className="text-sm" size={18} />
                    ) : (
                      <FiEye className="text-sm" size={18} />
                    )
                  }
                  className="bg-transparent  text-lightblackColor! px-1! py-0! text-sm!"
                />
              </div>
              <p className="text-lightblackColor text-[16px] leading-[137.5%] font-medium">
                {address?.postalCode || "-"}
              </p>
            </div>
            <div>
              <div className="text-secondaryColor flex items-center gap-1 text-sm leading-[142.857%]">
                <span>Country</span>{" "}
                <ButtonReuseable
                  onClick={() => handleHidden("country")}
                  icon={
                    isHidden && hiddenField === "country" ? (
                      <FiEyeOff className="text-sm" size={18} />
                    ) : (
                      <FiEye className="text-sm" size={18} />
                    )
                  }
                  className="bg-transparent  text-lightblackColor! px-1! py-0! text-sm!"
                />
              </div>
              <p className="text-lightblackColor text-[16px] leading-[137.5%] font-medium">
                {address?.country || "-"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePersonalInformation;
