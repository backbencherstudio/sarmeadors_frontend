import { ChevronDown } from "lucide-react";
import CommonAccordion from "../CommonAccordion";

const FONTS = [
  "Public",
  "Inter",
  "Roboto",
  "Open Sans",
  "Lato",
  "Montserrat",
  "Poppins",
  "Raleway",
  "Nunito",
  "Source Sans Pro",
];

export default function ProfileSettings() {
  return (
    <CommonAccordion title="Profile settings">
      <div className="space-y-4">
        {/* Candidate Profile Picture Scope */}
        <div>
          <label className="block text-base font-medium mb-1">
            Candidate Profile Picture Scope
          </label>
          <div className="relative">
            <select
              // value={font}
              // onChange={(e) => setFont(e.target.value)}
              className="w-full appearance-none border border-gray-300 rounded-lg p-4 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-gray-300 transition pr-10"
            >
              {FONTS.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
            />
          </div>
          <p className="text-sm text-[#778593] mt-1">
            Specify scope Of Of candidate (None if there is no profile picture
            for candidate). Default picture is Public
          </p>
        </div>
        {/* Number of candidate interview boxes */}
        <div>
          <label className="block text-base font-medium mb-1">
            Number of candidate interview boxes
          </label>
          <div className="relative">
            <select
              // value={font}
              // onChange={(e) => setFont(e.target.value)}
              className="w-full appearance-none border border-gray-300 rounded-lg p-4 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-gray-300 transition pr-10"
            >
              {FONTS.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
            />
          </div>
          <p className="text-sm text-[#778593] mt-1">Default value is 2</p>
        </div>
      </div>
    </CommonAccordion>
  );
}
