import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InputField {
  id: string;
  type: string;
  label: string;
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
    id: "fixed_hear_about_us",
    type: "select",
    label: "How did you hear about us?",
    required: false,
    isFixed: true,
    width: "1/2",
  },
  {
    id: "fixed_image",
    type: "file",
    label: "Profile Picture",
    required: false,
    isFixed: true,
    width: "1/2",
  },
  {
    id: "fixed_type",
    type: "select",
    label: "Type",
    required: false,
    isFixed: true,
    width: "1/2",
  },
  {
    id: "fixed_location",
    type: "text",
    label: "Location",
    placeholder: "Enter location",
    required: false,
    isFixed: true,
    width: "1/2",
  },
];

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
      state.blocks = [{ ...INTRO_BLOCK, fields: [] }];
      state.activeBlockId = "intro-block-1";
      state.activeSectionId = null;
      state.activeFieldId = null;

      const { applicationType, userType } = action.payload;
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

      if (block.type === "introduction" && !fieldId) {
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
      }
      state.activeFieldId = null;
    },

    deleteBlock: (state, action: PayloadAction<string>) => {
      const blockId = action.payload;
      const block = state.blocks.find((b) => b.id === blockId);
      if (!block || block.type === "introduction") return;
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
