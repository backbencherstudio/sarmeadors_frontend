"use client";

import CommonAccordion from "../CommonAccordion";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import MultiSelecte from "@/components/reusable/MultiSelecte";
import ReusableInput from "@/components/common/InputFiled/ReusableInput";
import StatusUpdatePart from "@/components/dashboard/StatusUpdatePart";
import ButtonReuseable from "@/components/reusable/CustomButton";
import { usePostCandidateSettingsUpdateMutation } from "@/feature/slice/settings/candidates/CandidateSettingsSlice";

const defaultColumns: Record<string, string> = {
  name: "Name",
  email_address: "Email",
  phone_number: "Phone",
  registration_date: "Registration Date",
  status: "Status",
};

interface DashboardData {
  table_fields: string[];
  display_labels: Record<string, string> | string[];
  use_admin_level_setting?: boolean;
  quick_search_field?: string | null;
  default_sort_field?: string | null;
  last_login_retrieval_days?: number | null;
  show_status_statistical_breakdowns?: boolean;
}

interface SelectOption {
  value: string;
  label: string;
}

export default function CandidateDashboardSettings({
  dashboardData,
  isLoading,
}: {
  dashboardData?: DashboardData;
  isLoading?: boolean;
}) {
  const availableColumns = (dashboardData?.table_fields || []).map((key) => ({
    key,
    label: defaultColumns[key] || key.replace(/_/g, " "),
  }));

  const [selectedKeys, setSelectedKeys] = useState<string[]>(
    dashboardData?.table_fields || [],
  );
  const [displayLabels, setDisplayLabels] = useState<Record<string, string>>(
    () => {
      const fields = dashboardData?.table_fields || [];
      const labels: Record<string, string> = {};
      fields.forEach((key) => {
        labels[key] = dashboardData?.display_labels?.[key] || "";
      });
      return labels;
    },
  );
  const [useAdminLevelSetting, setUseAdminLevelSetting] = useState(
    dashboardData?.use_admin_level_setting ?? false,
  );
  const [quickSearchField, setQuickSearchField] = useState(
    dashboardData?.quick_search_field || "",
  );
  const [defaultSortField, setDefaultSortField] = useState(
    dashboardData?.default_sort_field || "",
  );
  const [lastLoginRetrievalDays, setLastLoginRetrievalDays] = useState(
    dashboardData?.last_login_retrieval_days?.toString() || "",
  );
  const [statuses, setStatuses] = useState<any[]>([
    {
      id: "1",
      color: "#3B82F6",
      name: "Pre Application",
      textColor: "#ffffff",
      backgroundColor: "#3B82F6",
    },
    {
      id: "2",
      color: "#EF4444",
      name: "Application Started",
      textColor: "#ffffff",
      backgroundColor: "#EF4444",
    },
    {
      id: "3",
      color: "#14B8A6",
      name: "Active",
      textColor: "#ffffff",
      backgroundColor: "#14B8A6",
    },
    {
      id: "4",
      color: "#3B82F6",
      name: "Complete",
      textColor: "#ffffff",
      backgroundColor: "#3B82F6",
    },
    {
      id: "5",
      color: "#EAB308",
      name: "Inactive",
      textColor: "#000000",
      backgroundColor: "#EAB308",
    },
    {
      id: "6",
      color: "#10B981",
      name: "Lost",
      textColor: "#ffffff",
      backgroundColor: "#10B981",
    },
  ]);
  const [selectedStatusesForReason, setSelectedStatusesForReason] = useState<
    string[]
  >([]);
  const [statusReasons, setStatusReasons] = useState<Record<string, string>>(
    {},
  );
  const [postCandidateSettingsUpdate, { isLoading: isSaving }] =
    usePostCandidateSettingsUpdateMutation();

  useEffect(() => {
    if (!dashboardData) return;

    setSelectedKeys(dashboardData.table_fields || []);
    setUseAdminLevelSetting(dashboardData.use_admin_level_setting ?? false);
    setQuickSearchField(dashboardData.quick_search_field || "");
    setDefaultSortField(dashboardData.default_sort_field || "");
    setLastLoginRetrievalDays(
      dashboardData.last_login_retrieval_days?.toString() || "",
    );

    const labels: Record<string, string> = {};
    (dashboardData.table_fields || []).forEach((key) => {
      labels[key] =
        (
          dashboardData.display_labels as
            | Record<string, string | null>
            | undefined
        )?.[key] || "";
    });

    if (
      dashboardData.display_labels &&
      Array.isArray(dashboardData.display_labels)
    ) {
      dashboardData.display_labels.forEach((label: string) => {
        const col = availableColumns.find((c) => c.label === label);
        if (col) {
          labels[col.key] = label;
        }
      });
    }

    setDisplayLabels(labels);
  }, [dashboardData]);

  const handleSubmit = async () => {
    const displayLabelsPayload: Record<string, string> = {};
    selectedKeys.forEach((key) => {
      displayLabelsPayload[key] = displayLabels[key] || "";
    });

    const dashboardPayload = {
      table_fields: selectedKeys,
      display_labels: displayLabelsPayload,
      use_admin_level_setting: useAdminLevelSetting,
      quick_search_field: quickSearchField || null,
      default_sort_field: defaultSortField || null,
      last_login_retrieval_days: lastLoginRetrievalDays
        ? parseInt(lastLoginRetrievalDays, 10)
        : null,
      show_status_statistical_breakdowns: false,
    };

    try {
      const response = await postCandidateSettingsUpdate({
        dashboard: dashboardPayload,
      }).unwrap();
      toast.success("Dashboard settings saved successfully!");

      if (response?.data?.dashboard) {
        setSelectedKeys(response.data.dashboard.table_fields || []);
        setUseAdminLevelSetting(
          response.data.dashboard.use_admin_level_setting ?? false,
        );
        setQuickSearchField(response.data.dashboard.quick_search_field || "");
        setDefaultSortField(response.data.dashboard.default_sort_field || "");
        setLastLoginRetrievalDays(
          response.data.dashboard.last_login_retrieval_days?.toString() || "",
        );

        const labels: Record<string, string> = {};
        (response.data.dashboard.table_fields || []).forEach((key) => {
          labels[key] =
            (
              response.data.dashboard.display_labels as
                | Record<string, string | null>
                | undefined
            )?.[key] || "";
        });

        if (
          response.data.dashboard.display_labels &&
          Array.isArray(response.data.dashboard.display_labels)
        ) {
          response.data.dashboard.display_labels.forEach((label: string) => {
            const col = availableColumns.find((c) => c.label === label);
            if (col) {
              labels[col.key] = label;
            }
          });
        }

        setDisplayLabels(labels);
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Error saving settings. Please try again.",
      );
    }
  };

  return (
    <CommonAccordion title="Candidate Dashboard Settings">
      <div className="px-4 space-y-4">
        {isLoading ? (
          <div className="text-sm text-gray-500">Loading columns...</div>
        ) : (
          <>
            <label
              htmlFor="column-select"
              className="block text-sm font-medium text-gray-700"
            >
              Fields which are showed in the Candidate table of agency dashboard
              (Agency Level)
            </label>
            <MultiSelecte
              placeholder="Select columns to display"
              value={availableColumns
                .filter((col) => selectedKeys.includes(col.key))
                .map((col) => ({
                  value: col.key,
                  label: col.key,
                }))}
              onChange={(opts: SelectOption[]) =>
                setSelectedKeys(opts.map((o) => o.value))
              }
              options={availableColumns.map((col) => ({
                value: col.key,
                label: col.key,
              }))}
            />
            <div className="grid grid-cols-2 items-center gap-3">
              {selectedKeys.map((key) => {
                const col = availableColumns.find((c) => c.key === key);
                if (!col) return null;
                return (
                  <div key={key} className="">
                    <label className="text-sm font-medium text-gray-700 capitalize mb-2 block">
                      {col.label}
                    </label>
                    <ReusableInput
                      value={displayLabels[key] || ""}
                      onChange={(e) =>
                        setDisplayLabels((prev) => ({
                          ...prev,
                          [key]: e.target.value,
                        }))
                      }
                      placeholder="Enter display label"
                    />
                  </div>
                );
              })}
            </div>

            <div className="flex gap-3 items-center mt-4 mb-2">
              <input
                type="checkbox"
                checked={useAdminLevelSetting}
                onChange={(e) => setUseAdminLevelSetting(e.target.checked)}
                id="admin-level"
              />
              <label htmlFor="admin-level" className="text-sm text-[#384250]">
                Use admin level setting for fields which are showed in the
                candidate table of agency dashboard
              </label>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-base font-medium mb-1">
                  Quick search field for Candidate table of agency dashboard
                </label>
                <select
                  value={quickSearchField}
                  onChange={(e) => setQuickSearchField(e.target.value)}
                  className="w-full appearance-none border border-gray-300 rounded-lg p-4 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-gray-300 transition pr-10"
                >
                  <option value="">Select field</option>
                  {availableColumns.map((col) => (
                    <option key={col.key} value={col.key}>
                      {col.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-base font-medium mb-1">
                  Default sort field for Candidate table of agency dashboard
                </label>
                <select
                  value={defaultSortField}
                  onChange={(e) => setDefaultSortField(e.target.value)}
                  className="w-full appearance-none border border-gray-300 rounded-lg p-4 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-gray-300 transition pr-10"
                >
                  <option value="">Select field</option>
                  {availableColumns.map((col) => (
                    <option key={col.key} value={col.key}>
                      {col.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-base font-medium mb-1">
                  Number of last login retrieval days for Candidate table of
                  agency dashboard
                </label>
                <input
                  type="text"
                  value={lastLoginRetrievalDays}
                  onChange={(e) => setLastLoginRetrievalDays(e.target.value)}
                  placeholder="Enter number of days"
                  className="w-full bg-white border border-gray-300 rounded-lg p-4 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
                />
              </div>
            </div>
          </>
        )}
      </div>

      <div className="mt-6">
        <StatusUpdatePart
          statuses={statuses}
          setStatuses={setStatuses}
          selectedStatusesForReason={selectedStatusesForReason}
          setSelectedStatusesForReason={setSelectedStatusesForReason}
          statusReasons={statusReasons}
          setStatusReasons={setStatusReasons}
        />
      </div>

      <div className="flex justify-end mt-6 gap-2 px-4 pb-4">
        <ButtonReuseable
          onClick={handleSubmit}
          loading={isSaving}
          title="Save"
          sendingMsg={"Saving..."}
          className="bg-gray-900 text-white hover:bg-gray-800"
        />
      </div>
    </CommonAccordion>
  );
}
