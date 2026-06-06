"use client";

import { EyeIcon } from "lucide-react";

export interface ChildrenInformationCardProps {
  name: string;
  dateOfBirth: string;
  gender: string;
  interests: string;
  allergiesOrNeeds: string;
}

interface FieldProps {
  label: string;
  value: string;
  multiline?: boolean;
}

function Field({ label, value, multiline = false }: FieldProps) {
  return (
    <div>
      <div className="flex items-center gap-1 mb-0.5">
        <span className="text-xs text-gray-400">{label}</span>
        <span className="text-gray-900">
          <EyeIcon className="h-4 w-4" />
        </span>
      </div>
      <p
        className={`text-sm text-gray-800 leading-relaxed ${multiline ? "" : "whitespace-nowrap"}`}
      >
        {value}
      </p>
    </div>
  );
}

export default function ChildrenInformationCard({
  name,
  dateOfBirth,
  gender,
  interests,
  allergiesOrNeeds,
}: ChildrenInformationCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl px-6 py-5">
      <p className="text-sm font-semibold text-gray-900 mb-4">{name}</p>

      <div className="grid grid-cols-[160px_160px_1fr] gap-x-8 gap-y-4 items-start">
        <Field label="Date of Birth" value={dateOfBirth} />
        <Field label="Gender" value={gender} />

        <div className="row-span-2 flex flex-col gap-4">
          <Field
            label="Likes, dislikes, and interests."
            value={interests}
            multiline
          />
          <Field
            label="Allergies or special needs we need to be made aware of."
            value={allergiesOrNeeds}
            multiline
          />
        </div>

        <div className="col-span-2" />
      </div>
    </div>
  );
}
