"use client";

import { useState } from "react";

type RequirementItem = {
  question: string;
  options: string[];
  selected: string;
};

const requirements: RequirementItem[] = [
  {
    question: "Are you interested in Midwest Elite Nannies (Iowa location)?",
    options: ["Yes", "No"],
    selected: "Yes",
  },
  {
    question: "Does your child have any special needs or medical conditions?",
    options: ["Yes", "No"],
    selected: "No",
  },
  {
    question: "Does your child need to be taken to after school activity?",
    options: ["Yes", "No"],
    selected: "No",
  },
  {
    question: "Do you have a housekeeper:",
    options: ["Yes", "No"],
    selected: "No",
  },
  {
    question: "Will your nanny be expected to prepare meals?",
    options: ["Yes", "No"],
    selected: "No",
  },
  {
    question: "Will your nanny required to travel with the family?",
    options: ["Yes", "No"],
    selected: "Yes",
  },
  {
    question: "Will you provide paid vacation or holidays for your nanny?",
    options: ["Vacation", "Holidays", "Vacation and Holidays", "None"],
    selected: "Vacation and Holidays",
  },
  {
    question: "Do you or your spouse work from home ?",
    options: [
      "yes. I do",
      "Yes, my spouse does",
      "Yes, both my spouse and I do",
      "No",
    ],
    selected: "Yes, both my spouse and I do",
  },
  {
    question: "Is the nanny required to have their own car?",
    options: ["Yes", "No", "Other"],
    selected: "Yes",
  },
];

function CandidateSingleJobRequirement() {
  const [selected, setSelected] = useState<Record<string, string>>(
    Object.fromEntries(requirements.map((r) => [r.question, r.selected])),
  );

  return (
    <section className="max-w-[640px] space-y-4 pt-1 text-blackColor">
      <h2 className="text-[20px] font-medium leading-[1.2]">Requirements</h2>

      {requirements.map((item) => (
        <div key={item.question} className="space-y-2.5">
          <p className="text-sm font-medium leading-[1.3]">
            {item.question} <span className="text-redColor">*</span>
          </p>

          <div className="space-y-2">
            {item.options.map((option) => (
              <label
                key={option}
                className="flex cursor-pointer items-center gap-2 text-[13px] leading-[1.4] text-lightblackColor"
              >
                <input
                  type="radio"
                  name={item.question}
                  value={option}
                  checked={selected[item.question] === option}
                  onChange={() =>
                    setSelected((prev) => ({
                      ...prev,
                      [item.question]: option,
                    }))
                  }
                  className="h-4 w-4 cursor-pointer accent-blackColor"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

export default CandidateSingleJobRequirement;
