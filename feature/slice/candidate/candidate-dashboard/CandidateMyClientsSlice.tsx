import { baseApi } from "@/feature/api/baseApi";

const CandidateMyClientsSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCandidateMyClients: builder.query({
      query: (args = {}) => {
        const { search = "", filter_search = "", per_page = 10, page } = args;
        const params = new URLSearchParams();
        if (search !== undefined) params.append("search", search);
        if (filter_search !== undefined)
          params.append("filter[search]", filter_search);
        if (per_page) params.append("per_page", per_page);
        if (page) params.append("page", page);
        return {
          url: `/candidate/clients?${params.toString()}`,
          method: "GET",
        };
      },
    }),
    getCandidateMyClientsDetails: builder.query({
      query: ({ clientId }) => ({
        url: `/candidate/clients/${clientId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetCandidateMyClientsQuery,
  useGetCandidateMyClientsDetailsQuery,
} = CandidateMyClientsSlice;
