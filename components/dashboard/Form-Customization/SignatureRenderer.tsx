"use client";

type Props = {
  field: any;
};

export default function SignatureRenderer({ field }: Props) {
  return (
    <div className="space-y-1 w-full">
      <label className="block text-xs font-semibold text-headerColor">
        {field.label || "Type your name below to sign."}
        {field.required && " *"}
      </label>
      <input
        type="text"
        placeholder={field.placeholder || "John Doe"}
        disabled
        className="w-full px-3 py-2.5 border border-borderColor rounded-lg bg-bgColor text-sm"
        style={{ fontFamily: "cursive" }}
      />
    </div>
  );
}
