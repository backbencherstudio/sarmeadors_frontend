import { getSubDomain } from "@/helper/getDomain.helper";
import { getToken } from "@/lib/token";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseApiSlice = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.NEXT_PUBLIC_API_BASE_URL || "https://vin.apphero.agency/api",
    credentials: "include",
    prepareHeaders: async (headers) => {
      const token = await getToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("accept", "application/json");
      headers.set("X-Subdomain", getSubDomain());
      return headers;
    },
  }),
  endpoints: () => ({}),
});

export default baseApiSlice;
