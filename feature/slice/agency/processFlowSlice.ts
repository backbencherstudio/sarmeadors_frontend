import { baseApi } from "@/feature/api/baseApi";

const processFlowSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProcessFlow: builder.query({
      query: (type: "candidate" | "client") => ({
        url: `/agency/get-process-flow?type=${type}`,
        method: "GET",
      }),
      providesTags: ["ProcessFlow"],
    }),
    getMessageTemplate: builder.query({
      query: () => ({
        url: `/agency/message_template`,
        method: "GET",
      }),
      providesTags: ["ProcessFlow"],
    }),
    getDocumentTemplatesList: builder.query({
      query: () => ({
        url: `/agency/document-templates`,
        method: "GET",
      }),
      providesTags: ["ProcessFlow"],
    }),
    CreateTemplate: builder.mutation({
      query: (data) => ({
        url: `/agency/status-template-store`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ProcessFlow"],
    }),
    UpdateTemplate: builder.mutation({
      query: ({ TmpId, data }) => ({
        url: `/agency/status-template-update/${TmpId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["ProcessFlow"],
    }),
  }),
});

export const {
  useGetProcessFlowQuery,
  useGetMessageTemplateQuery,
  useGetDocumentTemplatesListQuery,
  useCreateTemplateMutation,
  useUpdateTemplateMutation,
} = processFlowSlice;
