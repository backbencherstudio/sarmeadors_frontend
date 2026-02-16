"use client";
import ReusableInput from "@/components/common/InputFiled/ReusableInput";
import SelecteInputField from "@/components/common/InputFiled/SelecteInputField";
import { Label } from "@/components/ui/label";
import { useState } from "react";
const CommunicationData = [
  { value: "email", label: "Email" },
  { value: "sms", label: "SMS" },
];
function ClientEmailandSmsFrom() {
  const [communicationChannel, setCommunicationChannel] = useState("");
  return (
    <div>
      <div className="space-y-4">
        <div className="space-y-1.5 pb-4 border-b border-borderColor">
          <Label htmlFor="CommunicationChannel">Communication channel</Label>

          <SelecteInputField
            options={CommunicationData}
            value={communicationChannel}
            onValueChange={setCommunicationChannel}
            placeholder="Select Communication Channel"
            id="CommunicationChannel"
          />
          <span className="text-sm text-gray-500 cursor-pointer">Clear</span>
        </div>

        <div className="space-y-4">
          <h1 className="text-lg font-medium">Email Log</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="LoggedAfter">Logged After</Label>
              <ReusableInput
                className="w-full h-12"
                placeholder="Select Date"
                type="date"
                id="LoggedAfter"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="LoggedUpTo">Logged Up To</Label>
              <ReusableInput
                className="w-full h-12"
                placeholder="Select Date"
                type="date"
                id="LoggedUpTo"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="FilterByStatus">Filter by Status</Label>
            <SelecteInputField
              options={CommunicationData}
              value={communicationChannel}
              onValueChange={setCommunicationChannel}
              placeholder="Filter by Status"
              id="FilterByStatus"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientEmailandSmsFrom;
