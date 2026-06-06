"use client";

import ReusableTextarea from "@/components/common/InputFiled/TextAreaField";

type Props = {
  label?: string;
};

export default function SubscriptionAdditionalNoteSection({ label }: Props) {
  return (
    <div className="space-y-3 rounded-xl border border-borderColor bg-white p-3">
      <div>
        <h4 className="text-base font-semibold text-headerColor">
          {label || "Add additional note"}
        </h4>
      </div>

      <ReusableTextarea
        placeholder="Write message..."
        className="w-full bg-bgColor text-sm"
      />
    </div>
  );
}
