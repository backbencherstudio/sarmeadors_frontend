import { baseApi } from "@/feature/api/baseApi";

const candidateDashboardSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCandidateDashboard: builder.query({
      query: () => ({
        url: `/candidate/dashboard`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetCandidateDashboardQuery } = candidateDashboardSlice;
