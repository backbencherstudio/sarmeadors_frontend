"use client";

import {
  DrawerClose,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  useCreateAgencyStatusMutation,
  useGetAgencyClientListQuery,
  useGetAgencyClientTableColumnsQuery,
  useGetAgencyStatusesQuery,
  useUpdateAgencyClientTableColumnsMutation,
} from "@/feature/slice/agency/agencyDashboardSlice";
import { useUpdateSingleAgencyStatusMutation } from "@/feature/slice/agency/agencyStatusSlice";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import ReusableInput from "../common/InputFiled/ReusableInput";
import RootDrawer from "../common/RootDrawer";
import ButtonReuseable from "../reusable/CustomButton";
import MultiSelecte from "../reusable/MultiSelecte";
import StatusUpdatePart from "./StatusUpdatePart";

interface ColumnItem {
  key: string;
  label: string;
}

interface SelectOption {
  value: string;
  label: string;
}

function StatuseSetting({
  open,
  setOpen,
  type,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  type: string;
}) {
  const [statuses, setStatuses] = useState<any[]>([]);
  const { data: statusesData, isLoading: isStatusesLoading } =
    useGetAgencyStatusesQuery(type || "client");

  useEffect(() => {
    if (statusesData?.data) {
      setStatuses(statusesData.data);

      const reasonNames = statusesData.data
        .filter((s: any) => s.any_reason == 1 || s.any_reason == true)
        .map((s: any) => s.name);
      setSelectedStatusesForReason(reasonNames);

      const reasons: Record<string, string> = {};
      statusesData.data.forEach((s: any) => {
        if (s.reason) {
          reasons[s.name] = s.reason;
        }
      });
      setStatusReasons(reasons);
    }
  }, [statusesData]);

  const [selectedStatusesForReason, setSelectedStatusesForReason] = useState<
    string[]
  >([]);
  const [statusReasons, setStatusReasons] = useState<Record<string, string>>(
    {},
  );

  const [createAgencyStatus, { isLoading: isCreatingStatus }] =
    useCreateAgencyStatusMutation();
  const [updateSingleAgencyStatus, { isLoading: isUpdatingStatus }] =
    useUpdateSingleAgencyStatusMutation();

  const handleSubmit = async () => {

    const originalIds = new Set(
      (statusesData?.data || []).map((s: any) => s.id),
    );
    try {
      for (const status of statuses) {
        const isNew = !originalIds.has(status.id);
        const body = {
          name: status.name,
          color: status.backgroundColor || status.color,
          type: type || "client",
          any_reason: selectedStatusesForReason.includes(status.name),
          reason: statusReasons[status.name] || null,
        };

        if (isNew) {
          await createAgencyStatus(body).unwrap();
        } else {
          await updateSingleAgencyStatus({ id: status.id, ...body }).unwrap();
        }
      }
      toast.success("Statuses saved successfully!");
    } catch (error: any) {
      toast.error(
        error?.data?.data?.name?.[0] ||
          "Error saving statuses. Please try again.",
      );
    }
  };

  return (
    <RootDrawer open={open} setOpen={setOpen}>
      <div className="mx-auto w-full max-w-2xl overflow-y-auto">
        <DrawerHeader>
          <DrawerTitle className="text-xl font-semibold">
            {type} Statuses
          </DrawerTitle>
          <p className="text-sm text-descriptionColor font-semibold">
            Drag and drop statuses to re-order.
          </p>
        </DrawerHeader>

        

        <div className="mt-6">
          <StatusUpdatePart
            statuses={statuses}
            setStatuses={setStatuses}
            statusReasons={statusReasons}
            setStatusReasons={setStatusReasons}
            selectedStatusesForReason={selectedStatusesForReason}
            setSelectedStatusesForReason={setSelectedStatusesForReason}
          />
        </div>

        <DrawerFooter className="flex flex-row justify-end gap-2 p-2">
          <DrawerClose asChild>
            <ButtonReuseable
              title="Cancel"
              className="bg-bgColor! text-headerColor! border "
              onClick={() => setOpen(false)}
            />
          </DrawerClose>
          <ButtonReuseable
            onClick={handleSubmit}
            loading={isCreatingStatus || isUpdatingStatus}
            title="Save"
            sendingMsg={"Saving..."}
            className="bg-gray-900 text-white hover:bg-gray-800"
          />
        </DrawerFooter>
      </div>
    </RootDrawer>
  );
}

export default StatuseSetting;
