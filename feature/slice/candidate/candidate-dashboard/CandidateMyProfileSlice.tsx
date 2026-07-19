import { baseApi } from "@/feature/api/baseApi";

const CandidateMyProfileSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCandidateMyProfile: builder.query({
      query: () => ({
        url: `/candidate/profile`,
        method: "GET",
      }),
      providesTags: ["candidateMyProfile"],
    }),
    getCandidateMyJobs: builder.query({
      query: () => ({
        url: `/candidate/jobs`,
        method: "GET",
      }),
      providesTags: ["candidateMyProfile"],
    }),
    getCandidateMyJobsList: builder.query({
      query: ({ params }) => ({
        url: `/candidate/jobs?${params}`,
        method: "GET",
      }),
      providesTags: ["candidateMyProfile"],
    }),
  }),
});

export const {
  useGetCandidateMyProfileQuery,
  useGetCandidateMyJobsQuery,
  useGetCandidateMyJobsListQuery,
} = CandidateMyProfileSlice;
