import { configureStore } from "@reduxjs/toolkit";
import userLoginReducer from "./reducer/userLogin";

export const store = configureStore({
  reducer: { userLoginReducer },
});
