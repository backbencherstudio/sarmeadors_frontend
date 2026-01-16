"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  applicationDateOptions,
  locationFilters,
  statuse,
  typeFilters,
} from "@/demoData/DashboardData";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, type KeyboardEvent } from "react";
import { FiX } from "react-icons/fi";
import ReactSelect from "react-select";

function ClientDashboardFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [applicationDate, setApplicationDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [hiddenStatuses, setHiddenStatuses] = useState<string[]>([]);

  const statusOptions = statuse.map((s) => ({
    value: s.value,
    label: s.value,
  }));

  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();

    if (applicationDate) {
      params.set("date", applicationDate);
    }

    if (filterStatus) {
      params.set("status", filterStatus);
    }

    if (filterType) {
      params.set("type", filterType);
    }

    if (filterLocation) {
      params.set("location", filterLocation);
    }

    if (searchKeyword) {
      params.set("keyword", searchKeyword);
    }

    if (hiddenStatuses.length > 0) {
      params.set("hideStatuses", hiddenStatuses.join(","));
    }

    const queryString = params.toString();
    const currentQuery = searchParams.toString();

    // Only update if the query string has actually changed
    if (queryString !== currentQuery) {
      if (queryString) {
        router.push(`?${queryString}`, { scroll: false });
      } else {
        router.push("", { scroll: false });
      }
    }
  }, [
    applicationDate,
    filterStatus,
    filterType,
    filterLocation,
    searchKeyword,
    hiddenStatuses,
  ]);

  // Load initial values from URL
  useEffect(() => {
    setApplicationDate(searchParams.get("date") || "");
    setFilterStatus(searchParams.get("status") || "");
    setFilterType(searchParams.get("type") || "");
    setFilterLocation(searchParams.get("location") || "");
    setSearchKeyword(searchParams.get("keyword") || "");
    const hideStatusesStr = searchParams.get("hideStatuses");
    setHiddenStatuses(hideStatusesStr ? hideStatusesStr.split(",") : []);
  }, []);

  const clearFilters = () => {
    setApplicationDate("");
    setFilterStatus("");
    setFilterType("");
    setFilterLocation("");
    setSearchKeyword("");
    setHiddenStatuses([]);
  };

  const handleKeywordSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const hasActiveFilters =
    applicationDate ||
    filterStatus ||
    filterType ||
    filterLocation ||
    searchKeyword ||
    hiddenStatuses.length > 0;

  return (
    <div className="bg-white border border-borderColor rounded-md p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-blackColor">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 transition-colors"
          >
            <FiX size={16} />
            Clear All
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Keyword Search Filter */}
        <div className="md:col-span-2">
          <label className="sr-only">Keyword Search</label>
          <div className="relative">
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyDown={handleKeywordSearch}
              placeholder="Search for keyword/phrase anywhere on user profile. Hit Enter to apply search"
              className="w-full h-11 pr-11 pl-3 text-sm bg-whiteColor border border-borderColor rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-4.35-4.35m0 0A7.5 7.5 0 1 0 5.65 5.65a7.5 7.5 0 0 0 11 11Z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Application Date Filter */}
        <div className="space-y-2">
          <label className="sr-only">Application Date</label>
          <Select value={applicationDate} onValueChange={setApplicationDate}>
            <SelectTrigger className="w-full h-10 bg-whiteColor border border-borderColor rounded-md text-sm focus:outline-none focus:border-blue-500">
              <SelectValue placeholder="Application Date" />
            </SelectTrigger>
            <SelectContent>
              {applicationDateOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Type Filter */}
        <div className="space-y-2">
          <label className="sr-only">Filter By Types</label>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-full h-10 bg-whiteColor border border-borderColor rounded-md text-sm focus:outline-none focus:border-blue-500">
              <SelectValue placeholder="Filter By Types" />
            </SelectTrigger>
            <SelectContent>
              {typeFilters.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Location Filter */}
        <div className="space-y-2">
          <label className="sr-only">Filter By Location</label>
          <Select value={filterLocation} onValueChange={setFilterLocation}>
            <SelectTrigger className="w-full h-10 bg-whiteColor border border-borderColor rounded-md text-sm focus:outline-none focus:border-blue-500">
              <SelectValue placeholder="Filter to Locations" />
            </SelectTrigger>
            <SelectContent>
              {locationFilters.map((location) => (
                <SelectItem key={location.value} value={location.value}>
                  {location.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Status Filter */}
        <div className="space-y-2">
          <label className="sr-only">Filter by Status</label>
          <ReactSelect
            classNamePrefix="status-filter"
            placeholder="Filter by Status"
            isClearable
            value={statusOptions.find((o) => o.value === filterStatus) || null}
            onChange={(opt) => setFilterStatus(opt?.value || "")}
            options={statusOptions}
            styles={{
              control: (base) => ({
                ...base,
                minHeight: "40px",
                borderColor: "var(--borderColor, #e5e7eb)",
                boxShadow: "none",
                "&:hover": { borderColor: "#cbd5e1" },
              }),
              valueContainer: (base) => ({ ...base, padding: "0 8px" }),
              placeholder: (base) => ({ ...base, color: "#6b7280" }),
            }}
          />
        </div>

        {/* Statuses to Hide Filter */}
        <div className="space-y-2">
          <label className="sr-only">Statuses to Hide</label>
          <ReactSelect
            classNamePrefix="hide-statuses"
            placeholder="Statuses to Hide"
            isMulti
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            value={statusOptions.filter((o) =>
              hiddenStatuses.includes(o.value)
            )}
            onChange={(opts) =>
              setHiddenStatuses(opts ? opts.map((o) => o.value) : [])
            }
            options={statusOptions}
            styles={{
              control: (base) => ({
                ...base,
                minHeight: "40px",
                borderColor: "var(--borderColor, #e5e7eb)",
                boxShadow: "none",
                "&:hover": { borderColor: "#cbd5e1" },
              }),
              valueContainer: (base) => ({ ...base, padding: "0 8px", gap: 4 }),
              multiValue: (base) => ({
                ...base,
                backgroundColor: "#eef2ff",
                borderRadius: 6,
              }),
              multiValueLabel: (base) => ({ ...base, color: "#4338ca" }),
              placeholder: (base) => ({ ...base, color: "#6b7280" }),
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ClientDashboardFilter;
