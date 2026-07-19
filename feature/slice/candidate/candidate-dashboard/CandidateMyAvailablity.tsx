import { baseApi } from "@/feature/api/baseApi";

const candidateMyAvailability = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCandidateAvailabilability: builder.query({
      query: () => ({
        url: `/candidate/availability`,
        method: "GET",
      }),
      providesTags: ["candidateAvailability"],
    }),
    updateCandidateAvailability: builder.mutation({
      query: (data: any) => ({
        url: `/candidate/availability`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["candidateAvailability"],
    }),
    createUnAvailablity: builder.mutation({
      query: (data: any) => ({
        url: `/candidate/availability/unavailabilities`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["candidateAvailability"],
    }),
    getUnAvailablity: builder.query({
      query: () => ({
        url: `/candidate/availability/unavailabilities`,
        method: "GET",
      }),
      providesTags: ["candidateAvailability"],
    }),
    deleteUnAvailablity: builder.mutation({
      query: (id: number) => ({
        url: `/candidate/availability/unavailabilities/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["candidateAvailability"],
    }),
  }),
});

export const {
  useGetCandidateAvailabilabilityQuery,
  useUpdateCandidateAvailabilityMutation,
  useCreateUnAvailablityMutation,
  useGetUnAvailablityQuery,
  useDeleteUnAvailablityMutation,
} = candidateMyAvailability;
