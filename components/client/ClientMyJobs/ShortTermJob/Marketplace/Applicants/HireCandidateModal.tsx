import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useHireCandidateMutation } from "@/feature/dashboard/client/myJob";
import { toast } from "sonner";

export default function HireCandidateModal({
  jobId,
  applicantId,
}: {
  jobId?: string;
  applicantId?: string;
}) {
  const [hireCandidate] = useHireCandidateMutation();

  const handleHireCandidate = async () => {
    try {
      const result = await hireCandidate({ jobId, applicantId }).unwrap();
      if (result?.success !== true) {
        throw new Error(result.message || "Failed to hire candidate");
      }
      toast.success(result.message || "Candidate hired successfully!");
    } catch (error) {
      //   console.error("Error hiring candidate:", error);
      toast.error(error.message || "Failed to hire candidate.");
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <button className="bg-[#111927] text-white text-base font-medium px-4 py-2 rounded-xl transition-colors cursor-pointer">
            Hire Candidate
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-3xl text-center">
              Are you interested in hiring candidates directly?
            </DialogTitle>
            <DialogDescription className="text-center">
              The job has been forwarded to the admin for broadcasting. Once the
              admin starts the broadcast, we will keep you updated.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center">
            <button
              className="w-fit bg-[#111927] text-white text-base font-medium px-4 py-2 rounded-xl transition-colors cursor-pointer"
              onClick={handleHireCandidate}
            >
              Hire Candidate
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
