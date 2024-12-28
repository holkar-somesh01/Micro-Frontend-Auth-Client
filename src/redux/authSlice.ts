import { createSlice } from "@reduxjs/toolkit";
import { authApi, AuthResponse } from "./authApi";

interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
  profile?: string;
}

export interface AuthState {
  user: User | null;
}


const initialUser = localStorage.getItem("user")
  ? (JSON.parse(localStorage.getItem("user") as string) as User)
  : null;


const initialState: AuthState = {
  user: initialUser,
};


const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    clearUser(state) {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) =>
    builder
      .addMatcher(authApi.endpoints.loginUser.matchFulfilled, (state, action) => {
        const payload = action.payload as AuthResponse;
        if (payload.user) {
          state.user = payload.user;
          localStorage.setItem("user", JSON.stringify(payload.user));
        }
      })
      .addMatcher(authApi.endpoints.registerUser.matchFulfilled, (state, { payload }) => {
        if (payload?.user) {
          state.user = payload.user;
          localStorage.setItem("user", JSON.stringify(payload.user));
        }
      })
      .addMatcher(authApi.endpoints.logoutUser.matchFulfilled, (state) => {
        state.user = null;
        localStorage.removeItem("user");
      })
      .addMatcher(authApi.endpoints.logoutAdmin.matchFulfilled, (state) => {
        state.user = null;
        localStorage.removeItem("user");
      }),
});

export default authSlice.reducer;
