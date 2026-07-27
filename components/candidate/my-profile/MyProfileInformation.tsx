"use client";

import { useState } from "react";
import CustomRadioGroup, {
  RadioOption,
} from "@/components/reusable/CustomRadioGroup";
import { Checkbox } from "@/components/ui/checkbox";

interface Field {
  key: string;
  label: string;
  type: string;
  placeholder?: string;
  is_required: boolean;
  width?: number;
  options?: string[] | null;
  value: any;
}

interface Section {
  name: string;
  fields: Field[];
}

interface Block {
  name: string;
  slug: string;
  description?: string | null;
  sections: Section[];
}

interface MyProfileInformationProps {
  block: Block;
}

function MyProfileInformation({ block }: MyProfileInformationProps) {
  const [radioValues, setRadioValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    block.sections?.forEach((section) => {
      section.fields?.forEach((field) => {
        if (field.type === "radio" && field.value) {
          initial[field.key] = String(field.value);
        }
      });
    });
    return initial;
  });

  const [checkboxValues, setCheckboxValues] = useState<
    Record<string, string[]>
  >(() => {
    const initial: Record<string, string[]> = {};
    block.sections?.forEach((section) => {
      section.fields?.forEach((field) => {
        if (
          field.type === "multi_select_checkbox" &&
          Array.isArray(field.value)
        ) {
          initial[field.key] = field.value.map((v: any) => String(v));
        }
      });
    });
    return initial;
  });

  const [singleCheckboxValues, setSingleCheckboxValues] = useState<
    Record<string, boolean>
  >(() => {
    const initial: Record<string, boolean> = {};
    block.sections?.forEach((section) => {
      section.fields?.forEach((field) => {
        if (field.type === "single_checkbox") {
          initial[field.key] = field.value === "true" || field.value === true;
        }
      });
    });
    return initial;
  });

  const handleRadioChange = (key: string, value: string) => {
    setRadioValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleCheckboxChange = (
    key: string,
    value: string,
    checked: boolean,
  ) => {
    setCheckboxValues((prev) => {
      const current = prev[key] || [];
      if (checked) {
        return { ...prev, [key]: [...current, value] };
      }
      return { ...prev, [key]: current.filter((v) => v !== value) };
    });
  };

  const handleSingleCheckboxChange = (key: string, checked: boolean) => {
    setSingleCheckboxValues((prev) => ({ ...prev, [key]: checked }));
  };

  const renderField = (field: Field) => {
    if (field.type === "radio" && field.options) {
      return (
        <CustomRadioGroup
          question={field.label}
          options={field.options.map((opt) => ({
            label: opt,
            value: opt,
          }))}
          required={field.is_required}
          value={radioValues[field.key] || ""}
          onChange={(value) => handleRadioChange(field.key, value)}
        />
      );
    }

    if (field.type === "multi_select_checkbox" && field.options) {
      const selected = checkboxValues[field.key] || [];
      return (
        <div className="space-y-2.5">
          <h3 className="text-xs sm:text-sm font-medium text-headerColor leading-[1.4]">
            {field.label}
            {field.is_required && <span className="text-redColor"> *</span>}
          </h3>
          <div className="space-y-1.5">
            {field.options.map((option) => {
              const isSelected = selected.includes(option);

              return (
                <label
                  key={option}
                  className="flex w-full items-center gap-2 text-left"
                >
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(field.key, option, checked === true)
                    }
                    className="border-borderColor data-[state=checked]:bg-headerColor data-[state=checked]:border-headerColor"
                  />
                  <span className="text-xs sm:text-sm text-lightblackColor leading-[1.35]">
                    {option}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      );
    }

    if (field.type === "single_checkbox") {
      const isChecked = singleCheckboxValues[field.key] || false;
      return (
        <label className="flex w-full items-center gap-2 text-left">
          <Checkbox
            checked={isChecked}
            onCheckedChange={(checked) =>
              handleSingleCheckboxChange(field.key, checked === true)
            }
            className="border-borderColor data-[state=checked]:bg-headerColor data-[state=checked]:border-headerColor"
          />
          <span className="text-xs sm:text-sm text-lightblackColor leading-[1.35]">
            {field.label}
          </span>
        </label>
      );
    }

    if (field.type === "file_upload") {
      if (!field.value) {
        return (
          <p className="text-gray-400 text-[16px] leading-[137.5%] font-medium">
            -
          </p>
        );
      }
      return (
        <a
          href={field.value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline break-all text-[16px] leading-[137.5%] font-medium"
        >
          View File
        </a>
      );
    }

    return (
      <p className="text-lightblackColor text-[16px] leading-[137.5%] font-medium">
        {field.value === null || field.value === undefined || field.value === ""
          ? "-"
          : String(field.value)}
      </p>
    );
  };

  return (
    <div className="space-y-4">
      {block.sections?.map((section, sIdx) => (
        <div
          key={sIdx}
          className="p-4 sm:p-5 md:p-6 border border-borderColor rounded-[20px]"
        >
          <h3 className="text-lg text-headerColor font-semibold leading-[111.111%] mb-4">
            {section.name}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {section.fields
              ?.filter((field) => field.type !== "single_checkbox")
              ?.map((field) => {
                const isFullWidth = field.width === 12;
                return (
                  <div
                    key={field.key}
                    className={isFullWidth ? "md:col-span-2" : ""}
                  >
                    {field.type !== "radio" &&
                      field.type !== "multi_select_checkbox" &&
                      field.type !== "single_checkbox" && (
                        <p className="text-secondaryColor text-sm leading-[142.857%]">
                          {field.label}
                          {field.is_required && (
                            <span className="text-redColor ml-1">*</span>
                          )}
                        </p>
                      )}
                    {renderField(field)}
                  </div>
                );
              })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4">
            {section.fields
              ?.filter((field) => field.type === "single_checkbox")
              ?.map((field) => (
                <div key={field.key}>{renderField(field)}</div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyProfileInformation;
