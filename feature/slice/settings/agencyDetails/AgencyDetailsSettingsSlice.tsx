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
    postLocationStore: builder.mutation({
      query: (locationData) => ({
        url: `/agency/location-store`,
        method: "POST",
        body: locationData,
      }),
      invalidatesTags: ["locations"],
    }),
    deleteLocation: builder.mutation({
      query: (id: number) => ({
        url: `/agency/location-destroy/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["locations"],
    }),
    getSubLocations: builder.query({
      query: (type: string) => ({
        url: `/agency/sub-locations`,
        method: "GET",
      }),
      providesTags: ["subLocations"],
    }),
    postSubLocationStore: builder.mutation({
      query: (subLocationData) => ({
        url: `/agency/sub-location-store`,
        method: "POST",
        body: subLocationData,
      }),
      invalidatesTags: ["subLocations"],
    }),
    deleteSubLocation: builder.mutation({
      query: (id: number) => ({
        url: `/agency/sub-location-destroy/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["subLocations"],
    }),
    deleteBusinessHoliday: builder.mutation({
      query: (id: number) => ({
        url: `/agency/business-holiday-delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["businessDetailsSettings"],
    }),
    postBusinessHoliday: builder.mutation({
      query: (body: any) => ({
        url: `/agency/business-holiday-store`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["businessDetailsSettings"],
    }),
    postBusinessHour: builder.mutation({
      query: (body: any) => ({
        url: `/agency/business-hour-update`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["businessDetailsSettings"],
    }),
    patchBusinessHourStatus: builder.mutation({
      query: ({ id, is_open }: { id: number; is_open: boolean }) => ({
        url: `/agency/business-hours/${id}/status`,
        method: "PATCH",
        body: { is_open },
      }),
      invalidatesTags: ["businessDetailsSettings"],
    }),
    postBusinessSettingUpdate: builder.mutation({
      query: (body: any) => ({
        url: `/agency/business-setting-update`,
        method: "POST",
        body,
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
  usePostLocationStoreMutation,
  useDeleteLocationMutation,
  useGetSubLocationsQuery,
  usePostSubLocationStoreMutation,
  useDeleteSubLocationMutation,
  useDeleteBusinessHolidayMutation,
  usePostBusinessHolidayMutation,
  usePostBusinessHourMutation,
  usePatchBusinessHourStatusMutation,
  usePostBusinessSettingUpdateMutation,
} = AgencyDetailsSettingsSlice;
