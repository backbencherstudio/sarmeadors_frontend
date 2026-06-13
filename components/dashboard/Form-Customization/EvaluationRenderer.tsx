"use client";

type Props = {
  field: any;
};

export default function EvaluationRenderer({ field }: Props) {
  return (
    <div className="space-y-1">
      {field.label && (
        <label className="text-xs font-semibold text-gray-700">
          {field.label}
          {field.required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <div className="rounded-lg border bg-bgColor overflow-hidden text-xs">
        <div className="grid grid-cols-4 bg-grayColor1 px-3 py-1.5 font-semibold text-headerColor border-b border-borderColor">
          <span className="col-span-2">Criteria</span>
          <span className="text-center">Score</span>
          <span className="text-center">Weight</span>
        </div>
        {["Communication", "Technical"].map((c) => (
          <div
            key={c}
            className="grid grid-cols-4 px-3 py-2 border-b border-borderColor last:border-0 text-secondaryColor"
          >
            <span className="col-span-2">{c}</span>
            <span className="text-center">—</span>
            <span className="text-center">—</span>
          </div>
        ))}
      </div>
    </div>
  );
}
