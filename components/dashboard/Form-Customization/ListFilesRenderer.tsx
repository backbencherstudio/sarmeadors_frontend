"use client";

type Props = {
  field: any;
};

export default function ListFilesRenderer({ field }: Props) {
  return (
    <div className="space-y-1">
      {field.label && (
        <label className="text-xs font-semibold text-gray-700">
          {field.label}
          {field.required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <div className="rounded-lg border bg-bgColor divide-y divide-borderColor text-xs text-headerColor">
        {["document_1.pdf", "document_2.pdf"].map((f) => (
          <div key={f} className="flex items-center gap-2 px-3 py-2">
            <span className="text-secondaryColor shrink-0">📄</span>
            <span className="flex-1 truncate">{f}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
