"use client";

import ReusableInput from "@/components/common/InputFiled/ReusableInput";
import ReusableTextarea from "@/components/common/InputFiled/TextAreaField";
import { RichTextEditor } from "@/components/reusable/Editor";
import AddressRendererView from "./AddressRenderer";
import BookingRendererView from "./BookingFormRenderer";
import CheckboxTableRendererView from "./CheckboxTableRenderer";
import CustomPassword from "./CustomPassword";
import DatePickerRendererView from "./DatePickerRenderer";
import DateTimePickerRendererView from "./DateTimePickerRenderer";
import DropdownRendererView from "./DropdownRenderer";
import EvaluationRendererView from "./EvaluationRenderer";
import FileAdditionalRendererView from "./FileAdditionalRenderer";
import FileUploadRendererView from "./FileUploadRenderer";
import JobPlacementRendererView from "./JobPlacementRenderer";
import LanguageRendererView from "./LanguageRenderer";
import ListFilesRendererView from "./ListFilesRenderer";
import MultiCheckboxRendererView from "./MultiCheckboxRenderer";
import PaymentRendererView from "./PaymentRenderer";
import PhoneCountryRendererView from "./PhoneCountryRenderer";
import PlanRendererView from "./PlanRenderer";
import RadioRendererView from "./RadioRenderer";
import RadioTableRendererView from "./RadioTableRenderer";
import RatingFormSetting from "./RatingFormSetting";
import RatingGroupSetting from "./RatingGroupSetting";
import SalaryRangeRendererView from "./SalaryRangeRenderer";
import SelectRenderer from "./SelecteRender";
import SignatureFileRendererView from "./SignatureFileRenderer";
import SignatureRendererView from "./SignatureRenderer";
import SingleCheckboxRendererView from "./SingleCheckboxRenderer";
import SubscriptionPlanRendererView from "./SubscriptionPlanRenderer";
import TimeAvailabilityRendererView from "./TimeAvailabilityRenderer";
import TimePickerRendererView from "./TimePickerRenderer";
import VideoRecorderRendererView from "./VideoRecorderRenderer";

interface PreviewProps {
  element: {
    id: string;
    label: string;
    type: string;
    description: string;
    options?: string[];
    items?: string[];
  };
  label: string;
  placeholder: string;
}

export default function AddInputFieldPreview({
  element,
  label,
  placeholder,
}: PreviewProps) {
  const displayLabel = label || element.label;
  const displayPlaceholder = placeholder || "Enter text here";

  switch (element.type) {
    case "text":
    case "number":
    case "email":
    case "tel":
      return (
        <ReusableInput
          label={displayLabel}
          type={element.type}
          required={false}
          placeholder={displayPlaceholder}
          className="w-full p-2.5 border rounded-lg bg-bgColor text-sm"
        />
      );

    case "textarea":
      return (
        <ReusableTextarea
          label={displayLabel}
          required={false}
          placeholder={displayPlaceholder}
          className="w-full bg-bgColor text-sm"
        />
      );

    case "password":
      return <CustomPassword field={element} />;

    case "rating":
      return <RatingFormSetting field={element} />;

    case "rating_group":
      return <RatingGroupSetting field={element} />;

    case "rich_text":
      return (
        <div className="border p-1 rounded-lg bg-bgColor">
          <RichTextEditor onChange={() => {}} value={""} />
        </div>
      );

    case "select":
      return <SelectRenderer field={element} />;

    case "multi_select":
      return <DropdownRendererView field={element} />;

    case "radio":
      return <RadioRendererView field={element} />;

    case "radio_table":
      return <RadioTableRendererView field={element} />;

    case "checkbox":
      return <SingleCheckboxRendererView field={element} />;

    case "multi_select_checkbox":
      return <MultiCheckboxRendererView field={element} />;

    case "checkbox_table":
      return <CheckboxTableRendererView field={element} />;

    case "date":
      return <DatePickerRendererView field={element} />;

    case "time":
      return <TimePickerRendererView field={element} />;

    case "datetime":
      return <DateTimePickerRendererView field={element} />;

    case "file":
      return <FileUploadRendererView field={element} />;

    case "file_additional":
      return <FileAdditionalRendererView field={element} />;

    case "video_record":
      return <VideoRecorderRendererView field={element} />;

    case "signature":
      return <SignatureRendererView field={element} />;

    case "signature_file":
      return <SignatureFileRendererView field={element} />;

    case "salary_range":
      return <SalaryRangeRendererView field={element} />;

    case "payment":
      return <PaymentRendererView field={element} />;

    case "address_auto":
      return <AddressRendererView field={element} />;

    case "phone_country":
    case "phone_country_code":
      return <PhoneCountryRendererView field={element} />;

    case "time_availability":
      return <TimeAvailabilityRendererView field={element} />;

    case "language":
      return <LanguageRendererView field={element} />;

    case "booking":
      return (
        <BookingRendererView
          field={element}
          activeBlockId={""}
          activeSectionId={""}
        />
      );

    case "list_files":
      return <ListFilesRendererView field={element} />;

    case "stripe_subscription":
      return <SubscriptionPlanRendererView field={element} />;

    case "subscription_plan":
      return (
        <PlanRendererView field={element} activeBlockId={""} activeSectionId={""} />
      );

    case "evaluation":
      return <EvaluationRendererView field={element} />;

    case "job_placement":
      return <JobPlacementRendererView field={element} />;
    case "section":
      return (
        <div className="space-y-3 w-full">
          <span className="text-xs font-bold text-gray-400 uppercase">
            Section Layout Wrapper
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-gray-50/50 p-3 border border-dashed border-gray-300 rounded-xl">
            {(
              element.items || [
                "Title Field 1",
                "Title Field 2",
                "Title Field 3",
                "Title Field 4",
              ]
            ).map((item, idx) => (
              <div
                key={idx}
                className="p-3 bg-white border border-gray-200 rounded-lg shadow-2xs"
              >
                <label className="block text-[10px] font-bold text-gray-500 mb-1">
                  {item} *
                </label>
                <div className="w-full p-2 bg-gray-50 border border-gray-100 rounded-sm text-[11px] text-gray-300">
                  Input area
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    default:
      return (
        <ReusableInput
          label={element.label}
          type="text"
          required={false}
          placeholder={"Enter text here"}
          className="w-full p-2.5 border rounded-lg bg-bgColor text-sm"
        />
      );
  }
}
