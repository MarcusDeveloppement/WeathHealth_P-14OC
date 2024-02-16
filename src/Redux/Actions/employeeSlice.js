import { createSlice } from "@reduxjs/toolkit";
import { dataEmployee } from "../../Data/dataEmployee";

const initialState = [...dataEmployee];

export const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      console.log("Adding employee:", action.payload);
      state.push(action.payload);
    },
  },
});

export const { addEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
