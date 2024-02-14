import { configureStore } from "@reduxjs/toolkit";
import employeeSlice from "./Actions/employeeSlice";
import selectOptionSlice from "./Actions/selectedOptionSlice";

const store = configureStore({
  reducer: {
    employees: employeeSlice,
    selectOption: selectOptionSlice,
  },
});
export default store;
