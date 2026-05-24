export interface ElementItem {
  id: string;
  label: string;
  type: string;
  description: string;
}

export interface ElementCategory {
  category: string;
  items: ElementItem[];
}

export const FORM_ELEMENT_CATEGORIES: ElementCategory[] = [
  {
    category: "Basic Fields",
    items: [
      { id: "text", label: "Text Box", type: "text", description: "Allow users to enter a single line of text." },
      { id: "textarea", label: "Text Area", type: "textarea", description: "Allow users to enter multiple lines of text." },
      { id: "rating", label: "Rating", type: "rating", description: "Collect star ratings from users." },
      { id: "rating_group", label: "Rating Group", type: "rating_group", description: "Group of multiple rating matrices." },
      { id: "password", label: "Password", type: "password", description: "Secure credential input field." },
      { id: "rich_text", label: "Rich Text Editor", type: "rich_text", description: "Styled text input with formatting options." },
      { id: "language", label: "Language Input", type: "language", description: "Select or input preferred languages." }
    ]
  },
  {
    category: "Basic Choice Inputs",
    items: [
      { id: "dropdown", label: "Dropdown", type: "select", description: "Select an option from a dropdown list." },
      { id: "radio", label: "Radio", type: "radio", description: "Select a single option from a list." },
      { id: "radio_table", label: "Radio Table", type: "radio_table", description: "Matrix selection using radio buttons." },
      { id: "checkbox_icon", label: "Checkbox Icon", type: "checkbox_icon", description: "Icon-based checkbox selector." },
      { id: "single_checkbox", label: "Single Checkbox", type: "checkbox", description: "A single toggle checkbox selection." },
      { id: "group_checkbox", label: "Group Checkbox", type: "group_checkbox", description: "Multiple standalone checkbox choices." },
      { id: "multi_select_checkbox", label: "Multi Select Checkbox", type: "multi_select_checkbox", description: "Advanced checklist selection layout." },
      { id: "checkbox_table", label: "Checkbox Table", type: "checkbox_table", description: "Matrix grid selection using checkboxes." },
      { id: "multi_select", label: "Multi Select", type: "multi_select", description: "Select multiple values from an input selector." },
      { id: "checkbox_condition", label: "Checkbox Condition", type: "checkbox_condition", description: "Conditional checkbox with rule validation." }
    ]
  },
  {
    category: "Time & Date",
    items: [
      { id: "time_picker", label: "Time Picker", type: "time", description: "Select specific hours and minutes." },
      { id: "date_picker", label: "Date Picker", type: "date", description: "Select a single standard calendar date." },
      { id: "month_picker", label: "Month Picker", type: "month", description: "Filter or select a calendar month." },
      { id: "year_picker", label: "Year Picker", type: "year", description: "Filter or select a calendar year." },
      { id: "date_time_picker", label: "Date & Time Picker", type: "datetime", description: "Select both precise date and exact time." },
      { id: "multi_date_picker", label: "Multi Date Picker", type: "multi_date", description: "Choose multiple standalone dates." },
      { id: "time_availability", label: "Time Availability", type: "time_availability", description: "Configure weekly or daily slot availability." },
      { id: "booking_section", label: "Booking Section", type: "booking", description: "Schedule and book specific calendar appointments." }
    ]
  },
  {
    category: "File & Media Inputs",
    items: [
      { id: "file_upload", label: "File Upload", type: "file", description: "Upload a generic document or media file." },
      { id: "list_files", label: "List Files", type: "list_files", description: "Display and manage multiple file list assets." },
      { id: "video_recorder", label: "Video Recorder", type: "video_record", description: "Capture live video content directly from client camera." },
      { id: "file_additional", label: "File with Additional Information", type: "file_additional", description: "Upload asset along with contextual metadata description." }
    ]
  },
  {
    category: "Signing & Agreements",
    items: [
      { id: "signature", label: "Signature", type: "signature", description: "Draw or input authentication signature." },
      { id: "signature_field", label: "Signature Field", type: "signature_field", description: "Dedicated bounding box container for verification signatures." },
      { id: "auto_log", label: "Auto Log", type: "auto_log", description: "Automated systemic validation activity logging tracker." },
      { id: "sign_document", label: "Sign Document", type: "sign_document", description: "Digital signature interface over loaded document contracts." },
      { id: "drawing_signature", label: "Drawing Signature", type: "drawing_signature", description: "Freehand vector canvas drawing sketch component." }
    ]
  },
  {
    category: "Payment & Subscription",
    items: [
      { id: "salary_range", label: "Salary Range", type: "salary_range", description: "Configure minimum and maximum compensation parameters." },
      { id: "payment", label: "Payment", type: "payment", description: "Process transaction gateways securely." },
      { id: "stripe_subscription", label: "Stripe Subscription Selection", type: "stripe_subscription", description: "Select continuous recurring Stripe payment structures." },
      { id: "credit_package_condition", label: "Credit Package Condition", type: "credit_condition", description: "Rule validation metrics dependent on bundle tokens." },
      { id: "monthly_credit_selection", label: "Monthly Credit Package Selection", type: "monthly_credit", description: "Choose standard automated monthly localized tokens." }
    ]
  },
  {
    category: "List Inputs",
    items: [
      { id: "list_items", label: "List Items", type: "list_items", description: "Dynamically append simple structured row collections." },
      { id: "list_text_field", label: "List Text Field", type: "list_text", description: "Add scalable standalone linear text input items." },
      { id: "list_textbox", label: "List Textbox", type: "list_textbox", description: "Multi-column list dynamic inputs generator array." }
    ]
  },
  {
    category: "Layout & Display",
    items: [
      { id: "label", label: "Label", type: "label", description: "Static alphanumeric typography heading view item." },
      { id: "separator", label: "Separator", type: "separator", description: "Visual horizontal line divider context spacing node." },
      { id: "section", label: "Section", type: "section", description: "Grouping structure container wrapping multiple dynamic fields." },
      { id: "preset_section", label: "Preset Section", type: "preset_section", description: "Load global layout templates instantly into current form." },
      { id: "html", label: "HTML", type: "html", description: "Inject pure custom raw layout markup source scripts safely." },
      { id: "preset_fields", label: "Preset Fields", type: "preset_fields", description: "Preconfigured standalone element assets arrays." },
      { id: "html_selection", label: "HTML Selection", type: "html_selection", description: "Dynamic components utilizing targeted custom syntax templates." },
      { id: "display_expression", label: "Display Value by Expression", type: "expression_view", description: "Render programmatic runtime reactive output evaluations." }
    ]
  },
  {
    category: "Advanced Inputs",
    items: [
      { id: "address_autocomplete", label: "Address Autocomplete", type: "address_auto", description: "Suggest locations in real-time via integrated map APIs." },
      { id: "phone_country", label: "Phone Country Code", type: "phone_country", description: "Standard phone number validation along with international prefixes." },
      { id: "evaluation", label: "Evaluation", type: "evaluation", description: "Advanced operational multi-stage assessment scoring matrices." },
      { id: "placement_job", label: "Placement Job Selection", type: "job_placement", description: "Match targeted parameters against internal vacancies list." }
    ]
  },
  {
    category: "Predefined Section",
    items: [
      { id: "predef_address", label: "Address Autocomplete", type: "predef_address", description: "Predefined unified residential location container stack." },
      { id: "predef_phone", label: "Phone Country Code", type: "predef_phone", description: "Preconfigured localized communications network identity cluster." },
      { id: "predef_evaluation", label: "Evaluation", type: "predef_evaluation", description: "Standardized system vetting structural criteria layout." },
      { id: "predef_placement", label: "Placement Job Selection", type: "predef_placement", description: "Enterprise framework matching parameters structure node." }
    ]
  }
];