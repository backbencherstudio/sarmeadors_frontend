"use client";

import ReusableInput from "@/components/common/InputFiled/ReusableInput";
import EyeIcon from "@/components/icon/EyeIcon";
import { EyeOff } from "lucide-react";
import { useState } from "react";

interface CustomPasswordProps {
  field: {
    id: string;
    label: string;
    required?: boolean;
    placeholder?: string;
  };
  register: any;
  errors: any;
  watch: any;
}

function CustomPassword({
  field,
  register,
  errors,
  watch,
}: CustomPasswordProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordName = `${field.id}_password`;
  const confirmPasswordName = `${field.id}_confirm_password`;

  const passwordValue = watch(passwordName);

  return (
    <div className="space-y-4 w-full text-left">
      {/* --- PASSWORD FIELD --- */}
      <div className="h-full">
        <ReusableInput
          label={field.label || "Password"}
          type={showPassword ? "text" : "password"}
          required={field.required}
          placeholder={field.placeholder || "Enter password"}
          className="w-full p-2.5 border rounded-lg bg-gray-50 text-sm pr-10"
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
          {...register(passwordName, {
            required: field.required ? "Password is required" : false,
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors[passwordName] && (
          <p className="text-[11px] text-red-500 font-medium mt-1">
            {errors[passwordName]?.message}
          </p>
        )}
      </div>

      {/* --- CONFIRM PASSWORD FIELD --- */}
      <div className="h-full">
        <ReusableInput
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          required={field.required}
          placeholder="Re-enter password"
          className="w-full p-2.5 border rounded-lg bg-gray-50 text-sm pr-10"
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
          {...register(confirmPasswordName, {
            required: field.required ? "Please confirm your password" : false,
            validate: (value: string) =>
              value === passwordValue || "Passwords do not match",
          })}
        />
        {errors[confirmPasswordName] && (
          <p className="text-[11px] text-red-500 font-medium mt-1">
            {errors[confirmPasswordName]?.message}
          </p>
        )}
      </div>
    </div>
  );
}

export default CustomPassword;
