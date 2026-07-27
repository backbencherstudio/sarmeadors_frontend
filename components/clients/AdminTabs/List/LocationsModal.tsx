"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Save, X } from "lucide-react";
import { toast } from "react-toastify";
import ButtonReuseable from "@/components/reusable/CustomButton";
import {
  usePostLocationStoreMutation,
  useDeleteLocationMutation,
  useUpdateLocationStatusMutation,
  useUpdateLocationBulkMutation,
} from "@/feature/slice/settings/candidates/CandidateSettingsSlice";

interface LocationItem {
  id: string;
  label: string;
  checked: boolean;
}

interface LocationsModalProps {
  locationItems?: LocationItem[];
}

export function LocationsModal({ locationItems = [] }: LocationsModalProps) {
  const [postLocationStore, { isLoading: isSaving }] =
    usePostLocationStoreMutation();
  const [deleteLocation, { isLoading: isDeleting }] =
    useDeleteLocationMutation();
  const [updateLocationStatus] = useUpdateLocationStatusMutation();
  const [updateLocationBulk, { isLoading: isBulkSaving }] =
    useUpdateLocationBulkMutation();

  const [open, setOpen] = useState(false);

  const [locations, setLocations] = useState<
    { id: string; value: string }[]
  >([{ id: "1", value: "" }]);

  const [existingLocations, setExistingLocations] = useState<LocationItem[]>(
    locationItems,
  );

  useEffect(() => {
    setExistingLocations(locationItems);
  }, [locationItems]);

  const handleAddItem = () => {
    const newId = Date.now().toString();
    setLocations([...locations, { id: newId, value: "" }]);
  };

  const handleDeleteItem = (id: string) => {
    setLocations(locations.filter((item) => item.id !== id));
  };

  const handleInputChange = (id: string, value: string) => {
    setLocations(
      locations.map((item) =>
        item.id === id ? { ...item, value } : item,
      ),
    );
  };

  const handleDeleteLocation = async (id: string) => {
    try {
      await deleteLocation(Number(id)).unwrap();
      toast.success("Location deleted successfully!");
      setExistingLocations(
        existingLocations.filter((loc) => loc.id !== id),
      );
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Error deleting location. Please try again.",
      );
    }
  };

  const handleStatusChange = async (id: string) => {
    const loc = existingLocations.find((l) => l.id === id);
    if (!loc) return;
    const newStatus = loc.checked ? 0 : 1;
    try {
      await updateLocationStatus({
        id: Number(id),
        status: newStatus,
      }).unwrap();
      setExistingLocations(
        existingLocations.map((l) =>
          l.id === id ? { ...l, checked: newStatus === 1 } : l,
        ),
      );
      toast.success("Location status updated!");
    } catch (error: any) {
      toast.error(
        error?.data?.message ||
          "Error updating location status. Please try again.",
      );
    }
  };

  const handleBulkUpdate = async () => {
    const updates = existingLocations.map((loc) => ({
      id: Number(loc.id),
      name: loc.label,
      status: loc.checked ? 1 : 0,
    }));

    try {
      await updateLocationBulk(updates).unwrap();
      toast.success("Locations updated successfully!");
      setOpen(false);
    } catch (error: any) {
      toast.error(
        error?.data?.message ||
          "Error updating locations. Please try again.",
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const names = locations.map((item) => item.value).filter(Boolean);

    if (names.length === 0) {
      toast.error("Please enter at least one location name.");
      return;
    }

    try {
      await postLocationStore({
        names,
        status: 1,
      }).unwrap();
      toast.success("Locations created successfully!");
      setLocations([{ id: Date.now().toString(), value: "" }]);
      setOpen(false);
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Error creating locations. Please try again.",
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 bg-gray-800 hover:bg-gray-900 border-0 cursor-pointer"
        >
          <Plus className="w-4 h-4 text-white" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[850px]! max-h-[80vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-start">
              Add Locations
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-600 pt-2 text-start">
              Add locations for candidates.
            </DialogDescription>
          </DialogHeader>

          {existingLocations.length > 0 && (
            <div className="space-y-2 py-2">
              <p className="text-sm font-medium text-gray-700">
                Existing Locations
              </p>
              {existingLocations.map((loc) => (
                <div
                  key={loc.id}
                  className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2"
                >
                  <span className="flex-1 text-sm text-gray-700">
                    {loc.label}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleStatusChange(loc.id)}
                    className={`h-8 w-16 p-0 border-0 cursor-pointer text-xs font-semibold ${
                      loc.checked
                        ? "bg-green-100 text-green-600 hover:bg-green-200"
                        : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                    }`}
                  >
                    {loc.checked ? "ON" : "OFF"}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteLocation(loc.id)}
                    disabled={isDeleting}
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          <div className="grid gap-4 py-4">
            <div className="space-y-3">
              {locations.map((item, index) => (
                <div key={item.id} className="flex items-center gap-2">
                  <Input
                    value={item.value}
                    onChange={(e) => handleInputChange(item.id, e.target.value)}
                    placeholder={`Enter location ${index + 1}`}
                    className="flex-1 h-12"
                    autoFocus={
                      index === locations.length - 1 && item.value === ""
                    }
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteItem(item.id)}
                    className="h-9 w-9 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="w-fit">
              <Button
                type="button"
                variant="outline"
                onClick={handleAddItem}
                className="w-full border p-3 cursor-pointer"
              >
                Add another item
              </Button>
            </div>
            {existingLocations.length > 0 && (
              <>
                <hr />
                <ButtonReuseable
                  title="Update Locations"
                  sendingMsg="Updating"
                  type="button"
                  onClick={handleBulkUpdate}
                  loading={isBulkSaving}
                  className="bg-[#111927] text-white cursor-pointer md:px-8 md:py-4.25 px-4 py-2 rounded-[12px]"
                />
              </>
            )}
            <hr />
            <div className="flex justify-start gap-2">
              <ButtonReuseable
                title="Submit"
                sendingMsg="Submiting"
                type="submit"
                loading={isSaving}
                className="bg-[#111927] text-white cursor-pointer md:px-8 md:py-4.25 px-4 py-2 rounded-[12px]"
              />

              <DialogClose asChild>
                <ButtonReuseable
                  title="Cancel"
                  type="button"
                  className="bg-[#F3F4F6]! text-[#111927]! cursor-pointer md:px-8 md:py-4.25 px-4 py-2 rounded-[12px]"
                />
              </DialogClose>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}