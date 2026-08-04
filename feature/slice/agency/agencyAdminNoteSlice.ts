import { baseApi } from "@/feature/api/baseApi";

const agencyAdminNoteSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAgencyAdminNotesList: builder.query({
      query: (agencyId: string) => ({
        url: `/agency/clients/${agencyId}/notes`,
        method: "GET",
      }),
      providesTags: ["AgencyAdminNote"],
    }),
    createAgencyAdminNote: builder.mutation({
      query: ({ agencyId, note }) => ({
        url: `/agency/clients/${agencyId}/notes`,
        method: "POST",
        body: note,
      }),
      invalidatesTags: ["AgencyAdminNote"],
    }),
    updateAgencyAdminNote: builder.mutation({
      query: ({ clientId, note, NoteId }) => ({
        url: `/agency/clients/${clientId}/notes/${NoteId}`,
        method: "PATCH",
        body: note,
      }),
      invalidatesTags: ["AgencyAdminNote"],
    }),
  }),
});

export const {
  useGetAgencyAdminNotesListQuery,
  useCreateAgencyAdminNoteMutation,
  useUpdateAgencyAdminNoteMutation,
} = agencyAdminNoteSlice;
