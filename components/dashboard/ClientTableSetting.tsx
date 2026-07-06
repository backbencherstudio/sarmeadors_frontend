"use client";

import { Button } from "@/components/ui/button";
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
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import ReusableInput from "../common/InputFiled/ReusableInput";
import RootDrawer from "../common/RootDrawer";
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
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [statuses, setStatuses] = useState<any[]>([]);
  const { data: statusesData, isLoading: isStatusesLoading } =
    useGetAgencyStatusesQuery("agency-statuses");

  useEffect(() => {
    if (statusesData?.data) {
      setStatuses(statusesData.data);
    }
  }, [statusesData]);

  const [selectedStatusesForReason, setSelectedStatusesForReason] = useState<
    string[]
  >(["Inactive", "Rejected"]);
  const [rejectedReasons, setRejectedReasons] = useState("");
  const [inactiveReasons, setInactiveReasons] = useState("");

  const { data: allColsData, isLoading: isAllColsLoading } =
    useGetAgencyClientTableColumnsQuery("AgencyClientTableColumns");

  const { data: activeListData, isLoading: isActiveListLoading } =
    useGetAgencyClientListQuery("AgencyClientTableColumns");

  const [updateColumns] = useUpdateAgencyClientTableColumnsMutation();
  const [createAgencyStatus] = useCreateAgencyStatusMutation();

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
    const newStatuses = statuses.filter((s) => !originalIds.has(s.id));
    try {
      for (const status of newStatuses) {
        await createAgencyStatus({
          name: status.name,
          color: status.backgroundColor || status.color,
          type: "client",
        }).unwrap();
      }
    } catch (error) {
      toast.error(
        error?.data?.data?.name[0] ||
          "Error creating new statuses. Please try again.",
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
            rejectedReasons={rejectedReasons}
            inactiveReasons={inactiveReasons}
            setRejectedReasons={setRejectedReasons}
            setInactiveReasons={setInactiveReasons}
            selectedStatusesForReason={selectedStatusesForReason}
            setSelectedStatusesForReason={setSelectedStatusesForReason}
          />
        </div>

        <DrawerFooter className="flex flex-row justify-end gap-2 p-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
          <Button
            onClick={handleSubmit}
            className="bg-gray-900 text-white hover:bg-gray-800"
          >
            Submit
          </Button>
        </DrawerFooter>
      </div>
    </RootDrawer>
  );
}

export default ClientTableSetting;
