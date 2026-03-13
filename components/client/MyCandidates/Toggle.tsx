"use client";

import { useState } from "react";

interface ToggleProps {
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

export function Toggle({ defaultChecked = false, onChange }: ToggleProps) {
  const [isChecked, setIsChecked] = useState(defaultChecked);

  const handleToggle = () => {
    const newState = !isChecked;
    setIsChecked(newState);
    onChange?.(newState);
  };

  return (
    <button
      onClick={handleToggle}
      className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-300 cursor-pointer ${
        isChecked ? "bg-slate-900" : "bg-slate-300"
      }`}
      aria-label="Toggle switch"
    >
      <span
        className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform duration-300 ${
          isChecked ? "translate-x-7" : "translate-x-1"
        }`}
      />
    </button>
  );
}
