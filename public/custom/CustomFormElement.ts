export interface ElementItem {
  id: string;
  label: string;
  type: string;
  description: string;
  options?: string[];
  items?: string[];
}

export interface ElementCategory {
  category: string;
  items: ElementItem[];
}

export const FORM_ELEMENT_CATEGORIES: ElementCategory[] = [
  {
    category: "Basic Fields",
    items: [
      {
        id: "text",
        label: "Text Box",
        type: "text",
        description: "Allow users to enter a single line of text.",
      },
      {
        id: "number",
        label: "Number",
        type: "number",
        description: "Allow users to enter a numeric value.",
      },
      {
        id: "textarea",
        label: "Text Area",
        type: "textarea",
        description: "Allow users to enter multiple lines of text.",
      },
      {
        id: "rating",
        label: "Rating",
        type: "rating",
        description: "Collect star ratings from users.",
      },
      {
        id: "rating_group",
        label: "Rating Group",
        type: "rating_group",
        description: "Group of multiple rating matrices.",
      },
      {
        id: "password",
        label: "Password",
        type: "password",
        description: "Secure credential input field.",
      },
      {
        id: "rich_text",
        label: "Rich Text Editor",
        type: "rich_text",
        description: "Styled text input with formatting options.",
      },
      {
        id: "language",
        label: "Language Input",
        type: "language",
        description: "Select or input preferred languages.",
      },
    ],
  },
  {
    category: "Basic Choice Inputs",
    items: [
      {
        id: "selected_option",
        label: "Dropdown",
        type: "select",
        description: "Select an option from a dropdown list.",
      },
      {
        id: "radio",
        label: "Radio",
        type: "radio",
        description: "Select a single option from a list.",
      },
      {
        id: "radio_table",
        label: "Radio Table",
        type: "radio_table",
        description: "Matrix selection using radio buttons.",
      },
      
      {
        id: "single_checkbox",
        label: "Single Checkbox",
        type: "checkbox",
        description: "A single toggle checkbox selection.",
      },
      
      {
        id: "multi_select_checkbox",
        label: "Multi Select Checkbox",
        type: "multi_select_checkbox",
        description: "Advanced checklist selection layout.",
      },
      {
        id: "checkbox_table",
        label: "Checkbox Table",
        type: "checkbox_table",
        description: "Matrix grid selection using checkboxes.",
      },
      {
        id: "multi_select",
        label: "Multi Select",
        type: "multi_select",
        description: "Select multiple values from an input selector.",
      },
      
    ],
  },
  {
    category: "Time & Date",
    items: [
      {
        id: "time_picker",
        label: "Time Picker",
        type: "time",
        description: "Select specific hours and minutes.",
      },
      {
        id: "date_picker",
        label: "Date Picker",
        type: "date",
        description: "Select a single standard calendar date.",
      },
      {
        id: "date_time_picker",
        label: "Date & Time Picker",
        type: "datetime",
        description: "Select both precise date and exact time.",
      },
      
      {
        id: "time_availability",
        label: "Time Availability",
        type: "time_availability",
        description: "Configure weekly or daily slot availability.",
      },
      {
        id: "booking_section",
        label: "Booking Section",
        type: "booking",
        description: "Schedule and book specific calendar appointments.",
      },
    ],
  },
  {
    category: "File & Media Inputs",
    items: [
      {
        id: "file_upload",
        label: "File Upload",
        type: "file",
        description: "Upload a generic document or media file.",
      },
      {
        id: "list_files",
        label: "List Files",
        type: "list_files",
        description: "Display and manage multiple file list assets.",
      },
      {
        id: "video_recorder",
        label: "Video Recorder",
        type: "video_record",
        description: "Capture live video content directly from client camera.",
      },
      {
        id: "file_additional",
        label: "File with Additional Information",
        type: "file_additional",
        description: "Upload asset along with contextual metadata description.",
      },
    ],
  },
  {
    category: "Signing & Agreements",
    items: [
      {
        id: "signature",
        label: "Signature",
        type: "signature",
        description: "Draw or input authentication signature.",
      },
      {
        id: "signature_file",
        label: "Signature File",
        type: "signature_file",
        description:
          "Dedicated bounding box container for verification signatures.",
      },
      
    ],
  },
  {
    category: "Payment & Subscription",
    items: [
      {
        id: "salary_range",
        label: "Salary Range",
        type: "salary_range",
        description: "Configure minimum and maximum compensation parameters.",
      },
      {
        id: "payment",
        label: "Payment",
        type: "payment",
        description: "Process transaction gateways securely.",
      },
      {
        id: "stripe_subscription",
        label: "Stripe Subscription Selection",
        type: "stripe_subscription",
        description: "Select continuous recurring Stripe payment structures.",
      },
     
      {
        id: "subscription_plan",
        label: "Subscription plan",
        type: "subscription_plan",
        description: "Choose standard automated monthly localized tokens.",
      },
      {
        id: "phone_country_code",
        label: "Phone Country Code",
        type: "phone_country_code",
        description: "Choose standard automated monthly localized tokens.",
      },
    ],
  },
  
  {
    category: "Layout & Display",
    items: [
      
      {
        id: "section",
        label: "Section",
        type: "section",
        description:
          "Grouping structure container wrapping multiple dynamic fields.",
      },
    
    ],
  },
  {
    category: "Advanced Inputs",
    items: [
      {
        id: "address_autocomplete",
        label: "Address Autocomplete",
        type: "address_auto",
        description: "Suggest locations in real-time via integrated map APIs.",
      },
      {
        id: "phone_country",
        label: "Phone Country Code",
        type: "phone_country",
        description:
          "Standard phone number validation along with international prefixes.",
      },
      {
        id: "evaluation",
        label: "Evaluation",
        type: "evaluation",
        description:
          "Advanced operational multi-stage assessment scoring matrices.",
      },
      {
        id: "placement_job",
        label: "Placement Job Selection",
        type: "job_placement",
        description:
          "Match targeted parameters against internal vacancies list.",
      },
    ],
  },
 
];
