import Search from "@/components/common/Search";
import ButtonReuseable from "@/components/reusable/CustomButton";
import { FiPlus } from "react-icons/fi";

export default function Schedule() {
  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:items-center md:justify-between gap-4 w-full mb-4">
        <div>
          <h4 className="text-2xl font-bold text-gray-800">MY Jobs</h4>
          <p className="text-base text-secondaryColor mt-0.5 text-nowrap">
            Manage your job applications in one place.
          </p>
        </div>
        <div className="flex flex-col md:flex-row w-full md:justify-end  md:items-center gap-3 md:gap-2 h-full">
          <Search />
          <div className="flex items-center  gap-3 md:gap-2  ">
            <div>
              <ButtonReuseable
                title="All Status"
                className="bg-white !text-blackColor border border-gray2Color"
              />
            </div>
            <div>
              <ButtonReuseable
                title="Add Candidates"
                icon={<FiPlus className="w-4 h-4" />}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
