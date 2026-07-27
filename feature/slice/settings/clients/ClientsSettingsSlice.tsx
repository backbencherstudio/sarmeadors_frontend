import { baseApi } from "@/feature/api/baseApi";

const ClientsSettingsSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getClientsSettings: builder.query({
      query: () => ({
        url: `/agency/settings/client`,
        method: "GET",
      }),
      providesTags: ["clientsSettings"],
    }),
  }),
});

export const { useGetClientsSettingsQuery } = ClientsSettingsSlice;
