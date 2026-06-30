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
    }),
    getAgencyClientTable: builder.query({
      query: () => ({
        url: `/agency/settings/client/table`,
        method: "GET",
      }),
    }),
    getAgencyClientTableColumns: builder.query({
      query: () => ({
        url: `/agency/settings/client/table/columns`,
        method: "GET",
      }),
      providesTags: ["AgencyClientTableColumns"],
    }),
    updateAgencyClientTableColumns: builder.mutation({
      query: (columns) => ({
        url: `/agency/settings/client/table/columns`,
        method: "PUT",
        body: { columns },
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
  useUpdateAgencyClientTableColumnsMutation,
} = agencyDashboardSlice;
