import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  USstates: [],
  departments: [],
};

export const selectOptionSlice = createSlice({
  name: "selectOption",
  initialState,
  reducers: {
    setUSstates: (state, action) => {
      state.USstates = action.payload;
    },
    setDepartments: (state, action) => {
      state.departments = action.payload;
    },
  },
});

export const { setUSstates, setDepartments } = selectOptionSlice.actions;
export default selectOptionSlice.reducer;
