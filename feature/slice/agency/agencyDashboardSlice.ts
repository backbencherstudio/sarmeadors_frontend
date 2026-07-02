import { baseApi } from "@/feature/api/baseApi";

const agencyDashboardSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAgencyStatusStatistics: builder.query({
      query: () => ({
        url: `/agency/clients/status-statistics`,
        method: "GET",
      }),
    }),
    getAgencyClientList: builder.query({
      query: () => ({
        url: `/agency/clients`,
        method: "GET",
      }),
      providesTags: ["AgencyClientTableColumns"],
    }),
    getAgencyClientTable: builder.query({
      query: () => ({
        url: `/agency/settings/client/table`,
        method: "GET",
      }),
      providesTags: ["AgencyClientTableColumns"],
    }),
    getAgencyClientTableColumns: builder.query({
      query: () => ({
        url: `/agency/settings/client/table/columns`,
        method: "GET",
      }),
      providesTags: ["AgencyClientTableColumns"],
    }),
    getAgencyStatuses: builder.query({
      query: () => ({
        url: `/agency/statuses`,
        method: "GET",
      }),
      providesTags: ["AgencyClientTableColumns"],
    }),

    updateAgencyClientStatus: builder.mutation({
      query: ({ clientId, statusId }) => ({
        url: `/agency/clients/${clientId}/status?status_id=${statusId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["AgencyClientTableColumns"],
    }),
    updateAgencyClientTableColumns: builder.mutation({
      query: (columns) => ({
        url: `/agency/settings/client/table`,
        method: "POST",
        body: columns,
      }),
      invalidatesTags: ["AgencyClientTableColumns"],
    }),
  }),
});

export const {
  useGetAgencyStatusStatisticsQuery,
  useGetAgencyClientListQuery,
  useGetAgencyClientTableQuery,
  useGetAgencyClientTableColumnsQuery,
  useGetAgencyStatusesQuery,
  useUpdateAgencyClientStatusMutation,
  useUpdateAgencyClientTableColumnsMutation,
} = agencyDashboardSlice;
