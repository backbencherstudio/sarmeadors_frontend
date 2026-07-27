import { baseApi } from "@/feature/api/baseApi";

const CandidateSettingsSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCandidateSettings: builder.query({
      query: () => ({
        url: `/agency/settings/candidate`,
        method: "GET",
      }),
      providesTags: ["candidateSettings"],
    }),
    postCandidateSettingsUpdate: builder.mutation({
      query: (settingsData) => ({
        url: `/agency/settings/candidate`,
        method: "POST",
        body: { settings: settingsData },
      }),
      invalidatesTags: ["candidateSettings"],
    }),
    getTags: builder.query({
      query: (type: string) => ({
        url: `/agency/tags?type=${type}`,
        method: "GET",
      }),
      providesTags: ["tagStore"],
    }),
    postTagStore: builder.mutation({
      query: (tagData) => ({
        url: `/agency/tag-store`,
        method: "POST",
        body: tagData,
      }),
      invalidatesTags: ["tagStore"],
    }),
    deleteTag: builder.mutation({
      query: (id: number) => ({
        url: `/agency/tag-destroy/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["tagStore"],
    }),
    updateTagStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/agency/tag-change-status/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["tagStore"],
    }),
    updateTagBulk: builder.mutation({
      query: (updates) => ({
        url: `/agency/tag-bulk-update`,
        method: "PUT",
        body: { updates },
      }),
      invalidatesTags: ["tagStore"],
    }),
    getLocations: builder.query({
      query: (_?: void) => ({
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
    updateLocationStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/agency/location-change-status/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["locations"],
    }),
    updateLocationBulk: builder.mutation({
      query: (updates) => ({
        url: `/agency/location-bulk-update`,
        method: "PUT",
        body: { updates },
      }),
      invalidatesTags: ["locations"],
    }),
  }),
});

export const {
  useGetCandidateSettingsQuery,
  usePostCandidateSettingsUpdateMutation,
  useGetTagsQuery,
  usePostTagStoreMutation,
  useDeleteTagMutation,
  useUpdateTagStatusMutation,
  useUpdateTagBulkMutation,
  useGetLocationsQuery,
  usePostLocationStoreMutation,
  useDeleteLocationMutation,
  useUpdateLocationStatusMutation,
  useUpdateLocationBulkMutation,
} = CandidateSettingsSlice;
