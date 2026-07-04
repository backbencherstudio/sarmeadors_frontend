import { baseApi } from "@/feature/api/baseApi";

const CandidateInterviewsSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCandidateInterviews: builder.query({
      query: (args = {}) => {
        const {
          period = "month",
          view = "list",
          search = "",
          month,
          year,
          filter_search = "",
        } = args;
        const params = new URLSearchParams();
        if (period) params.append("period", period);
        if (view) params.append("view", view);
        if (search !== undefined) params.append("search", search);
        if (month) params.append("month", month);
        if (year) params.append("year", year);
        if (filter_search !== undefined)
          params.append("filter[search]", filter_search);
        return {
          url: `/candidate/interviews?${params.toString()}`,
          method: "GET",
        };
      },
    }),
    getCandidateInterviewsShow: builder.query({
      query: ({ params }) => ({
        url: `/candidate/interviews?${params}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetCandidateInterviewsQuery,
  useGetCandidateInterviewsShowQuery,
} = CandidateInterviewsSlice;
