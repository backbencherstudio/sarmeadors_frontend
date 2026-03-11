"use client";

import { EventContentArg } from "@fullcalendar/core/index.js";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import InterviewScheduleInfoDialog from "./InterviewScheduleInfoDialog";

export default function Calendar() {
  const calendarRef = useRef<any>(null);
  const [currentView, setCurrentView] = useState("dayGridMonth");
  const [isOpen, setIsOpen] = useState(false);
  const [interviewData, setInterviewData] = useState<any>(null);
  const interviewEvents = [
    {
      id: "1",
      title: "Jacob Jones",
      start: new Date().toISOString().split("T")[0],
    },
    {
      id: "2",
      title: "Jacob Jones",
      start: new Date().toISOString().split("T")[0],
    },
    {
      id: "3",
      title: "Jacob Jones",
      start: new Date().toISOString().split("T")[0],
    },
    {
      id: "4",
      title: "Jacob Jones",
      start: new Date().toISOString().split("T")[0],
    },
  ];

  const handleEventDrop = (info: any) => {
    console.log("Event moved to:", info.event.start);
  };

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

  const renderEvent = (eventInfo: EventContentArg) => {
    const { event } = eventInfo;

    return (
      <div
        onClick={() =>  setIsOpen(true)}
        className="flex items-center justify-between bg-[#F3F4F6] border px-2 py-1 text-xs rounded-md"
      >
        <div className="flex items-center gap-2">
          <img
            src="/empty-user.png"
            alt={event.title}
            className="w-5 h-5 rounded-full object-cover"
          />

          <span className="font-medium text-[#6B7280]">{event.title}</span>
        </div>

        <span className="text-[#6B7280]">4:25 pm</span>
      </div>
    );
  };

  return (
    <div className="p-6 bg-white border border-[#E5E7EB] rounded-xl mt-6">
      <div className="flex items-center justify-between mb-6">
        {/* LEFT */}
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

        {/* RIGHT VIEW SWITCH */}
        <div className="flex bg-gray-100 p-1 rounded-lg">
          {[
            { label: "Month", value: "dayGridMonth" },
            { label: "Week", value: "timeGridWeek" },
            { label: "Day", value: "timeGridDay" },
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => changeView(item.value)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition cursor-pointer ${
                currentView === item.value ? "bg-white shadow" : "text-gray-500"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        editable={true}
        events={interviewEvents}
        dayMaxEvents={3}
        moreLinkClick="popover"
        headerToolbar={false}
        eventDrop={handleEventDrop}
        eventContent={renderEvent}
      />

      {isOpen && (
        <InterviewScheduleInfoDialog
          isOpen={isOpen}
          setOpen={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
