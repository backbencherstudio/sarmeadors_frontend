import { baseApi } from "../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: ({ data, subDomain }) => ({
        url: "/login",
        method: "POST",
        body: data,
        headers: {
          "X-Subdomain": subDomain,
        },
      }),
    }),
    verifyEmail: builder.mutation({
      query: (data) => ({
        url: "auth/admin/verify-email",
        method: "POST",
        body: data,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useLoginMutation,
  useVerifyEmailMutation,
  useForgotPasswordMutation,
} = authApi;
