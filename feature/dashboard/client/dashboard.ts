import { baseApi } from "@/feature/api/baseApi";

const ClientDashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getClientDashboard: builder.query({
      query: () => ({
        url: "/client/dashboard",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetClientDashboardQuery } = ClientDashboardApi;
