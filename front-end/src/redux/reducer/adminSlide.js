import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullname: "",
};

export const adminSlide = createSlice({
  name: "admin",
  initialState,
  reducers: {
    addfullname: (state, action) => {
      const { fullname = "" } = action.payload;
      state.fullname = fullname || state.fullname;
    },
  },
});

export const { addfullname } = adminSlide.actions;

export default adminSlide.reducer;
