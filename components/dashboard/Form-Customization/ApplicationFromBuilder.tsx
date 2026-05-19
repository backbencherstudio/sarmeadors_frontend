"use client";

import RootDrawer from "@/components/common/RootDrawer";
import CustomRadioButton from "@/components/reusable/CustomRadioButton";
import { Link } from "lucide-react";
import { useState } from "react";

function ApplicationFromBuilder() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"application" | "userType" | "jobType">(
    "application",
  );
  const [selectedApplicationType, setSelectedApplicationType] =
    useState<string>("");
  const [selectedUserType, setSelectedUserType] = useState<string>("");
  const [selectedJobType, setSelectedJobType] = useState<string>("");

  const handleApplicationTypeSelect = (type: string) => {
    setSelectedApplicationType(type);
    if (type === "Registration") {
      setStep("userType");
    } else if (type === "Job posting") {
      setStep("jobType");
    }
  };

  const handleUserTypeSelect = (type: string) => {
    setSelectedUserType(type);
    // Handle further steps if needed
  };

  const handleJobTypeSelect = (type: string) => {
    setSelectedJobType(type);
    // Handle further steps if needed
  };

  const handleReset = () => {
    setStep("application");
    setSelectedApplicationType("");
    setSelectedUserType("");
    setSelectedJobType("");
  };

  const handleClose = () => {
    setOpen(false);
    handleReset();
  };

  return (
    <div>
     
      <RootDrawer open={open} setOpen={handleClose}>
        <div className="p-4 md:p-6">
          {/* Step 1: Select Application Type */}
          {step === "application" && (
            <div>
              <h2 className="text-headerColor font-semibold text-lg md:text-xl mb-4">
                Select Application Type
              </h2>
              <div className="flex flex-col gap-2">
                <CustomRadioButton
                  label="Registration"
                  name="applicationType"
                  value="Registration"
                  checked={selectedApplicationType === "Registration"}
                  onChange={handleApplicationTypeSelect}
                  isSelected={selectedApplicationType === "Registration"}
                  variant="large"
                />
                <CustomRadioButton
                  label="Job posting"
                  name="applicationType"
                  value="Job posting"
                  checked={selectedApplicationType === "Job posting"}
                  onChange={handleApplicationTypeSelect}
                  isSelected={selectedApplicationType === "Job posting"}
                  variant="large"
                />
              </div>
            </div>
          )}

          {/* Step 2: Select User Type (for Registration) */}
          {step === "userType" && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <button
                  onClick={() => setStep("application")}
                  className="text-headerColor hover:text-descriptionColor font-semibold"
                >
                  ← Back
                </button>
                <h2 className="text-headerColor font-semibold text-lg md:text-xl flex-1">
                  Select User Type
                </h2>
              </div>
              <div className="flex flex-col gap-2">
                <CustomRadioButton
                  label="Client"
                  name="userType"
                  value="Client"
                  checked={selectedUserType === "Client"}
                  onChange={handleUserTypeSelect}
                  isSelected={selectedUserType === "Client"}
                  variant="large"
                />
                <CustomRadioButton
                  label="Candidate"
                  name="userType"
                  value="Candidate"
                  checked={selectedUserType === "Candidate"}
                  onChange={handleUserTypeSelect}
                  isSelected={selectedUserType === "Candidate"}
                  variant="large"
                />
              </div>
            </div>
          )}

          {/* Step 3: Select Job Type (for Job posting) */}
          {step === "jobType" && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <button
                  onClick={() => setStep("application")}
                  className="text-headerColor hover:text-descriptionColor font-semibold"
                >
                  ← Back
                </button>
                <h2 className="text-headerColor font-semibold text-lg md:text-xl flex-1">
                  Select Job Type
                </h2>
              </div>
              <div className="flex flex-col gap-2">
                <CustomRadioButton
                  label="Shift job"
                  name="jobType"
                  value="Shift job"
                  checked={selectedJobType === "Shift job"}
                  onChange={handleJobTypeSelect}
                  isSelected={selectedJobType === "Shift job"}
                  variant="large"
                />
                <CustomRadioButton
                  label="Placement Job"
                  name="jobType"
                  value="Placement Job"
                  checked={selectedJobType === "Placement Job"}
                  onChange={handleJobTypeSelect}
                  isSelected={selectedJobType === "Placement Job"}
                  variant="large"
                />
              </div>
            </div>
          )}
        </div>
      </RootDrawer>
    </div>
  );
}

export default ApplicationFromBuilder;
