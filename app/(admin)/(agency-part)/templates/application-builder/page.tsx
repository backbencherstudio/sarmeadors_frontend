import { statCards } from "@/components/dashboard/DashboardPage";
import InitialFormCreate from "@/components/dashboard/Form-Customization/InitialFormCreate";
import StatCards from "@/components/dashboard/StatCards";
import { TbNotes } from "react-icons/tb";
import { TiFlowMerge } from "react-icons/ti";

function page() {
  return (
    <div className="p-4 md:p-6">
      <div>
        <div className="flex flex-col md:flex-row items-center justify-between mb-4">
          <h3 className="text-lg md:text-xl font-semibold text-blackColor">
            Status Statistics
          </h3>
          <div className="flex gap-2 md:gap-4 items-center">
            <button className="flex items-center md:px-4 px-2 py-2 md:py-3 text-sm md:text-base cursor-pointer rounded-md gap-2 border border-gray2Color ">
              <TiFlowMerge /> Process Flow
            </button>
            <button className="flex items-center md:px-4 px-2 py-2 md:py-3 text-sm md:text-base cursor-pointer rounded-md gap-2 border border-gray2Color ">
              <TbNotes /> View Application Form
            </button>
          </div>
        </div>
        <StatCards statCards={statCards} />
      </div>
      <div className="mt-10">
        <InitialFormCreate />
      </div>
    </div>
  );
}

export default page;
