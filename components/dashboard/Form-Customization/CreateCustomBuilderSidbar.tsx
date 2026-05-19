import RootDrawer from "@/components/common/RootDrawer";
import ArrowDownIcon from "@/components/icon/ArrowDownIcon";
import SectionIcon from "@/components/icon/SectionIcon";
import ButtonReuseable from "@/components/reusable/CustomButton";
import CustomRadioButton from "@/components/reusable/CustomRadioButton";
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
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);
  // Application form states
  const [appStep, setAppStep] = useState<
    "application" | "userType" | "jobType"
  >("application");

  const [selectedApplicationType, setSelectedApplicationType] =
    useState<string>("");
  const [selectedUserType, setSelectedUserType] = useState<string>("");
  const [selectedJobType, setSelectedJobType] = useState<string>("");

  const handleApplicationTypeSelect = (type: string) => {
    setSelectedApplicationType(type);
    if (type === "Registration") {
      setAppStep("userType");
    } else if (type === "Job posting") {
      setAppStep("jobType");
    }
  };

  const handleUserTypeSelect = (type: string) => {
    setSelectedUserType(type);
  };

  const handleJobTypeSelect = (type: string) => {
    setSelectedJobType(type);
  };
  const handleApplicationType = () => {
    setIsAdvanced(false);
    setUserType("candidate");
    setSelectType("Placement Job");
    setIsApplicationOpen(true);
  };

  const handleClick = () => {
    setOpen(false);
    setIsAdvanced(false);
    setUserType("candidate");
    setSelectType("Placement Job");
  };
  const handleAdvancedClick = () => {
    setIsApplicationOpen(false);
    setIsAdvanced((prev) => !prev);
  };

  return (
    <RootDrawer open={open} setOpen={setOpen}>
      <div className="p-4 md:p-6 flex flex-col justify-between h-full">
        <div>
          <h2 className="text-headerColor font-semibold text-lg md:text-xl mb-4">
            Select Builder Type
          </h2>
          <div className="flex gap-2 items-center">
            <button className=" hover:border-descriptionColor cursor-pointer p-3 bg-bgColor border border-borderColor rounded-md">
              <span className="flex items-center gap-2 ">
                <SectionIcon className="w-4 h-4" /> Section
              </span>
              <span className="text-xs text-secondaryColor  mt-3">
                Group related questions into a structured part of your
                form.{" "}
              </span>
            </button>
            <button
              onClick={handleApplicationType}
              className="hover:border-descriptionColor cursor-pointer p-3 bg-bgColor border border-borderColor rounded-md"
            >
              <span className="flex items-center gap-2">
                <Link className="w-4 h-4" /> Application
              </span>
              <span className="text-xs text-secondaryColor mt-3">
                Create a form that can be shared with clients or
                candidates.{" "}
              </span>
            </button>
          </div>
          <div className="mt-4 mb-8">
            <button
              className="flex cursor-pointer items-center gap-3"
              onClick={handleAdvancedClick}
            >
              <div className="p-2 rotate-180 bg-gray2Color rounded-sm">
                <ArrowDownIcon className=" w-4 h-4" />
              </div>
              <p className="text-lg font-medium text-headerColor">
                Advanced Builder
              </p>
            </button>
            <div>
              {isAdvanced && (
                <div className="mt-2">
                  <div>
                    <h3 className="text-sm font-medium text-headerColor mb-2">
                      User Type
                    </h3>
                    <div className="flex flex-col gap-2">
                      <CustomRadioButton
                        label="Candidate"
                        name="userType"
                        value="candidate"
                        checked={userType === "candidate"}
                        onChange={() => setUserType("candidate")}
                        isSelected={userType === "candidate"}
                        variant="small"
                        colorScheme="secondary"
                      />
                      <CustomRadioButton
                        label="Client"
                        name="userType"
                        value="client"
                        checked={userType === "client"}
                        onChange={() => setUserType("client")}
                        isSelected={userType === "client"}
                        variant="small"
                        colorScheme="secondary"
                      />
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
                        <CustomRadioButton
                          key={opt}
                          label={opt}
                          name="selectType"
                          value={opt}
                          checked={selectType === opt}
                          onChange={() => setSelectType(opt)}
                          isSelected={selectType === opt}
                          variant="small"
                          colorScheme="secondary"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="border-t border-borderColor pt-8 w-full">
            {isApplicationOpen && (
              <div className=" ">
                {/* Step 1: Select Application Type */}

                <div>
                  <h3 className="text-sm font-medium text-headerColor mb-3">
                    Select Application Type
                  </h3>
                  <div className="flex flex-col ">
                    <CustomRadioButton
                      label="Registration"
                      name="applicationType"
                      value="Registration"
                      checked={selectedApplicationType === "Registration"}
                      onChange={handleApplicationTypeSelect}
                      isSelected={selectedApplicationType === "Registration"}
                      variant="small"
                      colorScheme="secondary"
                    />
                    <CustomRadioButton
                      label="Job posting"
                      name="applicationType"
                      value="Job posting"
                      checked={selectedApplicationType === "Job posting"}
                      onChange={handleApplicationTypeSelect}
                      isSelected={selectedApplicationType === "Job posting"}
                      variant="small"
                      colorScheme="secondary"
                    />
                  </div>
                </div>

                {/* Step 2: Select User Type (for Registration) */}
                {appStep === "userType" && (
                  <div className="mt-6 lg:mt-8">
                    <h3 className="text-sm font-medium text-headerColor mb-3">
                      Select User Type
                    </h3>
                    <div className="flex flex-col ">
                      <CustomRadioButton
                        label="Client"
                        name="userType"
                        value="Client"
                        checked={selectedUserType === "Client"}
                        onChange={handleUserTypeSelect}
                        isSelected={selectedUserType === "Client"}
                        variant="small"
                        colorScheme="secondary"
                      />
                      <CustomRadioButton
                        label="Candidate"
                        name="userType"
                        value="Candidate"
                        checked={selectedUserType === "Candidate"}
                        onChange={handleUserTypeSelect}
                        isSelected={selectedUserType === "Candidate"}
                        variant="small"
                        colorScheme="secondary"
                      />
                    </div>
                  </div>
                )}

                {/* Step 3: Select Job Type (for Job posting) */}
                {appStep === "jobType" && (
                  <div className="mt-6 lg:mt-8">
                    <h3 className="text-sm font-medium text-headerColor mb-3">
                      Select Job Type
                    </h3>
                    <div className="flex flex-col ">
                      <CustomRadioButton
                        label="Shift job"
                        name="jobType"
                        value="Shift job"
                        checked={selectedJobType === "Shift job"}
                        onChange={handleJobTypeSelect}
                        isSelected={selectedJobType === "Shift job"}
                        variant="small"
                        colorScheme="secondary"
                      />
                      <CustomRadioButton
                        label="Placement Job"
                        name="jobType"
                        value="Placement Job"
                        checked={selectedJobType === "Placement Job"}
                        onChange={handleJobTypeSelect}
                        isSelected={selectedJobType === "Placement Job"}
                        variant="small"
                        colorScheme="secondary"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center justify-end gap-2">
          <ButtonReuseable
            title="Cancel"
            type="button"
            onClick={handleClick}
            className="bg-grayColor1! border border-borderColor text-headerColor!"
          />
          <ButtonReuseable
            title="Create"
            type="button"
            onClick={handleClick}
            className=" "
          />
        </div>
      </div>
    </RootDrawer>
  );
}

export default CreateCustomBuilderSidbar;
