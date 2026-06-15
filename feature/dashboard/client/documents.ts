import { baseApi } from "@/feature/api/baseApi";

const ClientDashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getClientDocuments: builder.query({
      query: () => ({
        url: "/client/documents",
        method: "GET",
      }),
    }),
    getDocumentDetails: builder.query({
      query: (id) => ({
        url: `client/documents/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetClientDocumentsQuery, useGetDocumentDetailsQuery } =
  ClientDashboardApi;
