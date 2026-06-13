"use client";

import { useState } from "react";

type RatingFormSettingProps = {
  field: {
    label?: string;
    maxRating?: number;
  };
};

export default function RatingFormSetting({ field }: RatingFormSettingProps) {
  const [value, setValue] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const maxRating = field.maxRating || 5;

  return (
    <div>
      <h3 className="text-sm font-semibold text-headerColor mb-2">
        {field.label || "Rating"}
      </h3>

      <div className="flex items-center gap-3">
        {Array.from({ length: maxRating }, (_, i) => i + 1).map((s) => {
          const filled = hover ? s <= hover : s <= value;
          return (
            <button
              key={s}
              type="button"
              aria-label={`${s} star`}
              onClick={() => setValue(s)}
              onMouseEnter={() => setHover(s)}
              onMouseLeave={() => setHover(0)}
              className="focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                className={`transition-colors ${
                  filled ? "text-ratingColor" : "text-headerColor"
                }`}
              >
                <path
                  d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.402 8.171L12 18.896l-7.336 3.869 1.402-8.171L.132 9.21l8.2-1.192z"
                  fill={filled ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth={1}
                />
              </svg>
            </button>
          );
        })}
      </div>
    </div>
  );
}
