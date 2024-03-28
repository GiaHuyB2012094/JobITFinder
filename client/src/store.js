import { configureStore } from "@reduxjs/toolkit";
import authReduce from "./slices/authSlice";
import { apiSlice } from "./slices/apiSlice";
import searchSlice from "./slices/searchSlice";
const store = configureStore({
  reducer: {
    auth: authReduce,
    search: searchSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
export default store;
