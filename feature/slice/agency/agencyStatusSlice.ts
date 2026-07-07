import { baseApi } from "@/feature/api/baseApi";

export const agencyStatusSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allAgencyStatus: builder.query({
      query: () => ({
        url: `/agency/statuses`,
        method: "GET",
      }),
      providesTags: ["AgencyClientTableColumns"],
    }),

    getAgencyStatuses: builder.query({
      query: (statusId) => ({
        url: `/agency/status-edit/${statusId}`,
        method: "GET",
      }),
    }),

    createAgencyStatus: builder.mutation({
      query: (statusData) => ({
        url: `/agency/status-store`,
        method: "POST",
        body: statusData,
      }),
      invalidatesTags: ["AgencyClientTableColumns"],
    }),

    updateSingleAgencyStatus: builder.mutation({
      query: ({ id, ...statusData }) => ({
        url: `/agency/status-update/${id}`,
        method: "PUT",
        body: statusData,
      }),
      invalidatesTags: ["AgencyClientTableColumns"],
    }),

    updateStatusSerialAgencyStatus: builder.mutation({
      query: ({ id, serial }) => ({
        url: `/agency/status-serial-update/${id}`,
        method: "PUT",
        params:  serial ,
      }),
      invalidatesTags: ["AgencyClientTableColumns"],
    }),
    updateStatusReason: builder.mutation({
      query: ({ id, reason }) => ({
        url: `/agency/status-reasons/${id}`,
        method: "PATCH",
        params: reason ,
      }),
      invalidatesTags: ["AgencyClientTableColumns"],
    }),

    deleteAgencyStatus: builder.mutation({
      query: ({ id, ...statusData }) => ({
        url: `/agency/status-delete/${id}`,
        method: "DELETE",
        body: statusData,
      }),
      invalidatesTags: ["AgencyClientTableColumns"],
    }),
  }),
});

export const {
  useAllAgencyStatusQuery,
  useGetAgencyStatusesQuery,
  useCreateAgencyStatusMutation,
  useUpdateSingleAgencyStatusMutation,
  useUpdateStatusSerialAgencyStatusMutation,
  useDeleteAgencyStatusMutation,
} = agencyStatusSlice;
