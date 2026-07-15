import { baseApi } from "@/feature/api/baseApi";

const CandidateMarketPlaceJobSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCandidateMarketPlaceShortTermJob: builder.query({
      query: () => ({
        url: `/candidate/jobs/short-term-marketplace`,
        method: "GET",
      }),
      providesTags: ["candidateMarketPlaceJob"],
    }),
    getCandidateMarketPlaceLongTermJob: builder.query({
      query: () => ({
        url: `/candidate/jobs/short-term-marketplace`,
        method: "GET",
      }),
      providesTags: ["candidateMarketPlaceJob"],
    }),
    getCandidateMarketPlaceJobsDetails: builder.query({
      query: (id) => ({
        url: `/candidate/jobs/short-term-marketplace/${id}`,
        method: "GET",
      }),
      providesTags: ["candidateMarketPlaceJob"],
    }),
    ApplyShortTermJob: builder.mutation({
      query: (jobId) => ({
        url: `/candidate/jobs/short-term/${jobId}/apply`,
        method: "POST",
      }),
      invalidatesTags: ["candidateMarketPlaceJob", "candidateAppliedJob"],
    }),
  }),
});

export const {
  useGetCandidateMarketPlaceShortTermJobQuery,
  useGetCandidateMarketPlaceLongTermJobQuery,
  useGetCandidateMarketPlaceJobsDetailsQuery,
  useApplyShortTermJobMutation,
} = CandidateMarketPlaceJobSlice;
