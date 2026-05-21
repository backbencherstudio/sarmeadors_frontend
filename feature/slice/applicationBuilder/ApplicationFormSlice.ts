import { createSlice } from "@reduxjs/toolkit";

const intialState = {
  applicationType: {},
  customElements: [],
  blocks: [
    {
      id: Date.now().toString(),
      name: "Introduction",
      describe: "Set your logo & form title here",
    },
  ],
};

const applicationFormSlice = createSlice({
  name: "applicationForm",
  initialState: intialState,
  reducers: {
    setApplicationAllType: (state, action) => {
      state.applicationType = action.payload;
    },

    addCustomElement: (state, action) => {
      state.customElements.push(action.payload);
    },
    addBlock: (state, action) => {
      state.blocks.push(action.payload);
    },
  },
});

export const { setApplicationAllType, addCustomElement, addBlock } =
  applicationFormSlice.actions;
export default applicationFormSlice.reducer;
