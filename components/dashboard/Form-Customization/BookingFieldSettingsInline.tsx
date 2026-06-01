import ReusableInput from "@/components/common/InputFiled/ReusableInput";
import { updateFieldProperties } from "@/feature/slice/applicationBuilder/ApplicationFormSlice";
import { ChevronDown } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
function BookingSettingsSwitchRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-borderColor bg-white px-3 py-2.5">
      <span className="text-xs font-medium text-gray-700">{label}</span>
      <button
        type="button"
        aria-pressed={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
          checked ? "bg-blackColor" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block h-5 w-5 rounded-full bg-white shadow-sm transition ${
            checked ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}

export default function BookingFieldSettingsInline({
  activeBlockId,
  activeFieldId,
  activeSectionId,
  activeField,
}: {
  activeBlockId: string;
  activeFieldId: string;
  activeSectionId?: string | null;
  activeField: any;
}) {
  const dispatch = useDispatch();
  const bookingData = useMemo(
    () =>
      activeField?.bookingData || {
        tab: "short",
        tabVisibility: { short: true, long: true },
      },
    [activeField?.bookingData],
  );
  const tabsState = bookingData.tabVisibility || { short: true, long: true };
  const [expandedTab, setExpandedTab] = useState<"short" | "long">(
    bookingData.tab || "short",
  );

  useEffect(() => {
    if (bookingData.tab === "short" && tabsState.short) {
      setExpandedTab("short");
      return;
    }
    if (bookingData.tab === "long" && tabsState.long) {
      setExpandedTab("long");
      return;
    }
    if (tabsState.short) {
      setExpandedTab("short");
      return;
    }
    if (tabsState.long) {
      setExpandedTab("long");
    }
  }, [bookingData.tab, tabsState.long, tabsState.short]);

  const updateBookingData = (nextData: any) => {
    dispatch(
      updateFieldProperties({
        blockId: activeBlockId,
        sectionId: activeSectionId,
        fieldId: activeFieldId,
        key: "bookingData",
        value: nextData,
      }),
    );
  };

  const updateTabVisibility = (tabKey: "short" | "long", checked: boolean) => {
    const nextTabs = { ...tabsState, [tabKey]: checked };
    if (!nextTabs.short && !nextTabs.long) return;

    const currentTab = bookingData.tab || "short";
    const nextActiveTab = nextTabs[currentTab]
      ? currentTab
      : nextTabs.short
        ? "short"
        : "long";

    setExpandedTab(nextActiveTab);
    updateBookingData({
      ...bookingData,
      tab: nextActiveTab,
      tabVisibility: nextTabs,
    });
  };

  const updateShortTerm = (key: string, value: any) => {
    updateBookingData({
      ...bookingData,
      tab: "short",
      tabVisibility: tabsState,
      shortTerm: {
        ...(bookingData.shortTerm || {}),
        [key]: value,
      },
      longTerm: bookingData.longTerm || {},
    });
  };

  const updateLongTerm = (key: string, value: any) => {
    updateBookingData({
      ...bookingData,
      tab: "long",
      tabVisibility: tabsState,
      shortTerm: bookingData.shortTerm || {},
      longTerm: {
        ...(bookingData.longTerm || {}),
        [key]: value,
      },
    });
  };

  const toggleRequired = (checked: boolean) => {
    updateFieldProperties({
      blockId: activeBlockId,
      sectionId: activeSectionId,
      fieldId: activeFieldId,
      key: "required",
      value: checked,
    });
  };

  return (
    <div className="space-y-4 border-t pt-4">
      <div>
        <h3 className="text-sm font-semibold text-gray-800">Tabs</h3>
        <div className="mt-2 space-y-2 rounded-xl border border-borderColor bg-bgColor p-3">
          <BookingSettingsSwitchRow
            label="Short-Term Booking"
            checked={tabsState.short}
            onChange={(checked) => updateTabVisibility("short", checked)}
          />
          <BookingSettingsSwitchRow
            label="Long-Term Booking"
            checked={tabsState.long}
            onChange={(checked) => updateTabVisibility("long", checked)}
          />
        </div>
      </div>

      <div className="space-y-3 rounded-xl border border-borderColor bg-white p-3">
        <button
          type="button"
          onClick={() => {
            setExpandedTab("short");
            updateBookingData({
              ...bookingData,
              tab: "short",
              tabs: tabsState,
            });
          }}
          className="flex w-full items-center justify-between rounded-lg border border-borderColor bg-white px-3 py-2 text-left"
        >
          <span className="text-sm font-semibold text-headerColor">
            Short-Term Booking
          </span>
          <ChevronDown size={16} className="text-gray-400" />
        </button>

        {expandedTab === "short" && (
          <div className="space-y-3">
            <ReusableInput
              value={bookingData.shortTerm?.bookingDate || ""}
              onChange={(event: any) =>
                updateShortTerm("bookingDate", event.target.value)
              }
              placeholder="Booking Date"
              className="w-full rounded-lg border border-borderColor bg-bgColor px-3 py-3 text-sm text-gray-700 outline-none"
            />
            <input
              value={bookingData.shortTerm?.startTime || ""}
              onChange={(event) =>
                updateShortTerm("startTime", event.target.value)
              }
              placeholder="Start Time"
              className="w-full rounded-lg border border-borderColor bg-bgColor px-3 py-3 text-sm text-gray-700 outline-none"
            />
            <ReusableInput
              value={bookingData.shortTerm?.endTime || ""}
              onChange={(event: any) =>
                updateShortTerm("endTime", event.target.value)
              }
              placeholder="End Time"
              className="w-full rounded-lg border border-borderColor bg-bgColor px-3 py-3 text-sm text-gray-700 outline-none"
            />
            <div className="space-y-2">
              <label className="block text-sm font-medium text-headerColor">
                Agency Fee per booking
              </label>
              <div className="relative">
                <ReusableInput
                  value={bookingData.shortTerm?.agencyFee || "100"}
                  onChange={(event: any) =>
                    updateShortTerm("agencyFee", event.target.value)
                  }
                  placeholder="100"
                  className="w-full rounded-lg border border-borderColor bg-bgColor px-3 py-3 pr-10 text-sm text-gray-700 outline-none"
                  endAdornment={<span className="text-gray-500">$</span>}
                />
              </div>
            </div>
            <label className="flex items-center gap-2 text-xs font-semibold text-gray-700">
              <input
                type="checkbox"
                checked={Boolean(activeField?.required)}
                onChange={(event) => toggleRequired(event.target.checked)}
                className="h-4 w-4 rounded border-gray-300"
              />
              Keep Mandatory
            </label>
            <div className="space-y-2 rounded-lg border border-borderColor bg-bgColor p-3">
              <ReusableInput
                value={
                  bookingData.shortTerm?.additionalDateLabel ||
                  "Add Additional Date"
                }
                onChange={(event: any) =>
                  updateShortTerm("additionalDateLabel", event.target.value)
                }
                placeholder="Add Additional Date"
                className="w-full rounded-lg border border-borderColor bg-white px-3 py-2 text-sm text-gray-700 outline-none"
              />
              <BookingSettingsSwitchRow
                label="Additional Date"
                checked={Boolean(bookingData.shortTerm?.additionalDateEnabled)}
                onChange={(checked) =>
                  updateShortTerm("additionalDateEnabled", checked)
                }
              />
            </div>
          </div>
        )}
      </div>

      <div className="space-y-3 rounded-xl border border-borderColor bg-white p-3">
        <button
          type="button"
          onClick={() => {
            setExpandedTab("long");
            updateBookingData({ ...bookingData, tab: "long", tabs: tabsState });
          }}
          className="flex w-full items-center justify-between rounded-lg border border-borderColor bg-white px-3 py-2 text-left"
        >
          <span className="text-sm font-semibold text-headerColor">
            Long-Term Booking
          </span>
          <ChevronDown size={16} className="text-gray-400" />
        </button>

        {expandedTab === "long" && (
          <div className="space-y-3">
            <ReusableInput
              value={bookingData.longTerm?.startDate || ""}
              onChange={(event: any) =>
                updateLongTerm("startDate", event.target.value)
              }
              placeholder="Start Date"
              className="w-full rounded-lg border border-borderColor bg-bgColor px-3 py-3 text-sm text-gray-700 outline-none"
            />
            <ReusableInput
              value={bookingData.longTerm?.endDate || ""}
              onChange={(event: any) =>
                updateLongTerm("endDate", event.target.value)
              }
              placeholder="End Date"
              className="w-full rounded-lg border border-borderColor bg-bgColor px-3 py-3 text-sm text-gray-700 outline-none"
            />
            <ReusableInput
              value={bookingData.longTerm?.startTime || ""}
              onChange={(event: any) =>
                updateLongTerm("startTime", event.target.value)
              }
              placeholder="Start Time"
              className="w-full rounded-lg border border-borderColor bg-bgColor px-3 py-3 text-sm text-gray-700 outline-none"
            />
            <ReusableInput
              value={bookingData.longTerm?.endTime || ""}
              onChange={(event: any) =>
                updateLongTerm("endTime", event.target.value)
              }
              placeholder="End Time"
              className="w-full rounded-lg border border-borderColor bg-bgColor px-3 py-3 text-sm text-gray-700 outline-none"
            />
            <div className="space-y-2">
              <label className="block text-sm font-medium text-headerColor">
                Agency Fee per booking
              </label>
              <div className="relative">
                <ReusableInput
                  value={bookingData.longTerm?.agencyFee || "100"}
                  onChange={(event: any) =>
                    updateLongTerm("agencyFee", event.target.value)
                  }
                  placeholder="100"
                  className="w-full rounded-lg border border-borderColor bg-bgColor px-3 py-3 pr-10 text-sm text-gray-700 outline-none"
                  endAdornment={<span className="text-gray-500">$</span>}
                />
              </div>
            </div>
            <label className="flex items-center gap-2 text-xs font-semibold text-gray-700">
              <input
                type="checkbox"
                checked={Boolean(activeField?.required)}
                onChange={(event) => toggleRequired(event.target.checked)}
                className="h-4 w-4 rounded border-gray-300"
              />
              Keep Mandatory
            </label>
            <div className="space-y-2 rounded-lg border border-borderColor bg-bgColor p-3">
              <ReusableInput
                value={
                  bookingData.longTerm?.additionalDateLabel ||
                  "Add Additional Date"
                }
                onChange={(event: any) =>
                  updateLongTerm("additionalDateLabel", event.target.value)
                }
                placeholder="Add Additional Date"
                className="w-full rounded-lg border border-borderColor bg-white px-3 py-2 text-sm text-gray-700 outline-none"
              />
              <BookingSettingsSwitchRow
                label="Additional Date"
                checked={Boolean(bookingData.longTerm?.additionalDateEnabled)}
                onChange={(checked) =>
                  updateLongTerm("additionalDateEnabled", checked)
                }
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
