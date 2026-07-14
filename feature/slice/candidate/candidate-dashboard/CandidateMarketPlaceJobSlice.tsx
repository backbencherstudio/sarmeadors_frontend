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
  }),
});

export const {
  useGetCandidateMarketPlaceShortTermJobQuery,
  useGetCandidateMarketPlaceLongTermJobQuery,
  useGetCandidateMarketPlaceJobsDetailsQuery,
} = CandidateMarketPlaceJobSlice;
