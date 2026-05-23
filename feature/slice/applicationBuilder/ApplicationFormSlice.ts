import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InputField {
  id: string;
  type: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  width?: "1/4" | "1/2" | "3/4" | "1";
}

export interface SectionField {
  id: string;
  type: "section";
  label: string;
  isSection: boolean;
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

const initialState: ApplicationFormState = {
  applicationType: {},
  customElements: [],
  blocks: [
    {
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
    },
  ],
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
        key: string;
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
        const nestedInput = section?.inputs.find((i) => i.id === fieldId);
        if (nestedInput) {
          (nestedInput as any)[key] = value;
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
          section.inputs = section.inputs.filter((i) => i.id !== fieldId);
        }
      } else {
        block.fields = block.fields.filter((f) => f.id !== fieldId);
      }
      state.activeFieldId = null;
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
  deleteField,
} = applicationFormSlice.actions;

export default applicationFormSlice.reducer;
