import { baseApi } from "@/feature/api/baseApi";

const ClientMyCandidatedApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getShortTermJob: builder.query({
      query: (q) => ({
        url: `/client/jobs/short-term?filter[status]=${q}`,
        method: "GET",
      }),
    }),
    getSingleShortTermJob: builder.query({
      query: (id) => ({
        url: `/client/jobs/short-term/${id}`,
        method: "GET",
      }),
    }),
    PaymentService: builder.mutation({
      query: (body) => ({
        url: `/client/jobs/short-term`,
        method: "POST",
        body,
      }),
    }),
    PaymentCheck: builder.query({
      query: () => ({
        url: `/client/jobs/short-term/payment-check`,
        method: "GET",
      }),
    }),
    locations: builder.query({
      query: () => ({
        url: `/client/locations`,
        method: "GET",
      }),
    }),
    cancelShortTermJob: builder.mutation({
      query: ({ id, data }) => ({
        url: `/client/jobs/short-term/${id}/cancel`,
        method: "PUT",
        body: data,
      }),
    }),
    getApplicants: builder.query({
      query: (id) => ({
        url: `/client/jobs/short-term/${id}/applicants`,
        method: "GET",
      }),
    }),
    getSingleApplicant: builder.query({
      query: ({ jobId, applicantId }) => ({
        url: `/client/jobs/short-term/${jobId}/applicants/${applicantId}`,
        method: "GET",
      }),
    }),
    hireCandidate: builder.mutation({
      query: ({ jobId, applicantId }) => ({
        url: `/client/jobs/short-term/${jobId}/applicants/${applicantId}/hire`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetShortTermJobQuery,
  useGetSingleShortTermJobQuery,
  usePaymentServiceMutation,
  usePaymentCheckQuery,
  useLocationsQuery,
  useCancelShortTermJobMutation,
  useGetApplicantsQuery,
  useGetSingleApplicantQuery,
  useHireCandidateMutation,
} = ClientMyCandidatedApi;
