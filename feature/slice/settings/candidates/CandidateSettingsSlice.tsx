import { baseApi } from "@/feature/api/baseApi";

const CandidateSettingsSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCandidateSettings: builder.query({
      query: () => ({
        url: `/agency/settings/candidate`,
        method: "GET",
      }),
      providesTags: ["candidateSettings"],
    }),
  }),
});

export const { useGetCandidateSettingsQuery } = CandidateSettingsSlice;
