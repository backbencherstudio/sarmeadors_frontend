import { baseApi } from "@/feature/api/baseApi";

const JobsSettingsSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getJobsSettings: builder.query({
      query: () => ({
        url: `/agency/get-global-job-settings`,
        method: "GET",
      }),
      providesTags: ["jobsSettings"],
    }),
    postJobsSettingsUpdate: builder.mutation({
      query: (settingsData) => ({
        url: `/agency/update-global-job-settings`,
        method: "POST",
        body: { settings: settingsData },
      }),
      invalidatesTags: ["jobsSettings"],
    }),
  }),
});

export const { useGetJobsSettingsQuery, usePostJobsSettingsUpdateMutation } =
  JobsSettingsSlice;
