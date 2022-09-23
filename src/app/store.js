import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import masonryReducer from "../features/masonrySlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    masonry: masonryReducer,
  },
});
