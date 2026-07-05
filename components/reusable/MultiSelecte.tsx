"use client";

import ReactSelect, { components, MultiValue } from "react-select";

export type MultiSelectOption = {
  value: string;
  label: string;
};

type MultiSelecteProps = {
  options: MultiSelectOption[];
  value: MultiSelectOption[];
  onChange: (selected: MultiSelectOption[]) => void;
  placeholder?: string;
  classNamePrefix?: string;
  disabled?: boolean;
};

const CheckboxOption = (props: any) => {
  return (
    <components.Option {...props}>
      <div className="flex cursor-pointer items-center gap-2">
        <input
          type="checkbox"
          checked={props.isSelected}
          readOnly
          className="h-4 w-4 rounded border-gray-300 accent-blue-600"
        />
        <span className="text-sm text-gray-700">{props.label}</span>
      </div>
    </components.Option>
  );
};

export default function MultiSelecte({
  options,
  value,
  onChange,
  placeholder = "Select options",
  disabled = false,
}: MultiSelecteProps) {
  return (
    <ReactSelect
      classNamePrefix="hide-statuses"
      placeholder={placeholder}
      isMulti
      isDisabled={disabled}
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      components={{ Option: CheckboxOption }}
      value={value}
      options={options}
      onChange={(opts: MultiValue<MultiSelectOption>) =>
        onChange(opts ? [...opts] : [])
      }
      styles={{
        control: (base) => ({
          ...base,
          minHeight: "50px",
          borderColor: "var(--borderColor, #E5E7EB)",
          boxShadow: "none",
          backgroundColor: "var(--bgColor, #E5E7EB)",
          "&:hover": { borderColor: "#E5E7EB" },
          cursor: disabled ? "not-allowed" : "pointer",
        }),
      }}
    />
  );
}
