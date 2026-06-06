import ButtonReuseable from "@/components/reusable/CustomButton";
import notfound from "@/public/jobs/not-found.png";
import { PlusIcon } from "lucide-react";
import Image from "next/image";

function ClientJobNotFound() {
  return (
    <div className="text-center py-10 rounded-2xl border-dashed border-borderColor border-2 bg-bgColor">
      <div>
        <Image
          width={200}
          height={200}
          src={notfound.src}
          alt="not found"
          className="mx-auto mb-6 w-[140px] h-[108px] object-cover"
        />
      </div>
      <h2 className="text-xl font-semibold text-gray-700">No jobs found</h2>
      <p className="text-gray-500 mt-2">
        You haven't Posted any job yet. Tap below to post your first one!.
      </p>
      <div className="flex justify-center">
        <ButtonReuseable
          icon={<PlusIcon />}
          title="Post a job"
          className="mt-4"
        />
      </div>
    </div>
  );
}

export default ClientJobNotFound;
