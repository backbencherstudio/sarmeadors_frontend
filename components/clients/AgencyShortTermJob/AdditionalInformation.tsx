"use client";
import React, { useState } from "react";
interface FormData {
  interestedMidwest: string;
  yearsExperience: string;
  commitment: string;
  availableFor: {
    partTime: boolean;
    liveIn: boolean;
  };
  driverLicense: string;
  cprCertified: string;
  vaccinations: string;
  petsHome: string;
  travel: string;
  usWork: string;
  paidLegally: string;
  ssn: string;
  hearAboutUs: string;
}
export default function AdditionalInformation() {
  const [formData, setFormData] = useState<FormData>({
    interestedMidwest: "yes",
    yearsExperience: "5-10",
    commitment: "long-term",
    availableFor: {
      partTime: true,
      liveIn: true,
    },
    driverLicense: "drivers-license",
    cprCertified: "willing",
    vaccinations: "yes",
    petsHome: "cat",
    travel: "international",
    usWork: "yes",
    paidLegally: "yes",
    ssn: "yes",
    hearAboutUs: "google",
  });

  const handleRadioChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCheckboxChange = (field: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      availableFor: {
        ...prev.availableFor,
        [field]: checked,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Add your submission logic here
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 border rounded-[16px] p-6"
      >
        {/* Question 1 */}
        <fieldset className="pb-6">
          <legend className="text-base sm:text-lg font-semibold text-gray-900 mb-3">
            Are you interested in Midwest Elite Nannies (Iowa location)?
            <span className="text-red-500 ml-1">*</span>
          </legend>
          <div className="flex items-center gap-3">
            <input
              type="radio"
              id="midwest-yes"
              name="midwest"
              value="yes"
              checked={formData.interestedMidwest === "yes"}
              onChange={(e) =>
                handleRadioChange("interestedMidwest", e.target.value)
              }
              className="w-4 h-4 cursor-pointer accent-gray-900"
            />
            <label
              htmlFor="midwest-yes"
              className="text-sm sm:text-base text-gray-900 cursor-pointer"
            >
              Yes
            </label>
          </div>
        </fieldset>

        {/* Question 2 */}
        <fieldset className="pb-6">
          <legend className="text-base sm:text-lg font-semibold text-gray-900 mb-3">
            Years of Experience (Must have at least 2 years of relevant
            experience)
            <span className="text-red-500 ml-1">*</span>
          </legend>
          <div className="flex items-center gap-3">
            <input
              type="radio"
              id="exp-5-10"
              name="experience"
              value="5-10"
              checked={formData.yearsExperience === "5-10"}
              onChange={(e) =>
                handleRadioChange("yearsExperience", e.target.value)
              }
              className="w-4 h-4 cursor-pointer accent-gray-900"
            />
            <label
              htmlFor="exp-5-10"
              className="text-sm sm:text-base text-gray-900 cursor-pointer"
            >
              5-10 years
            </label>
          </div>
        </fieldset>

        {/* Question 3 */}
        <fieldset className="pb-6">
          <legend className="text-base sm:text-lg font-semibold text-gray-900 mb-3">
            Commitment
            <span className="text-red-500 ml-1">*</span>
          </legend>
          <div className="flex items-center gap-3">
            <input
              type="radio"
              id="commitment-long"
              name="commitment"
              value="long-term"
              checked={formData.commitment === "long-term"}
              onChange={(e) => handleRadioChange("commitment", e.target.value)}
              className="w-4 h-4 cursor-pointer accent-gray-900"
            />
            <label
              htmlFor="commitment-long"
              className="text-sm sm:text-base text-gray-900 cursor-pointer"
            >
              Long Term (Longer than 1 year)
            </label>
          </div>
        </fieldset>

        {/* Question 4 */}
        <fieldset className="pb-6">
          <legend className="text-base sm:text-lg font-semibold text-gray-900 mb-3">
            Available for
            <span className="text-red-500 ml-1">*</span>
          </legend>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="available-part-time"
                checked={formData.availableFor.partTime}
                onChange={(e) =>
                  handleCheckboxChange("partTime", e.target.checked)
                }
                className="w-4 h-4 cursor-pointer accent-gray-900"
              />
              <label
                htmlFor="available-part-time"
                className="text-sm sm:text-base text-gray-900 cursor-pointer"
              >
                Part Time
              </label>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="available-live-in"
                checked={formData.availableFor.liveIn}
                onChange={(e) =>
                  handleCheckboxChange("liveIn", e.target.checked)
                }
                className="w-4 h-4 cursor-pointer accent-gray-900"
              />
              <label
                htmlFor="available-live-in"
                className="text-sm sm:text-base text-gray-900 cursor-pointer"
              >
                Live In
              </label>
            </div>
          </div>
        </fieldset>

        {/* Question 5 */}
        <fieldset className="pb-6">
          <legend className="text-base sm:text-lg font-semibold text-gray-900 mb-3">
            Do you have a valid Driver's License and Car?
            <span className="text-red-500 ml-1">*</span>
          </legend>
          <div className="flex items-center gap-3">
            <input
              type="radio"
              id="driver-license"
              name="driver"
              value="drivers-license"
              checked={formData.driverLicense === "drivers-license"}
              onChange={(e) =>
                handleRadioChange("driverLicense", e.target.value)
              }
              className="w-4 h-4 cursor-pointer accent-gray-900"
            />
            <label
              htmlFor="driver-license"
              className="text-sm sm:text-base text-gray-900 cursor-pointer"
            >
              Driver's License only
            </label>
          </div>
        </fieldset>

        {/* Question 6 */}
        <fieldset className="pb-6">
          <legend className="text-base sm:text-lg font-semibold text-gray-900 mb-3">
            Are you CPR and First Aid certified?
            <span className="text-red-500 ml-1">*</span>
          </legend>
          <div className="flex items-center gap-3">
            <input
              type="radio"
              id="cpr-willing"
              name="cpr"
              value="willing"
              checked={formData.cprCertified === "willing"}
              onChange={(e) =>
                handleRadioChange("cprCertified", e.target.value)
              }
              className="w-4 h-4 cursor-pointer accent-gray-900"
            />
            <label
              htmlFor="cpr-willing"
              className="text-sm sm:text-base text-gray-900 cursor-pointer"
            >
              Willing to get certified
            </label>
          </div>
        </fieldset>

        {/* Question 7 */}
        <fieldset className="pb-6">
          <legend className="text-base sm:text-lg font-semibold text-gray-900 mb-3">
            Are you up to date on vaccinations?
            <span className="text-red-500 ml-1">*</span>
          </legend>
          <div className="flex items-center gap-3">
            <input
              type="radio"
              id="vax-yes"
              name="vaccinations"
              value="yes"
              checked={formData.vaccinations === "yes"}
              onChange={(e) =>
                handleRadioChange("vaccinations", e.target.value)
              }
              className="w-4 h-4 cursor-pointer accent-gray-900"
            />
            <label
              htmlFor="vax-yes"
              className="text-sm sm:text-base text-gray-900 cursor-pointer"
            >
              Yes
            </label>
          </div>
        </fieldset>

        {/* Question 8 */}
        <fieldset className="pb-6">
          <legend className="text-base sm:text-lg font-semibold text-gray-900 mb-3">
            OK with pets in the home?
            <span className="text-red-500 ml-1">*</span>
          </legend>
          <div className="flex items-center gap-3">
            <input
              type="radio"
              id="pets-cat"
              name="pets"
              value="cat"
              checked={formData.petsHome === "cat"}
              onChange={(e) => handleRadioChange("petsHome", e.target.value)}
              className="w-4 h-4 cursor-pointer accent-gray-900"
            />
            <label
              htmlFor="pets-cat"
              className="text-sm sm:text-base text-gray-900 cursor-pointer"
            >
              Cat
            </label>
          </div>
        </fieldset>

        {/* Question 9 */}
        <fieldset className="pb-6">
          <legend className="text-base sm:text-lg font-semibold text-gray-900 mb-3">
            Ok with travel?
            <span className="text-red-500 ml-1">*</span>
          </legend>
          <div className="flex items-center gap-3">
            <input
              type="radio"
              id="travel-intl"
              name="travel"
              value="international"
              checked={formData.travel === "international"}
              onChange={(e) => handleRadioChange("travel", e.target.value)}
              className="w-4 h-4 cursor-pointer accent-gray-900"
            />
            <label
              htmlFor="travel-intl"
              className="text-sm sm:text-base text-gray-900 cursor-pointer"
            >
              International
            </label>
          </div>
        </fieldset>

        {/* Question 10 */}
        <fieldset className="pb-6">
          <legend className="text-base sm:text-lg font-semibold text-gray-900 mb-3">
            Are you legally able to work in the United States?
            <span className="text-red-500 ml-1">*</span>
          </legend>
          <div className="flex items-center gap-3">
            <input
              type="radio"
              id="us-work-yes"
              name="uswork"
              value="yes"
              checked={formData.usWork === "yes"}
              onChange={(e) => handleRadioChange("usWork", e.target.value)}
              className="w-4 h-4 cursor-pointer accent-gray-900"
            />
            <label
              htmlFor="us-work-yes"
              className="text-sm sm:text-base text-gray-900 cursor-pointer"
            >
              Yes
            </label>
          </div>
        </fieldset>

        {/* Question 11 */}
        <fieldset className="pb-6">
          <legend className="text-base sm:text-lg font-semibold text-gray-900 mb-3">
            Are you comfortable being paid legally?
            <span className="text-red-500 ml-1">*</span>
          </legend>
          <div className="flex items-center gap-3">
            <input
              type="radio"
              id="paid-yes"
              name="paid"
              value="yes"
              checked={formData.paidLegally === "yes"}
              onChange={(e) => handleRadioChange("paidLegally", e.target.value)}
              className="w-4 h-4 cursor-pointer accent-gray-900"
            />
            <label
              htmlFor="paid-yes"
              className="text-sm sm:text-base text-gray-900 cursor-pointer"
            >
              Yes
            </label>
          </div>
        </fieldset>

        {/* Question 12 */}
        <fieldset className="pb-6">
          <legend className="text-base sm:text-lg font-semibold text-gray-900 mb-3">
            Do you have a valid Social Security Number?
            <span className="text-red-500 ml-1">*</span>
          </legend>
          <div className="flex items-center gap-3">
            <input
              type="radio"
              id="ssn-yes"
              name="ssn"
              value="yes"
              checked={formData.ssn === "yes"}
              onChange={(e) => handleRadioChange("ssn", e.target.value)}
              className="w-4 h-4 cursor-pointer accent-gray-900"
            />
            <label
              htmlFor="ssn-yes"
              className="text-sm sm:text-base text-gray-900 cursor-pointer"
            >
              Yes
            </label>
          </div>
        </fieldset>

        {/* Question 13 */}
        <fieldset className="pb-6">
          <legend className="text-base sm:text-lg font-semibold text-gray-900 mb-3">
            How did you hear about us?
            <span className="text-red-500 ml-1">*</span>
          </legend>
          <div className="flex items-center gap-3">
            <input
              type="radio"
              id="hear-google"
              name="hear"
              value="google"
              checked={formData.hearAboutUs === "google"}
              onChange={(e) => handleRadioChange("hearAboutUs", e.target.value)}
              className="w-4 h-4 cursor-pointer accent-gray-900"
            />
            <label
              htmlFor="hear-google"
              className="text-sm sm:text-base text-gray-900 cursor-pointer"
            >
              Google
            </label>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
