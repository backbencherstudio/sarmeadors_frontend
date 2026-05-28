"use client";

type Props = {
  field: any;
};

export default function SubscriptionPlanRenderer({ field }: Props) {
  return (
    <div className="space-y-1">
      {field.label && (
        <label className="text-xs font-semibold text-gray-700">
          {field.label}
          {field.required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <div className="grid grid-cols-2 gap-2">
        {["Basic", "Pro"].map((plan) => (
          <div
            key={plan}
            className="rounded-lg border border-borderColor bg-bgColor p-3 text-center text-xs text-headerColor"
          >
            <p className="font-semibold">{plan}</p>
            <p className="text-secondaryColor text-[10px] mt-0.5">$0 / month</p>
          </div>
        ))}
      </div>
    </div>
  );
}
