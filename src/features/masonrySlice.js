import { createSlice } from "@reduxjs/toolkit";

export const masonrySlice = createSlice({
  name: "masonry",
  initialState: {
    masonry: null,
  },
  reducers: {
    initMasonry: (state, action) => {
      state.masonry = action.payload;
    },
    closeMasonry: (state, action) => {
      state.masonry = null;
    },
  },
});

export const { initMasonry, closeMasonry } = masonrySlice.actions;

export const selectMasonry = (state) => state.masonry.masonry;

console.log(masonrySlice.reducer);

export default masonrySlice.reducer;
