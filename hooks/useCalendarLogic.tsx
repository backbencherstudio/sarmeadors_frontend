import { useRef, useState, useCallback } from "react";
import FullCalendar from "@fullcalendar/react";

export const useCalendarLogic = () => {
  const calendarRef = useRef<FullCalendar | null>(null);
  const [currentTitle, setCurrentTitle] = useState(
    new Date().toLocaleString("en-US", { month: "long", year: "numeric" })
  );
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const syncTitle = useCallback(() => {
    const api = calendarRef.current?.getApi();
    if (api) {
      setCurrentTitle(api.view.title);
      const date = api.getDate();
      setCurrentMonth(date.getMonth() + 1);
      setCurrentYear(date.getFullYear());
    }
  }, []);

  const handlePrev = () => {
    calendarRef.current?.getApi().prev();
    syncTitle();
  };

  const handleNext = () => {
    calendarRef.current?.getApi().next();
    syncTitle();
  };

  const handleToday = () => {
    calendarRef.current?.getApi().today();
    syncTitle();
  };

  return {
    calendarRef,
    currentTitle,
    currentMonth,
    currentYear,
    handlePrev,
    handleNext,
    handleToday,
    syncTitle,
  };
};