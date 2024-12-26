import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface RegisterUserData {
  name: string;
  email: string;
  password: string;
  mobile: string;
}

export interface LoginUserData {
  email?: string;
  mobile?: string;
  password: string;
}
export interface LogoutUserData {
  cookie: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  mobile: string;
  profile?: string;
  role?: string;
}

export interface AuthResponse {
  message: string;
  token?: string;
  user?: IUser;
}
interface GenericResponse<T> {
  message: string;
  result: T;
}
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://micro-services-auth-server.vercel.app/api/auth",
    credentials: "include",
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    registerUser: builder.mutation<AuthResponse, RegisterUserData>({
      query: (userData) => ({
        url: "/register",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["Auth"],
    }),
    loginUser: builder.mutation<AuthResponse, LoginUserData>({
      query: (userData) => ({
        url: "/login",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["Auth"],
      transformResponse: (data: any) => data?.user,
    }),
    logoutUser: builder.mutation<AuthResponse, LogoutUserData>({
      query: (userData) => ({
        url: "/logout",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["Auth"],
    }),
    logoutAdmin: builder.mutation<AuthResponse, LogoutUserData>({
      query: (userData) => ({
        url: "/logout-admin",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["Auth"],
    }),
    getAllUsers: builder.query<IUser[], void>({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      providesTags: ["Auth"],
      transformResponse: (data: GenericResponse<IUser[]>) => data.result,
    }),
    getUserDetails: builder.query<IUser, string>({
      query: (id) => ({
        url: `/user-details/${id}`,
        method: "GET",
      }),
      providesTags: ["Auth"],
      transformResponse: (data: GenericResponse<IUser>) => data.result,
    }),
    deActivateUser: builder.mutation<AuthResponse, string>({
      query: (id) => ({
        url: `/deactivate/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Auth"],
    }),
    activateUser: builder.mutation<AuthResponse, string>({
      query: (id) => ({
        url: `/activate/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});
export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useLogoutAdminMutation,
  useGetAllUsersQuery,
  useGetUserDetailsQuery,
  useDeActivateUserMutation,
  useActivateUserMutation,
} = authApi;
