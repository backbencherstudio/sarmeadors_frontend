import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InputField {
  id: string;
  type: string;
  label: string;
  shortDescription?: string;
  placeholder?: string;
  required?: boolean;
  width?: "1/4" | "1/2" | "3/4" | "1";
  isFixed?: boolean;
  profileLabel?: string;
  // Extended properties for specific field types
  maxRating?: number;
  items?: string[];
  options?: string[];
  layout?: "horizontal" | "vertical";
  columns?: string[];
  rows?: string[];
  multiSelect?: boolean;
  yesNo?: boolean;
  listFile?: boolean;
  billingAddress?: boolean;
  additionalNote?: boolean;
  content?: string;
}

export interface SectionField {
  id: string;
  type: "section";
  label: string;
  isSection: boolean;
  isFixed?: boolean;
  inputs: InputField[];
}

export interface Block {
  id: string;
  name: string;
  type: "introduction" | "dynamic";
  isFixed?: boolean;
  describe?: string;
  logoUrl?: string;
  title?: string;
  description?: string;
  buttonLabel?: string;
  buttonLink?: string;
  fields: (InputField | SectionField)[];
}

interface ApplicationFormState {
  applicationType: any;
  customElements: any[];
  blocks: Block[];
  activeBlockId: string | null;
  activeSectionId: string | null;
  activeFieldId: string | null;
}

const INTRO_BLOCK: Block = {
  id: "intro-block-1",
  name: "Introduction",
  type: "introduction",
  describe: "Set your logo & form title here",
  logoUrl: "",
  title: "Family Form - Nanny",
  description: "Not sure if you are ready to go ahead?",
  buttonLabel: "Button Text",
  buttonLink: "",
  fields: [],
};

const FIXED_REGISTRATION_FIELDS: InputField[] = [
  {
    id: "fixed_image",
    type: "file",
    label: "Profile Picture",
    required: false,
    isFixed: true,
    width: "1",
  },
  {
    id: "fixed_first_name",
    type: "text",
    label: "First Name",
    placeholder: "Enter first name",
    required: true,
    isFixed: true,
    width: "1/2",
  },
  {
    id: "fixed_last_name",
    type: "text",
    label: "Last Name",
    placeholder: "Enter last name",
    required: true,
    isFixed: true,
    width: "1/2",
  },
  {
    id: "fixed_email",
    type: "email",
    label: "Email",
    placeholder: "Enter email address",
    required: true,
    isFixed: true,
    width: "1/2",
  },
  {
    id: "fixed_mobile",
    type: "tel",
    label: "Mobile",
    placeholder: "Enter mobile number",
    required: true,
    isFixed: true,
    width: "1/2",
  },

  {
    id: "fixed_type",
    type: "select",
    label: "User Type",
    required: false,
    isFixed: true,
    width: "1",
  },
  {
    id: "fixed_location",
    type: "text",
    label: "Location",
    placeholder: "Enter location",
    required: false,
    isFixed: true,
    width: "1",
  },
  {
    id: "fixed_hear_about_us",
    type: "textarea",
    label: "How did you hear about us?",
    required: false,
    isFixed: true,
    width: "1",
  },
];

const FIXED_CLIENT_ADD_USER_BLOCK: Block = {
  id: "client-add-user-block",
  name: "Basic Information",
  type: "dynamic",
  isFixed: true,
  describe: "Basic information about the user",
  fields: [
    {
      id: "client_add_user_profile_picture",
      type: "file",
      label: "Profile Picture",
      required: false,
      isFixed: true,
      width: "1",
    },
    {
      id: "client_add_user_first_name",
      type: "text",
      label: "First Name",
      placeholder: "First Name",
      required: true,
      isFixed: true,
      width: "1/2",
    },
    {
      id: "client_add_user_last_name",
      type: "text",
      label: "Last Name",
      placeholder: "Last Name",
      required: true,
      isFixed: true,
      width: "1/2",
    },
    {
      id: "client_add_user_email",
      type: "email",
      label: "Email",
      placeholder: "Email",
      required: true,
      isFixed: true,
      width: "1/2",
    },
    {
      id: "client_add_user_phone_number",
      type: "number",
      label: "Phone Number",
      placeholder: "Phone Number",
      required: false,
      isFixed: true,
      width: "1/2",
    },
    {
      id: "client_add_user_user_types",
      type: "select",
      label: "User Types",
      placeholder: "Start typing to filter",
      required: false,
      isFixed: true,
      width: "1",
    },
    {
      id: "client_add_user_locations",
      type: "select",
      label: "Locations",
      placeholder: "Start typing to filter",
      required: false,
      isFixed: true,
      width: "1",
    },
  ],
};
const FIXED_LONG_TERM_BLOCK: Block = {
  id: "long-term-block",
  name: "Basic Information",
  type: "dynamic",
  isFixed: true,
  describe: "Basic information about the user",
  fields: [
    {
      id: "long_term_revenue_generated",
      type: "number",
      label: "How much revenue was generated from this jobl (Admin Only)",
      required: false,
      placeholder: "Enter revenue amount",
      isFixed: true,
      width: "1",
    },
    {
      id: "long_term_date_revenue_generated",
      type: "text",
      label: "Date Revenue Generated? (Admin Only)",
      placeholder: "Date Revenue Generated",
      required: true,
      isFixed: true,
      width: "1/2",
    },
    {
      id: "long_term_title",
      type: "text",
      label: "Title",
      placeholder: "Title",
      required: true,
      isFixed: true,
      width: "1/2",
    },
    {
      id: "long_term_address",
      type: "address_auto",
      label: "Address",
      placeholder: "Address",
      required: true,
      isFixed: true,
      width: "1/2",
    },
    {
      id: "long_term_locations",
      type: "select",
      label: "Locations",
      placeholder: "locations",
      required: false,
      isFixed: true,
      width: "1/2",
    },
    {
      id: "long_term_start_date",
      type: "date",
      label: "Start Date",
      placeholder: "Start Date",
      required: false,
      isFixed: true,
      width: "1",
    },
    {
      id: "long_term_schedule",
      type: "text",
      label: "Schedule",
      placeholder: "type your schedule",
      required: false,
      isFixed: true,
      width: "1",
    },
    {
      id: "long_term_children",
      type: "text",
      label: "Children",
      placeholder: "Enter number of children",
      required: false,
      isFixed: true,
      width: "1",
    },
    {
      id: "long_term_description",
      type: "textarea",
      label: "Description",
      placeholder: "Enter description",
      required: false,
      isFixed: true,
      width: "1",
    },
    {
      id: "long_term_upload_picture",
      type: "file",
      label: "Upload Picture",
      required: false,
      isFixed: true,
      width: "1",
    },
  ],
};

const FIXED_SCHEDULE_INTERVIEW_BLOCK: Block = {
  id: "schedule-interview-block",
  name: "Schedule Interview",
  type: "dynamic",
  isFixed: true,
  describe: "Schedule an interview",
  fields: [
    {
      id: "si_event_date",
      type: "date",
      label: "Event Date",
      required: false,
      isFixed: true,
      width: "1",
    },
    {
      id: "si_event_time",
      type: "text",
      label: "Event Time",
      placeholder: "eg. interview",
      required: true,
      isFixed: true,
      width: "1/2",
    },
    {
      id: "si_candidate_name",
      type: "select",
      label: "Time Zone",
      placeholder: "Start typing to filter",
      required: true,
      isFixed: true,
      width: "1/2",
    },
    {
      id: "si_select_candidate",
      type: "select",
      label: "Select Candidate",
      placeholder: "Start typing to filter",
      required: true,
      isFixed: true,
      width: "1",
    },
    {
      id: "si_location",
      type: "text",
      label: "Location",
      placeholder: "Location",
      required: true,
      isFixed: true,
      width: "1",
    },
    {
      id: "si_interview_link",
      type: "text",
      label: "Interview Link",
      placeholder: "Zoom link or other call link",
      required: false,
      isFixed: true,
      width: "1",
    },

    {
      id: "si_interview_time",
      type: "select",
      label: "Status to Update Client to",
      placeholder: "Start typing to filter",
      required: true,
      isFixed: true,
      width: "1",
    },
    {
      id: "si_event_title",
      type: "text",
      label: "Event Title",
      placeholder: "Type Event",
      required: true,
      isFixed: true,
      width: "1/2",
    },
    {
      id: "si_event_type",
      type: "select",
      label: "Event Type",
      placeholder: "Start typing to filter",
      required: false,
      isFixed: true,
      width: "1/2",
    },
    {
      id: "si_special_note",
      type: "textarea",
      label: "Special Note",
      placeholder: "Write your note here...",
      required: false,
      isFixed: true,
      width: "1",
    },
  ],
};

const cloneBlock = (block: Block): Block => ({
  ...block,
  fields: block.fields.map((field) =>
    "inputs" in field
      ? { ...field, inputs: field.inputs.map((input) => ({ ...input })) }
      : { ...field },
  ),
});

const initialState: ApplicationFormState = {
  applicationType: {},
  customElements: [],
  blocks: [{ ...INTRO_BLOCK, fields: [] }],
  activeBlockId: "intro-block-1",
  activeSectionId: null,
  activeFieldId: null,
};

const applicationFormSlice = createSlice({
  name: "applicationForm",
  initialState,
  reducers: {
    setApplicationAllType: (state, action) => {
      state.applicationType = action.payload;
      state.activeSectionId = null;
      state.activeFieldId = null;

      const { applicationType, builderType, selectType, userType } =
        action.payload;

      if (
        (userType === "client" || userType === "candidate") &&
        selectType === "Add User" &&
        builderType === "Advanced"
      ) {
        const block = cloneBlock(FIXED_CLIENT_ADD_USER_BLOCK);
        block.name =
          userType === "client"
            ? "Client Add Information"
            : "Candidate Add Information";
        state.blocks = [block];
        state.activeBlockId = FIXED_CLIENT_ADD_USER_BLOCK.id;
        return;
      }
      if (selectType === "Long-term Job" && builderType === "Advanced") {
        const block = cloneBlock(FIXED_LONG_TERM_BLOCK);
        block.name = "Long-term Job Information";
        state.blocks = [block];
        state.activeBlockId = FIXED_LONG_TERM_BLOCK.id;
        return;
      }
      if (
        selectType === "Schedule Interview Form" &&
        builderType === "Advanced"
      ) {
        const block = cloneBlock(FIXED_SCHEDULE_INTERVIEW_BLOCK);
        block.name = "Schedule Interview";
        state.blocks = [block];
        state.activeBlockId = FIXED_SCHEDULE_INTERVIEW_BLOCK.id;
        return;
      }

      state.blocks = [{ ...INTRO_BLOCK, fields: [] }];
      state.activeBlockId = "intro-block-1";

      if (
        applicationType === "Registration" &&
        (userType === "client" || userType === "candidate")
      ) {
        state.blocks.push({
          id: "registration-block",
          name: "Personal Details",
          type: "dynamic",
          describe: "Required registration information",
          fields: FIXED_REGISTRATION_FIELDS.map((f) => ({ ...f })),
        });
      }
    },

    // --- BLOCK REDUCERS ---
    addBlock: (
      state,
      action: PayloadAction<{ name: string; describe: string }>,
    ) => {
      const newBlock: Block = {
        id: `block_${Date.now()}`,
        name: action.payload.name,
        type: "dynamic",
        describe: action.payload.describe,
        fields: [],
      };
      state.blocks.push(newBlock);
      state.activeBlockId = newBlock.id;
    },
    setActiveBlock: (state, action: PayloadAction<string>) => {
      state.activeBlockId = action.payload;
      state.activeSectionId = null;
      state.activeFieldId = null;
    },
    reorderBlocks: (state, action: PayloadAction<Block[]>) => {
      state.blocks = action.payload;
    },

    // --- DYNAMIC FIELDS & SECTIONS ---
    addFieldToBlock: (
      state,
      action: PayloadAction<{
        blockId: string;
        field: InputField | SectionField;
      }>,
    ) => {
      const block = state.blocks.find((b) => b.id === action.payload.blockId);
      if (block && block.type === "dynamic") {
        block.fields.push(action.payload.field);
      }
    },

    addInputToSection: (
      state,
      action: PayloadAction<{
        blockId: string;
        sectionId: string;
        input: InputField;
      }>,
    ) => {
      const block = state.blocks.find((b) => b.id === action.payload.blockId);
      if (block) {
        const section = block.fields.find(
          (f) => f.id === action.payload.sectionId && f.type === "section",
        ) as SectionField;
        if (section) {
          section.inputs.push(action.payload.input);
        }
      }
    },

    removeSectionInputs: (
      state,
      action: PayloadAction<{
        blockId: string;
        sectionId: string;
        inputId: string;
      }>,
    ) => {
      const { blockId, sectionId, inputId } = action.payload;
      const block = state.blocks.find((b) => b.id === blockId);
      if (block) {
        const section = block.fields.find(
          (f) => f.id === sectionId && f.type === "section",
        ) as SectionField;
        if (section) {
          const input = section.inputs.find((i) => i.id === inputId);
          if (input?.isFixed) return;
          section.inputs = section.inputs.filter(
            (input) => input.id !== inputId,
          );
        }
      }
    },

    setActiveField: (
      state,
      action: PayloadAction<{
        sectionId: string | null;
        fieldId: string | null;
      }>,
    ) => {
      state.activeSectionId = action.payload.sectionId;
      state.activeFieldId = action.payload.fieldId;
    },

    // --- UNIVERSAL UPDATE PROPERTIES  ---
    updateFieldProperties: (
      state,
      action: PayloadAction<{
        blockId: string;
        sectionId?: string | null;
        fieldId: string | null;
        key: keyof InputField | keyof Block | string;
        value: any;
      }>,
    ) => {
      const { blockId, sectionId, fieldId, key, value } = action.payload;
      const block = state.blocks.find((b) => b.id === blockId);
      if (!block) return;

      if (!fieldId && !sectionId) {
        (block as any)[key] = value;
        return;
      }

      if (sectionId) {
        const section = block.fields.find(
          (f) => f.id === sectionId && f.type === "section",
        ) as SectionField;
        if (fieldId) {
          const nestedInput = section?.inputs.find((i) => i.id === fieldId);
          if (nestedInput) {
            (nestedInput as any)[key] = value;
          }
        } else if (section) {
          (section as any)[key] = value;
        }
      } else {
        const mainField = block.fields.find((f) => f.id === fieldId);
        if (mainField) {
          (mainField as any)[key] = value;
        }
      }
    },

    // --- DELETE REDUCERS ---
    deleteField: (
      state,
      action: PayloadAction<{
        blockId: string;
        sectionId?: string | null;
        fieldId: string;
      }>,
    ) => {
      const { blockId, sectionId, fieldId } = action.payload;
      const block = state.blocks.find((b) => b.id === blockId);
      if (!block) return;

      if (sectionId) {
        const section = block.fields.find(
          (f) => f.id === sectionId && f.type === "section",
        ) as SectionField;
        if (section) {
          const input = section.inputs.find((i) => i.id === fieldId);
          if (input?.isFixed) return;
          section.inputs = section.inputs.filter((i) => i.id !== fieldId);
        }
      } else {
        const field = block.fields.find((f) => f.id === fieldId);
        if ((field as InputField)?.isFixed) return;
        block.fields = block.fields.filter((f) => f.id !== fieldId);
        if (state.activeSectionId === fieldId) {
          state.activeSectionId = null;
        }
      }
      state.activeFieldId = null;
    },

    deleteBlock: (state, action: PayloadAction<string>) => {
      const blockId = action.payload;
      const block = state.blocks.find((b) => b.id === blockId);
      if (!block || block.type === "introduction" || block.isFixed) return;
      state.blocks = state.blocks.filter((b) => b.id !== blockId);
      if (state.activeBlockId === blockId) {
        state.activeBlockId = state.blocks[0]?.id ?? null;
      }
      state.activeSectionId = null;
      state.activeFieldId = null;
    },

    reorderBlockFields: (
      state,
      action: PayloadAction<{
        blockId: string;
        fields: (InputField | SectionField)[];
      }>,
    ) => {
      const block = state.blocks.find((b) => b.id === action.payload.blockId);
      if (block) {
        block.fields = action.payload.fields;
      }
    },

    reorderSectionInputs: (
      state,
      action: PayloadAction<{
        blockId: string;
        sectionId: string;
        inputs: InputField[];
      }>,
    ) => {
      const { blockId, sectionId, inputs } = action.payload;
      const block = state.blocks.find((b) => b.id === blockId);
      if (!block) return;
      const section = block.fields.find(
        (f) => f.id === sectionId && f.type === "section",
      ) as SectionField;
      if (section) {
        section.inputs = inputs;
      }
    },
  },
});

export const {
  setApplicationAllType,
  addBlock,
  setActiveBlock,
  reorderBlocks,
  addFieldToBlock,
  addInputToSection,
  setActiveField,
  updateFieldProperties,
  removeSectionInputs,
  deleteField,
  deleteBlock,
  reorderBlockFields,
  reorderSectionInputs,
} = applicationFormSlice.actions;

export default applicationFormSlice.reducer;
