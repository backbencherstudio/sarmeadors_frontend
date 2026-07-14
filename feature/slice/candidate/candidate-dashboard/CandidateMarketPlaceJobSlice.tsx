import { baseApi } from "@/feature/api/baseApi";

const CandidateMarketPlaceJobSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCandidateMarketPlaceShortTermJob: builder.query({
      query: () => ({
        url: `/candidate/jobs/short-term-marketplace`,
        method: "GET",
      }),
    }),
    getCandidateMarketPlaceLongTermJob: builder.query({
      query: () => ({
        url: `/candidate/jobs/short-term-marketplace`,
        method: "GET",
      }),
    }),
    getCandidateMarketPlaceJobsDetails: builder.query({
      query: (id) => ({
        url: `/candidate/jobs/short-term-marketplace/${id}`,
        method: "GET",
      }),
    }),
    ApplyShortTermJob: builder.mutation({
      query: (jobId) => ({
        url: `/candidate/jobs/short-term/${jobId}/apply`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetCandidateMarketPlaceShortTermJobQuery,
  useGetCandidateMarketPlaceLongTermJobQuery,
  useGetCandidateMarketPlaceJobsDetailsQuery,
  useApplyShortTermJobMutation,
} = CandidateMarketPlaceJobSlice;
