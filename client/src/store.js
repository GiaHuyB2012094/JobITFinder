import { configureStore } from '@reduxjs/toolkit'
import authReduce from './slices/authSlice'
import { apiSlice } from './slices/apiSlice';
const store = configureStore({
    reducer: {
        auth: authReduce,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});
export default store;