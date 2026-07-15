import { baseApi } from "@/feature/api/baseApi";

const CandidateAppliedJobSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getShortTermJobs: builder.query({
      query: () => ({
        url: `/candidate/jobs/short-term-applications`,
        method: "GET",
      }),
    }),
    getLongTermJobs: builder.query({
      query: () => ({
        url: `/candidate/jobs/short-term-applications`,
        method: "GET",
      }),
    }),
    getLongTermJobsList: builder.query({
      query: ({ params }) => ({
        url: `/candidate/jobs/long-term?${params}`,
        method: "GET",
      }),
    }),

    getCandidateAppliedShortTermJobDetails: builder.query({
      query: (id) => ({
        url: `/candidate/jobs/short-term-applications/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetShortTermJobsQuery,
  useGetLongTermJobsQuery,
  useGetLongTermJobsListQuery,
  useGetCandidateAppliedShortTermJobDetailsQuery,
} = CandidateAppliedJobSlice;
