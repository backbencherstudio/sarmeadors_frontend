import RootDrawer from "@/components/common/RootDrawer";
import ArrowDownIcon from "@/components/icon/ArrowDownIcon";
import SectionIcon from "@/components/icon/SectionIcon";
import { Link } from "lucide-react";
import { useState } from "react";

function CreateCustomBuilderSidbar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [isAdvanced, setIsAdvanced] = useState(false);
  const [userType, setUserType] = useState<"candidate" | "client">("candidate");
  const [selectType, setSelectType] = useState<string>("Placement Job");

  return (
    <RootDrawer open={open} setOpen={setOpen}>
      <div className="p-4 md:p-6">
        <h2 className="text-headerColor font-semibold text-lg md:text-xl mb-4">
          Select Builder Type
        </h2>
        <div className="flex gap-2 items-center">
          <button className=" hover:border-descriptionColor cursor-pointer p-3 bg-bgColor border border-borderColor rounded-md">
            <span className="flex items-center gap-2 ">
              <SectionIcon className="w-4 h-4" /> Section
            </span>
            <span className="text-xs text-descriptionColor ">
              Group related questions into a structured part of your form.{" "}
            </span>
          </button>
          <button className=" hover:border-descriptionColor cursor-pointer p-3 bg-bgColor border border-borderColor rounded-md">
            <span className="flex items-center gap-2 ">
              <Link className="w-4 h-4" /> Section
            </span>
            <span className="text-xs text-descriptionColor ">
              Group related questions into a structured part of your form.{" "}
            </span>
          </button>
        </div>
        <div className="mt-4">
          <button
            className="flex cursor-pointer items-center gap-3"
            onClick={() => setIsAdvanced(!isAdvanced)}
          >
            <div className="p-2 rotate-180 bg-gray2Color rounded-sm">
              <ArrowDownIcon className=" w-4 h-4" />
            </div>
            <p className="text-lg font-medium text-headerColor">
              Advanced Builder
            </p>
          </button>
        </div>
        <div>
          {isAdvanced && (
            <div className="mt-2">
              <div>
                <h3 className="text-sm font-medium text-headerColor mb-2">
                  User Type
                </h3>
                <div className="flex flex-col gap-2">
                  <label
                    className={`flex items-center gap-3 p-2 cursor-pointer ${
                      userType === "candidate"
                        ? "text-headerColor font-medium"
                        : "text-descriptionColor"
                    }`}
                  >
                    <input
                      type="radio"
                      name="userType"
                      className="sr-only"
                      checked={userType === "candidate"}
                      onChange={() => setUserType("candidate")}
                    />
                    <span className="flex-shrink-0">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center bg-[#0b1220]">
                        <span className="w-3 h-3 rounded-full bg-white flex items-center justify-center">
                          {userType === "candidate" && (
                            <span className="w-2 h-2 rounded-full bg-[#0b1220]"></span>
                          )}
                        </span>
                      </span>
                    </span>
                    <span className="text-sm font-medium">Candidate</span>
                  </label>
                  <label
                    className={`flex items-center gap-3 p-2 cursor-pointer ${
                      userType === "client"
                        ? "text-headerColor font-medium"
                        : "text-descriptionColor"
                    }`}
                  >
                    <input
                      type="radio"
                      name="userType"
                      className="sr-only"
                      checked={userType === "client"}
                      onChange={() => setUserType("client")}
                    />
                    <span className="flex-shrink-0">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center bg-[#0b1220]">
                        <span className="w-3 h-3 rounded-full bg-white flex items-center justify-center">
                          {userType === "client" && (
                            <span className="w-2 h-2 rounded-full bg-[#0b1220]"></span>
                          )}
                        </span>
                      </span>
                    </span>
                    <span className="text-sm font-medium">Client</span>
                  </label>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="text-sm font-medium text-headerColor mb-2">
                  Select Type
                </h3>
                <div className="flex flex-col gap-2">
                  {[
                    "Placement Job",
                    "Add User",
                    "Job Application Form",
                    "Schedule Interview Form",
                    "Review User",
                    "Client Activity Log",
                  ].map((opt) => (
                    <label
                      key={opt}
                      className={`flex items-center gap-3 p-2 cursor-pointer ${
                        selectType === opt
                          ? "text-headerColor font-medium"
                          : "text-descriptionColor"
                      }`}
                    >
                      <input
                        type="radio"
                        name="selectType"
                        className="sr-only"
                        value={opt}
                        checked={selectType === opt}
                        onChange={() => setSelectType(opt)}
                      />
                      <span className="flex-shrink-0">
                        <span className="w-5 h-5 rounded-full flex items-center justify-center bg-[#0b1220]">
                          <span className="w-3 h-3 rounded-full bg-white flex items-center justify-center">
                            {selectType === opt && (
                              <span className="w-2 h-2 rounded-full bg-[#0b1220]"></span>
                            )}
                          </span>
                        </span>
                      </span>
                      <span className="text-sm">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </RootDrawer>
  );
}

export default CreateCustomBuilderSidbar;
