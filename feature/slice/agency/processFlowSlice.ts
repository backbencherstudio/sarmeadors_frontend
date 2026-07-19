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
  }),
});

export const { useGetProcessFlowQuery, useGetMessageTemplateQuery,useGetDocumentTemplatesListQuery } =
  processFlowSlice;
