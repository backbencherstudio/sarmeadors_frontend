import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

type ReusableInputProps = {
  label?: string;
  error?: string;
  containerClassName?: string;
  required?: boolean;
  endAdornment?: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>;

const ReusableInput = React.forwardRef<HTMLInputElement, ReusableInputProps>(
  (
    {
      label,
      error,
      containerClassName,
      required,
      endAdornment,
      className,
      type = "text",
      ...props
    },
    ref,
  ) => {
    return (
      <div className={`space-y-1.5 ${containerClassName || ""}`}>
        {label && (
          <Label className="text-sm text-headerColor font-medium">
            {label} {required && <span className="text-redColor">*</span>}
          </Label>
        )}

        <div className="relative">
          <Input
            ref={ref}
            type={type}
            className={`h-12! md:h-13! bg-bgColor ${endAdornment ? "pr-10" : ""} ${className || ""}`}
            {...props}
          />
          {endAdornment ? (
            <div className="absolute inset-y-0 right-3 flex items-center">
              {endAdornment}
            </div>
          ) : null}
        </div>

        {error && <p className="text-red-500 text-xs">{error}</p>}
      </div>
    );
  },
);

ReusableInput.displayName = "ReusableInput";

export default ReusableInput;
