"use client";

import ReusableInput from "@/components/common/InputFiled/ReusableInput";
import ReusableTextarea from "@/components/common/InputFiled/TextAreaField";
import { RichTextEditor } from "@/components/reusable/Editor";
import { updateFieldProperties } from "@/feature/slice/applicationBuilder/ApplicationFormSlice";
import { useDispatch } from "react-redux";
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

// ── Main Field Renderer ───────────────────────────────────────────────────────
interface FieldRendererProps {
  field: any;
  activeBlockId: string;
  activeSectionId: string | null;
}

export default function FieldRenderer({
  field,
  activeBlockId,
  activeSectionId,
}: FieldRendererProps) {
  const dispatch = useDispatch();

  switch (field.type) {
    case "text":
    case "number":
    case "email":
    case "tel":
      return (
        <ReusableInput
          label={field.label}
          type={field.type}
          required={field.required}
          placeholder={field.placeholder}
          className="w-full p-2.5 border rounded-lg bg-bgColor text-sm"
        />
      );

    case "textarea":
      return (
        <ReusableTextarea
          label={field.label}
          required={field.required}
          placeholder={field.placeholder}
          className="w-full bg-bgColor text-sm"
        />
      );

    case "password":
      return <CustomPassword field={field} />;

    case "rating":
      return <RatingFormSetting field={field} />;

    case "rating_group":
      return <RatingGroupSetting field={field} />;

    case "rich_text":
      return (
        <div className="border p-1 rounded-lg bg-bgColor">
          <RichTextEditor
            value={field.content || field.value || ""}
            onChange={(val: string) =>
              dispatch(
                updateFieldProperties({
                  blockId: activeBlockId,
                  sectionId: activeSectionId,
                  fieldId: field.id,
                  key: "content",
                  value: val,
                }),
              )
            }
          />
        </div>
      );

    case "select":
      return <SelectRenderer field={field} />;

    case "multi_select":
      return <DropdownRendererView field={field} />;

    case "radio":
      return <RadioRendererView field={field} />;

    case "radio_table":
      return <RadioTableRendererView field={field} />;

    case "checkbox":
      return <SingleCheckboxRendererView field={field} />;

    case "multi_select_checkbox":
      return <MultiCheckboxRendererView field={field} />;

    case "checkbox_table":
      return <CheckboxTableRendererView field={field} />;

    case "date":
      return <DatePickerRendererView field={field} />;

    case "time":
      return <TimePickerRendererView field={field} />;

    case "datetime":
      return <DateTimePickerRendererView field={field} />;

    case "file":
      return <FileUploadRendererView field={field} />;

    case "file_additional":
      return <FileAdditionalRendererView field={field} />;

    case "video_record":
      return <VideoRecorderRendererView field={field} />;

    case "signature":
      return <SignatureRendererView field={field} />;

    case "signature_file":
      return <SignatureFileRendererView field={field} />;

    case "salary_range":
      return <SalaryRangeRendererView field={field} />;

    case "payment":
      return <PaymentRendererView field={field} />;

    case "address_auto":
      return <AddressRendererView field={field} />;

    case "phone_country":
    case "phone_country_code":
      return <PhoneCountryRendererView field={field} />;

    case "time_availability":
      return <TimeAvailabilityRendererView field={field} />;

    case "language":
      return <LanguageRendererView field={field} />;

    case "booking":
      return (
        <BookingRendererView
          field={field}
          activeBlockId={activeBlockId}
          activeSectionId={activeSectionId}
        />
      );

    case "list_files":
      return <ListFilesRendererView field={field} />;

    case "stripe_subscription":
      return <SubscriptionPlanRendererView field={field} />;

    case "subscription_plan":
      return (
        <PlanRendererView
          field={field}
          activeBlockId={activeBlockId}
          activeSectionId={activeSectionId}
        />
      );

    case "evaluation":
      return <EvaluationRendererView field={field} />;

    case "job_placement":
      return <JobPlacementRendererView field={field} />;

    default:
      return (
        <ReusableInput
          label={field.label}
          type="text"
          required={field.required}
          placeholder={field.placeholder}
          className="w-full p-2.5 border rounded-lg bg-bgColor text-sm"
        />
      );
  }
}
