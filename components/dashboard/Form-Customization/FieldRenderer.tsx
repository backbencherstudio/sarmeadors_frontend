"use client";

import { useState } from "react";
import {
  Calendar,
  Check,
  ChevronDown,
  Clock,
  Globe,
  Upload,
  Video,
} from "lucide-react";
import ReusableInput from "@/components/common/InputFiled/ReusableInput";
import ReusableTextarea from "@/components/common/InputFiled/TextAreaField";
import { RichTextEditor } from "@/components/reusable/Editor";
import { useDispatch } from "react-redux";
import { updateFieldProperties } from "@/feature/slice/applicationBuilder/ApplicationFormSlice";
import CustomPassword from "./CustomPassword";
import RatingFormSetting from "./RatingFormSetting";
import RatingGroupSetting from "./RatingGroupSetting";

// ── Dropdown ──────────────────────────────────────────────────────────────────
function DropdownRenderer({ field }: { field: any }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const items = field.items?.length
    ? field.items
    : ["Menu Item 1", "Menu Item 2", "Menu Item 3"];
  const isMulti = field.type === "multi_select";

  const toggle = (item: string) => {
    if (!isMulti) {
      setSelected([item]);
      setOpen(false);
      return;
    }
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );
  };

  return (
    <div className="space-y-1 w-full">
      <label className="block text-xs font-semibold text-headerColor">
        {field.label || "Dropdown"}
        {field.required && " *"}
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="w-full px-3 py-2.5 border border-borderColor rounded-lg bg-bgColor text-sm text-left flex justify-between items-center"
        >
          {isMulti && selected.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {selected.map((s) => (
                <span
                  key={s}
                  className="px-2 py-0.5 bg-blackColor text-white text-xs rounded"
                >
                  {s} ×
                </span>
              ))}
            </div>
          ) : (
            <span className="text-gray-400 text-sm">
              {isMulti ? "Select Multiple Options" : "Select Option"}
            </span>
          )}
          <ChevronDown size={14} className="text-gray-400 shrink-0" />
        </button>
        {open && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-borderColor rounded-lg shadow-md">
            {items.map((item: string, i: number) => (
              <div
                key={i}
                onClick={() => toggle(item)}
                className={`px-3 py-2 text-sm cursor-pointer ${
                  selected.includes(item)
                    ? "bg-blackColor text-white"
                    : "text-headerColor hover:bg-bgColor"
                } ${i === 0 ? "rounded-t-lg" : ""} ${i === items.length - 1 ? "rounded-b-lg" : ""}`}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
      {isMulti && selected.length > 0 && (
        <button
          type="button"
          onClick={() => setSelected([])}
          className="text-xs text-gray-400 hover:text-gray-600"
        >
          Clear
        </button>
      )}
    </div>
  );
}

// ── Radio ─────────────────────────────────────────────────────────────────────
function RadioRenderer({ field }: { field: any }) {
  const [selected, setSelected] = useState<string | null>(null);
  const items = field.items?.length
    ? field.items
    : ["Option 1", "Option 2", "Option 3"];
  const isHorizontal = field.layout === "horizontal";

  return (
    <div className="space-y-2 w-full">
      <label className="block text-xs font-semibold text-headerColor">
        {field.label || "Radio"}
        {field.required && " *"}
      </label>
      <div className={isHorizontal ? "flex flex-wrap gap-4" : "space-y-2"}>
        {items.map((item: string, i: number) => (
          <div
            key={i}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setSelected(item)}
          >
            <div
              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                selected === item ? "border-blackColor" : "border-borderColor"
              }`}
            >
              {selected === item && (
                <div className="w-2 h-2 rounded-full bg-blackColor" />
              )}
            </div>
            <span className="text-sm text-headerColor">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Single Checkbox ───────────────────────────────────────────────────────────
function SingleCheckboxRenderer({ field }: { field: any }) {
  const [checked, setChecked] = useState(false);
  return (
    <div
      className="flex items-center gap-2 cursor-pointer"
      onClick={() => setChecked(!checked)}
    >
      <div
        className={`w-4 h-4 border-2 rounded flex items-center justify-center ${
          checked
            ? "bg-blackColor border-blackColor"
            : "border-borderColor bg-white"
        }`}
      >
        {checked && <Check size={10} className="text-white" />}
      </div>
      <label className="text-sm text-headerColor cursor-pointer">
        {field.label || "I agree to the terms and conditions"}
      </label>
    </div>
  );
}

// ── Multi Select Checkbox ─────────────────────────────────────────────────────
function MultiCheckboxRenderer({ field }: { field: any }) {
  const [selected, setSelected] = useState<string[]>([]);
  const items = field.items?.length
    ? field.items
    : ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"];
  const isHorizontal = field.layout === "horizontal";

  const toggle = (item: string) =>
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );

  return (
    <div className="space-y-2 w-full">
      <label className="block text-xs font-semibold text-headerColor">
        {field.label || "Select options as you like"}
        {field.required && " *"}
      </label>
      <div className={isHorizontal ? "flex flex-wrap gap-4" : "space-y-2"}>
        {items.map((item: string, i: number) => (
          <div
            key={i}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => toggle(item)}
          >
            <div
              className={`w-4 h-4 border-2 rounded flex items-center justify-center ${
                selected.includes(item)
                  ? "bg-blackColor border-blackColor"
                  : "border-borderColor bg-white"
              }`}
            >
              {selected.includes(item) && (
                <Check size={10} className="text-white" />
              )}
            </div>
            <span className="text-sm text-headerColor">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Radio Table ───────────────────────────────────────────────────────────────
function RadioTableRenderer({ field }: { field: any }) {
  const [selected, setSelected] = useState<Record<string, string>>({});
  const columns = field.columns?.length
    ? field.columns
    : ["Column 1", "Column 2", "Column 3", "Column 4"];
  const rows = field.rows?.length
    ? field.rows
    : ["Row 1", "Row 2", "Row 3", "Row 4"];

  return (
    <div className="space-y-2 w-full overflow-x-auto">
      <label className="block text-xs font-semibold text-headerColor">
        {field.label || "Radio Table"}
        {field.required && " *"}
      </label>
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr>
            <th className="text-left p-2 text-headerColor font-medium w-24" />
            {columns.map((col: string, i: number) => (
              <th key={i} className="p-2 text-headerColor font-medium text-center">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row: string) => (
            <tr key={row} className="border-t border-borderColor">
              <td className="p-2 text-headerColor text-sm font-medium">{row}</td>
              {columns.map((col: string) => (
                <td key={col} className="p-2 text-center">
                  <div
                    onClick={() =>
                      setSelected((prev) => ({ ...prev, [row]: col }))
                    }
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center mx-auto cursor-pointer ${
                      selected[row] === col
                        ? "border-blackColor"
                        : "border-borderColor"
                    }`}
                  >
                    {selected[row] === col && (
                      <div className="w-2 h-2 rounded-full bg-blackColor" />
                    )}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Checkbox Table ────────────────────────────────────────────────────────────
function CheckboxTableRenderer({ field }: { field: any }) {
  const [selected, setSelected] = useState<Record<string, string[]>>({});
  const columns = field.columns?.length
    ? field.columns
    : ["Column 1", "Column 2", "Column 3", "Column 4"];
  const rows = field.rows?.length
    ? field.rows
    : ["Row 1", "Row 2", "Row 3", "Row 4"];

  const toggle = (row: string, col: string) =>
    setSelected((prev) => {
      const cur = prev[row] || [];
      return {
        ...prev,
        [row]: cur.includes(col)
          ? cur.filter((c) => c !== col)
          : [...cur, col],
      };
    });

  return (
    <div className="space-y-2 w-full overflow-x-auto">
      <label className="block text-xs font-semibold text-headerColor">
        {field.label || "Checkbox Table"}
        {field.required && " *"}
      </label>
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr>
            <th className="text-left p-2 text-headerColor font-medium w-24" />
            {columns.map((col: string, i: number) => (
              <th key={i} className="p-2 text-headerColor font-medium text-center">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row: string) => (
            <tr key={row} className="border-t border-borderColor">
              <td className="p-2 text-headerColor text-sm font-medium">{row}</td>
              {columns.map((col: string) => (
                <td key={col} className="p-2 text-center">
                  <div
                    onClick={() => toggle(row, col)}
                    className={`w-4 h-4 border-2 rounded flex items-center justify-center mx-auto cursor-pointer ${
                      (selected[row] || []).includes(col)
                        ? "bg-blackColor border-blackColor"
                        : "border-borderColor bg-white"
                    }`}
                  >
                    {(selected[row] || []).includes(col) && (
                      <Check size={10} className="text-white" />
                    )}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Date Picker ───────────────────────────────────────────────────────────────
function DatePickerRenderer({ field }: { field: any }) {
  return (
    <div className="space-y-1 w-full">
      <label className="block text-xs font-semibold text-headerColor">
        {field.label || "Date Picker"}
        {field.required && " *"}
      </label>
      <div className="flex items-center border border-borderColor rounded-lg bg-bgColor px-3 py-2.5 gap-2">
        <span className="text-sm text-gray-400 flex-1">YYYY/MM/DD</span>
        <Calendar size={14} className="text-gray-400" />
      </div>
    </div>
  );
}

// ── Time Picker ───────────────────────────────────────────────────────────────
function TimePickerRenderer({ field }: { field: any }) {
  return (
    <div className="space-y-1 w-full">
      <label className="block text-xs font-semibold text-headerColor">
        {field.label || "Select Time"}
        {field.required && " *"}
      </label>
      <div className="flex items-center border border-borderColor rounded-lg bg-bgColor px-3 py-2.5 gap-2">
        <span className="text-sm text-gray-400 flex-1">hh:mm A</span>
        <Clock size={14} className="text-gray-400" />
      </div>
    </div>
  );
}

// ── Date & Time Picker ────────────────────────────────────────────────────────
function DateTimePickerRenderer({ field }: { field: any }) {
  return (
    <div className="space-y-3 w-full">
      <div className="space-y-1">
        <label className="block text-xs font-semibold text-headerColor">
          {field.label || "Booking Date"}
          {field.required && " *"}
        </label>
        <div className="flex items-center border border-borderColor rounded-lg bg-bgColor px-3 py-2.5 gap-2">
          <span className="text-sm text-gray-400 flex-1">MM/DD/YYYY</span>
          <Calendar size={14} className="text-gray-400" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-headerColor">
            Start Time
          </label>
          <div className="flex items-center border border-borderColor rounded-lg bg-bgColor px-3 py-2.5 gap-2">
            <span className="text-xs text-gray-400 flex-1">hh:mm A</span>
            <Clock size={12} className="text-gray-400" />
          </div>
        </div>
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-headerColor">
            End Time
          </label>
          <div className="flex items-center border border-borderColor rounded-lg bg-bgColor px-3 py-2.5 gap-2">
            <span className="text-xs text-gray-400 flex-1">hh:mm A</span>
            <Clock size={12} className="text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── File Upload ───────────────────────────────────────────────────────────────
function FileUploadRenderer({ field }: { field: any }) {
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

// ── File with Additional Info ─────────────────────────────────────────────────
function FileAdditionalRenderer({ field }: { field: any }) {
  return (
    <div className="space-y-3 w-full">
      <label className="block text-xs font-semibold text-headerColor">
        {field.label || "Upload Documents"}
        {field.required && " *"}
      </label>
      <div className="border-2 border-dashed border-borderColor rounded-lg p-4 bg-bgColor flex flex-col items-center gap-2 text-center">
        <Upload size={20} className="text-gray-400" />
        <p className="text-xs font-medium text-headerColor">
          Drag and drop your files here
        </p>
        <p className="text-xs text-gray-400">Supported files: PDF, JPG, PNG</p>
        <button className="text-xs text-headerColor font-semibold border border-borderColor rounded px-3 py-1.5 bg-white">
          Select Files
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

// ── Video Recorder ────────────────────────────────────────────────────────────
function VideoRecorderRenderer({ field }: { field: any }) {
  return (
    <div className="space-y-2 w-full">
      <label className="block text-xs font-semibold text-headerColor">
        {field.label || "Upload Your Video"}
        {field.required && " *"}
      </label>
      <div className="border-2 border-dashed border-borderColor rounded-lg p-6 bg-bgColor flex flex-col items-center gap-2 text-center">
        <Video size={20} className="text-gray-400" />
        <p className="text-sm font-medium text-headerColor">
          Drag and drop your Video here
        </p>
        <p className="text-xs text-gray-400">Maximum Supported File 50MB</p>
        <button className="text-xs text-headerColor font-semibold border border-borderColor rounded px-3 py-1.5 bg-white">
          Select File
        </button>
      </div>
    </div>
  );
}

// ── Signature (typed) ─────────────────────────────────────────────────────────
function SignatureRenderer({ field }: { field: any }) {
  return (
    <div className="space-y-1 w-full">
      <label className="block text-xs font-semibold text-headerColor">
        {field.label || "Type your name below to sign."}
        {field.required && " *"}
      </label>
      <input
        type="text"
        placeholder={field.placeholder || "John Doe"}
        disabled
        className="w-full px-3 py-2.5 border border-borderColor rounded-lg bg-bgColor text-sm"
        style={{ fontFamily: "cursive" }}
      />
    </div>
  );
}

// ── Signature File ────────────────────────────────────────────────────────────
function SignatureFileRenderer({ field }: { field: any }) {
  return (
    <div className="space-y-2 w-full">
      <label className="block text-xs font-semibold text-headerColor">
        {field.label || "Upload Signature File"}
        {field.required && " *"}
      </label>
      <div className="border-2 border-dashed border-borderColor rounded-lg p-6 bg-bgColor flex flex-col items-center gap-2 text-center">
        <Upload size={20} className="text-gray-400" />
        <p className="text-sm font-medium text-headerColor">
          Drag and drop your Sign
        </p>
        <p className="text-xs text-gray-400">
          Upload JPG, PNG (300×300). Max 100KB
        </p>
        <button className="text-xs text-headerColor font-semibold border border-borderColor rounded px-3 py-1.5 bg-white">
          Select File
        </button>
      </div>
    </div>
  );
}

// ── Salary Range ──────────────────────────────────────────────────────────────
function SalaryRangeRenderer({ field }: { field: any }) {
  return (
    <div className="space-y-2 w-full">
      <label className="block text-xs font-semibold text-headerColor">
        {field.label || "Select Salary Range"}
        {field.required && " *"}
      </label>
      <div className="flex items-end gap-2">
        <div className="flex-1 space-y-1">
          <span className="text-xs text-gray-400">From</span>
          <div className="flex items-center border border-borderColor rounded-lg bg-bgColor px-3 py-2.5">
            <span className="text-xs text-gray-400 mr-1">$</span>
            <span className="text-sm text-gray-300">0</span>
          </div>
        </div>
        <div className="flex-1 space-y-1">
          <span className="text-xs text-gray-400">To</span>
          <div className="flex items-center border border-borderColor rounded-lg bg-bgColor px-3 py-2.5">
            <span className="text-xs text-gray-400 mr-1">$</span>
            <span className="text-sm text-gray-300">0</span>
          </div>
        </div>
        <div className="flex-1 space-y-1">
          <span className="text-xs text-gray-400">Per</span>
          <div className="flex items-center justify-around border border-borderColor rounded-lg bg-bgColor px-2 py-2.5">
            {["Hour", "Week", "Month", "Year"].map((u) => (
              <span key={u} className="text-xs text-gray-400 cursor-pointer">
                {u}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Address Autocomplete ──────────────────────────────────────────────────────
function AddressRenderer({ field }: { field: any }) {
  return (
    <div className="space-y-3 w-full">
      <label className="block text-xs font-semibold text-headerColor">
        {field.label || "Address"}
        {field.required && " *"}
      </label>
      <ReusableInput
        label="Street Address"
        required
        className="w-full bg-bgColor text-sm"
      />
      <div className="grid grid-cols-2 gap-2">
        <ReusableInput label="City" required className="w-full bg-bgColor text-sm" />
        <ReusableInput
          label="Postal Code"
          required
          className="w-full bg-bgColor text-sm"
        />
        <ReusableInput
          label="Province/State"
          required
          className="w-full bg-bgColor text-sm"
        />
        <ReusableInput
          label="Country"
          required
          className="w-full bg-bgColor text-sm"
        />
      </div>
    </div>
  );
}

// ── Phone Country Code ────────────────────────────────────────────────────────
function PhoneCountryRenderer({ field }: { field: any }) {
  return (
    <div className="space-y-1 w-full">
      <label className="block text-xs font-semibold text-headerColor">
        {field.label || "Phone no."}
        {field.required && " *"}
      </label>
      <div className="flex items-center border border-borderColor rounded-lg bg-bgColor overflow-hidden">
        <div className="flex items-center gap-1 px-2 py-2.5 border-r border-borderColor">
          <span className="text-base">🇺🇸</span>
          <ChevronDown size={12} className="text-gray-400" />
          <span className="text-xs text-headerColor">+1</span>
        </div>
        <input
          type="tel"
          placeholder={field.placeholder || ""}
          disabled
          className="flex-1 px-2 py-2.5 bg-transparent text-sm text-headerColor"
        />
      </div>
    </div>
  );
}

// ── Time Availability ─────────────────────────────────────────────────────────
function TimeAvailabilityRenderer({ field }: { field: any }) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [enabled, setEnabled] = useState<Record<string, boolean>>({
    Sunday: true,
    Monday: true,
    Tuesday: true,
    Wednesday: true,
    Thursday: true,
    Friday: false,
    Saturday: false,
  });

  return (
    <div className="space-y-2 w-full">
      <label className="block text-xs font-semibold text-headerColor">
        {field.label || "Set Time Availability"}
        {field.required && " *"}
      </label>
      <div className="space-y-2.5">
        {days.map((day) => {
          const isOn = enabled[day];
          return (
            <div key={day} className="flex items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  setEnabled((prev) => ({ ...prev, [day]: !prev[day] }))
                }
                className={`relative w-8 h-4 rounded-full transition-colors shrink-0 ${
                  isOn ? "bg-blackColor" : "bg-gray-200"
                }`}
              >
                <div
                  className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform ${
                    isOn ? "translate-x-4" : "translate-x-0.5"
                  }`}
                />
              </button>
              <span
                className={`text-xs flex-1 ${isOn ? "text-headerColor" : "text-gray-300"}`}
              >
                {day}
              </span>
              {isOn ? (
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <span>12:00 PM</span>
                  <span>—</span>
                  <span>12:30 PM</span>
                </div>
              ) : (
                <span className="text-xs text-gray-300">Unavailable</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Language Input ────────────────────────────────────────────────────────────
function LanguageRenderer({ field }: { field: any }) {
  return (
    <div className="space-y-1 w-full">
      <label className="block text-xs font-semibold text-headerColor">
        {field.label || "Language Input"}
        {field.required && " *"}
      </label>
      <div className="w-full px-3 py-2.5 border border-borderColor rounded-lg bg-bgColor flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Globe size={14} className="text-gray-400" />
          <span className="text-sm text-gray-400">
            Select Preferred Language
          </span>
        </div>
        <ChevronDown size={14} className="text-gray-400" />
      </div>
    </div>
  );
}

// ── Payment ───────────────────────────────────────────────────────────────────
function PaymentRenderer({ field }: { field: any }) {
  return (
    <div className="space-y-3 w-full">
      <label className="block text-xs font-semibold text-headerColor">
        {field.label || "Payment"}
        {field.required && " *"}
      </label>
      <div className="space-y-3 border border-borderColor rounded-lg p-4 bg-bgColor">
        <div className="flex items-center border border-borderColor rounded-lg bg-white px-3 py-2.5 gap-2">
          <span className="text-sm text-gray-400 flex-1">
            Enter name on card
          </span>
        </div>
        <div className="flex items-center border border-borderColor rounded-lg bg-white px-3 py-2.5 gap-2">
          <span className="text-sm text-gray-400 flex-1">
            1234 2542 2541 5294
          </span>
          <div className="flex items-center gap-1">
            <div className="w-6 h-4 bg-orange-500 rounded-sm" />
            <div className="w-6 h-4 bg-red-500 rounded-sm opacity-80 -ml-2" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center border border-borderColor rounded-lg bg-white px-3 py-2.5">
            <span className="text-sm text-gray-400">MM / YY</span>
          </div>
          <div className="flex items-center border border-borderColor rounded-lg bg-white px-3 py-2.5">
            <span className="text-sm text-gray-400">CVC</span>
          </div>
        </div>
        <label className="flex items-center gap-2 text-xs text-gray-400">
          <input type="checkbox" className="h-3 w-3" />
          Your payment information is securely stored in our system
        </label>
      </div>
      <div className="flex items-center justify-between border border-borderColor rounded-lg p-3 bg-bgColor">
        <span className="text-sm font-medium text-headerColor">Stripe</span>
        <div className="relative w-8 h-4 rounded-full bg-blackColor">
          <div className="absolute right-0.5 top-0.5 w-3 h-3 rounded-full bg-white" />
        </div>
      </div>
    </div>
  );
}

// ── Main Field Renderer ───────────────────────────────────────────────────────
interface FieldRendererProps {
  field: any;
  activeBlockId: string;
  activeSectionId: string | null;
}

export default function FieldRenderer({
  field,
  activeBlockId,
  activeSectionId,
}: FieldRendererProps) {
  const dispatch = useDispatch();

  switch (field.type) {
    case "text":
    case "number":
    case "email":
    case "tel":
      return (
        <ReusableInput
          label={field.label}
          type={field.type}
          required={field.required}
          placeholder={field.placeholder}
          className="w-full p-2.5 border rounded-lg bg-bgColor text-sm"
        />
      );

    case "textarea":
      return (
        <ReusableTextarea
          label={field.label}
          required={field.required}
          placeholder={field.placeholder}
          className="w-full bg-bgColor text-sm"
        />
      );

    case "password":
      return <CustomPassword field={field} />;

    case "rating":
      return <RatingFormSetting field={field} />;

    case "rating_group":
      return <RatingGroupSetting field={field} />;

    case "rich_text":
      return (
        <div className="border p-1 rounded-lg bg-bgColor">
          <RichTextEditor
            value={field.content || field.value || ""}
            onChange={(val: string) =>
              dispatch(
                updateFieldProperties({
                  blockId: activeBlockId,
                  sectionId: activeSectionId,
                  fieldId: field.id,
                  key: "content",
                  value: val,
                }),
              )
            }
          />
        </div>
      );

    case "select":
    case "multi_select":
      return <DropdownRenderer field={field} />;

    case "radio":
      return <RadioRenderer field={field} />;

    case "radio_table":
      return <RadioTableRenderer field={field} />;

    case "checkbox":
      return <SingleCheckboxRenderer field={field} />;

    case "multi_select_checkbox":
      return <MultiCheckboxRenderer field={field} />;

    case "checkbox_table":
      return <CheckboxTableRenderer field={field} />;

    case "date":
      return <DatePickerRenderer field={field} />;

    case "time":
      return <TimePickerRenderer field={field} />;

    case "datetime":
      return <DateTimePickerRenderer field={field} />;

    case "file":
      return <FileUploadRenderer field={field} />;

    case "file_additional":
      return <FileAdditionalRenderer field={field} />;

    case "video_record":
      return <VideoRecorderRenderer field={field} />;

    case "signature":
      return <SignatureRenderer field={field} />;

    case "signature_file":
      return <SignatureFileRenderer field={field} />;

    case "salary_range":
      return <SalaryRangeRenderer field={field} />;

    case "payment":
      return <PaymentRenderer field={field} />;

    case "address_auto":
      return <AddressRenderer field={field} />;

    case "phone_country":
    case "phone_country_code":
      return <PhoneCountryRenderer field={field} />;

    case "time_availability":
      return <TimeAvailabilityRenderer field={field} />;

    case "language":
      return <LanguageRenderer field={field} />;

    case "booking":
      return (
        <div className="space-y-1">
          {field.label && (
            <label className="text-xs font-semibold text-gray-700">
              {field.label}
              {field.required && <span className="text-red-500 ml-0.5">*</span>}
            </label>
          )}
          <div className="rounded-lg border border-dashed border-borderColor bg-bgColor p-4 text-center text-xs text-secondaryColor">
            <Calendar size={20} className="mx-auto mb-1 opacity-50" />
            Booking / Appointment Slot
          </div>
        </div>
      );

    case "list_files":
      return (
        <div className="space-y-1">
          {field.label && (
            <label className="text-xs font-semibold text-gray-700">
              {field.label}
              {field.required && <span className="text-red-500 ml-0.5">*</span>}
            </label>
          )}
          <div className="rounded-lg border bg-bgColor divide-y divide-borderColor text-xs text-headerColor">
            {["document_1.pdf", "document_2.pdf"].map((f) => (
              <div key={f} className="flex items-center gap-2 px-3 py-2">
                <Upload size={12} className="text-secondaryColor shrink-0" />
                <span className="flex-1 truncate">{f}</span>
              </div>
            ))}
          </div>
        </div>
      );

    case "stripe_subscription":
    case "subscription_plan":
      return (
        <div className="space-y-1">
          {field.label && (
            <label className="text-xs font-semibold text-gray-700">
              {field.label}
              {field.required && <span className="text-red-500 ml-0.5">*</span>}
            </label>
          )}
          <div className="grid grid-cols-2 gap-2">
            {["Basic", "Pro"].map((plan) => (
              <div
                key={plan}
                className="rounded-lg border border-borderColor bg-bgColor p-3 text-center text-xs text-headerColor"
              >
                <p className="font-semibold">{plan}</p>
                <p className="text-secondaryColor text-[10px] mt-0.5">
                  $0 / month
                </p>
              </div>
            ))}
          </div>
        </div>
      );

    case "evaluation":
      return (
        <div className="space-y-1">
          {field.label && (
            <label className="text-xs font-semibold text-gray-700">
              {field.label}
              {field.required && <span className="text-red-500 ml-0.5">*</span>}
            </label>
          )}
          <div className="rounded-lg border bg-bgColor overflow-hidden text-xs">
            <div className="grid grid-cols-4 bg-grayColor1 px-3 py-1.5 font-semibold text-headerColor border-b border-borderColor">
              <span className="col-span-2">Criteria</span>
              <span className="text-center">Score</span>
              <span className="text-center">Weight</span>
            </div>
            {["Communication", "Technical"].map((c) => (
              <div
                key={c}
                className="grid grid-cols-4 px-3 py-2 border-b border-borderColor last:border-0 text-secondaryColor"
              >
                <span className="col-span-2">{c}</span>
                <span className="text-center">—</span>
                <span className="text-center">—</span>
              </div>
            ))}
          </div>
        </div>
      );

    case "job_placement":
      return (
        <div className="space-y-1">
          {field.label && (
            <label className="text-xs font-semibold text-gray-700">
              {field.label}
              {field.required && <span className="text-red-500 ml-0.5">*</span>}
            </label>
          )}
          <div className="rounded-lg border bg-bgColor px-3 py-2 flex items-center justify-between text-xs text-secondaryColor">
            <span>Select a placement job…</span>
            <ChevronDown size={14} />
          </div>
        </div>
      );

    default:
      return (
        <ReusableInput
          label={field.label}
          type="text"
          required={field.required}
          placeholder={field.placeholder}
          className="w-full p-2.5 border rounded-lg bg-bgColor text-sm"
        />
      );
  }
}
