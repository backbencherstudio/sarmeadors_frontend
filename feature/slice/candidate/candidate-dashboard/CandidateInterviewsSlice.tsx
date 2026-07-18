import { baseApi } from "@/feature/api/baseApi";

const CandidateInterviewsSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCandidateInterviews: builder.query({
      query: (args = {}) => {
        const {
          period = "month",
          view = "calendar",
          search = "",
          month,
          year,
          status = "",
        } = args;
        const params = new URLSearchParams();
        params.set("view", view);
        params.set("period", period);
        params.set("search", search);
        if (month) params.set("month", String(month));
        if (year) params.set("year", String(year));
        params.set("status", status);
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
    joinInterview: builder.mutation({
      query: (interview_id) => ({
        url: `/candidate/interviews/${interview_id}/join`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetCandidateInterviewsQuery,
  useGetCandidateInterviewsShowQuery,
  useJoinInterviewMutation,
} = CandidateInterviewsSlice;
