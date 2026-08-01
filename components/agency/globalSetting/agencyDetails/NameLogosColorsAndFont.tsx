"use client";

import React, { useRef, useState, useEffect } from "react";
import { Upload, ChevronDown } from "lucide-react";
import CommonAccordion from "../CommonAccordion";
import { toast } from "react-toastify";
import ButtonReuseable from "@/components/reusable/CustomButton";
import {
  useGetAgencyInfoQuery,
  usePostClientsSettingsUpdateMutation,
} from "@/feature/slice/settings/agencyDetails/AgencyDetailsSettingsSlice";

interface DropZoneProps {
  label: string;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

function DropZone({ label, file, onFileChange }: DropZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) onFileChange(dropped);
  };

  return (
    <div className="flex-1 min-w-0">
      <p className="text-base text-[#2E3135] font-medium mb-2">{label}</p>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`
                    border border-dashed rounded-lg p-8 flex flex-col items-center justify-center gap-3 bg-white
                    transition-colors min-h-40
                    ${dragging ? "border-gray-400 bg-gray-50" : "border-gray-300"}
                `}
      >
        {file ? (
          <div className="text-center">
            <p className="text-base font-medium">{file.name}</p>
            <button
              onClick={() => onFileChange(null)}
              className="text-xs text-gray-400 hover:text-gray-600 mt-1"
            >
              Remove
            </button>
          </div>
        ) : (
          <>
            <p className="text-lg font-medium">Drag and drop your files here</p>
            <p className="text-sm font-medium text-[#778593]">
              Supported files: PDF, JPG, PNG
            </p>
            <button
              onClick={() => inputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-600 bg-white hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <Upload size={14} />
              Select Files
            </button>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          className="hidden"
          onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
        />
      </div>
    </div>
  );
}

const FONTS = [
  "Archivo",
  "Inter",
  "Roboto",
  "Open Sans",
  "Lato",
  "Montserrat",
  "Poppins",
  "Raleway",
  "Nunito",
  "Source Sans Pro",
];

export default function NameLogosColorsAndFont() {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [faviconFile, setFaviconFile] = useState<File | null>(null);
  const [logoHeight, setLogoHeight] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");
  const [taxId, setTaxId] = useState("");
  const [font, setFont] = useState("Archivo");

  const { data, isLoading, error } = useGetAgencyInfoQuery();
  const [updateClientsSettings, { isLoading: isSaving }] =
    usePostClientsSettingsUpdateMutation();

  useEffect(() => {
    if (data?.data) {
      setLogoHeight(data.data.logo_height ?? "");
      setWebsiteLink(data.data.website ?? "");
      setTaxId(data.data.tax_id ?? "");
      setFont(data.data.font || "Archivo");
    }
  }, [data]);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      if (logoFile) formData.append("logo", logoFile);
      if (faviconFile) formData.append("favicon", faviconFile);
      formData.append("logo_height", logoHeight);
      formData.append("website", websiteLink);
      formData.append("tax_id", taxId);
      formData.append("font", font);

      await updateClientsSettings({
        id: data?.data?.id,
        body: formData,
      }).unwrap();
      toast.success("Agency details updated successfully!");
    } catch (error: any) {
      toast.error(
        error?.data?.message ||
          "Error updating agency details. Please try again.",
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-sm text-gray-500">Loading agency settings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-sm text-red-500">
          Failed to load agency settings. Please try again.
        </p>
      </div>
    );
  }

  return (
    <CommonAccordion title="Name, Logos, Colors and Font">
      <div className="flex gap-4">
        <DropZone
          label="Upload Logo"
          file={logoFile}
          onFileChange={setLogoFile}
        />
        <DropZone
          label="Favicon"
          file={faviconFile}
          onFileChange={setFaviconFile}
        />
      </div>

      <div>
        <label className="block text-base font-medium mb-1">Logo Height</label>
        <input
          type="number"
          value={logoHeight}
          onChange={(e) => setLogoHeight(e.target.value)}
          placeholder="0"
          className="w-full bg-white border border-gray-300 rounded-lg p-4 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
        />
      </div>

      <div>
        <label className="block text-base font-medium mb-1">Website Link</label>
        <input
          type="url"
          value={websiteLink}
          onChange={(e) => setWebsiteLink(e.target.value)}
          placeholder="http://goldcoastnannies.company"
          className="w-full bg-white border border-gray-300 rounded-lg p-4 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
        />
      </div>

      <div>
        <label className="block text-base font-medium mb-1">Tax ID</label>
        <input
          type="text"
          value={taxId}
          onChange={(e) => setTaxId(e.target.value)}
          placeholder="http://goldcoastnannies.company"
          className="w-full bg-white border border-gray-300 rounded-lg p-4 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
        />
      </div>

      <div>
        <label className="block text-base font-medium mb-1">Font</label>
        <div className="relative">
          <select
            value={font}
            onChange={(e) => setFont(e.target.value)}
            className="w-full appearance-none border border-gray-300 rounded-lg p-4 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-gray-300 transition pr-10"
          >
            {FONTS.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <ButtonReuseable
          title="Save Changes"
          sendingMsg="Saving"
          onClick={handleSubmit}
          loading={isSaving}
          className="bg-[#111927] text-white cursor-pointer md:px-8 md:py-4.25 px-4 py-2 rounded-[12px]"
        />
      </div>
    </CommonAccordion>
  );
}
