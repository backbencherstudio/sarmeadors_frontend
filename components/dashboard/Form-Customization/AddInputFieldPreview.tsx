"use client";

import { useState } from "react";
import { 
  Star, Eye, EyeOff, Calendar, Clock, Upload, 
  Video, CreditCard, Globe, ChevronDown 
} from "lucide-react";
import ReusableInput from "@/components/common/InputFiled/ReusableInput";
import ReusableTextarea from "@/components/common/InputFiled/TextAreaField";

interface PreviewProps {
  element: {
    id: string;
    label: string;
    type: string;
    description: string;
    options?: string[];
    items?: string[];
  };
  label: string;
  placeholder: string;
}

export default function AddInputFieldPreview({ element, label, placeholder }: PreviewProps) {
  const [showPassword, setShowPassword] = useState(false);

  const displayLabel = label || element.label;
  const displayPlaceholder = placeholder || "Enter text here";

  const renderStars = (count = 5, filled = 5) => (
    <div className="flex gap-1">
      {[...Array(count)].map((_, i) => (
        <Star key={i} size={16} className={i < filled ? "fill-amber-400 text-amber-400" : "text-gray-300"} />
      ))}
    </div>
  );

  switch (element.id) {
    // ==========================================
    // 1. BASIC INPUT FIELDS (USING YOUR REUSABLE COMPONENTS)
    // ==========================================
    case "text":
    case "email":
    case "phone_country":
      return (
        <ReusableInput
          label={displayLabel}
          placeholder={displayPlaceholder}
          type={element.type || "text"}
          value=""
          onChange={() => {}}
          disabled={true}
        />
      );

    case "textarea":
      return (
        <ReusableTextarea
          label={displayLabel}
          placeholder={displayPlaceholder}
          value=""
          onChange={() => {}}
          disabled={true}
        />
      );

    case "password":
      return (
        <div className="space-y-4 text-left w-full">
          <div className="relative flex flex-col">
            <ReusableInput
              label="Password"
              placeholder="••••••••••••"
              type={showPassword ? "text" : "password"}
              value="password123"
              onChange={() => {}}
              disabled={true}
              required={true}
            />
            <span className="absolute right-3 top-9 text-gray-400 cursor-not-allowed">
              <EyeOff size={16} />
            </span>
          </div>
          <div className="relative flex flex-col">
            <ReusableInput
              label="Confirm Password"
              placeholder=""
              type="text"
              value=""
              onChange={() => {}}
              disabled={true}
              required={true}
            />
            <span className="absolute right-3 top-9 text-gray-400 cursor-not-allowed">
              <Eye size={16} />
            </span>
          </div>
        </div>
      );

    // ==========================================
    // 2. SPECIAL VISUAL PREVIEWS (COMPLEX INPUTS)
    // ==========================================
    case "rating":
      return (
        <div className="space-y-2 w-full">
          <label className="block text-xs font-bold text-gray-700">{displayLabel} *</label>
          {renderStars(5, 5)}
        </div>
      );

    case "rating_group":
      return (
        <div className="space-y-3 w-full">
          <span className="text-xs font-bold text-gray-800">{displayLabel}</span>
          <div className="space-y-2">
            {(element.items || ["Review 1", "Review 2", "Review 3"]).map((item, idx) => (
              <div key={idx} className="flex items-center justify-between border-b border-gray-50 pb-2">
                <span className="text-xs text-gray-600">{item}</span>
                {renderStars(5, 5)}
              </div>
            ))}
          </div>
        </div>
      );

    case "rich_text":
      return (
        <div className="space-y-1 w-full">
          <label className="block text-xs font-bold text-gray-700">{displayLabel}</label>
          <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
            <div className="p-2 border-b bg-gray-50 flex gap-3 text-xs text-gray-400 border-gray-100 font-mono">
              <span>Inter ▾</span> <span>16 ▾</span> <span className="font-bold text-black">B</span> <span className="italic">I</span> <span className="underline">U</span> <span>🔗</span>
            </div>
            <div className="p-4 min-h-[100px]">
              <h4 className="text-base font-bold text-gray-400">Title</h4>
              <p className="text-xs text-gray-300 mt-1">Start writing, drag files or start from a template</p>
            </div>
          </div>
        </div>
      );

    case "language":
      return (
        <div className="space-y-1 w-full">
          <label className="block text-xs font-bold text-gray-700">{displayLabel}</label>
          <div className="w-full p-2.5 border border-gray-200 rounded-lg bg-white flex justify-between items-center text-xs text-gray-500">
            <div className="flex items-center gap-2"><Globe size={14} /> <span>Select Preferred Language</span></div>
            <ChevronDown size={14} />
          </div>
        </div>
      );

    case "dropdown":
    case "multi_select":
      return (
        <div className="space-y-1 w-full">
          <label className="block text-xs font-bold text-gray-700">{displayLabel}</label>
          <div className="w-full p-2.5 border border-gray-200 rounded-lg bg-white flex justify-between items-center text-xs text-gray-400">
            <span>{element.id === "multi_select" ? "Select Multiple Options" : "Select Option"}</span>
            <ChevronDown size={14} />
          </div>
          <div className="border border-gray-100 rounded-lg bg-white shadow-xs mt-1 p-1 space-y-0.5">
            {(element.options || ["Menu Item 1", "Menu Item 2", "Menu Item 3"]).map((opt, idx) => (
              <div key={idx} className={`p-2 text-xs rounded ${idx === 0 ? "bg-[#111827] text-white" : "text-gray-700 bg-white"}`}>{opt}</div>
            ))}
          </div>
        </div>
      );

    case "radio":
      return (
        <div className="space-y-2 w-full">
          <label className="block text-xs font-bold text-gray-700">{displayLabel}</label>
          <div className="space-y-2">
            {(element.options || ["Yes", "No", "Other"]).map((opt, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center bg-white">
                  {idx === 0 && <div className="w-2 h-2 rounded-full bg-black" />}
                </div>
                <span className="text-xs text-gray-600">{opt}</span>
              </div>
            ))}
          </div>
        </div>
      );

    case "date_picker":
    case "time_picker":
      return (
        <div className="space-y-1 w-full">
          <label className="block text-xs font-bold text-gray-700">{displayLabel}</label>
          <div className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-400 flex items-center justify-between">
            <span>{element.id === "time_picker" ? "00:00 AM / PM" : "Select Date parameter"}</span>
            {element.id === "time_picker" ? <Clock size={14} /> : <Calendar size={14} />}
          </div>
        </div>
      );

    case "file_upload":
      return (
        <div className="w-full border-2 border-dashed border-gray-200 rounded-xl p-4 text-center bg-gray-50/50 flex flex-col items-center justify-center gap-1">
          <Upload size={20} className="text-gray-400" />
          <span className="text-xs font-semibold text-gray-700">{displayLabel}</span>
          <span className="text-[10px] text-gray-400">Supports PDF, PNG, JPG up to 10MB</span>
        </div>
      );

    case "video_recorder":
      return (
        <div className="w-full h-28 bg-gray-900 rounded-xl flex flex-col items-center justify-center text-white gap-1 relative overflow-hidden">
          <Video size={24} className="text-red-500" />
          <span className="text-[10px] font-medium tracking-wide">Live Camera Stream Interface</span>
        </div>
      );

    case "salary_range":
      return (
        <div className="space-y-2 w-full">
          <label className="block text-xs font-bold text-gray-700">{displayLabel}</label>
          <div className="flex gap-2">
            <input type="text" placeholder="Min" disabled className="w-1/2 p-2 bg-gray-50 border rounded-lg text-xs" />
            <input type="text" placeholder="Max" disabled className="w-1/2 p-2 bg-gray-50 border rounded-lg text-xs" />
          </div>
        </div>
      );

    case "payment":
      return (
        <div className="w-full border border-gray-100 rounded-xl p-3 bg-white shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CreditCard size={18} className="text-blue-600" />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-gray-800">Secure Merchant Gateways</span>
              <span className="text-[10px] text-gray-400">Stripe Integration enabled</span>
            </div>
          </div>
          <span className="text-xs font-bold text-green-600">$0.00</span>
        </div>
      );

    case "section":
      return (
        <div className="space-y-3 w-full">
          <span className="text-xs font-bold text-gray-400 uppercase">Section Layout Wrapper</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-gray-50/50 p-3 border border-dashed border-gray-300 rounded-xl">
            {(element.items || ["Title Field 1", "Title Field 2", "Title Field 3", "Title Field 4"]).map((item, idx) => (
              <div key={idx} className="p-3 bg-white border border-gray-200 rounded-lg shadow-2xs">
                <label className="block text-[10px] font-bold text-gray-500 mb-1">{item} *</label>
                <div className="w-full p-2 bg-gray-50 border border-gray-100 rounded-sm text-[11px] text-gray-300">Input area</div>
              </div>
            ))}
          </div>
        </div>
      );

    case "address_auto":
      return (
        <div className="space-y-3 w-full text-left">
          <span className="text-xs font-bold text-gray-800">{displayLabel}</span>
          <div className="space-y-2">
            <div>
              <label className="text-[10px] text-gray-400 block font-semibold">Street Address *</label>
              <div className="w-full p-2 bg-gray-50 border border-gray-100 rounded-md mt-0.5 min-h-[32px]" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] text-gray-400 block font-semibold">City *</label>
                <div className="w-full p-2 bg-gray-50 border border-gray-100 rounded-md mt-0.5 min-h-[32px]" />
              </div>
              <div>
                <label className="text-[10px] text-gray-400 block font-semibold">Postal Code *</label>
                <div className="w-full p-2 bg-gray-50 border border-gray-100 rounded-md mt-0.5 min-h-[32px]" />
              </div>
              <div>
                <label className="text-[10px] text-gray-400 block font-semibold">Province/State *</label>
                <div className="w-full p-2 bg-gray-50 border border-gray-100 rounded-md mt-0.5 min-h-[32px]" />
              </div>
              <div>
                <label className="text-[10px] text-gray-400 block font-semibold">Country *</label>
                <div className="w-full p-2 bg-gray-50 border border-gray-100 rounded-md mt-0.5 min-h-[32px]" />
              </div>
            </div>
          </div>
        </div>
      );

    default:
      return (
        <ReusableInput
          label={displayLabel}
          placeholder={displayPlaceholder}
          type="text"
          value=""
          onChange={() => {}}
          disabled={true}
        />
      );
  }
}