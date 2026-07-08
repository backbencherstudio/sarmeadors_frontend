import { baseApi } from "@/feature/api/baseApi";

const agencyCandidateSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allAgencyCandidates: builder.query({
      query: () => ({
        url: `/agency/candidates`,
        method: "GET",
      }),
      providesTags: ["AgencyCandidates"],
    }),
    getAgencyCandidatesStatistics: builder.query({
      query: () => ({
        url: `/agency/candidates/status-statistics`,
        method: "GET",
      }),
      providesTags: ["AgencyCandidates"],
    }),
    getAgencyCandidateTableSetting: builder.query({
      query: () => ({
        url: `/agency/settings/candidate/table`,
        method: "GET",
      }),
      providesTags: ["AgencyCandidates"],
    }),
    getAgencyCandidateTableColumns: builder.query({
      query: () => ({
        url: `/agency/settings/candidate/table/columns`,
        method: "GET",
      }),
      providesTags: ["AgencyCandidates"],
    }),
    createAgencyCandidate: builder.mutation({
      query: (candidateData) => ({
        url: `/agency/settings/candidate/table`,
        method: "POST",
        body: candidateData,
      }),
      invalidatesTags: ["AgencyCandidates"],
    }),
    updateAgencyCandidate: builder.mutation({
      query: ({ candidateId, statusId }) => ({
        url: `/agency/candidates/${candidateId}/status?status_id=${statusId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["AgencyCandidates"],
    }),
  }),
});

export const {
  useAllAgencyCandidatesQuery,
  useGetAgencyCandidatesStatisticsQuery,
  useGetAgencyCandidateTableColumnsQuery,
  useCreateAgencyCandidateMutation,
  useUpdateAgencyCandidateMutation,
} = agencyCandidateSlice;
