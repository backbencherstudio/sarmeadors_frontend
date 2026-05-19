import { createSlice } from "@reduxjs/toolkit";

const intialState = {
  applicationType: {},
  customElements: [],
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
  },
});

export const { setApplicationAllType, addCustomElement } =
  applicationFormSlice.actions;
export default applicationFormSlice.reducer;
