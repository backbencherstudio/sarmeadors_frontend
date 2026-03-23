"use client";

import { useState } from "react";
import CustomRadioGroup, { RadioOption } from "../reusable/CustomRadioGroup";
import { Checkbox } from "../ui/checkbox";

interface RadioQuestion {
  id: string;
  question: string;
  options: RadioOption[];
  defaultValue: string;
}

const radioQuestions: RadioQuestion[] = [
  {
    id: "midwest",
    question: "Are you interested in Midwest Elite Nannies (Iowa location)?",
    defaultValue: "yes",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ],
  },
  {
    id: "experience",
    question:
      "Years of Experience (Must have at least 2 years of relevant experience)",
    defaultValue: "five-ten",
    options: [
      { label: "2-5 years", value: "two-five" },
      { label: "5-10 years", value: "five-ten" },
      { label: "10 plus years", value: "ten-plus" },
    ],
  },
  {
    id: "commitment",
    question: "Commitment",
    defaultValue: "long-term",
    options: [
      { label: "Long Term (longer than 1 year)", value: "long-term" },
      { label: "Short Term (1 year or less)", value: "short-term" },
      { label: "Temporary", value: "temporary" },
    ],
  },
  {
    id: "license",
    question: "Do you have a valid Driver's License and Car?",
    defaultValue: "license-only",
    options: [
      { label: "D.L. and car", value: "dl-car" },
      { label: "Driver's License only", value: "license-only" },
      { label: "Neither", value: "neither" },
    ],
  },
  {
    id: "cpr",
    question: "Are you CPR and First Aid certified.",
    defaultValue: "willing",
    options: [
      { label: "Yes", value: "yes" },
      { label: "Willing to get certified", value: "willing" },
      { label: "No", value: "no" },
    ],
  },
  {
    id: "vaccinations",
    question: "Are you up to date on vaccinations.",
    defaultValue: "yes",
    options: [
      { label: "Yes", value: "yes" },
      { label: "Willing to get", value: "willing" },
      { label: "No", value: "no" },
    ],
  },
  {
    id: "pets",
    question: "OK with pets in the home?",
    defaultValue: "cat",
    options: [
      { label: "Dog", value: "dog" },
      { label: "Cat", value: "cat" },
      { label: "Neither", value: "neither" },
    ],
  },
  {
    id: "travel",
    question: "Ok with travel?",
    defaultValue: "international",
    options: [
      { label: "Domestic", value: "domestic" },
      { label: "International", value: "international" },
      { label: "No travel", value: "none" },
    ],
  },
  {
    id: "work-status",
    question: "Are you legally able to work in the United States?",
    defaultValue: "yes",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ],
  },
  {
    id: "paid-legally",
    question: "Are you comfortable being paid legally?",
    defaultValue: "yes",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ],
  },
  {
    id: "ssn",
    question: "Do you have a valid Social Security Number?",
    defaultValue: "yes",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ],
  },
  {
    id: "source",
    question: "How did you hear about us?",
    defaultValue: "village",
    options: [
      { label: "Via The Village Facebook group", value: "village" },
      { label: "Google", value: "google" },
      { label: "Other", value: "other" },
    ],
  },
];

const availableOptions = [
  { label: "Full Time", value: "full-time" },
  { label: "Part Time", value: "part-time" },
  { label: "Come and Go", value: "come-go" },
  { label: "Live In", value: "live-in" },
];

function ProfileAdditionalInformation() {
  const [radioAnswers, setRadioAnswers] = useState<Record<string, string>>(
    Object.fromEntries(
      radioQuestions.map((question) => [question.id, question.defaultValue]),
    ),
  );
  const [availableFor, setAvailableFor] = useState<string[]>([
    "part-time",
    "live-in",
  ]);

  const handleRadioChange = (id: string, value: string) => {
    setRadioAnswers((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="border border-borderColor rounded-[16px] sm:rounded-[20px] p-4 sm:p-6 bg-white">
      <div className="space-y-4 ">
        {radioQuestions.slice(0, 3).map((item) => (
          <CustomRadioGroup
            key={item.id}
            question={item.question}
            options={item.options}
            required
            value={radioAnswers[item.id] || ""}
            onChange={(value) => handleRadioChange(item.id, value)}
          />
        ))}

        <div className="space-y-2.5">
          <h3 className="text-xs sm:text-sm font-medium text-headerColor leading-[1.4]">
            Available for
            <span className="text-redColor"> *</span>
          </h3>

          <div className="space-y-1.5">
            {availableOptions.map((option) => {
              const isSelected = availableFor.includes(option.value);

              return (
                <label
                  key={option.value}
                  className="flex w-full items-center gap-2 text-left"
                >
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={(checked) => {
                      const shouldSelect = checked === true;
                      setAvailableFor((prev) => {
                        if (shouldSelect) {
                          return prev.includes(option.value)
                            ? prev
                            : [...prev, option.value];
                        }

                        return prev.filter((item) => item !== option.value);
                      });
                    }}
                    className="border-borderColor data-[state=checked]:bg-headerColor data-[state=checked]:border-headerColor"
                  />

                  <span className="text-xs sm:text-sm text-lightblackColor leading-[1.35]">
                    {option.label}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {radioQuestions.slice(3).map((item) => (
          <CustomRadioGroup
            key={item.id}
            question={item.question}
            options={item.options}
            required
            value={radioAnswers[item.id] || ""}
            onChange={(value) => handleRadioChange(item.id, value)}
          />
        ))}
      </div>
    </div>
  );
}

export default ProfileAdditionalInformation;
