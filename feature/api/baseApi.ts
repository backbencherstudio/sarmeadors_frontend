import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { getToken, removeToken } from "../token/token";
// import { logout } from "../features/auth/authSlice"; // Update this path if needed

const getSubDomain = () => {
  if (typeof window === "undefined") return "";

  const host = window.location.hostname.toLowerCase();

  if (host === "localhost" || host === "127.0.0.1") {
    return "localhost";
  }

  if (host.endsWith(".localhost")) {
    return host.replace(".localhost", "");
  }

  const parts = host.split(".");

  return parts.length > 1 ? parts[0] : host;
};

const subDomain = getSubDomain();

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: "include",
  prepareHeaders: async (headers) => {
    if (typeof window !== "undefined") {
      const token = await getToken();

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    }

    headers.set("Content-Type", "application/json");
    headers.set("Accept", "application/json");
    headers.set("X-Subdomain", subDomain);

    return headers;
  },
});

// Wrapper for handling unauthorized responses
const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401 || result.error?.status === 403) {
    // Clear auth state
    await removeToken();

    // Redirect to login page
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["subsciprions", "profile", "submissions"],
  endpoints: () => ({}),
});
