"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Plus,
  Upload,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const inputClass =
  "h-11 rounded-md border-[#DDE3EA] bg-[#F8FAFC] px-3 text-sm text-[#111827] shadow-none placeholder:text-[#8A94A6] focus-visible:ring-1 focus-visible:ring-[#111827]";
const labelClass = "mb-2 block text-sm font-medium text-[#111827]";
const requiredClass = "text-[#EF4444]";
const textareaClass =
  "min-h-[92px] rounded-md border-[#DDE3EA] bg-white px-3 py-3 text-sm text-[#111827] shadow-none placeholder:text-[#8A94A6] focus-visible:ring-1 focus-visible:ring-[#111827]";

type ChildInfo = {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: string;
  interests: string;
  allergies: string;
};

type JobDetailsDraft = {
  title: string;
  description: string;
  cover_image: string;
  children: ChildInfo[];
};

const STORAGE_KEY = "short-term-job-details";

const createEmptyChild = (): ChildInfo => ({
  first_name: "",
  last_name: "",
  date_of_birth: "",
  gender: "",
  interests: "",
  allergies: "",
});

function RequiredMark() {
  return <span className={requiredClass}>*</span>;
}

export default function Page() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [description, setDescription] = useState("");
  const [childrenInfo, setChildrenInfo] = useState<ChildInfo[]>([
    createEmptyChild(),
  ]);

  const saveDraft = () => {
    const draft: JobDetailsDraft = {
      title: jobTitle,
      description: description,
      cover_image: selectedFileName,
      children: childrenInfo,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  };

  useEffect(() => {
    saveDraft();
  }, [jobTitle, description, selectedFileName, childrenInfo]);

  const handleFile = (file?: File) => {
    if (!file) return;
    setSelectedFileName(file.name);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    handleFile(event.dataTransfer.files?.[0]);
  };

  const handleChildChange = (
    childIndex: number,
    field: keyof ChildInfo,
    value: string,
  ) => {
    setChildrenInfo((currentChildren) =>
      currentChildren.map((child, index) =>
        index === childIndex ? { ...child, [field]: value } : child,
      ),
    );
  };

  const handleAddChild = () => {
    setChildrenInfo((currentChildren) => [
      ...currentChildren,
      createEmptyChild(),
    ]);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveDraft();
  };

  return (
    <form className="pb-8 pt-5" onSubmit={handleSubmit}>
      <div className="mb-6">
        <h1 className="text-base font-semibold text-[#111827]">Job Details</h1>
        <p className="mt-1 text-sm text-[#64748B]">
          Provide the basic information about the job posting
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <label htmlFor="job-title" className={labelClass}>
            Job Title <RequiredMark />
          </label>
          <Input
            id="title"
            value={jobTitle}
            onChange={(event) => setJobTitle(event.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="description" className={labelClass}>
            Description <RequiredMark />
          </label>
          <Textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Enter a description..."
            className={textareaClass}
          />
        </div>

        <div>
          <label className={labelClass}>Upload Cover Picture</label>
          <div
            onDragOver={(event) => {
              event.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`flex min-h-[164px] flex-col items-center justify-center rounded-lg border border-dashed px-4 py-7 text-center transition-colors ${isDragging
              ? "border-[#111827] bg-[#F3F6FA]"
              : "border-[#DDE3EA] bg-[#F8FAFC]"
              }`}
          >
            <p className="text-base font-medium text-[#111827]">
              {selectedFileName || "Drag and drop Here"}
            </p>
            <p className="mt-1 text-sm text-[#64748B]">Maximum 5MB file size</p>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => {
                handleFile(event.target.files?.[0]);
                event.target.value = "";
              }}
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="mt-4 inline-flex h-9 items-center justify-center gap-2 rounded-md border border-[#DDE3EA] bg-white px-4 text-sm font-medium text-[#111827] transition-colors hover:bg-[#F3F6FA]"
            >
              <Upload className="h-4 w-4" />
              Select File
            </button>
          </div>
        </div>

        <section className="pt-2">
          <h2 className="mb-4 text-base font-semibold text-[#111827]">
            Children Information
          </h2>

          <div className="space-y-6">
            {childrenInfo.map((child, index) => {
              const childNumber = index + 1;
              const firstNameId = `first-name-${childNumber}`;
              const lastNameId = `last-name-${childNumber}`;
              const dateOfBirthId = `date-of-birth-${childNumber}`;
              const habitsId = `habits-${childNumber}`;
              const allergiesId = `allergies-${childNumber}`;

              return (
                <div
                  key={childNumber}
                  className="border-b border-[#E5E7EB] pb-6 last:border-b-0 last:pb-0"
                >
                  {childrenInfo.length > 1 && (
                    <h3 className="mb-4 text-sm font-semibold text-[#111827]">
                      Child {childNumber}
                    </h3>
                  )}

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label htmlFor={firstNameId} className={labelClass}>
                        First Name <RequiredMark />
                      </label>
                      <Input
                        id={firstNameId}
                        value={child.first_name}
                        onChange={(event) =>
                          handleChildChange(
                            index,
                            "first_name",
                            event.target.value,
                          )
                        }
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor={lastNameId} className={labelClass}>
                        Last Name <RequiredMark />
                      </label>
                      <Input
                        id={lastNameId}
                        value={child.last_name}
                        onChange={(event) =>
                          handleChildChange(
                            index,
                            "last_name",
                            event.target.value,
                          )
                        }
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label htmlFor={dateOfBirthId} className={labelClass}>
                      Date of Birth <RequiredMark />
                    </label>
                    <div className="relative">
                      <Input
                        id={dateOfBirthId}
                        type="date"
                        value={child.date_of_birth}
                        onChange={(event) =>
                          handleChildChange(
                            index,
                            "date_of_birth",
                            event.target.value,
                          )
                        }
                        placeholder="MM/DD/YYYY"
                        className={`${inputClass} pr-10`}
                      />
                      <CalendarDays className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#475569]" />
                    </div>
                  </div>

                  <fieldset className="mt-4">
                    <legend className={labelClass}>
                      Gender <RequiredMark />
                    </legend>
                    <div className="flex flex-wrap items-center gap-5">
                      {["Male", "Female"].map((gender) => {
                        const genderValue = gender.toLowerCase();

                        return (
                          <label
                            key={gender}
                            className="inline-flex items-center gap-2 text-sm text-[#475569]"
                          >
                            <input
                              type="radio"
                              name={`gender-${childNumber}`}
                              value={genderValue}
                              checked={child.gender === genderValue}
                              onChange={(event) =>
                                handleChildChange(
                                  index,
                                  "gender",
                                  event.target.value,
                                )
                              }
                              className="h-3.5 w-3.5 accent-[#111827]"
                            />
                            {gender}
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>

                  <div className="mt-4">
                    <label htmlFor={habitsId} className={labelClass}>
                      Please tell us about your child's likes, dislikes, and
                      interests.
                    </label>
                    <Textarea
                      id={habitsId}
                      value={child.interests}
                      onChange={(event) =>
                        handleChildChange(index, "interests", event.target.value)
                      }
                      placeholder="Enter a description..."
                      className={`${textareaClass} min-h-[132px]`}
                    />
                  </div>

                  <div className="mt-4">
                    <label htmlFor={allergiesId} className={labelClass}>
                      Please describe any of your child's allergies or special
                      needs we need to be made aware of.
                    </label>
                    <Textarea
                      id={allergiesId}
                      value={child.allergies}
                      onChange={(event) =>
                        handleChildChange(
                          index,
                          "allergies",
                          event.target.value,
                        )
                      }
                      placeholder="Enter a description..."
                      className={`${textareaClass} min-h-[132px]`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleAddChild}
            className="mt-4 inline-flex h-10 items-center justify-center gap-2 rounded-md bg-[#111827] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#1F2937]"
          >
            Add Another Child
            <Plus className="h-4 w-4" />
          </button>
        </section>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <button
          type="button"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-[#E5E7EB] bg-white px-4 text-sm font-medium text-[#111827] transition-colors hover:bg-[#F8FAFC]"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </button>

        <button
          type="submit"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-[#111827] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#1F2937]"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}
