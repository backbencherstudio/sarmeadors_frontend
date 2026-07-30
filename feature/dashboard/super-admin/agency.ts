import { baseApi } from "@/feature/api/baseApi";

const SuperAdminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAgencies: builder.query({
      query: (params?: {
        search?: string;
        status?: string;
        page?: number;
        per_page?: number;
      }) => {
        const queryParams = new URLSearchParams();
        if (params?.search) queryParams.set("search", params.search);
        if (params?.status) queryParams.set("status", params.status);
        if (params?.page) queryParams.set("page", String(params.page));
        if (params?.per_page)
          queryParams.set("per_page", String(params.per_page));
        const queryString = queryParams.toString();
        return {
          url: `/admin/agencies${queryString ? `?${queryString}` : ""}`,
          method: "GET",
        };
      },
    }),
    getSingleAgencie: builder.query({
      query: (id) => ({
        url: `/admin/agency-show/${id}`,
        method: "GET",
      }),
    }),
    createAgency: builder.mutation({
      query: (data) => ({
        url: `/admin/agency-store`,
        method: "POST",
        body: data,
      }),
    }),
    updateAgency: builder.mutation({
      query: ({ data, id }) => ({
        url: `/admin/agency-update/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteAgency: builder.mutation({
      query: (id) => ({
        url: `admin/agency-delete/${id}`,
        method: "DELETE",
      }),
    }),
    suspendsAgency: builder.mutation({
      query: (id) => ({
        url: `/admin/agency-suspends/${id}`,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useGetAllAgenciesQuery,
  useGetSingleAgencieQuery,
  useCreateAgencyMutation,
  useUpdateAgencyMutation,
  useDeleteAgencyMutation,
  useSuspendsAgencyMutation,
} = SuperAdminApi;
