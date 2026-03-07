import CalenderIcon from "../icon/CalenderIcon";
import ClockICon from "../icon/ClockICon";
import LocationIcon from "../icon/LocationIcon";

function CandidatejobsCard({ job }: { job: any }) {
  return (
    <div>
      <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-blackColor">
                {job.title}
              </h3>
              <span
                className={`text-xs px-2 py-1 rounded-full font-medium ${
                  job.jobType === "Short-term"
                    ? "bg-green-100 text-green-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {job.jobType}
              </span>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-[#96C0FF] flex items-center justify-center text-xs font-semibold text-headerColor">
                {job.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <span className="text-sm text-lightblackColor">{job.name}</span>
            </div>
            <p className="text-sm text-secondaryColor mb-3">
              {job.description}
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <LocationIcon className="w-4 h-4" />
                <span>{job.location}</span>
              </div>
              <div className="flex gap-3 items-center">
                <div className="flex items-center gap-2">
                  <CalenderIcon className="w-4 h-4" />
                  <span>{job.startDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ClockICon className="w-4 h-4 fill-secondaryColor" />
                  <span>
                    {job.startTime} - {job.endTime}
                  </span>
                </div>
              </div>
            </div>
            <button className="mt-4 text-sm text-blue-600 font-medium flex items-center gap-1 hover:underline">
              View Details
              <span>↗</span>
            </button>
          </div>

          <div className="text-right ml-4">
            <p className="text-xl font-bold text-blackColor mb-3">
              {job.hourlyRate}
            </p>

            {job.status === "running" && (
              <div className="flex flex-col items-end gap-1">
                <button className="text-xs bg-gray-900 text-white px-3 py-1 rounded">
                  Check In
                </button>
              </div>
            )}

            {job.status === "scheduled" && (
              <div className="text-xs text-gray-500">
                <p>Next Schedule: {job.checkIn}</p>
              </div>
            )}

            {job.status === "completed" && (
              <div className="space-y-1 text-xs">
                <div>
                  <p className="text-red-600 font-medium">Check In</p>
                  <p className="text-gray-600">{job.checkIn}</p>
                </div>
                <div>
                  <p className="text-gray-600">Check Out</p>
                  <p className="text-gray-900 font-medium">{job.checkOut}</p>
                </div>
                <div className="pt-1 border-t border-gray-200 mt-1">
                  <p className="text-gray-900 font-medium">Total {job.total}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CandidatejobsCard;
