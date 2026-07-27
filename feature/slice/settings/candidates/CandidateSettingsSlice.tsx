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
    postCandidateSettingsUpdate: builder.mutation({
      query: (settingsData) => ({
        url: `/agency/settings/candidate`,
        method: "POST",
        body: { settings: settingsData },
      }),
      invalidatesTags: ["candidateSettings"],
    }),
  }),
});

export const {
  useGetCandidateSettingsQuery,
  usePostCandidateSettingsUpdateMutation,
} = CandidateSettingsSlice;
