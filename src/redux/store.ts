import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./authApi";
import authSlice from "./authSlice"; // Import AuthState


export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;

// Configure the store
const reduxStore = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),
});

export default reduxStore;
