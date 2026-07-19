import { baseApi } from "@/feature/api/baseApi";

const CandidateAppliedJobSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getShortTermJobs: builder.query({
      query: () => ({
        url: `/candidate/jobs/short-term-applications`,
        method: "GET",
      }),
      providesTags: ["candidateAppliedJob"],
    }),
    getLongTermJobs: builder.query({
      query: () => ({
        url: `/candidate/jobs/short-term-applications`,
        method: "GET",
      }),
      providesTags: ["candidateAppliedJob"],
    }),
    getLongTermJobsList: builder.query({
      query: ({ params }) => ({
        url: `/candidate/jobs/long-term?${params}`,
        method: "GET",
      }),
      providesTags: ["candidateAppliedJob"],
    }),

    getCandidateAppliedShortTermJobDetails: builder.query({
      query: (id) => ({
        url: `/candidate/jobs/short-term-applications/${id}`,
        method: "GET",
      }),
      providesTags: ["candidateAppliedJob"],
    }),
  }),
});

export const {
  useGetShortTermJobsQuery,
  useGetLongTermJobsQuery,
  useGetLongTermJobsListQuery,
  useGetCandidateAppliedShortTermJobDetailsQuery,
} = CandidateAppliedJobSlice;
