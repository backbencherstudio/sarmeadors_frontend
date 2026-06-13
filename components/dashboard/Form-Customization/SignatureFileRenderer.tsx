"use client";

import DeleteIcon from "@/public/icon/DeleteIcon";
import { Upload } from "lucide-react";
import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
} from "react";

type Props = {
  field: any;
};

const MAX_SIZE = 500 * 1024;

export default function SignatureFileRenderer({ field }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    setPreviewUrl(null);
  }, [selectedFile]);

  const isAllowedFile = (file: File) => {
    return file.type === "image/jpeg" || file.type === "image/png";
  };

  const handleFile = (file?: File | null) => {
    if (!file) return;

    if (!isAllowedFile(file)) {
      setError("Only JPG and PNG files are allowed.");
      setSelectedFile(null);
      return;
    }

    if (file.size > MAX_SIZE) {
      setError("File must be under 100KB.");
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
      <label className="block text-xs font-semibold text-headerColor">
        {field.label || "Upload Signature File"}
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
          accept="image/jpeg,image/png"
          className="hidden"
          onChange={handleInputChange}
        />

        {selectedFile && previewUrl ? (
          <div className="relative">
            <Image
              src={previewUrl}
              alt="Signature preview"
              width={150}
              height={80}
              className="w-37.5 h-20  object-contain"
            />
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setSelectedFile(null);
                setPreviewUrl(null);
              }}
              className="absolute cursor-pointer -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            >
              <DeleteIcon className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <>
            <Upload size={20} className="text-gray-400" />
            <p className="text-sm font-medium text-headerColor">
              Drag and drop your Signature file here, or click to select
            </p>
            <p className="text-xs text-gray-400">
              Upload JPG, PNG (300×300). Max 100KB
            </p>
          </>
        )}
        {error && <p className="text-xs text-red-500">{error}</p>}
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            inputRef.current?.click();
          }}
          className="text-xs text-headerColor font-semibold border border-borderColor rounded px-3 py-1.5 bg-white"
        >
          Select File
        </button>
      </div>
    </div>
  );
}
