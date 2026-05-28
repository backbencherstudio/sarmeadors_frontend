"use client";

import ReusableTextarea from "@/components/common/InputFiled/TextAreaField";
import { Upload } from "lucide-react";

type Props = {
  field: any;
};

export default function FileUploadRenderer({ field }: Props) {
  return (
    <div className="space-y-2 w-full">
      <label className="block text-xs font-semibold text-headerColor">
        {field.label || "Upload Cover Picture"}
        {field.required && " *"}
      </label>
      <div className="border-2 border-dashed border-borderColor rounded-lg p-6 bg-bgColor flex flex-col items-center gap-2 text-center">
        <Upload size={20} className="text-gray-400" />
        <p className="text-sm font-medium text-headerColor">
          Drag and drop your file here
        </p>
        <p className="text-xs text-gray-400">Supported files: PDF, JPG, PNG</p>
        <button className="text-xs text-headerColor font-semibold border border-borderColor rounded px-3 py-1.5 bg-white">
          Select File
        </button>
      </div>
      {field.additionalNote && (
        <ReusableTextarea
          label="Additional Note"
          placeholder="Add short note here..."
          className="w-full bg-bgColor text-sm"
        />
      )}
    </div>
  );
}
