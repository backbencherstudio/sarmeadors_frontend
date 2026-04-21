"use client";

import { useState } from "react";

interface FormData {
  interestedMidwest: string;
  yourChild: string;
  schoolActivity: string;
  housekeeper: string;
  prepareMeals: string;
  travelWithTheFamily: string;
  paidVacation: string;
  spouseWork: string;
  nannyRequired: string;
  usWork: string;
  paidLegally: string;
  ssn: string;
  hearAboutUs: string;
}

export default function page() {
  const [formData, setFormData] = useState<FormData>({
    interestedMidwest: "yes",
    yourChild: "yes",
    schoolActivity: "yes",
    housekeeper: "yes",
    prepareMeals: "yes",
    travelWithTheFamily: "yes",
    paidVacation: "vacation",
    spouseWork: "yes-i-do",
    nannyRequired: "yes",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
          Requirements
        </h1>

        {/* Question 1 */}
        <fieldset>
          <legend className="text-base sm:text-lg font-semibold text-gray-900 mb-3">
            Are you interested in Midwest Elite Nannies (Iowa location)?
            <span className="text-red-500 ml-1">*</span>
          </legend>
          <div className="flex items-center gap-3">
            <input
              type="radio"
              id="midwest-yes"
              name="interestedMidwest"
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
          <div className="flex items-center gap-3">
            <input
              type="radio"
              id="midwest-no"
              name="interestedMidwest"
              value="no"
              checked={formData.interestedMidwest === "no"}
              onChange={(e) =>
                handleRadioChange("interestedMidwest", e.target.value)
              }
              className="w-4 h-4 cursor-pointer accent-gray-900"
            />
            <label
              htmlFor="midwest-no"
              className="text-sm sm:text-base text-gray-900 cursor-pointer"
            >
              No
            </label>
          </div>
        </fieldset>

        {/* Question 2 */}
        <fieldset>
          <legend className="text-base sm:text-lg font-semibold text-gray-900 mb-3">
            Does your child have any special needs or medical conditions?
            <span className="text-red-500 ml-1">*</span>
          </legend>
          <div className="flex items-center gap-3">
            <input
              type="radio"
              id="yourChild-yes"
              name="yourChild"
              value="yes"
              checked={formData.yourChild === "yes"}
              onChange={(e) => handleRadioChange("yourChild", e.target.value)}
              className="w-4 h-4 cursor-pointer accent-gray-900"
            />
            <label
              htmlFor="yourChild-yes"
              className="text-sm sm:text-base text-gray-900 cursor-pointer"
            >
              Yes
            </label>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="radio"
              id="yourChild-no"
              name="yourChild"
              value="no"
              checked={formData.yourChild === "no"}
              onChange={(e) => handleRadioChange("yourChild", e.target.value)}
              className="w-4 h-4 cursor-pointer accent-gray-900"
            />
            <label
              htmlFor="yourChild-no"
              className="text-sm sm:text-base text-gray-900 cursor-pointer"
            >
              No
            </label>
          </div>
        </fieldset>

        {/* Question 3 */}
        <fieldset>
          <legend className="text-base sm:text-lg font-semibold text-gray-900 mb-3">
            Does your child need to be taken to after school activity?
            <span className="text-red-500 ml-1">*</span>
          </legend>
          <div className="flex items-center gap-3">
            <input
              type="radio"
              id="schoolActivity-yes"
              name="schoolActivity"
              value="yes"
              checked={formData.schoolActivity === "yes"}
              onChange={(e) =>
                handleRadioChange("schoolActivity", e.target.value)
              }
              className="w-4 h-4 cursor-pointer accent-gray-900"
            />
            <label
              htmlFor="schoolActivity-yes"
              className="text-sm sm:text-base text-gray-900 cursor-pointer"
            >
              Yes
            </label>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="radio"
              id="schoolActivity-no"
              name="schoolActivity"
              value="no"
              checked={formData.schoolActivity === "no"}
              onChange={(e) =>
                handleRadioChange("schoolActivity", e.target.value)
              }
              className="w-4 h-4 cursor-pointer accent-gray-900"
            />
            <label
              htmlFor="schoolActivity-no"
              className="text-sm sm:text-base text-gray-900 cursor-pointer"
            >
              No
            </label>
          </div>
        </fieldset>

        {/* Question 4 */}
        <fieldset>
          <legend className="text-base sm:text-lg font-semibold text-gray-900 mb-3">
            Do you have a housekeeper:
            <span className="text-red-500 ml-1">*</span>
          </legend>
          <div className="flex items-center gap-3">
            <input
              type="radio"
              id="housekeeper-yes"
              name="housekeeper"
              value="yes"
              checked={formData.housekeeper === "yes"}
              onChange={(e) => handleRadioChange("housekeeper", e.target.value)}
              className="w-4 h-4 cursor-pointer accent-gray-900"
            />
            <label
              htmlFor="housekeeper-yes"
              className="text-sm sm:text-base text-gray-900 cursor-pointer"
            >
              Yes
            </label>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="radio"
              id="housekeeper-no"
              name="housekeeper"
              value="no"
              checked={formData.housekeeper === "no"}
              onChange={(e) => handleRadioChange("housekeeper", e.target.value)}
              className="w-4 h-4 cursor-pointer accent-gray-900"
            />
            <label
              htmlFor="housekeeper-no"
              className="text-sm sm:text-base text-gray-900 cursor-pointer"
            >
              No
            </label>
          </div>
        </fieldset>

        {/* Question 5 */}
        <fieldset>
          <legend className="text-base sm:text-lg font-semibold text-gray-900 mb-3">
            Will your nanny be expected to prepare meals?
            <span className="text-red-500 ml-1">*</span>
          </legend>
          <div className="flex items-center gap-3">
            <input
              type="radio"
              id="prepareMeals-yes"
              name="prepareMeals"
              value="yes"
              checked={formData.prepareMeals === "yes"}
              onChange={(e) =>
                handleRadioChange("prepareMeals", e.target.value)
              }
              className="w-4 h-4 cursor-pointer accent-gray-900"
            />
            <label
              htmlFor="prepareMeals-yes"
              className="text-sm sm:text-base text-gray-900 cursor-pointer"
            >
              Yes
            </label>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="radio"
              id="prepareMeals-no"
              name="prepareMeals"
              value="no"
              checked={formData.prepareMeals === "no"}
              onChange={(e) =>
                handleRadioChange("prepareMeals", e.target.value)
              }
              className="w-4 h-4 cursor-pointer accent-gray-900"
            />
            <label
              htmlFor="prepareMeals-no"
              className="text-sm sm:text-base text-gray-900 cursor-pointer"
            >
              No
            </label>
          </div>
        </fieldset>

        {/* Question 6 */}
        <fieldset>
          <legend className="text-base sm:text-lg font-semibold text-gray-900 mb-3">
            Will your nanny required to travel with the family?
            <span className="text-red-500 ml-1">*</span>
          </legend>
          <div className="flex items-center gap-3">
            <input
              type="radio"
              id="travelWithTheFamily-yes"
              name="travelWithTheFamily"
              value="yes"
              checked={formData.travelWithTheFamily === "yes"}
              onChange={(e) =>
                handleRadioChange("travelWithTheFamily", e.target.value)
              }
              className="w-4 h-4 cursor-pointer accent-gray-900"
            />
            <label
              htmlFor="travelWithTheFamily-yes"
              className="text-sm sm:text-base text-gray-900 cursor-pointer"
            >
              Yes
            </label>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="radio"
              id="travelWithTheFamily-no"
              name="travelWithTheFamily"
              value="no"
              checked={formData.travelWithTheFamily === "no"}
              onChange={(e) =>
                handleRadioChange("travelWithTheFamily", e.target.value)
              }
              className="w-4 h-4 cursor-pointer accent-gray-900"
            />
            <label
              htmlFor="travelWithTheFamily-no"
              className="text-sm sm:text-base text-gray-900 cursor-pointer"
            >
              No
            </label>
          </div>
        </fieldset>

        {/* Question 7 */}
        <fieldset>
          <legend className="text-base sm:text-lg font-semibold text-gray-900 mb-3">
            Will you provide paid vacation or holidays for your nanny?
            <span className="text-red-500 ml-1">*</span>
          </legend>
          <div className="flex items-center gap-3">
            <input
              type="radio"
              id="paidVacation-vacation"
              name="paidVacation"
              value="vacation"
              checked={formData.paidVacation === "vacation"}
              onChange={(e) =>
                handleRadioChange("paidVacation", e.target.value)
              }
              className="w-4 h-4 cursor-pointer accent-gray-900"
            />
            <label
              htmlFor="paidVacation-vacation"
              className="text-sm sm:text-base text-gray-900 cursor-pointer"
            >
              Vacation
            </label>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="radio"
              id="paidVacation-holidays"
              name="paidVacation"
              value="holidays"
              checked={formData.paidVacation === "holidays"}
              onChange={(e) =>
                handleRadioChange("paidVacation", e.target.value)
              }
              className="w-4 h-4 cursor-pointer accent-gray-900"
            />
            <label
              htmlFor="paidVacation-holidays"
              className="text-sm sm:text-base text-gray-900 cursor-pointer"
            >
              Holidays
            </label>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="radio"
              id="paidVacation-both"
              name="paidVacation"
              value="vacation-and-holidays"
              checked={formData.paidVacation === "vacation-and-holidays"}
              onChange={(e) =>
                handleRadioChange("paidVacation", e.target.value)
              }
              className="w-4 h-4 cursor-pointer accent-gray-900"
            />
            <label
              htmlFor="paidVacation-both"
              className="text-sm sm:text-base text-gray-900 cursor-pointer"
            >
              Vacation and Holidays
            </label>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="radio"
              id="paidVacation-none"
              name="paidVacation"
              value="none"
              checked={formData.paidVacation === "none"}
              onChange={(e) =>
                handleRadioChange("paidVacation", e.target.value)
              }
              className="w-4 h-4 cursor-pointer accent-gray-900"
            />
            <label
              htmlFor="paidVacation-none"
              className="text-sm sm:text-base text-gray-900 cursor-pointer"
            >
              None
            </label>
          </div>
        </fieldset>

        {/* Question 8 */}
        <fieldset>
          <legend className="text-base sm:text-lg font-semibold text-gray-900 mb-3">
            Do you or your spouse work from home?
            <span className="text-red-500 ml-1">*</span>
          </legend>
          <div className="flex items-center gap-3">
            <input
              type="radio"
              id="spouseWork-me"
              name="spouseWork"
              value="yes-i-do"
              checked={formData.spouseWork === "yes-i-do"}
              onChange={(e) => handleRadioChange("spouseWork", e.target.value)}
              className="w-4 h-4 cursor-pointer accent-gray-900"
            />
            <label
              htmlFor="spouseWork-me"
              className="text-sm sm:text-base text-gray-900 cursor-pointer"
            >
              Yes, I do
            </label>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="radio"
              id="spouseWork-spouse"
              name="spouseWork"
              value="yes-spouse"
              checked={formData.spouseWork === "yes-spouse"}
              onChange={(e) => handleRadioChange("spouseWork", e.target.value)}
              className="w-4 h-4 cursor-pointer accent-gray-900"
            />
            <label
              htmlFor="spouseWork-spouse"
              className="text-sm sm:text-base text-gray-900 cursor-pointer"
            >
              Yes, my spouse does
            </label>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="radio"
              id="spouseWork-both"
              name="spouseWork"
              value="yes-both"
              checked={formData.spouseWork === "yes-both"}
              onChange={(e) => handleRadioChange("spouseWork", e.target.value)}
              className="w-4 h-4 cursor-pointer accent-gray-900"
            />
            <label
              htmlFor="spouseWork-both"
              className="text-sm sm:text-base text-gray-900 cursor-pointer"
            >
              Yes, both my spouse and I do
            </label>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="radio"
              id="spouseWork-no"
              name="spouseWork"
              value="no"
              checked={formData.spouseWork === "no"}
              onChange={(e) => handleRadioChange("spouseWork", e.target.value)}
              className="w-4 h-4 cursor-pointer accent-gray-900"
            />
            <label
              htmlFor="spouseWork-no"
              className="text-sm sm:text-base text-gray-900 cursor-pointer"
            >
              No
            </label>
          </div>
        </fieldset>

        {/* Question 9 */}
        <fieldset>
          <legend className="text-base sm:text-lg font-semibold text-gray-900 mb-3">
            Is the nanny required to have their own car?
            <span className="text-red-500 ml-1">*</span>
          </legend>
          <div className="flex items-center gap-3">
            <input
              type="radio"
              id="nannyRequired-yes"
              name="nannyRequired"
              value="yes"
              checked={formData.nannyRequired === "yes"}
              onChange={(e) =>
                handleRadioChange("nannyRequired", e.target.value)
              }
              className="w-4 h-4 cursor-pointer accent-gray-900"
            />
            <label
              htmlFor="nannyRequired-yes"
              className="text-sm sm:text-base text-gray-900 cursor-pointer"
            >
              Yes
            </label>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="radio"
              id="nannyRequired-no"
              name="nannyRequired"
              value="no"
              checked={formData.nannyRequired === "no"}
              onChange={(e) =>
                handleRadioChange("nannyRequired", e.target.value)
              }
              className="w-4 h-4 cursor-pointer accent-gray-900"
            />
            <label
              htmlFor="nannyRequired-no"
              className="text-sm sm:text-base text-gray-900 cursor-pointer"
            >
              No
            </label>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="radio"
              id="nannyRequired-other"
              name="nannyRequired"
              value="other"
              checked={formData.nannyRequired === "other"}
              onChange={(e) =>
                handleRadioChange("nannyRequired", e.target.value)
              }
              className="w-4 h-4 cursor-pointer accent-gray-900"
            />
            <label
              htmlFor="nannyRequired-other"
              className="text-sm sm:text-base text-gray-900 cursor-pointer"
            >
              Other
            </label>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
