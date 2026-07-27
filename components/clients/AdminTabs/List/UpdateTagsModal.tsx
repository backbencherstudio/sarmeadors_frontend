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
import { Pencil, Save, X } from "lucide-react";
import { toast } from "react-toastify";
import ButtonReuseable from "@/components/reusable/CustomButton";
import { useUpdateTagBulkMutation } from "@/feature/slice/settings/candidates/CandidateSettingsSlice";

interface TagItem {
  id: string;
  label: string;
  checked: boolean;
}

interface UpdateTagsModalProps {
  tagItems: TagItem[];
}

export function UpdateTagsModal({ tagItems }: UpdateTagsModalProps) {
  const [updateTagBulk, { isLoading: isSaving }] = useUpdateTagBulkMutation();
  const [open, setOpen] = useState(false);

  const [updates, setUpdates] = useState<
    { id: number; name: string; status: number }[]
  >(() =>
    tagItems.map((tag) => ({
      id: Number(tag.id),
      name: tag.label,
      status: tag.checked ? 1 : 0,
    })),
  );

  useEffect(() => {
    setUpdates(
      tagItems.map((tag) => ({
        id: Number(tag.id),
        name: tag.label,
        status: tag.checked ? 1 : 0,
      })),
    );
  }, [tagItems]);

  const handleNameChange = (id: number, value: string) => {
    setUpdates((prev) =>
      prev.map((item) => (item.id === id ? { ...item, name: value } : item)),
    );
  };

  const handleStatusChange = (id: number) => {
    setUpdates((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: item.status === 1 ? 0 : 1 } : item,
      ),
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const hasChanges = updates.some(
      (item) =>
        item.name.trim() === "" || (item.status !== 0 && item.status !== 1),
    );

    if (hasChanges) {
      toast.error("Please ensure all tag names are filled.");
      return;
    }

    try {
      await updateTagBulk(updates).unwrap();
      toast.success("Tags updated successfully!");
      setOpen(false);
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Error updating tags. Please try again.",
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 bg-gray-100 hover:bg-gray-200 border-0 cursor-pointer"
        >
          <Pencil className="w-4 h-4 text-gray-600" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-212.5! max-h-[80vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-start">
              Update Tags
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-600 pt-2 text-start">
              Edit tag names and toggle status. Changes are saved in bulk.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-3">
              {updates.map((item) => (
                <div key={item.id} className="flex items-center gap-2">
                  <Input
                    value={item.name}
                    onChange={(e) => handleNameChange(item.id, e.target.value)}
                    placeholder={`Tag name`}
                    className="flex-1 h-12"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleStatusChange(item.id)}
                    className={`h-9 w-9 p-0 border-0 cursor-pointer ${
                      item.status === 1
                        ? "bg-green-100 text-green-600 hover:bg-green-200"
                        : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                    }`}
                  >
                    {item.status === 1 ? (
                      <span className="text-xs font-semibold">ON</span>
                    ) : (
                      <span className="text-xs font-semibold">OFF</span>
                    )}
                  </Button>
                </div>
              ))}
            </div>
            <hr />
            <div className="flex justify-start gap-2">
              <ButtonReuseable
                title="Update"
                sendingMsg="Updating"
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
