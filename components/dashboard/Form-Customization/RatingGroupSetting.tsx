"use client";

type RatingGroupSettingProps = {
  field: {
    label?: string;
    items?: string[];
    maxRating?: number;
  };
};

export default function RatingGroupSetting({ field }: RatingGroupSettingProps) {
  const items = field.items?.length
    ? field.items
    : ["Review 1", "Review 2", "Review 3"];
  const ratingCount = field.maxRating || 5;

  return (
    <div className="w-full space-y-3">
      <div className="flex items-start gap-3">
      

        <div className="flex-1 space-y-3">
          <h3 className="text-lg font-semibold text-headerColor">
            {field.label || "Rating Group"}
          </h3>

          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item}
                className="flex items-center justify-between gap-4"
              >
                <span className="text-sm font-medium text-headerColor">
                  {item}
                </span>

                <div className="flex items-center gap-1">
                  {Array.from({ length: ratingCount }).map((_, index) => (
                    <svg
                      key={index}
                      viewBox="0 0 24 24"
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                      aria-hidden="true"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
