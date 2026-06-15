"use client";
import { useRef } from "react";
import Image from "next/image";
import ReusableInput from "@/components/common/InputFiled/ReusableInput";
import { updateFieldProperties } from "@/feature/slice/applicationBuilder/ApplicationFormSlice";
import { useDispatch } from "react-redux";

interface IntroductionBlock {
  id: string;
  title?: string;
  description?: string;
  buttonLabel?: string;
  buttonLink?: string;
  logoUrl?: string;
}

interface Props {
  block: IntroductionBlock;
}

export default function IntroductionSettings({ block }: Props) {
  const dispatch = useDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (key: string, value: any) => {
    dispatch(
      updateFieldProperties({
        blockId: block.id,
        fieldId: null,
        key: key as any,
        value,
      }),
    );
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      handleChange("logoUrl", event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteLogo = () => {
    handleChange("logoUrl", "");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-4 text-sm">
      {/* Logo Section */}
      <div className="p-3 border rounded-lg bg-white flex flex-col items-center gap-2">
        <div className="w-full h-20 border border-dashed rounded flex items-center justify-center text-gray-400 bg-gray-50 overflow-hidden">
          {block.logoUrl ? (
            <Image
              src={block.logoUrl}
              alt="Form Logo"
              width={240}
              height={60}
              className="object-contain w-full h-full"
              unoptimized
            />
          ) : (
            <span>Logo Preview</span>
          )}
        </div>
        <div className="flex justify-between w-full text-xs font-semibold text-gray-500">
          <button type="button" className="text-redColor cursor-pointer" onClick={handleDeleteLogo}>Delete</button>
          <button type="button" className="text-black cursor-pointer" onClick={() => fileInputRef.current?.click()}>Change logo</button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleLogoUpload}
        />
      </div>

      {/* Title */}
      <ReusableInput
        label="Title"
        value={block.title || ""}
        onChange={(e) => handleChange("title", e.target.value)}
        required
        className="w-full bg-white text-sm"
      />

      {/* Description */}
      <div>
        <label className="text-xs font-bold text-gray-700">Description</label>
        <textarea
          value={block.description || ""}
          onChange={(e) => handleChange("description", e.target.value)}
          rows={3}
          className="w-full p-2 border rounded-md mt-1 bg-white text-sm resize-none"
        />
      </div>

      {/* Button Config */}
      <div className="border-t pt-3 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold text-gray-700">Add Button</span>
          <button className="text-gray-400">-</button>
        </div>

        <ReusableInput
          label="Label"
          value={block.buttonLabel || ""}
          onChange={(e) => handleChange("buttonLabel", e.target.value)}
          required
          className="w-full bg-white text-xs"
        />

        <ReusableInput
          label="Add Link"
          value={block.buttonLink || ""}
          onChange={(e) => handleChange("buttonLink", e.target.value)}
          placeholder="Add a link"
          required
          className="w-full bg-white text-xs"
        />
      </div>
    </div>
  );
}
