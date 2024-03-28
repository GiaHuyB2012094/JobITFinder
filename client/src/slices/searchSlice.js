import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchResult: {},
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchResult: (state, action) => {
      state.searchResult = action.payload;
    },
  },
});

export const { setSearchResult } = searchSlice.actions;
export default searchSlice.reducer;
