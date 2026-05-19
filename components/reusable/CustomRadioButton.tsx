interface CustomRadioButtonProps {
  label: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  isSelected: boolean;
  variant?: "small" | "large"; // small for 4x4 ring, large for 5x5 ring
  colorScheme?: "default" | "secondary"; // default for blackColor/whiteColor, secondary for custom colors
}

function CustomRadioButton({
  label,
  name,
  value,
  checked,
  onChange,
  isSelected,
  variant = "small",
  colorScheme = "default",
}: CustomRadioButtonProps) {
  const outerSize = variant === "small" ? "w-4 h-4" : "w-5 h-5";
  const innerSize = "w-3 h-3";
  const dotSize = "w-2 h-2";

  const outerBg = isSelected
    ? colorScheme === "secondary"
      ? "bg-blackColor"
      : "bg-[#0b1220]"
    : colorScheme === "secondary"
      ? "bg-secondaryColor"
      : "bg-[#0b1220]";

  const innerBg = isSelected
    ? colorScheme === "secondary"
      ? "bg-blackColor"
      : "bg-white"
    : "bg-white";

  const dotBg = isSelected
    ? colorScheme === "secondary"
      ? "bg-white"
      : "bg-[#0b1220]"
    : "hidden";

  return (
    <label
      className={`flex items-center gap-3 p-2 cursor-pointer ${
        isSelected ? "text-headerColor font-medium" : "text-descriptionColor"
      }`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        className="sr-only"
        checked={checked}
        onChange={() => onChange(value)}
      />
      <span className="flex-shrink-0">
        <span
          className={`${outerSize} rounded-full ${outerBg} flex items-center justify-center`}
        >
          <span
            className={`${innerSize} rounded-full ${innerBg} flex items-center justify-center`}
          >
            {isSelected && (
              <span className={`${dotSize} rounded-full ${dotBg}`}></span>
            )}
          </span>
        </span>
      </span>
      <span className="text-sm">{label}</span>
    </label>
  );
}

export default CustomRadioButton;
