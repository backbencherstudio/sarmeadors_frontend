import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

export function CancelModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center px-4 py-2 border border-[#E5E7EB] hover:bg-red-50 rounded-xl cursor-pointer">
          <X className="h-5 text-[#CB121D]" />
          <span className="text-[#CB121D] font-medium text-sm leading-[142.857%]">
            Cancel
          </span>
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-xl! p-6 rounded-2xl">
        {/* Illustration */}
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl font-semibold text-center">
            Are you sure to cancel the interview?
          </DialogTitle>
        </DialogHeader>

        <div>
          {/* Modal Box */}
          <div>
            <p className="text-gray-900 mt-4">
              Are you sure you want to cancel the interview with
              <span className="font-semibold"> Charlotte Hamlin </span>
              for the <span className="font-semibold">
                After School Nanny
              </span>{" "}
              position? This action cannot be undone.
            </p>

            {/* Buttons */}
            <div className="flex justify-center gap-4 mt-8">
              <DialogClose>
                <button className="px-6 py-3 rounded-lg bg-gray-200 hover:bg-gray-300 cursor-pointer">
                  Cancel
                </button>
              </DialogClose>

              <button className="px-6 py-3 rounded-lg bg-red-600 text-white hover:bg-red-700 cursor-pointer">
                Delete
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
