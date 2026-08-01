import { baseApi } from "@/feature/api/baseApi";

const AgencyDetailsSettingsSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getClientsSettings: builder.query({
      query: () => ({
        url: `/agency/settings/client`,
        method: "GET",
      }),
      providesTags: ["agencyDetailsSettings"],
    }),
    getCommunicationSettings: builder.query({
      query: () => ({
        url: `/agency/settings/communication`,
        method: "GET",
      }),
      providesTags: ["communicationSettings"],
    }),
    postCommunicationSettingsUpdate: builder.mutation({
      query: (body) => ({
        url: `/agency/settings/communication`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["communicationSettings"],
    }),
  }),
});

export const {
  useGetClientsSettingsQuery,
  useGetCommunicationSettingsQuery,
  usePostCommunicationSettingsUpdateMutation,
} = AgencyDetailsSettingsSlice;
