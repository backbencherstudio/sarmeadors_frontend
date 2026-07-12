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
    getCandidateMyJobsList: builder.query({
      query: ({ params }) => ({
        url: `/candidate/jobs?${params}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetCandidateMarketPlaceShortTermJobQuery,
  useGetCandidateMarketPlaceLongTermJobQuery,
  useGetCandidateMyJobsListQuery,
} = CandidateMarketPlaceJobSlice;
