"use client";

interface RadioOption {
  label: string;
  value: string;
}

interface CustomRadioGroupProps {
  question: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

function CustomRadioGroup({
  question,
  options,
  value,
  onChange,
  required = false,
}: CustomRadioGroupProps) {
  return (
    <div className="space-y-2.5">
      <h3 className="text-xs sm:text-sm font-medium text-headerColor leading-[1.4]">
        {question}
        {required && <span className="text-redColor"> *</span>}
      </h3>

      <div className="space-y-1.5">
        {options.map((option) => {
          const isSelected = value === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className="flex w-full items-center gap-2 text-left"
            >
              <span
                className={`flex h-4 w-4 items-center justify-center rounded-full border transition-colors ${
                  isSelected ? "border-headerColor" : "border-borderColor"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    isSelected ? "bg-headerColor" : "bg-transparent"
                  }`}
                />
              </span>

              <span className="text-xs sm:text-sm text-lightblackColor leading-[1.35]">
                {option.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export type { RadioOption };
export default CustomRadioGroup;
