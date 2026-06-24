import { baseApi } from "@/feature/api/baseApi";

const ClientMyCandidatedApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getClientMyCandidate: builder.query({
      query: (q) => ({
        url: `/client/candidates?tab=${q}`,
        method: "GET",
      }),
    }),
    getSingleClientMyCandidate: builder.query({
      query: (id) => ({
        url: `/client/candidates/${id}`,
        method: "GET",
      }),
    }),
    shortTermHireRequest: builder.mutation({
      query: ({ data, id }) => ({
        url: `/client/candidates/${id}/hire-request`,
        method: "POST",
        body: data
      }),
    }),
    shortTermHireReview: builder.mutation({
      query: ({ data, id }) => ({
        url: `/client/candidates/${id}/reviews`,
        method: "POST",
        body: data
      }),
    }),
  }),
});

export const {
  useGetClientMyCandidateQuery,
  useGetSingleClientMyCandidateQuery,
  useShortTermHireRequestMutation,
  useShortTermHireReviewMutation,
} = ClientMyCandidatedApi;
