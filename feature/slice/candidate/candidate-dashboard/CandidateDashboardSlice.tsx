import { baseApi } from "@/feature/api/baseApi";

const candidateDashboardSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCandidateDashboard: builder.query({
      query: () => ({
        url: `/candidate/dashboard`,
        method: "GET",
      }),
    }),
    getCandidateMyJobs: builder.query({
      query: () => ({
        url: `/candidate/jobs`,
        method: "GET",
      }),
    }),
    getCandidateMyJobsList: builder.query({
      query: () => ({
        url: `/candidate/jobs?view=list`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetCandidateDashboardQuery, useGetCandidateMyJobsQuery, useGetCandidateMyJobsListQuery } =
  candidateDashboardSlice;
