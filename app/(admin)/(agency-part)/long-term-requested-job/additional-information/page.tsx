"use client";

import { useState } from "react";

interface AccordionItem {
  id: string;
  question: string;
  answer: string;
}

const items: AccordionItem[] = [
  {
    id: "family-schedule",
    question: "Please describe your family schedule.",
    answer:
      "We follow a structured weekly routine with consistent school hours, after-school activities, and predictable evening wind-down time. Weekends are generally relaxed with family outings or activities planned in advance.",
  },
  {
    id: "household-tasks",
    question:
      "Please describe an household tasks our nanny will be expected to perform",
    answer:
      "We follow a structured weekly routine with consistent school hours, after-school activities, and predictable evening wind-down time. Weekends are generally relaxed with family outings or activities planned in advance.",
  },
  {
    id: "family-philosophies",
    question:
      "Please describe your family philosophies regarding childcare, discipline, etc.",
    answer:
      "We follow a structured weekly routine with consistent school hours, after-school activities, and predictable evening wind-down time. Weekends are generally relaxed with family outings or activities planned in advance.",
  },
  {
    id: "play-dates",
    question: "Do you encourage play dates? If so, in your home or away.",
    answer:
      "We follow a structured weekly routine with consistent school hours, after-school activities, and predictable evening wind-down time. Weekends are generally relaxed with family outings or activities planned in advance.",
  },
  {
    id: "special-privileges",
    question: "Please explain any special privileges given to the nanny",
    answer:
      "We follow a structured weekly routine with consistent school hours, after-school activities, and predictable evening wind-down time. Weekends are generally relaxed with family outings or activities planned in advance.",
  },
  {
    id: "describe-home",
    question: "Describe your home",
    answer:
      "We follow a structured weekly routine with consistent school hours, after-school activities, and predictable evening wind-down time. Weekends are generally relaxed with family outings or activities planned in advance.",
  },
  {
    id: "describe-neighborhood",
    question: "Describe your neighborhood",
    answer:
      "We follow a structured weekly routine with consistent school hours, after-school activities, and predictable evening wind-down time. Weekends are generally relaxed with family outings or activities planned in advance.",
  },
  {
    id: "experience-nannies",
    question: "Describe your overall experience with nannies",
    answer:
      "We follow a structured weekly routine with consistent school hours, after-school activities, and predictable evening wind-down time. Weekends are generally relaxed with family outings or activities planned in advance.",
  },
  {
    id: "previous-nanny",
    question:
      "If family has had a previous nanny, please explain how long each nanny was with your family",
    answer:
      "We follow a structured weekly routine with consistent school hours, after-school activities, and predictable evening wind-down time. Weekends are generally relaxed with family outings or activities planned in advance.",
  },
  {
    id: "pets",
    question: "Do you have pets? If so, please describe them",
    answer:
      "We follow a structured weekly routine with consistent school hours, after-school activities, and predictable evening wind-down time. Weekends are generally relaxed with family outings or activities planned in advance.",
  },
];

export default function AdditionalInformation() {
  const [openId, setOpenId] = useState<string>("family-schedule");

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? "" : id));
  };

  return (
    <div
      style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
      className="min-h-screen bg-white"
    >
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
          Additional Information
        </h1>

        <div className="divide-y divide-gray-200">
          {items.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id}>
                <button
                  type="button"
                  onClick={() => toggle(item.id)}
                  className="w-full flex items-start gap-3 py-3 text-left group"
                >
                  {/* Chevron */}
                  <span className="mt-0.5 flex-shrink-0 text-gray-500 transition-transform duration-200 p-2 border rounded-md cursor-pointer">
                    <svg
                      style={{
                        transform: isOpen ? "rotate(0deg)" : "rotate(-90deg)",
                      }}
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 6L8 10L12 6"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>

                  <span
                    className={`text-lg leading-snug ${
                      isOpen
                        ? "font-semibold text-gray-900"
                        : "font-normal text-gray-900"
                    }`}
                  >
                    {item.question}
                  </span>
                </button>

                {/* Answer */}
                {isOpen && item.answer && (
                  <div className="pl-7 pb-3">
                    <p className="text-base text-gray-500 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
