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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, type KeyboardEvent } from "react";
import { FiX } from "react-icons/fi";
import ReactSelect from "react-select";

function ClientDashboardFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const [applicationDate, setApplicationDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [hiddenStatuses, setHiddenStatuses] = useState<string[]>([]);
  console.log(pathName, "pathName===");

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

    // Add status params (multiple query params with same key)
    if (filterStatus) {
      filterStatus.split(",").forEach((status) => {
        params.append("status", status);
      });
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

    // Add hideStatuses params (multiple query params with same key)
    if (hiddenStatuses.length > 0) {
      hiddenStatuses.forEach((status) => {
        params.append("hideStatuses", status);
      });
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

    // Load multiple status params and join with comma
    const statusValues = searchParams.getAll("status");
    setFilterStatus(statusValues.join(","));

    setFilterType(searchParams.get("type") || "");
    setFilterLocation(searchParams.get("location") || "");
    setSearchKeyword(searchParams.get("keyword") || "");

    // Load multiple hideStatuses params
    const hideStatusesValues = searchParams.getAll("hideStatuses");
    setHiddenStatuses(hideStatusesValues);
  }, []);

  const clearFilters = () => {
    setApplicationDate("");
    setFilterStatus("");
    setFilterType("");
    setFilterLocation("");
    setSearchKeyword("");
    setHiddenStatuses([]);

    const emptyParams = new URLSearchParams();
    emptyParams.delete("date");
    emptyParams.delete("status");
    emptyParams.delete("type");
    emptyParams.delete("location");
    emptyParams.delete("keyword");
    emptyParams.delete("hideStatuses");
    router.push(pathName, { scroll: false });
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
    <section className="pb-4">
      <div className="bg-white border border-borderColor rounded-md p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-blackColor">Filters</h3>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 cursor-pointer text-sm text-red-600 hover:text-red-700 transition-colors"
            >
              <FiX size={16} />
              Clear All
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Keyword Search Filter */}
          {/* <div className="col-span-2 md:col-span-2">
            <label className="sr-only">Keyword Search</label>
            <div className="relative">
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                onKeyDown={handleKeywordSearch}
                placeholder="Search for keyword/phrase anywhere on user profile. Hit Enter to apply search"
                className="w-full h-12.5! pr-11 pl-3 text-sm bg-bgColor border border-borderColor rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    d="M14.197 13.1363C13.9041 12.8434 13.4292 12.8434 13.1363 13.1363C12.8434 13.4292 12.8434 13.9041 13.1363 14.197L13.6667 13.6667L14.197 13.1363ZM13.6667 13.6667L13.1363 14.197L16.8863 17.947L17.4167 17.4167L17.947 16.8863L14.197 13.1363L13.6667 13.6667ZM15.75 8.25H16.5C16.5 3.69365 12.8063 0 8.25 0V0.75V1.5C11.9779 1.5 15 4.52208 15 8.25H15.75ZM8.25 0.75V0C3.69365 0 0 3.69365 0 8.25H0.75H1.5C1.5 4.52208 4.52208 1.5 8.25 1.5V0.75ZM0.75 8.25H0C0 12.8063 3.69365 16.5 8.25 16.5V15.75V15C4.52208 15 1.5 11.9779 1.5 8.25H0.75ZM8.25 15.75V16.5C12.8063 16.5 16.5 12.8063 16.5 8.25H15.75H15C15 11.9779 11.9779 15 8.25 15V15.75Z"
                    fill="#111927"
                  />
                </svg>
              </div>
            </div>
          </div> */}
          <div className="grid col-span-2 md:col-span-2 grid-cols-1 md:grid-cols-3 gap-4">
            {/* Application Date Filter */}
            <div className="space-y-2">
              <label className="sr-only">Application Date</label>
              <Select
                value={applicationDate}
                onValueChange={setApplicationDate}
              >
                <SelectTrigger className="w-full h-12.5! bg-bgColor cursor-pointer  border border-borderColor rounded-md text-sm focus:outline-none focus:border-blue-500">
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
                <SelectTrigger className="w-full h-12.5! bg-bgColor border cursor-pointer border-borderColor rounded-md text-sm focus:outline-none focus:border-blue-500">
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
                <SelectTrigger className="w-full h-12.5! bg-bgColor border cursor-pointer border-borderColor rounded-md text-sm focus:outline-none focus:border-blue-500">
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
          </div>
          {/* Status Filter */}
          <div className="col-span-2 md:col-span-1 space-y-2">
            <label className="sr-only">Filter by Status</label>
            <ReactSelect
              classNamePrefix="filter-status"
              placeholder="Filter by Status"
              isMulti
              isClearable
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              value={statusOptions.filter((o) =>
                filterStatus.includes(o.value),
              )}
              onChange={(opts) =>
                setFilterStatus(opts ? opts.map((o) => o.value).join(",") : "")
              }
              options={statusOptions}
              styles={{
                control: (base) => ({
                  ...base,
                  minHeight: "50px",
                  borderColor: "var(--borderColor, #E5E7EB)",
                  boxShadow: "none",
                  cursor: "pointer",
                  backgroundColor: "var(--bgColor, #E5E7EB)",
                  "&:hover": { borderColor: "#E5E7EB" },
                }),
              }}
            />
          </div>

          {/* Statuses to Hide Filter */}
          <div className="col-span-2 md:col-span-1 space-y-2">
            <label className="sr-only">Statuses to Hide</label>
            <ReactSelect
              classNamePrefix="hide-statuses"
              placeholder="Statuses to Hide"
              isMulti
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              value={statusOptions.filter((o) =>
                hiddenStatuses.includes(o.value),
              )}
              onChange={(opts) =>
                setHiddenStatuses(opts ? opts.map((o) => o.value) : [])
              }
              options={statusOptions}
              styles={{
                control: (base) => ({
                  ...base,
                  minHeight: "50px",
                  borderColor: "var(--borderColor, #E5E7EB)",
                  boxShadow: "none",
                  backgroundColor: "var(--bgColor, #E5E7EB)",
                  "&:hover": { borderColor: "#E5E7EB" },
                  cursor: "pointer",
                }),
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ClientDashboardFilter;
