"use client";

import { useState } from "react";
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
import { Plus, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import ButtonReuseable from "@/components/reusable/CustomButton";
import {
  usePostTypeStoreMutation,
  useDeleteTypeMutation,
} from "@/feature/slice/settings/candidates/CandidateSettingsSlice";

interface TypeItem {
  id: string;
  label: string;
}

interface ClientTypesModalProps {
  type: string;
  typeItems?: TypeItem[];
}

export function ClientTypesModal({
  type,
  typeItems = [],
}: ClientTypesModalProps) {
  const [postTypeStore, { isLoading: isSaving }] =
    usePostTypeStoreMutation();
  const [deleteType, { isLoading: isDeleting }] = useDeleteTypeMutation();
  const [open, setOpen] = useState(false);

  const [clientTypes, setClientTypes] = useState<
    { id: string; value: string }[]
  >([{ id: "1", value: "" }]);

  const handleAddItem = () => {
    const newId = Date.now().toString();
    setClientTypes([...clientTypes, { id: newId, value: "" }]);
  };

  const handleDeleteItem = (id: string) => {
    setClientTypes(clientTypes.filter((item) => item.id !== id));
  };

  const handleInputChange = (id: string, value: string) => {
    setClientTypes(
      clientTypes.map((item) => (item.id === id ? { ...item, value } : item)),
    );
  };

  const handleDeleteType = async (id: string) => {
    try {
      await deleteType(Number(id)).unwrap();
      toast.success("Type deleted successfully!");
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Error deleting type. Please try again.",
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const names = clientTypes.map((item) => item.value).filter(Boolean);

    if (names.length === 0) {
      toast.error("Please enter at least one type name.");
      return;
    }

    try {
      await postTypeStore({
        names,
        type,
        status: 1,
      }).unwrap();
      toast.success("Types created successfully!");
      setClientTypes([{ id: Date.now().toString(), value: "" }]);
      setOpen(false);
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Error creating types. Please try again.",
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
      <DialogContent className="sm:max-w-212.5! max-h-[80vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-start">
              Add Types
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-600 pt-2 text-start">
              Add types for {type} entities.
            </DialogDescription>
          </DialogHeader>

          {typeItems.length > 0 && (
            <div className="space-y-2 py-2">
              <p className="text-sm font-medium text-gray-700">Existing Types</p>
              {typeItems.map((t) => (
                <div
                  key={t.id}
                  className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2"
                >
                  <span className="flex-1 text-sm text-gray-700">{t.label}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteType(t.id)}
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
              {clientTypes.map((item, index) => (
                <div key={item.id} className="flex items-center gap-2">
                  <Input
                    value={item.value}
                    onChange={(e) => handleInputChange(item.id, e.target.value)}
                    placeholder={`Enter type ${index + 1}`}
                    className="flex-1 h-12"
                    autoFocus={
                      index === clientTypes.length - 1 && item.value === ""
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
            <hr />
            <div className="flex justify-start gap-2">
              <ButtonReuseable
                title="Submit"
                sendingMsg="Submitting"
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
