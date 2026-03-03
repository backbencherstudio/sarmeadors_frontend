"use client";

import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";

export default function Calendar() {
  const [events, setEvents] = useState<any[]>([
    {
      id: "1",
      title: "My Task",
      start: new Date().toISOString().split("T")[0],
    },
  ]);

  const handleDateClick = (info: any) => {
    const title = prompt("Enter Event Title");
    if (title) {
      setEvents([
        ...events,
        {
          id: String(events.length + 1),
          title,
          start: info.dateStr,
        },
      ]);
    }
  };

  const handleEventDrop = (info: any) => {
    console.log("Event moved to:", info.event.start);
  };

  const calendarRef = useRef<any>(null);
  const [currentView, setCurrentView] = useState("dayGridMonth");

  const handlePrev = () => {
    calendarRef.current.getApi().prev();
  };

  const handleNext = () => {
    calendarRef.current.getApi().next();
  };

  const handleToday = () => {
    calendarRef.current.getApi().today();
  };

  const changeView = (view: string) => {
    setCurrentView(view);
    calendarRef.current.getApi().changeView(view);
  };

  return (
    <div className="p-6 bg-white border border-[#E5E7EB] rounded-xl mt-6">
      <div className="flex items-center justify-between mb-6">
        {/* LEFT SIDE */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="p-2 rounded-lg border hover:bg-gray-100"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={handleNext}
            className="p-2 rounded-lg border hover:bg-gray-100"
          >
            <ChevronRight size={18} />
          </button>

          <button
            onClick={handleToday}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            Today
          </button>
        </div>

        {/* RIGHT SIDE VIEW SWITCH */}
        <div className="flex bg-gray-100 p-1 rounded-lg">
          {[
            { label: "Month", value: "dayGridMonth" },
            { label: "Week", value: "timeGridWeek" },
            { label: "Day", value: "timeGridDay" },
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => changeView(item.value)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                currentView === item.value ? "bg-white shadow" : "text-gray-500"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        editable={true}
        events={events}
        dayMaxEvents={3}
        moreLinkClick="popover"
        headerToolbar={false}
        dateClick={handleDateClick}
        eventDrop={handleEventDrop}
      />
    </div>
  );
}
