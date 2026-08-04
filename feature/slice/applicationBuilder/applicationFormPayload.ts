import {
  Block,
  InputField,
  SectionField,
} from "./ApplicationFormSlice";

const FIELD_TYPE_MAP: Record<string, string> = {
  // Basic fields
  text: "text_box",
  textarea: "text_area",
  email: "email",
  number: "number",
  rating: "rating",
  rating_group: "rating_group",
  password: "password",
  rich_text: "rich_text_editor",
  language: "language_input",
  // Basic choice inputs
  select: "dropdown",
  multi_select: "multi_select_checkbox",
  radio: "radio",
  radio_table: "radio_table",
  checkbox: "single_checkbox",
  multi_select_checkbox: "multi_select_checkbox",
  checkbox_table: "checkbox_table",
  // Time & date
  time: "time_picker",
  date: "date_picker",
  datetime: "date_time_picker",
  time_availability: "time_availability",
  booking: "booking_section",
  // File & media inputs
  file: "file_upload",
  list_files: "list_files",
  video_record: "video_recorder",
  file_additional: "file_with_additional_information",
  // Signing & agreements
  signature: "signature",
  signature_file: "signature_file",
  // Payment
  salary_range: "salary_range",
  payment: "payment",
  stripe_subscription: "stripe_subscription_selection",
  subscription_plan: "stripe_subscription_selection",
  // Advanced inputs
  address_auto: "address_autocomplete",
  tel: "phone_country_code",
  phone_country: "phone_country_code",
  evaluation: "evaluation",
  job_placement: "placement_job_selection",
};

const WIDTH_MAP: Record<string, number> = {
  "1/4": 3,
  "1/3": 4,
  "1/2": 6,
  "2/3": 8,
  "3/4": 9,
  "1": 12,
  full: 12,
};

const capitalize = (value: string) =>
  value
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

const toSnakeCase = (value: string) =>
  String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/_{2,}/g, "_")
    .replace(/^_+|_+$/g, "");

const convertWidth = (width: string | number | undefined): number => {
  if (typeof width === "number") return width;
  return WIDTH_MAP[width ?? ""] ?? 12;
};

const convertField = (field: InputField) => {
  const converted: Record<string, any> = {
    type: FIELD_TYPE_MAP[field.type] ?? field.type,
    label: field.label,
    placeholder: field.placeholder ?? "",
    name: field.name ?? toSnakeCase(field.label),
    is_required: field.required ?? false,
    width: convertWidth(field.width),
  };

  if (field.options?.length) converted.options = field.options;
  if (field.items?.length) converted.items = field.items;

  return converted;
};

const convertBlockToSections = (block: Block) => {
  const sections: {
    name: string;
    fields: Record<string, any>[];
  }[] = [];

  let standaloneSection: { name: string; fields: Record<string, any>[] } | null =
    null;

  const flushStandaloneSection = () => {
    if (standaloneSection && standaloneSection.fields.length) {
      sections.push(standaloneSection);
    }
    standaloneSection = null;
  };

  for (const field of block.fields) {
    if (field.type === "section") {
      flushStandaloneSection();
      const section = field as SectionField;
      sections.push({
        name: section.label,
        fields: (section.inputs ?? []).map(convertField),
      });
    } else {
      if (!standaloneSection) {
        standaloneSection = { name: block.name, fields: [] };
      }
      standaloneSection.fields.push(convertField(field as InputField));
    }
  }

  flushStandaloneSection();

  return sections;
};

const buildFormName = (applicationType: Record<string, any>) => {
  const userType = String(applicationType.userType ?? "").toLowerCase();
  const typeValue = String(
    applicationType.applicationType ||
      applicationType.selectType ||
      "",
  );

  const parts = [userType, typeValue].filter(Boolean);
  if (!parts.length) return "Application Form";

  return `${capitalize(parts.join("_"))} Form`;
};

export const buildAgencyTemplatePayload = (state: {
  applicationType: Record<string, any>;
  blocks: Block[];
}) => {
  const { applicationType = {}, blocks = [] } = state;

  const userType = String(applicationType.userType ?? "").toLowerCase();
  const typeValue = String(
    applicationType.applicationType ||
      applicationType.selectType ||
      "",
  );

  const schemaBlocks = blocks
    .filter((block) => block.type !== "introduction")
    .map((block) => ({
      name: block.name,
      description: block.describe ?? block.description ?? "",
      sections: convertBlockToSections(block),
    }))
    .filter((block) => block.sections.length > 0);

  return {
    name: buildFormName(applicationType),
    application_type: toSnakeCase(typeValue),
    user_type: userType,
    schema: {
      blocks: schemaBlocks,
    },
  };
};
