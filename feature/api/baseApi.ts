// import { getToken } from "@/components/auth/token";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../token/token";

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

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: "include",
    prepareHeaders: async (headers) => {
      if (typeof window !== "undefined") {
        const token = await getToken();
        // console.log(token, "token");
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
      }
      headers.set("Accept", "application/json");
      headers.set("X-Subdomain", subDomain);

      return headers;
    },
  }),
  tagTypes: [
    "subsciprions",
    "profile",
    "submissions",
    "candidateDocuments",
    "candidateAvailability",
    "AgencyClientTableColumns",
  ],
  endpoints: (builder) => ({}),
});
