import { baseApi } from "@/feature/api/baseApi";

const DashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboard: builder.query({
      query: () => ({
        url: `/admin/dashboard`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetDashboardQuery } = DashboardApi;
