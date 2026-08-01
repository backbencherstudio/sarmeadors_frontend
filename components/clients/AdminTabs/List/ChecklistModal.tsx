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
  usePostChecklistStoreMutation,
  useDeleteChecklistMutation,
} from "@/feature/slice/settings/candidates/CandidateSettingsSlice";

interface ChecklistItem {
  id: string;
  label: string;
}

interface ChecklistModalProps {
  type: string;
  checklistItems?: ChecklistItem[];
}

export function ChecklistModal({
  type,
  checklistItems = [],
}: ChecklistModalProps) {
  const [postChecklistStore, { isLoading: isSaving }] =
    usePostChecklistStoreMutation();
  const [deleteChecklist, { isLoading: isDeleting }] =
    useDeleteChecklistMutation();
  const [open, setOpen] = useState(false);

  const [checklists, setChecklists] = useState<
    { id: string; value: string }[]
  >([{ id: "1", value: "" }]);

  const handleAddItem = () => {
    const newId = Date.now().toString();
    setChecklists([...checklists, { id: newId, value: "" }]);
  };

  const handleDeleteItem = (id: string) => {
    setChecklists(checklists.filter((item) => item.id !== id));
  };

  const handleInputChange = (id: string, value: string) => {
    setChecklists(
      checklists.map((item) => (item.id === id ? { ...item, value } : item)),
    );
  };

  const handleDeleteChecklist = async (id: string) => {
    try {
      await deleteChecklist(Number(id)).unwrap();
      toast.success("Checklist item deleted successfully!");
    } catch (error: any) {
      toast.error(
        error?.data?.message ||
          "Error deleting checklist item. Please try again.",
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const names = checklists.map((item) => item.value).filter(Boolean);

    if (names.length === 0) {
      toast.error("Please enter at least one checklist item.");
      return;
    }

    try {
      await postChecklistStore({
        names,
        type,
        status: 1,
      }).unwrap();
      toast.success("Checklist created successfully!");
      setChecklists([{ id: Date.now().toString(), value: "" }]);
      setOpen(false);
    } catch (error: any) {
      toast.error(
        error?.data?.message ||
          "Error creating checklist. Please try again.",
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
              Add Checklist
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-600 pt-2 text-start">
              Add checklist items for {type} entities.
            </DialogDescription>
          </DialogHeader>

          {checklistItems.length > 0 && (
            <div className="space-y-2 py-2">
              <p className="text-sm font-medium text-gray-700">
                Existing Checklist Items
              </p>
              {checklistItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2"
                >
                  <span className="flex-1 text-sm text-gray-700">
                    {item.label}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteChecklist(item.id)}
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
              {checklists.map((item, index) => (
                <div key={item.id} className="flex items-center gap-2">
                  <Input
                    value={item.value}
                    onChange={(e) => handleInputChange(item.id, e.target.value)}
                    placeholder={`Enter checklist item ${index + 1}`}
                    className="flex-1 h-12"
                    autoFocus={
                      index === checklists.length - 1 && item.value === ""
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
