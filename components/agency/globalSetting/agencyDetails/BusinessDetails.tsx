"use client";

import { useState } from "react";
import { Trash2, Plus, Copy } from "lucide-react";
import CommonAccordion from "../CommonAccordion";

const COMMON_HOLIDAYS = [
    "New Years Day", "Maftin Luther King JL Day", "Presidents' Day",
    "Memorial Day", "Juneteenth National Independence Day", "Labor Day",
    "Columbus Day", "Veterans Day", "Thanksgiving Day",
    "Independence Day", "Christmas Day"
];

const ACTIVE_HOLIDAYS = ["New Years Day", "Maftin Luther King JL Day"];
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const TIMES = ["12:00AM", "1:00AM", "2:00AM", "3:00AM", "4:00AM", "5:00AM", "6:00AM",
    "7:00AM", "8:00AM", "9:00AM", "10:00AM", "11:00AM", "12:00PM", "1:00PM", "2:00PM",
    "3:00PM", "4:00PM", "5:00PM", "6:00PM", "7:00PM", "8:00PM", "9:00PM", "10:00PM", "11:00PM"];

type HolidayRow = { name: string; date: string; location: string };
type HourRow = { enabled: boolean; start: string; end: string };

export default function BusinessDetails() {
    const [activeHolidays, setActiveHolidays] = useState<string[]>(ACTIVE_HOLIDAYS);
    const [holidayRows, setHolidayRows] = useState<HolidayRow[]>([
        { name: "", date: "", location: "" },
        { name: "Presidents' Day", date: "", location: "" },
        { name: "Maftin Luther King JL Day", date: "", location: "" },
    ]);
    const [currency, setCurrency] = useState("USD");
    const [countries, setCountries] = useState<string[]>(["United States", "Bangladesh"]);
    const [tagInput, setTagInput] = useState("");
    const [hours, setHours] = useState<HourRow[]>(
        DAYS.map((_, i) => ({ enabled: i < 5, start: "12:00PM", end: "12:00PM" }))
    );

    const toggleHoliday = (h: string) => {
        setActiveHolidays((prev) =>
            prev.includes(h) ? prev.filter((x) => x !== h) : [...prev, h]
        );
    };

    const addHolidayRow = () =>
        setHolidayRows((prev) => [...prev, { name: "", date: "", location: "" }]);

    const updateHolidayRow = (i: number, field: keyof HolidayRow, val: string) =>
        setHolidayRows((prev) => prev.map((r, idx) => (idx === i ? { ...r, [field]: val } : r)));

    const removeHolidayRow = (i: number) =>
        setHolidayRows((prev) => prev.filter((_, idx) => idx !== i));

    const removeCountry = (c: string) => setCountries((prev) => prev.filter((x) => x !== c));

    const handleTagKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && tagInput.trim()) {
            setCountries((prev) => [...prev, tagInput.trim()]);
            setTagInput("");
        }
    };

    const updateHour = (i: number, field: keyof HourRow, val: string | boolean) =>
        setHours((prev) => prev.map((h, idx) => (idx === i ? { ...h, [field]: val } : h)));

    const commonHolidayDate = (name: string) =>
        activeHolidays.includes(name) ? "Common holidays" : "";

    return (
        <CommonAccordion title="Business Details">
            <div className="w-full">
                {/* Holidays */}
                <p className="text-lg font-semibold mb-1">List of Holidays</p>
                <p className="text-base font-medium text-[#2E3135] mb-3">
                    If locations are not specified, it will be applied for all locations
                </p>

                {/* Chips */}
                <div className="flex flex-wrap gap-1.5 mb-2 bg-white border border-[#E5E7EB] rounded-[12px] px-6 py-8">
                    {COMMON_HOLIDAYS.map((h) => {
                        const active = activeHolidays.includes(h);
                        return (
                            <button
                                key={h}
                                onClick={() => toggleHoliday(h)}
                                className={`flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition cursor-pointer ${active
                                    ? "bg-[#111927] text-white"
                                    : "text-[#0065FF] hover:bg-gray-50"
                                    }`}
                            >
                                {h}
                                {!active && <span className="text-base leading-none">+</span>}
                            </button>
                        );
                    })}
                </div>
                <p className="text-base font-medium text-[#778593] mb-3">
                    Click to add common holidays. Common holidays will not have editable dates.
                </p>

                {/* Table */}
                <div className="grid grid-cols-[1fr_1fr_1fr_28px] gap-2 mb-1.5">
                    {["Holiday Name", "Date", "Location", ""].map((h, i) => (
                        <span key={i} className="text-base font-medium ">{h}</span>
                    ))}
                </div>

                <div className="flex flex-col gap-1.5">
                    {holidayRows.map((row, i) => {
                        const isCommon = activeHolidays.includes(row.name);
                        return (
                            <div key={i} className="grid grid-cols-[1fr_1fr_1fr_28px] gap-2 items-center">
                                <input
                                    value={row.name}
                                    onChange={(e) => updateHolidayRow(i, "name", e.target.value)}
                                    placeholder="Holiday Name"
                                    className="border border-gray-200 rounded-lg p-4 text-sm bg-white text-gray-700 placeholder-gray-300 outline-none focus:border-gray-400 w-full"
                                />
                                <input
                                    value={isCommon ? "" : row.date}
                                    onChange={(e) => updateHolidayRow(i, "date", e.target.value)}
                                    placeholder={isCommon ? "Common holidays" : "Date"}
                                    disabled={isCommon}
                                    className="border border-gray-200 rounded-lg p-4 text-sm bg-white text-gray-300 placeholder-gray-300 outline-none focus:border-gray-400 w-full disabled:cursor-not-allowed"
                                />
                                <div className="relative">
                                    <select
                                        value={row.location}
                                        onChange={(e) => updateHolidayRow(i, "location", e.target.value)}
                                        className="w-full appearance-none border border-gray-200 rounded-lg p-4 text-xs text-gray-500 outline-none focus:border-gray-400 pr-6 bg-white"
                                    >
                                        <option value="">Select Locations</option>
                                        <option>Chicago</option>
                                        <option>DC Metro Area</option>
                                        <option>New York</option>
                                    </select>
                                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none">▾</span>
                                </div>
                                <button onClick={() => removeHolidayRow(i)} className="text-red-300 hover:text-red-500 transition p-1">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        );
                    })}
                </div>

                <button
                    onClick={addHolidayRow}
                    className="mt-3 flex items-center gap-1.5 border border-gray-200 bg-[#111927] rounded-lg px-4 py-3 text-sm font-medium text-white transition cursor-pointer"
                >
                    <Plus size={14} /> Add Custom Holiday
                </button>

                <hr className="my-4 border-gray-100" />

                {/* Currency */}
                <p className="font-medium mb-1.5">Currency</p>
                <div className="relative mb-4">
                    <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="w-full appearance-none border border-gray-200 rounded-lg p-4 text-sm text-gray-700 outline-none focus:border-gray-400 bg-white pr-8"
                    >
                        <option>USD</option><option>EUR</option><option>GBP</option>
                    </select>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none">▾</span>
                </div>

                {/* Countries */}
                <p className="font-medium mb-1.5">Countries</p>
                <div
                    className="flex flex-wrap gap-1.5 border border-gray-200 rounded-lg p-4 min-h-[42px] items-center cursor-text mb-4"
                    onClick={() => document.getElementById("countryInput")?.focus()}
                >
                    {countries.map((c) => (
                        <span key={c} className="flex items-center gap-1 bg-[#111927] text-white rounded-[8px] px-2 py-0.5 text-xs">
                            {c}
                            <span onClick={() => removeCountry(c)} className="cursor-pointer text-green-400 hover:text-green-700 text-sm leading-none">×</span>
                        </span>
                    ))}
                    <input
                        id="countryInput"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleTagKey}
                        className="border-none outline-none text-xs flex-1 min-w-[60px] bg-transparent"
                    />
                </div>

                <hr className="my-4 border-gray-100" />

                {/* Business Hours */}
                <p className="font-semibold mb-2">Business Hours</p>
                <div>
                    {DAYS.map((day, i) => (
                        <div key={day} className="flex items-center gap-2.5 py-2 border-b border-gray-50 last:border-none">
                            {/* Toggle */}
                            <label className="relative w-8 h-4.5 flex-shrink-0 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={hours[i].enabled}
                                    onChange={(e) => updateHour(i, "enabled", e.target.checked)}
                                />
                                <div className="w-8 h-[18px] bg-gray-200 peer-checked:bg-gray-900 rounded-full transition-colors" />
                                <div className="absolute top-[2px] left-[2px] w-[14px] h-[14px] bg-white rounded-full transition-transform peer-checked:translate-x-[14px]" />
                            </label>

                            <span className="text-xs text-gray-700 flex-1">{day}</span>

                            {hours[i].enabled ? (
                                <>
                                    <select
                                        value={hours[i].start}
                                        onChange={(e) => updateHour(i, "start", e.target.value)}
                                        className="border border-gray-200 rounded-md px-1.5 py-1 text-xs text-gray-700 outline-none bg-white"
                                    >
                                        {TIMES.map((t) => <option key={t}>{t}</option>)}
                                    </select>
                                    <span className="text-gray-300 text-xs">—</span>
                                    <select
                                        value={hours[i].end}
                                        onChange={(e) => updateHour(i, "end", e.target.value)}
                                        className="border border-gray-200 rounded-md px-1.5 py-1 text-xs text-gray-700 outline-none bg-white"
                                    >
                                        {TIMES.map((t) => <option key={t}>{t}</option>)}
                                    </select>
                                    <button className="text-gray-300 hover:text-gray-500 transition p-0.5">
                                        <Copy size={13} />
                                    </button>
                                </>
                            ) : (
                                <span className="text-sm text-[#9DA4AE] ml-auto">Unavailable</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </CommonAccordion>
    );
}