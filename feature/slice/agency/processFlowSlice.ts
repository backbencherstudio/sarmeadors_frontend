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
  }),
});

export const { useGetProcessFlowQuery } = processFlowSlice;
