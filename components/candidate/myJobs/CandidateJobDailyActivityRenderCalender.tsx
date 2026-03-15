import { EventContentArg } from "@fullcalendar/core/index.js";

 const CandidateJobDailyActivityRenderCalender = (eventInfo: EventContentArg) => {
    const { check_in, check_out, total, attandance } =
      eventInfo.event.extendedProps;

    return (
      <div className="text-[12px]  text-left leading-4 text-headerColor space-y-1">
        {attandance === "present" ? (
          <div className="space-y-1">
            <div>
              <p className="text-xs font-medium px-1.5 py-1 inline-block rounded bg-bgColor">
                <span className="text-greenColor">Check In</span> {check_in}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium px-1.5 py-1 inline-block rounded bg-bgColor">
                <span className="text-blueColor">Check Out</span> {check_out}
              </p>
            </div>
            <p className="text-xs font-medium text-lightblackColor px-1.5 py-1 inline-block rounded bg-[#FFFAE5]">
              {total}
            </p>
          </div>
        ) : (
          <p className="text-redColor bg-redColor/15 px-2 py-1 font-medium inline rounded">
            Absent
          </p>
        )}
      </div>
    );
  };

  export default CandidateJobDailyActivityRenderCalender