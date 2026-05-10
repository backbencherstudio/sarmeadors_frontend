import CommonAccordion from "../CommonAccordion";
import { DollarSign } from "lucide-react";

export default function RegistrationFeeSettings() {
  return (
    <CommonAccordion title="Registration Fee Settings">
      <div className="space-y-6">
        {/* Registration Fee */}
        <div>
          <label className="block text-base font-medium">
            Registration Fee
          </label>
          <p className="text-sm text-[#778593] my-1">
            How much is the candidate registration fee? If this is not set, we
            assume there is no registration fee.
          </p>
          <div className="relative">
            <input
              type="number"
              placeholder="Enter your amount"
              className="w-full bg-white border border-gray-300 rounded-lg p-4 pr-12 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
            />
            <div className="absolute inset-y-0 top-1/3 right-0 flex items-center pr-4 pointer-events-none">
              <DollarSign className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          <p className="text-sm text-[#778593] mt-1">Clear</p>
        </div>
      </div>
    </CommonAccordion>
  );
}
