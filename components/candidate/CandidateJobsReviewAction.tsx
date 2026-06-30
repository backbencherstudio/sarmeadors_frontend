import { useState } from "react";
import ReviewModal from "../client/MyCandidates/ReviewModal";
import EmptyStarIcon from "../icon/EmptyStarIcon";
import ButtonReuseable from "../reusable/CustomButton";

function CandidateJobsReviewAction() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div className="flex items-center h-full gap-2">
        <ButtonReuseable
          title="Report Client"
          className="bg-whiteColor! text-sm font-semibold h-full border border-borderColor text-redColor!"
        />
        <ButtonReuseable
          title="Leave Review"
          onClick={() => setIsOpen(true)}
          icon={<EmptyStarIcon />}
          className=" font-medium tex-sm py-[10.5px]! border border-borderColor text-white!"
        />
      </div>
      {isOpen && (
        <ReviewModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      )}
    </div>
  );
}

export default CandidateJobsReviewAction;
