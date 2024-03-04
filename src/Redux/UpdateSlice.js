import { createSlice } from "@reduxjs/toolkit";

const updateSlice = createSlice({
  name: "UpdateText",
  initialState: {},  // Change from [] to {}
  reducers: {
    setFormUpdate: (state, action) => {
      return action.payload;  // Replace the existing data with the new data
    },
  },
});

export const { setFormUpdate } = updateSlice.actions;

export default updateSlice.reducer;
