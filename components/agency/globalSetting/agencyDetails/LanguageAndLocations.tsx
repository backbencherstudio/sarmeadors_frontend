"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Trash2, Plus } from "lucide-react";
import CommonAccordion from "../CommonAccordion";
import { toast } from "react-toastify";
import ButtonReuseable from "@/components/reusable/CustomButton";
import {
  useGetLocationsQuery,
  usePostLocationStoreMutation,
  useDeleteLocationMutation,
} from "@/feature/slice/settings/agencyDetails/AgencyDetailsSettingsSlice";

const LANGUAGES = ["English", "Spanish", "French", "German", "Portuguese"];

export default function LanguageAndLocations() {
  const { data: locationsData } = useGetLocationsQuery("");
  const [postLocationStore, { isLoading: isSaving }] =
    usePostLocationStoreMutation();
  const [deleteLocation, { isLoading: isDeleting }] =
    useDeleteLocationMutation();
  const [language, setLanguage] = useState("English");
  const [locations, setLocations] = useState<string[]>([]);
  const [subRows, setSubRows] = useState([{ location: "", subLocation: "" }]);

  useEffect(() => {
    if (locationsData?.data) {
      setLocations(
        locationsData.data
          .filter((loc: { status: number }) => loc.status === 1)
          .map((loc: { location: string }) => loc.location),
      );
    }
  }, [locationsData]);

  const addLocation = () => setLocations((prev) => [...prev, ""]);

  const updateLocation = (index: number, value: string) =>
    setLocations((prev) => prev.map((l, i) => (i === index ? value : l)));

  const removeLocation = async (index: number) => {
    const locationName = locations[index];
    const locationObj = (locationsData?.data || []).find(
      (loc: { location: string }) => loc.location === locationName,
    );

    if (!locationObj?.id) {
      toast.error("Location not found.");
      return;
    }

    try {
      await deleteLocation(locationObj.id).unwrap();
      setLocations((prev) => prev.filter((_, i) => i !== index));
      toast.success("Location deleted successfully!");
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Error deleting location. Please try again.",
      );
    }
  };

  const addSubRow = () =>
    setSubRows((prev) => [...prev, { location: "", subLocation: "" }]);

  const updateSubRow = (
    index: number,
    field: "location" | "subLocation",
    value: string,
  ) =>
    setSubRows((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [field]: value } : row)),
    );

  const removeSubRow = (index: number) =>
    setSubRows((prev) => prev.filter((_, i) => i !== index));

  const handleSubmit = async () => {
    const existingLocations = new Set(
      (locationsData?.data || [])
        .filter((loc: { status: number }) => loc.status === 1)
        .map((loc: { location: string }) => loc.location),
    );
    const newLocations = locations.filter(
      (loc) => loc && !existingLocations.has(loc),
    );

    if (newLocations.length === 0) {
      toast.error("No new locations to save.");
      return;
    }

    try {
      await postLocationStore({
        locations: newLocations,
      }).unwrap();
      toast.success("Locations saved successfully!");
    } catch (error: any) {
      const message =
        error?.data?.message || "Error saving locations. Please try again.";
      if (error?.data?.duplicates?.length) {
        toast.error(
          `${message} Duplicates: ${error.data.duplicates.join(", ")}`,
        );
      } else {
        toast.error(message);
      }
    }
  };

  return (
    <CommonAccordion title="Language & Locations">
      {/* Dashboard Language */}
      <div>
        <label className="block text-base font-medium mb-2">
          What dashboard language do you want to use?
        </label>
        <div className="relative">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 transition pr-10"
          >
            {LANGUAGES.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
          />
        </div>
      </div>

      {/* Multiple Locations */}
      <div>
        <label className="block text-base font-medium mb-3">
          Does your agency operate in multiple locations? If yes, please list
          them.
        </label>
        <div className="flex flex-col gap-2">
          {locations.map((loc, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="text"
                value={loc}
                onChange={(e) => updateLocation(i, e.target.value)}
                className="flex-1 bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
              />
              <button
                onClick={() => removeLocation(i)}
                disabled={isDeleting}
                className="text-red-400 hover:text-red-600 transition p-1 cursor-pointer disabled:opacity-50"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={addLocation}
          className="mt-3 flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition cursor-pointer"
        >
          <Plus size={16} />
          Add Another Item
        </button>

        <div className="flex justify-end mt-4">
          <ButtonReuseable
            title="Save Changes"
            sendingMsg="Saving"
            onClick={handleSubmit}
            loading={isSaving}
            className="bg-[#111927] text-white cursor-pointer md:px-8 md:py-4.25 px-4 py-2 rounded-[12px]"
          />
        </div>
      </div>

      {/* Sub-locations */}
      <div>
        <label className="block text-base font-medium mb-3">
          If the location list contains sub-locations, please specify
          sub-locations belong to each location
        </label>

        <div className="flex flex-col gap-3">
          {subRows.map((row, i) => (
            <div key={i} className="flex items-center gap-3">
              {/* Location dropdown */}
              <div className="flex-1 relative">
                {i === 0 && (
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Location
                  </p>
                )}
                <div className="relative">
                  <select
                    value={row.location}
                    onChange={(e) =>
                      updateSubRow(i, "location", e.target.value)
                    }
                    className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 transition pr-10"
                  >
                    <option value="">Select location</option>
                    {locations.filter(Boolean).map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                  />
                </div>
              </div>

              {/* Sub-location dropdown */}
              <div className="flex-1 relative">
                {i === 0 && (
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Sub-locations
                  </p>
                )}
                <div className="relative">
                  <select
                    value={row.subLocation}
                    onChange={(e) =>
                      updateSubRow(i, "subLocation", e.target.value)
                    }
                    className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 transition pr-10"
                  >
                    <option value="">Stan typing to filter</option>
                    {locations.filter(Boolean).map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                  />
                </div>
              </div>

              {/* Delete */}
              <div className={i === 0 ? "mt-6" : ""}>
                <button
                  onClick={() => removeSubRow(i)}
                  className="text-red-400 hover:text-red-600 transition p-1 cursor-pointer"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={addSubRow}
          className="mt-3 flex items-center justify-center w-9 h-9 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition cursor-pointer"
        >
          <Plus size={18} />
        </button>
      </div>
    </CommonAccordion>
  );
}
