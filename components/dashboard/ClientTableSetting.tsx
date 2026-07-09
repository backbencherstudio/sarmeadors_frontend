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

function ClientTableSetting({
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

  const { data: allColsData, isLoading: isAllColsLoading } =
    useGetAgencyClientTableColumnsQuery("AgencyClientTableColumns");

  const { data: activeListData, isLoading: isActiveListLoading } =
    useGetAgencyClientListQuery("AgencyClientTableColumns");

  const [updateColumns] = useUpdateAgencyClientTableColumnsMutation();
  const [createAgencyStatus, { isLoading: isCreatingStatus }] =
    useCreateAgencyStatusMutation();
  const [updateSingleAgencyStatus, { isLoading: isUpdatingStatus }] =
    useUpdateSingleAgencyStatusMutation();

  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [displayLabels, setDisplayLabels] = useState<Record<string, string>>(
    {},
  );
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const isLoading = isAllColsLoading || isActiveListLoading;
  const allColumns: ColumnItem[] = allColsData?.data || [];

  useEffect(() => {
    if (allColsData?.data && activeListData?.columns) {
      const initialSelectedKeys = activeListData.columns.map(
        (col: any) => col.key,
      );
      const labels: Record<string, string> = {};
      allColsData.data.forEach((col: any) => {
        labels[col.key] = col.label || col.key.replace(/_/g, " ");
      });

      setSelectedKeys(initialSelectedKeys);
      setDisplayLabels(labels);
    }
  }, [allColsData, activeListData]);

  const debouncedSave = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      const tableFields = selectedKeys;
      const displayLabelsPayload: Record<string, string> = {};
      selectedKeys.forEach((key) => {
        displayLabelsPayload[key] = displayLabels[key] || "";
      });

      const payload = {
        table_fields: tableFields,
        display_labels: displayLabelsPayload,
        use_admin_level_setting: false,
        quick_search_field: "email_address",
        default_sort_field: "email_address",
        last_login_retrieval_days: 30,
        show_status_statistical_breakdowns: false,
      };

      updateColumns(payload);
    }, 3000);
  };

  useEffect(() => {
    if (!allColsData?.data) return;
    debouncedSave();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [selectedKeys, displayLabels]);

  const updateLabel = (key: string, label: string) => {
    setDisplayLabels((prev) => ({ ...prev, [key]: label }));
  };
  const handleSubmit = async () => {
    const tableFields = selectedKeys;

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
            Client Table Settings
          </DrawerTitle>
        </DrawerHeader>

        <div className="px-4 space-y-4">
          {isLoading ? (
            <div className="text-sm text-gray-500">Loading columns...</div>
          ) : (
            <>
              <label
                htmlFor="column-select"
                className="block text-sm font-medium text-gray-700"
              >
                Fields which are showed in the Client table of agency dashboard
                (Agency Level)
              </label>
              <MultiSelecte
                placeholder="Select columns to display"
                value={allColumns
                  .filter((col) => selectedKeys.includes(col.key))
                  .map((col) => ({
                    value: col.key,
                    label:
                      displayLabels[col.key] ||
                      col.label ||
                      col.key.replace(/_/g, " "),
                  }))}
                onChange={(opts: SelectOption[]) =>
                  setSelectedKeys(opts.map((o) => o.value))
                }
                options={allColumns.map((col) => ({
                  value: col.key,
                  label: col.label || col.key.replace(/_/g, " "),
                }))}
              />
              <div className="grid grid-cols-2 items-center gap-3">
                {selectedKeys.map((key) => {
                  const col = allColumns.find((c) => c.key === key);
                  if (!col) return null;
                  return (
                    <div key={key} className="">
                      <label className="text-sm font-medium text-gray-700 capitalize mb-2 block">
                        {col.label || key.replace(/_/g, " ")}
                      </label>
                      <ReusableInput
                        value={displayLabels[key] || ""}
                        onChange={(e) => updateLabel(key, e.target.value)}
                        placeholder="Enter display label"
                      />
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

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

export default ClientTableSetting;
