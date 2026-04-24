"use client";

import DatePickerRenderer from "./DatePickerRenderer";
import TimePickerRenderer from "./TimePickerRenderer";

type Props = {
  field: any;
};

export default function DateTimePickerRenderer({ field }: Props) {
  return (
    <div className="space-y-4 w-full">
      <div className="space-y-2">
        <h3 className="text-base font-semibold text-headerColor">
          {field.label || "Date & time picker"}
        </h3>
        <DatePickerRenderer
          field={{
            ...field,
            label: "Booking Date",
            placeholder: "9/18/16",
          }}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <TimePickerRenderer
          field={{
            ...field,
            label: "Start Time",
            placeholder: "5:45 AM",
          }}
        />
        <TimePickerRenderer
          field={{
            ...field,
            label: "End Time",
            placeholder: "5:40 PM",
          }}
        />
      </div>
    </div>
  );
}
