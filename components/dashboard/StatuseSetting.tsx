"use client";

import { Button } from "@/components/ui/button";
import {
  DrawerClose,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDraggableList } from "@/hooks/useDraggableList";
import { ChevronDown, GripVertical, Trash2, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import RootDrawer from "../common/RootDrawer";
import ButtonReuseable from "../reusable/CustomButton";
import ColorPickerDialog from "./ColorPickerDialog";
import SimpleColorPicker from "./SimpleColorPicker";
import { useCreateAgencyStatusMutation } from "@/feature/slice/agency/agencyDashboardSlice";

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

function StatuseSetting({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
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
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [selectedStatusId, setSelectedStatusId] = useState<string | null>(null);
  const [newStatusName, setNewStatusName] = useState("");
  const [newStatusColor, setNewStatusColor] = useState("#3B82F6");

  const {
    items,
    setItems: setBlocks,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  } = useDraggableList(statuses);
 const [createAgencyStatus] = useCreateAgencyStatusMutation();

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
    <RootDrawer open={open} setOpen={setOpen}>
      <div className="mx-auto w-full max-w-2xl overflow-y-auto">
        <DrawerHeader>
          <DrawerTitle className="text-xl font-semibold">
            Client Statuses
          </DrawerTitle>
          <p className="text-sm text-gray-500">
            Drag and drop statuses to re-order.
          </p>
        </DrawerHeader>

        <div className="md:px-4 px-2 pb-4">
          {/* Status List */}
          <div className="space-y-4 mb-4">
            {items.map((status) => (
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

          {/* Select Statuses Section */}
          <div className="mb-4">
            <p className="text-sm font-medium mb-2">
              Select statuses which need a reason when client status was changed
              to
            </p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-full flex items-center justify-between p-2 border rounded-md bg-white hover:bg-gray-50">
                  <div className="flex flex-wrap gap-2">
                    {selectedStatusesForReason.map((statusName) => (
                      <span
                        key={statusName}
                        className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-gray-800 text-white rounded"
                      >
                        {statusName}
                        <X
                          className="w-3 h-3 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeStatusForReason(statusName);
                          }}
                        />
                      </span>
                    ))}
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                {statuses.map((status) => (
                  <DropdownMenuItem
                    key={status.id}
                    onClick={() => toggleStatusForReason(status.name)}
                  >
                    <input
                      type="checkbox"
                      checked={selectedStatusesForReason.includes(status.name)}
                      onChange={() => {}}
                      className="mr-2"
                    />
                    {status.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <button
              onClick={handleClear}
              className="text-sm text-gray-600 hover:text-gray-800 mt-2"
            >
              Clear
            </button>
          </div>

          {/* Reason Text Areas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:mb-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                List of reasons to change to Rejected{" "}
                <span className="text-red-500">*</span>
              </label>
              <textarea
                value={rejectedReasons}
                onChange={(e) => setRejectedReasons(e.target.value)}
                placeholder="Each line for one reason"
                className="w-full h-24 p-2 border rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">
                List of reasons to change to Inactive{" "}
                <span className="text-red-500">*</span>
              </label>
              <textarea
                value={inactiveReasons}
                onChange={(e) => setInactiveReasons(e.target.value)}
                placeholder="Each line for one reason"
                className="w-full h-24 p-2 border rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <DrawerFooter className="flex flex-row justify-end gap-2 p-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
          <Button
            onClick={handleSubmit}
            className="bg-gray-900 text-white hover:bg-gray-800"
          >
            Submit
          </Button>
        </DrawerFooter>
      </div>
    </RootDrawer>
  );
}

export default StatuseSetting;
