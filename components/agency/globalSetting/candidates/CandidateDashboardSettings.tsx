"use client"

import { useState } from "react";
import CommonAccordion from "../CommonAccordion";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown, GripVertical, Trash2 } from "lucide-react";
import ButtonReuseable from "@/components/reusable/CustomButton";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Image from "next/image";
import ColorPickerDialog from "@/components/dashboard/ColorPickerDialog";
import SimpleColorPicker from "@/components/dashboard/SimpleColorPicker";

interface Status {
    id: string;
    color: string;
    name: string;
    textColor?: string;
    backgroundColor?: string;
}

interface StatusColor {
    name: string;
    value: string;
}

const FONTS = [
    "Start typing to filter", "Inter", "Roboto", "Open Sans", "Lato",
    "Montserrat", "Poppins", "Raleway", "Nunito", "Source Sans Pro",
];

export default function CandidateDashboardSettings() {
    const [countries, setCountries] = useState<string[]>(["United States", "Bangladesh"]);
    const [tagInput, setTagInput] = useState("");

    const handleTagKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && tagInput.trim()) {
            setCountries((prev) => [...prev, tagInput.trim()]);
            setTagInput("");
        }
    };

    const removeCountry = (c: string) => setCountries((prev) => prev.filter((x) => x !== c));

    const statusColors: StatusColor[] = [
        { name: "Blue", value: "#3B82F6" },
        { name: "Red", value: "#EF4444" },
        { name: "Teal", value: "#14B8A6" },
        { name: "Yellow", value: "#EAB308" },
        { name: "Green", value: "#10B981" },
        { name: "Purple", value: "#A855F7" },
        { name: "Orange", value: "#F97316" },
        { name: "Pink", value: "#EC4899" },
        { name: "Cyan", value: "#000000" },
        { name: "Indigo", value: "#252B37" },
        { name: "Indigo", value: "#414651" },
        { name: "Indigo", value: "#535862" },
        { name: "Indigo", value: "#717680" },
        { name: "Indigo", value: "#A4A7AE" },
        { name: "Gray", value: "#D5D7DA" },
        { name: "Lime", value: "#ffffff" },
    ];

    const [statuses, setStatuses] = useState<Status[]>([
        {
            id: "1",
            color: "#3B82F6",
            name: "Pre Application",
            textColor: "#ffffff",
            backgroundColor: "#3B82F6",
        },
        {
            id: "2",
            color: "#EF4444",
            name: "Application Started",
            textColor: "#ffffff",
            backgroundColor: "#EF4444",
        },
        {
            id: "3",
            color: "#14B8A6",
            name: "Active",
            textColor: "#ffffff",
            backgroundColor: "#14B8A6",
        },
        {
            id: "4",
            color: "#3B82F6",
            name: "Complete",
            textColor: "#ffffff",
            backgroundColor: "#3B82F6",
        },
        {
            id: "5",
            color: "#EAB308",
            name: "Inactive",
            textColor: "#000000",
            backgroundColor: "#EAB308",
        },
        {
            id: "6",
            color: "#3B82F6",
            name: "Complete",
            textColor: "#ffffff",
            backgroundColor: "#3B82F6",
        },
        {
            id: "7",
            color: "#10B981",
            name: "Lost",
            textColor: "#ffffff",
            backgroundColor: "#10B981",
        },
    ]);

    const [selectedStatusesForReason, setSelectedStatusesForReason] = useState<
        string[]
    >(["Inactive", "Rejected"]);
    const [rejectedReasons, setRejectedReasons] = useState("");
    const [inactiveReasons, setInactiveReasons] = useState("");
    const [draggedItem, setDraggedItem] = useState<string | null>(null);
    const [colorPickerOpen, setColorPickerOpen] = useState(false);
    const [selectedStatusId, setSelectedStatusId] = useState<string | null>(null);
    const [isAddingStatus, setIsAddingStatus] = useState(false);
    const [newStatusName, setNewStatusName] = useState("");
    const [newStatusColor, setNewStatusColor] = useState("#3B82F6");

    const handleDragStart = (e: React.DragEvent, id: string) => {
        setDraggedItem(id);
        e.dataTransfer.effectAllowed = "move";
    };

    const handleDragOver = (e: React.DragEvent, id: string) => {
        e.preventDefault();
        if (draggedItem === id) return;

        const draggedIndex = statuses.findIndex((s) => s.id === draggedItem);
        const targetIndex = statuses.findIndex((s) => s.id === id);

        if (draggedIndex !== -1 && targetIndex !== -1) {
            const newStatuses = [...statuses];
            const [removed] = newStatuses.splice(draggedIndex, 1);
            newStatuses.splice(targetIndex, 0, removed);
            setStatuses(newStatuses);
        }
    };

    const handleDragEnd = () => {
        setDraggedItem(null);
    };

    const handleColorChange = (id: string, color: string) => {
        setStatuses(
            statuses.map((status) =>
                status.id === id
                    ? { ...status, color, backgroundColor: color }
                    : status,
            ),
        );
    };

    const handleCustomizeColor = (
        statusId: string,
        textColor: string,
        backgroundColor: string,
    ) => {
        setStatuses(
            statuses.map((status) =>
                status.id === statusId
                    ? { ...status, textColor, backgroundColor, color: backgroundColor }
                    : status,
            ),
        );
    };

    const handleDeleteStatus = (id: string) => {
        setStatuses(statuses.filter((status) => status.id !== id));
    };

    const handleStatusNameChange = (id: string, name: string) => {
        setStatuses(statuses.map((s) => (s.id === id ? { ...s, name } : s)));
    };

    const handleAddStatus = () => {
        const newStatus: Status = {
            id: Date.now().toString(),
            color: newStatusColor,
            name: newStatusName || "New Status",
            textColor: "#ffffff",
            backgroundColor: newStatusColor,
        };
        setStatuses([...statuses, newStatus]);
        setNewStatusName("");
        setNewStatusColor("#3B82F6");
    };

    const toggleStatusForReason = (statusName: string) => {
        if (selectedStatusesForReason.includes(statusName)) {
            setSelectedStatusesForReason(
                selectedStatusesForReason.filter((s) => s !== statusName),
            );
        } else {
            setSelectedStatusesForReason([...selectedStatusesForReason, statusName]);
        }
    };

    const removeStatusForReason = (statusName: string) => {
        setSelectedStatusesForReason(
            selectedStatusesForReason.filter((s) => s !== statusName),
        );
    };

    const handleClear = () => {
        setSelectedStatusesForReason([]);
    };

    const handleSubmit = () => {
        // Handle submit logic here
        console.log({
            statuses,
            selectedStatusesForReason,
            rejectedReasons,
            inactiveReasons,
        });
    };

    const initialTextColor =
        statuses.find((s) => s.id === selectedStatusId)?.textColor || "#000000";
    const initialBackgroundColor =
        statuses.find((s) => s.id === selectedStatusId)?.backgroundColor ||
        "#3B82F6";

    const onSaveCustomColor = (textColor: string, backgroundColor: string) => {
        if (selectedStatusId) {
            handleCustomizeColor(selectedStatusId, textColor, backgroundColor);
        }
        setColorPickerOpen(false);
    };


    return (
        <CommonAccordion title="Candidate Dashboard Settings">
            <div>
                {/* Fields */}
                <p className="font-medium mb-1.5">Fields which are showed in the Client table of agency dashboard (Agency Level)</p>
                <div
                    className="flex flex-wrap gap-1.5 border border-gray-200 rounded-lg p-4 min-h-[42px] items-center cursor-text mb-4"
                    onClick={() => document.getElementById("countryInput")?.focus()}
                >
                    {countries?.map((c) => (
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
                {/* Original & Display */}
                <div className="flex gap-4">
                    {/* Original Label */}
                    <div>
                        <label className="block text-base font-medium mb-1">Original Label</label>
                        <div className="space-y-4">
                            <input
                                type="text"
                                // value={logoHeight}
                                // onChange={(e) => setLogoHeight(e.target.value)}
                                placeholder="Enter your original label"
                                className="w-full bg-white border border-gray-300 rounded-lg p-4 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
                            />
                            <input
                                type="text"
                                // value={logoHeight}
                                // onChange={(e) => setLogoHeight(e.target.value)}
                                placeholder="Enter your original label"
                                className="w-full bg-white border border-gray-300 rounded-lg p-4 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
                            />
                            <input
                                type="text"
                                // value={logoHeight}
                                // onChange={(e) => setLogoHeight(e.target.value)}
                                placeholder="Enter your original label"
                                className="w-full bg-white border border-gray-300 rounded-lg p-4 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
                            />
                            <input
                                type="text"
                                // value={logoHeight}
                                // onChange={(e) => setLogoHeight(e.target.value)}
                                placeholder="Enter your original label"
                                className="w-full bg-white border border-gray-300 rounded-lg p-4 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
                            />
                            <input
                                type="text"
                                // value={logoHeight}
                                // onChange={(e) => setLogoHeight(e.target.value)}
                                placeholder="Enter your original label"
                                className="w-full bg-white border border-gray-300 rounded-lg p-4 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
                            />
                        </div>
                    </div>
                    {/* Display Label */}
                    <div>
                        <label className="block text-base font-medium mb-1">Display Label</label>
                        <div className="space-y-4">
                            <input
                                type="text"
                                // value={logoHeight}
                                // onChange={(e) => setLogoHeight(e.target.value)}
                                placeholder="Enter your display label"
                                className="w-full bg-white border border-gray-300 rounded-lg p-4 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
                            />
                            <input
                                type="text"
                                // value={logoHeight}
                                // onChange={(e) => setLogoHeight(e.target.value)}
                                placeholder="Enter your display label"
                                className="w-full bg-white border border-gray-300 rounded-lg p-4 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
                            />
                            <input
                                type="text"
                                // value={logoHeight}
                                // onChange={(e) => setLogoHeight(e.target.value)}
                                placeholder="Enter your display label"
                                className="w-full bg-white border border-gray-300 rounded-lg p-4 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
                            />
                            <input
                                type="text"
                                // value={logoHeight}
                                // onChange={(e) => setLogoHeight(e.target.value)}
                                placeholder="Enter your display label"
                                className="w-full bg-white border border-gray-300 rounded-lg p-4 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
                            />
                            <input
                                type="text"
                                // value={logoHeight}
                                // onChange={(e) => setLogoHeight(e.target.value)}
                                placeholder="Enter your display label"
                                className="w-full bg-white border border-gray-300 rounded-lg p-4 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
                            />
                        </div>
                    </div>
                </div>
                {/* Checkbox */}
                <div className="flex gap-3 items-center mt-8 mb-6">
                    <Checkbox />
                    <p className=" text-[#384250]">Use admin level setting for fields which are showed in the client table of agency dashboard</p>
                </div>
                {/*  */}
                <div className="space-y-4">
                    {/* Quick search field */}
                    <div>
                        <label className="block text-base font-medium mb-1">Quick search field for Client table of agency dashboard for Client table of agency dashboard</label>
                        <div className="relative">
                            <select
                                // value={font}
                                // onChange={(e) => setFont(e.target.value)}
                                className="w-full appearance-none border border-gray-300 rounded-lg p-4 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-gray-300 transition pr-10"
                            >
                                {FONTS.map((f) => (
                                    <option key={f} value={f}>{f}</option>
                                ))}
                            </select>
                            <ChevronDown
                                size={16}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                            />
                        </div>
                    </div>
                    {/* Default sort field */}
                    <div>
                        <label className="block text-base font-medium mb-1">Default sort field for Client table of agency dashboard</label>
                        <div className="relative">
                            <select
                                // value={font}
                                // onChange={(e) => setFont(e.target.value)}
                                className="w-full appearance-none border border-gray-300 rounded-lg p-4 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-gray-300 transition pr-10"
                            >
                                {FONTS.map((f) => (
                                    <option key={f} value={f}>{f}</option>
                                ))}
                            </select>
                            <ChevronDown
                                size={16}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                            />
                        </div>
                    </div>
                    {/* Number of last */}
                    <div>
                        <label className="block text-base font-medium mb-1">Number of last login retrieval days for Client table of agency dashboard</label>
                        <input
                            type="text"
                            // value={logoHeight}
                            // onChange={(e) => setLogoHeight(e.target.value)}
                            placeholder="Start typing to filter"
                            className="w-full bg-white border border-gray-300 rounded-lg p-4 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
                        />
                    </div>
                </div>
                {/* color */}
                <div className="mt-8">
                    {/* Status List */}
                    <div className="space-y-4 mb-4">
                        {statuses.map((status) => (
                            <div
                                key={status.id}
                                draggable
                                onDragStart={(e) => handleDragStart(e, status.id)}
                                onDragOver={(e) => handleDragOver(e, status.id)}
                                onDragEnd={handleDragEnd}
                                className="flex items-center gap-2 md:gap-3  bg-white rounded-md cursor-move"
                            >
                                <GripVertical className="md:w-5 w-4 h-4 md:h-5 text-secondaryColor" />
                                {/* Color Dropdown */}
                                <div className=" border p-3 rounded-sm">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <button className="flex cursor-pointer items-center gap-2 focus:outline-none">
                                                <div
                                                    className="md:w-5 w-4 h-4 md:h-5 rounded-full border-2 border-gray-300"
                                                    style={{
                                                        backgroundColor:
                                                            status.backgroundColor || status.color,
                                                    }}
                                                />
                                                <Image
                                                    src="/icon/arrowdown.svg"
                                                    alt="Dropdown Icon"
                                                    width={16}
                                                    height={16}
                                                    className="w-3 h-3 md:w-4 md:h-4"
                                                />
                                            </button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-64 p-4">
                                            {colorPickerOpen && selectedStatusId ? (
                                                <ColorPickerDialog
                                                    open={colorPickerOpen}
                                                    onOpenChange={setColorPickerOpen}
                                                    onSave={onSaveCustomColor}
                                                    initialTextColor={initialTextColor}
                                                    initialBackgroundColor={initialBackgroundColor}
                                                />
                                            ) : (
                                                <SimpleColorPicker
                                                    status={status}
                                                    statusColors={statusColors}
                                                    onColorChange={handleColorChange}
                                                    onCustomizeClick={(statusId) => {
                                                        setSelectedStatusId(statusId);
                                                        setColorPickerOpen(true);
                                                    }}
                                                    onResetClick={() => {
                                                        handleColorChange(status.id, "#3B82F6");
                                                    }}
                                                />
                                            )}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>

                                {/* Status Name (editable, submitted via main Submit) */}
                                <div className=" flex-1 ">
                                    <input
                                        type="text"
                                        value={status.name}
                                        onChange={(e) =>
                                            handleStatusNameChange(status.id, e.target.value)
                                        }
                                        className="w-full px-3 py-[11px] bg-white border rounded-md text-sm md:text-base font-medium focus:outline-none focus:ring-2 focus:ring-blackColor"
                                    />
                                </div>

                                {/* Delete Button */}
                                <button
                                    onClick={() => handleDeleteStatus(status.id)}
                                    className="text-redColor cursor-pointer hover:text-red-700"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Add Another Item */}

                    <ButtonReuseable
                        title="Add Another Status"
                        onClick={handleAddStatus}
                        className=" text-sm! px-3! py-2! border bg-white!  border-gray-300 rounded-md! text-headerColor! font-medium hover:bg-gray-100 transition shadow-none! mb-6"
                    />
                </div>
            </div>
        </CommonAccordion>
    )
}
