import { baseApi } from "@/feature/api/baseApi";

const ClientInterviewsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getClientInterviews: builder.query({
      query: (q) => ({
        url: `/client/interviews?view=${q}`,
        method: "GET",
      }),
    }),
    rescheduleInterview: builder.mutation({
      query: ({ id, data }) => ({
        url: `/client/interviews/${id}/reschedule`,
        method: "PUT",
        body: data,
      }),
    }),
    // getDocumentDetails: builder.query({
    //   query: (id) => ({
    //     url: `client/documents/${id}`,
    //     method: "GET",
    //   }),
    // }),
  }),
});

export const { useGetClientInterviewsQuery, useRescheduleInterviewMutation } =
  ClientInterviewsApi;
