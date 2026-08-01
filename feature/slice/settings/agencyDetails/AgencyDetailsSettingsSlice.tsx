import { baseApi } from "@/feature/api/baseApi";

const AgencyDetailsSettingsSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAgencyInfo: builder.query<any, void>({
      query: () => ({
        url: `/agency/agency-info`,
        method: "GET",
      }),
      providesTags: ["agencyDetailsSettings"],
    }),
    getCommunicationSettings: builder.query<any, void>({
      query: () => ({
        url: `/agency/settings/communication`,
        method: "GET",
      }),
      providesTags: ["communicationSettings"],
    }),
    postClientsSettingsUpdate: builder.mutation({
      query: ({ id, body }) => ({
        url: `/agency/info-update/${id}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["agencyDetailsSettings"],
    }),
    postCommunicationSettingsUpdate: builder.mutation({
      query: (body) => ({
        url: `/agency/settings/communication`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["communicationSettings"],
    }),
    getBusinessDetailsSettings: builder.query<any, void>({
      query: () => ({
        url: `/agency/business-details`,
        method: "GET",
      }),
      providesTags: ["businessDetailsSettings"],
    }),
    getLocations: builder.query({
      query: (type: string) => ({
        url: `/agency/locations`,
        method: "GET",
      }),
      providesTags: ["locations"],
    }),
    deleteBusinessHoliday: builder.mutation({
      query: (id: number) => ({
        url: `/agency/business-holiday-delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["businessDetailsSettings"],
    }),
  }),
});

export const {
  useGetAgencyInfoQuery,
  usePostClientsSettingsUpdateMutation,
  useGetCommunicationSettingsQuery,
  usePostCommunicationSettingsUpdateMutation,
  useGetBusinessDetailsSettingsQuery,
  useGetLocationsQuery,
  useDeleteBusinessHolidayMutation,
} = AgencyDetailsSettingsSlice;
