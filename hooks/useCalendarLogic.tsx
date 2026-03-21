import { useRef, useState, useCallback } from "react";
import FullCalendar from "@fullcalendar/react";

export const useCalendarLogic = () => {
  const calendarRef = useRef<FullCalendar | null>(null);
  const [currentTitle, setCurrentTitle] = useState(
    new Date().toLocaleString("en-US", { month: "long", year: "numeric" })
  );

  const syncTitle = useCallback(() => {
    const api = calendarRef.current?.getApi();
    if (api) {
      setCurrentTitle(api.view.title);
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
    handlePrev,
    handleNext,
    handleToday,
    syncTitle,
  };
};