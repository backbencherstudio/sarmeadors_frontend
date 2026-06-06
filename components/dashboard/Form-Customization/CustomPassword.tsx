"use client";

import ReusableInput from "@/components/common/InputFiled/ReusableInput";
import EyeIcon from "@/components/icon/EyeIcon";
import { EyeOff } from "lucide-react";
import { useState } from "react";

export interface CustomPasswordProps {
  field: {
    id: string;
    label: string;
    required?: boolean;
    placeholder?: string;
  };
}

function CustomPassword({ field }: CustomPasswordProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="space-y-4 w-full text-left">
      <ReusableInput
        label={field.label || "Password"}
        type={showPassword ? "text" : "password"}
        required={field.required}
        placeholder={field.placeholder || "Enter password"}
        className="w-full p-2.5 border rounded-lg bg-bgColor text-sm"
        endAdornment={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? (
              <EyeOff size={16} />
            ) : (
              <EyeIcon className="w-4 h-4" />
            )}
          </button>
        }
      />

      <ReusableInput
        label="Confirm Password"
        type={showConfirmPassword ? "text" : "password"}
        required={field.required}
        placeholder="Re-enter password"
        className="w-full p-2.5 border rounded-lg bg-bgColor text-sm"
        endAdornment={
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showConfirmPassword ? (
              <EyeOff size={16} />
            ) : (
              <EyeIcon className="w-4 h-4" />
            )}
          </button>
        }
      />
    </div>
  );
}

export default CustomPassword;
