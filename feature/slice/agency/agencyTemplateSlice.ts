import { baseApi } from "@/feature/api/baseApi";

const agencyTemplateSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createAgencyTemplateList: builder.mutation({
      query: (data: any) => ({
        url: "/agency/forms",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AgencyTemplate"],
    }),
    getAgencyTemplateById: builder.query({
      query: (id: string) => ({
        url: `/agency-template/${id}`,
        method: "GET",
      }),
      providesTags: ["AgencyTemplate"],
    }),
    createAgencyTemplate: builder.mutation({
      query: (data) => ({
        url: "/agency-template",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AgencyTemplate"],
    }),
  }),
});

export const {
  useCreateAgencyTemplateListMutation,
  useGetAgencyTemplateByIdQuery,
  useCreateAgencyTemplateMutation,
} = agencyTemplateSlice;
