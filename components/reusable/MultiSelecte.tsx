"use client";

import ReactSelect, { MultiValue, components } from "react-select";

export type MultiSelectOption = {
  value: string;
  label: string;
};

type MultiSelecteProps = {
  options: MultiSelectOption[];
  value: MultiSelectOption[];
  onChange: (selected: MultiSelectOption[]) => void;
  placeholder?: string;
  disabled?: boolean;
  isMulti?: boolean;
};

const CheckboxOption = (props: any) => {
  const isSelected = props.isSelected;
  return (
    <components.Option {...props}>
      <div
        className={`flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 transition-colors ${
          isSelected ? "bg-blue-50" : "hover:bg-gray-50"
        }`}
      >
        <input
          type="checkbox"
          checked={isSelected}
          readOnly
          className="h-4 w-4 rounded border-gray-300 accent-blue-600"
        />
        <span
          className={`text-sm ${
            isSelected ? "text-gray-900 font-medium" : "text-gray-700"
          }`}
        >
          {props.label}
        </span>
      </div>
    </components.Option>
  );
};

const HiddenRemove = () => null;

export default function MultiSelecte({
  options,
  value,
  onChange,
  placeholder = "Select options",
  disabled = false,
  isMulti = true,
}: MultiSelecteProps) {
  const handleChange = (
    opts: MultiValue<MultiSelectOption> | MultiSelectOption | null,
  ) => {
    if (isMulti) {
      onChange(
        (opts as MultiValue<MultiSelectOption>)
          ? [...(opts as MultiValue<MultiSelectOption>)]
          : [],
      );
    } else {
      onChange(
        (opts as MultiSelectOption | null) ? [opts as MultiSelectOption] : [],
      );
    }
  };

  return (
    <ReactSelect
      classNamePrefix="hide-statuses"
      placeholder={placeholder}
      isMulti={isMulti}
      isDisabled={disabled}
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      isClearable={false}
      value={isMulti ? value : value[0] || null}
      options={options}
      onChange={handleChange}
      components={{ Option: CheckboxOption, MultiValueRemove: HiddenRemove }}
      styles={{
        control: (base: any) => ({
          ...base,
          minHeight: "50px",
          borderColor: "var(--borderColor, #E5E7EB)",
          boxShadow: "none",
          backgroundColor: "var(--bgColor, #E5E7EB)",
          "&:hover": { borderColor: "#E5E7EB" },
          cursor: disabled ? "not-allowed" : "pointer",
        }),
        option: (base: any, state: any) => ({
          ...base,
          backgroundColor: state.isSelected
            ? "#EFF6FF"
            : state.isFocused
              ? "#F3F4F6"
              : "#FFFFFF",
          color: state.isSelected ? "#1E40AF" : "#374151",
          fontWeight: state.isSelected ? 500 : 400,
          "&:hover": {
            backgroundColor: state.isSelected ? "#DBEAFE" : "#F3F4F6",
          },
        }),
        multiValue: (base: any) => ({
          ...base,
          backgroundColor: "#F3F4F6",
          border: "1px solid #E5E7EB",
          borderRadius: "6px",
          overflow: "hidden",
          opacity: 0.8,
        }),
        multiValueLabel: (base: any) => ({
          ...base,
          color: "#6B7280",
          fontWeight: 500,
          fontSize: "13px",
          padding: "2px 4px",
        }),
        multiValueRemove: (base: any) => ({
          ...base,
          display: "none",
        }),
      }}
    />
  );
}
