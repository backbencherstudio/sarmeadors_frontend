"use client";
import CandidateInterviewDialog from "@/components/candidate/interviews-jobs/CandidateInterviewDialog";
import ArrowRightUp from "@/components/icon/ArrowRightUp";
import InterviewIcon from "@/components/icon/InterviewIcon";
import ButtonReuseable from "@/components/reusable/CustomButton";
import { useRouter } from "next/navigation";
import { useState } from "react";

function ClientJobcardAction({
  job,
  userType,
}: {
  job?: any;
  userType?: string;
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const handleInterview = () => {
    // Handle interview button click
    setIsOpen(true);
  };

  const handleViewDetail = () => {
    router.push(`/candidate/applied-short-term-job-details/${job.id}`);
  };
  return (
    <div>
      <div className="mt-8 flex items-center gap-2">
        {userType === "candidate" && (
          <ButtonReuseable
            onClick={handleViewDetail}
            title="View Details"
            rightIcon={<ArrowRightUp />}
            className="bg-grayColor1! border border-borderColor text-blackColor!"
          />
        )}
        {userType === "candidate" && (
          <ButtonReuseable
            onClick={handleInterview}
            title="Interview"
            icon={<InterviewIcon />}
            className="  "
          />
        )}
      </div>
      {isOpen && (
        <CandidateInterviewDialog
          isOpen={isOpen}
          setOpen={() => setIsOpen(false)}
          data={job}
        />
      )}
    </div>
  );
}

export default ClientJobcardAction;
