import { Calendar } from "lucide-react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function IconDatePicker() {
  const [startDate, setStartDate] = useState<Date | null>(null);

  return (
    <div className="relative w-full">
      <DatePicker
        selected={startDate}
        onChange={(date: Date | null) => setStartDate(date)}
        placeholderText="Select a date"
        className="p-1.5 pl-10 text-[#111927] border border-[#E5E7EB] rounded-[8px] w-[150px] focus:outline-0 cursor-pointer"
      />
      <Calendar
        size={17}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#111927] pointer-events-none"
      />
    </div>
  );
}
