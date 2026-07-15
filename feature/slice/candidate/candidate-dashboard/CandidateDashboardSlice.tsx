import { baseApi } from "@/feature/api/baseApi";

const candidateDashboardSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCandidateDashboard: builder.query({
      query: () => ({
        url: `/candidate/dashboard`,
        method: "GET",
      }),
      providesTags: ["candidateDashboard"],
    }),
    getCandidateMyJobs: builder.query({
      query: () => ({
        url: `/candidate/jobs`,
        method: "GET",
      }),
      providesTags: ["candidateMyJobs"],
    }),
    getCandidateMyJobsList: builder.query({
      query: ({ params }) => ({
        url: `/candidate/jobs?${params}`,
        method: "GET",
      }),
      providesTags: ["candidateMyJobs"],
    }),
  }),
});

export const {
  useGetCandidateDashboardQuery,
  useGetCandidateMyJobsQuery,
  useGetCandidateMyJobsListQuery,
} = candidateDashboardSlice;
