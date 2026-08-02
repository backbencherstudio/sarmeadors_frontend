"use client";

import { useState, useEffect } from "react";
import { Trash2, ChevronDown, Plus } from "lucide-react";
import CommonAccordion from "../CommonAccordion";
import { toast } from "react-toastify";
import ButtonReuseable from "@/components/reusable/CustomButton";
import {
  useGetLocationsQuery,
  usePostLocationStoreMutation,
  useDeleteLocationMutation,
  useGetSubLocationsQuery,
  usePostSubLocationStoreMutation,
  useDeleteSubLocationMutation,
} from "@/feature/slice/settings/agencyDetails/AgencyDetailsSettingsSlice";

const LANGUAGES = ["English", "Spanish", "French", "German", "Portuguese"];

export default function LanguageAndLocations() {
  const { data: locationsData } = useGetLocationsQuery("");
  const [postLocationStore, { isLoading: isSaving }] =
    usePostLocationStoreMutation();
  const [deleteLocation, { isLoading: isDeleting }] =
    useDeleteLocationMutation();
  const { data: subLocationsData } = useGetSubLocationsQuery("");
  const [postSubLocationStore, { isLoading: isSubSaving }] =
    usePostSubLocationStoreMutation();
  const [deleteSubLocation, { isLoading: isSubDeleting }] =
    useDeleteSubLocationMutation();
  const [language, setLanguage] = useState("English");
  const [locations, setLocations] = useState<string[]>([]);
  const [selectedSubLocation, setSelectedSubLocation] = useState<Record<string, number | null>>({});

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

  const subLocationsByParent = (subLocationsData?.data || []).reduce(
    (acc: Record<string, { id: number; name: string }[]>, sub: any) => {
      const parent = sub.location?.location || "";
      if (!acc[parent]) acc[parent] = [];
      acc[parent].push({ id: sub.id, name: sub.sub_location });
      return acc;
    },
    {},
  );

  const locationNameToId = (locationsData?.data || []).reduce(
    (acc: Record<string, number>, loc: any) => {
      if (loc?.location && loc?.id) acc[loc.location] = loc.id;
      return acc;
    },
    {},
  );

  const [newSubLocation, setNewSubLocation] = useState<Record<string, string>>(
    {},
  );

  const handleAddSubLocation = async (parentLocation: string) => {
    const subName = newSubLocation[parentLocation]?.trim();
    if (!subName) {
      toast.error("Please enter a sub-location name.");
      return;
    }

    const locationId = locationNameToId[parentLocation];
    if (!locationId) {
      toast.error("Parent location not found.");
      return;
    }

    try {
      await postSubLocationStore({
        location_id: locationId,
        sub_location: subName,
      }).unwrap();
      setNewSubLocation((prev) => ({ ...prev, [parentLocation]: "" }));
      toast.success("Sub-location added successfully!");
    } catch (error: any) {
      toast.error(
        error?.data?.message ||
          "Error adding sub-location. Please try again.",
      );
    }
  };

  const handleDeleteSubLocation = async (parentLocation: string) => {
    const subId = selectedSubLocation[parentLocation];
    if (!subId) {
      toast.error("Please select a sub-location to delete.");
      return;
    }

    try {
      await deleteSubLocation(subId).unwrap();
      setSelectedSubLocation((prev) => ({ ...prev, [parentLocation]: null }));
      toast.success("Sub-location deleted successfully!");
    } catch (error: any) {
      toast.error(
        error?.data?.message ||
          "Error deleting sub-location. Please try again.",
      );
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
            <div key={i} className="flex items-center gap-2 sm:gap-3">
              <input
                type="text"
                value={loc}
                onChange={(e) => updateLocation(i, e.target.value)}
                className="flex-1 bg-white border border-gray-300 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 transition min-w-0"
              />
              <button
                onClick={() => removeLocation(i)}
                disabled={isDeleting}
                className="text-red-400 hover:text-red-600 transition p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg cursor-pointer disabled:opacity-50 shrink-0"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={addLocation}
          className="mt-3 flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition cursor-pointer w-full sm:w-auto"
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
            className="bg-[#111927] text-white cursor-pointer md:px-8 md:py-4.25 px-4 py-2 rounded-[12px] w-full sm:w-auto"
          />
        </div>
      </div>

      {/* Sub-locations */}
      <div>
        <label className="block text-base font-medium mb-3">
          If the location list contains sub-locations, please specify
          sub-locations belong to each location
        </label>

        <div className="flex flex-col gap-4">
          {locations.filter(Boolean).map((loc) => {
            const subs = subLocationsByParent[loc] || [];
            const selectedId = selectedSubLocation[loc] || null;
            return (
              <div
                key={loc}
                className="border border-gray-200 rounded-lg p-3 sm:p-4 bg-white"
              >
                <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3">
                  <p className="text-sm font-semibold text-gray-800 truncate">
                    {loc}
                  </p>
                  {selectedId && (
                    <button
                      onClick={() => handleDeleteSubLocation(loc)}
                      disabled={isSubDeleting}
                      className="text-red-400 hover:text-red-600 transition p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg cursor-pointer disabled:opacity-50 shrink-0"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                  {subs.length > 0 ? (
                    subs.map((sub) => (
                      <button
                        key={sub.id}
                        type="button"
                        onClick={() =>
                          setSelectedSubLocation((prev) => ({
                            ...prev,
                            [loc]: sub.id,
                          }))
                        }
                        className={`inline-flex items-center px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium transition cursor-pointer ${
                          selectedId === sub.id
                            ? "bg-red-50 text-red-700 ring-2 ring-red-500"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {sub.name}
                      </button>
                    ))
                  ) : (
                    <span className="text-xs text-gray-400">
                      No sub-locations
                    </span>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <input
                    type="text"
                    value={newSubLocation[loc] || ""}
                    onChange={(e) =>
                      setNewSubLocation((prev) => ({
                        ...prev,
                        [loc]: e.target.value,
                      }))
                    }
                    placeholder="Add sub-location"
                    className="flex-1 bg-white border border-gray-300 rounded-lg px-3 sm:px-4 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 transition min-w-0"
                  />
                  <button
                    onClick={() => handleAddSubLocation(loc)}
                    disabled={isSubSaving}
                    className="flex items-center justify-center gap-1 px-4 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition cursor-pointer disabled:opacity-50 w-full sm:w-auto"
                  >
                    <Plus size={16} />
                    Add
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </CommonAccordion>
  );
}
