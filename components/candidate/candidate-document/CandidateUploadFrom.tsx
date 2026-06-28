"use client";
import ReusableInput from "@/components/common/InputFiled/ReusableInput";
import ReusableTextarea from "@/components/common/InputFiled/TextAreaField";
import RootDialog from "@/components/common/RootDialog";
import UploadIcon from "@/components/icon/UploadIcon";
import ButtonReuseable from "@/components/reusable/CustomButton";
import { Label } from "@/components/ui/label";
import { useUploadCandidateDocumentMutation } from "@/feature/slice/candidate/candidate-dashboard/candidateDocumentSlice";
import documentBlackIcon from "@/public/icon/RequiredBalackIcon.png";
import Image from "next/image";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

type FormValues = {
  file: File | null;
  title: string;
  description: string;
};

const ACCEPTED_TYPES = [
  "application/pdf",
  "image/jpg",
  "image/jpeg",
  "image/png",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const MAX_SIZE = 5 * 1024 * 1024;

function CandidateUploadFrom({
  open,
  setOpen,
  documentKey,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  documentKey: string | null;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadDocument, { isLoading }] = useUploadCandidateDocumentMutation();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormValues>({
    defaultValues: {
      file: null,
      title: "",
      description: "",
    },
  });

  const selectedFile = watch("file");

  const validateFile = (file: File | null): string | undefined => {
    if (!file) return "File is required";
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return "Only PDF, JPG, JPEG, PNG, DOC, DOCX files are allowed";
    }
    if (file.size > MAX_SIZE) {
      return "File size must be less than 5MB";
    }
    return undefined;
  };

  const handleFileDrop = (file: File | undefined) => {
    if (!file) return;
    const error = validateFile(file);
    if (error) {
      setValue("file", null as unknown as File, { shouldValidate: true });
      return;
    }
    setValue("file", file, { shouldValidate: true });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    handleFileDrop(file);
    event.target.value = "";
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    handleFileDrop(file);
  };

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();
    formData.append("file", data.file);
    if (data.title) formData.append("title", data.title);
    if (data.description) formData.append("description", data.description);
    try {
      const response = await uploadDocument({
        data: formData,
        documentKey,
      }).unwrap();
      toast.success(response?.message || "Document uploaded successfully");
      reset();
      setOpen(false);
    } catch (error) {
      toast.error(
        error?.message || "Failed to upload document. Please try again.",
      );
    }
  };

  return (
    <RootDialog open={open} setOpen={setOpen}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-lg bg-white p-6"
      >
        <h3 className="text-xl font-semibold text-blackColor lg:text-2xl">
          Upload Document
        </h3>

        <div className="space-y-4 pb-5 pt-6">
          {/* File Upload */}
          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-headerColor">
              File <span className="text-redColor">*</span>
            </Label>

            <Controller
              control={control}
              name="file"
              rules={{ validate: validateFile }}
              render={({ field }) => (
                <div>
                  <div
                    onDragOver={(event) => {
                      event.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    className={`rounded-xl border-2 border-dashed bg-bgColor px-4 py-6 text-center transition-colors ${
                      isDragging ? "border-headerColor" : "border-borderColor"
                    }`}
                  >
                    <div className="mx-auto flex max-w-[240px] flex-col items-center">
                      <Image
                        src={documentBlackIcon}
                        alt="Upload"
                        width={50}
                        height={50}
                      />

                      {selectedFile ? (
                        <p className="mt-3 text-sm text-headerColor">
                          {selectedFile.name}
                        </p>
                      ) : (
                        <>
                          <h3 className="mt-3 text-lg! font-semibold text-headerColor">
                            Drag and drop Here
                          </h3>
                          <p className="mt-1 text-sm! text-secondaryColor">
                            Maximum 5MB file size
                          </p>
                        </>
                      )}

                      <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        onChange={handleInputChange}
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      />

                      <ButtonReuseable
                        type="button"
                        title={selectedFile ? "Change File" : "Select File"}
                        icon={<UploadIcon />}
                        onClick={() => fileInputRef.current?.click()}
                        className="mt-4 rounded-lg border border-borderColor bg-whiteColor px-4! py-2! text-sm! text-headerColor!"
                      />
                    </div>
                  </div>

                  {errors.file && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.file.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          {/* Title */}
          <ReusableInput
            label="Title"
            placeholder="Enter document title"
            {...register("title", {
              maxLength: {
                value: 255,
                message: "Title must be at most 255 characters",
              },
            })}
            error={errors.title?.message}
          />

          {/* Description */}
          <ReusableTextarea
            label="Description"
            placeholder="Enter document description"
            {...register("description", {
              maxLength: {
                value: 1000,
                message: "Description must be at most 1000 characters",
              },
            })}
            error={errors.description?.message}
            className="bg-bgColor"
          />
        </div>

        <div className="flex items-center gap-4 border-t pt-5">
          <ButtonReuseable
            type="submit"
            title="Upload"
            className="px-6!"
            sendingMsg="Uploading..."
            loading={isLoading}
          />
          <ButtonReuseable
            type="button"
            title="Cancel"
            onClick={() => setOpen(false)}
            className="border bg-bgColor! text-blackColor! hover:bg-gray-100!"
          />
        </div>
      </form>
    </RootDialog>
  );
}

export default CandidateUploadFrom;
