import { createSlice } from "@reduxjs/toolkit";
import { authApi, AuthResponse, IUser } from "./authApi";

// Define the user type
interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
  hero?: string; // Made optional to align with `authApi`
}

// Define the initial state type
export interface AuthState {
  user: User | null;
}

// Get the initial user from localStorage
const initialUser = localStorage.getItem("user")
  ? (JSON.parse(localStorage.getItem("user") as string) as User)
  : null;

// Define the initial state
const initialState: AuthState = {
  user: initialUser,
};

// Create the slice
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

      .addMatcher(authApi.endpoints.loginUser.matchFulfilled, (state, main) => {
        const payload = main.payload as AuthResponse
        state.user = payload.user as IUser;
        localStorage.setItem("user", JSON.stringify(payload)); // Persist user in localStorage

      })

      .addMatcher(authApi.endpoints.registerUser.matchFulfilled, (state, { payload }) => {
        if (payload?.user) {
          state.user = payload.user;
          localStorage.setItem("user", JSON.stringify(payload.user)); // Persist user in localStorage
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
