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
      query: (type: string) => ({
        url: `/agency/locations?type=${type}`,
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
    getTypes: builder.query({
      query: (type: string) => ({
        url: `/agency/types?type=${type}`,
        method: "GET",
      }),
      providesTags: ["typeStore"],
    }),
    postTypeStore: builder.mutation({
      query: (typeData) => ({
        url: `/agency/type-store`,
        method: "POST",
        body: typeData,
      }),
      invalidatesTags: ["typeStore"],
    }),
    deleteType: builder.mutation({
      query: (id: number) => ({
        url: `/agency/type-destroy/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["typeStore"],
    }),
    updateTypeStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/agency/type-change-status/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["typeStore"],
    }),
    updateTypeBulk: builder.mutation({
      query: (updates) => ({
        url: `/agency/type-bulk-update`,
        method: "PUT",
        body: { updates },
      }),
      invalidatesTags: ["typeStore"],
    }),
    getChecklist: builder.query({
      query: (type: string) => ({
        url: `/agency/checklist?type=${type}`,
        method: "GET",
      }),
      providesTags: ["checklist"],
    }),
    postChecklistStore: builder.mutation({
      query: (checklistData) => ({
        url: `/agency/checklist-store`,
        method: "POST",
        body: checklistData,
      }),
      invalidatesTags: ["checklist"],
    }),
    deleteChecklist: builder.mutation({
      query: (id: number) => ({
        url: `/agency/checklist-destroy/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["checklist"],
    }),
    updateChecklistStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/agency/checklist-change-status/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["checklist"],
    }),
    updateChecklistBulk: builder.mutation({
      query: (updates) => ({
        url: `/agency/checklist-bulk-update`,
        method: "PUT",
        body: { updates },
      }),
      invalidatesTags: ["checklist"],
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
  useGetTypesQuery,
  usePostTypeStoreMutation,
  useDeleteTypeMutation,
  useUpdateTypeStatusMutation,
  useUpdateTypeBulkMutation,
  useGetChecklistQuery,
  usePostChecklistStoreMutation,
  useDeleteChecklistMutation,
  useUpdateChecklistStatusMutation,
  useUpdateChecklistBulkMutation,
} = CandidateSettingsSlice;
