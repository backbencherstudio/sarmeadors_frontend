"use client";

import FullCalenderCustomize from "@/components/common/FullCalenderCustomize";
import { EventContentArg } from "@fullcalendar/core/index.js";
import { useState } from "react";
import CandidateInterviewDialog from "./CandidateInterviewDialog";
import CandidateInterviewFilter from "./CandidateInterviewFilter";
import CandidateInterviewRender from "./CandidateInterviewRender";
import { useGetCandidateInterviewsQuery } from "@/feature/slice/candidate/candidate-dashboard/CandidateInterviewsSlice";

function CandidateJobInterviewsDate() {
  const [scheduledData, setScheduledData] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(new Date().getMonth() + 1);
  const [calendarYear, setCalendarYear] = useState(new Date().getFullYear());
  const [period, setPeriod] = useState("month");
  const [filterStatus, setFilterStatus] = useState("");

  const { data, isLoading, isError, refetch } = useGetCandidateInterviewsQuery({
    view: "calendar",
    period,
    search: "",
    month: calendarMonth,
    year: calendarYear,
    status: filterStatus,
  });

  const handleFilterChange = (values: { period?: string; status?: string }) => {
    if (values.period !== undefined) setPeriod(values.period);
    if (values.status !== undefined) setFilterStatus(values.status);
  };

  const handleCalendarSync = (month: number, year: number) => {
    setCalendarMonth(month);
    setCalendarYear(year);
  };

  const transformInterviewsToEvents = (interviews: any[]) => {
    if (!Array.isArray(interviews)) return [];
    return interviews.map((interview) => {
      const status = String(interview.status || "").toLowerCase();
      let dotClass = "";
      if (status === "scheduled") dotClass = "bg-blueColor";
      else if (status === "completed") dotClass = "bg-greenColor";
      else if (status === "cancelled") dotClass = "bg-redColor";
      return {
        id: interview.id,
        title: interview.title,
        start: interview.date,
        allDay: true,
        extendedProps: {
          interview,
          time: interview.time,
          status: interview.status,
          status_label: interview.status_label,
          period: interview.period,
          meeting: interview.meeting,
          client: interview.client,
          job_type: interview.job_type,
          job_type_label: interview.job_type_label,
          description: interview.description,
          description_preview: interview.description_preview,
          location: interview.location,
          modal: interview.modal,
          ...(dotClass ? { dotClass } : {}),
        },
      };
    });
  };

  const handleOpen = (event: any) => {
    setScheduledData(event);
    setIsOpen(true);
  };

  const renderInterviewEvent = (eventInfo: EventContentArg) => (
    <CandidateInterviewRender eventInfo={eventInfo} onOpen={handleOpen} />
  );

  const calendarEvents = transformInterviewsToEvents(data?.data?.interviews);

  return (
    <div className="w-full rounded-xl bg-white ">
      <div>
        <FullCalenderCustomize
          filterSection={
            <CandidateInterviewFilter
              period={period}
              status={filterStatus || "all"}
              onChange={handleFilterChange}
            />
          }
          renderEvent={renderInterviewEvent}
          data={calendarEvents}
          onSync={handleCalendarSync}
        />
      </div>

      {isOpen && scheduledData && (
        <CandidateInterviewDialog
          isOpen={isOpen}
          setOpen={() => setIsOpen(false)}
          data={scheduledData}
          onJoinSuccess={refetch}
        />
      )}
    </div>
  );
}

export default CandidateJobInterviewsDate;
