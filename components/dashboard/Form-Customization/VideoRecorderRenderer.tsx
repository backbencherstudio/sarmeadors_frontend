"use client";

import { Upload } from "lucide-react";
import { useRef, useState, type ChangeEvent, type DragEvent } from "react";

type Props = {
  field: any;
};

export default function VideoRecorderRenderer({ field }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const MAX_SIZE_BYTES = 50 * 1024 * 1024;

  const isAllowedVideo = (file: File) => {
    return (
      file.type.startsWith("video/") ||
      /\.(mp4|webm|mov|avi|mkv|m4v)$/i.test(file.name)
    );
  };

  const handleFile = (file?: File | null) => {
    if (!file) {
      return;
    }

    if (!isAllowedVideo(file)) {
      setError("Only video files are allowed.");
      setSelectedFile(null);
      return;
    }

    if (file.size > MAX_SIZE_BYTES) {
      setError("Video size must be 50MB or less.");
      setSelectedFile(null);
      return;
    }

    setError(null);
    setSelectedFile(file);

    if (typeof field?.onChange === "function") {
      field.onChange(file);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleFile(event.target.files?.[0]);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    handleFile(event.dataTransfer.files?.[0]);
  };

  return (
    <div className="space-y-2 w-full">
      <label className="block text-sm font-medium text-headerColor">
        {field.label || "Upload Your Video"}
        {field.required && " *"}
      </label>
      <div
        className={`border-2 border-dashed rounded-lg p-6 bg-bgColor flex flex-col items-center gap-2 text-center transition-colors ${
          isDragging ? "border-headerColor bg-white" : "border-borderColor"
        }`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            inputRef.current?.click();
          }
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="video/*"
          className="hidden"
          onChange={handleInputChange}
        />

        <p className="text-base md:text-lg lg:text-xl font-medium text-headerColor">
          Drag and drop your video here
        </p>
        <p className="text-xs text-gray-400">Maximum supported file: 50MB</p>
        <p className="text-xs font-medium text-headerColor">
          {selectedFile ? selectedFile.name : "No video selected yet"}
        </p>
        {error && <p className="text-xs text-red-500">{error}</p>}
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            inputRef.current?.click();
          }}
          className="text-xs text-headerColor flex items-center gap-2 font-semibold border  rounded-sm px-3 py-1.5"
        >
          <Upload size={14} className="text-headerColor" /> Select Video
        </button>
      </div>
    </div>
  );
}
