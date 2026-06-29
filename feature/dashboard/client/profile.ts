import { baseApi } from "@/feature/api/baseApi";

const ClientMyCandidatedApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getClientProfile: builder.query({
      query: () => ({
        url: `/client/profile`,
        method: "GET",
      }),
    }),
    clientProfileUpdate: builder.mutation({
      query: (data) => ({
        url: `/client/profile`,
        method: "POST",
        body: data,
      }),
    }),
    clientProfilePassword: builder.mutation({
      query: (data) => ({
        url: `/client/profile/password`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteClientProfile: builder.mutation({
      query: (data) => ({
        url: `/client/profile`,
        method: "DELETE",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetClientProfileQuery,
  useClientProfileUpdateMutation,
  useClientProfilePasswordMutation,
  useDeleteClientProfileMutation,
} = ClientMyCandidatedApi;
