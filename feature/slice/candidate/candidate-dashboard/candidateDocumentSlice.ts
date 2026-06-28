import { baseApi } from "@/feature/api/baseApi";

const candidateDocumentSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCandidateDocument: builder.query({
      query: () => ({
        url: `/candidate/documents`,
        method: "GET",
      }),
      providesTags: ["candidateDocuments"],
    }),
    deleteCandidateDocument: builder.mutation({
      query: (id: string) => ({
        url: `/candidate/documents/required/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["candidateDocuments"],
    }),
    deleteCandidateAdditionalDocument: builder.mutation({
      query: (id: number) => ({
        url: `/candidate/documents/additional/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["candidateDocuments"],
    }),
    uploadCandidateDocument: builder.mutation({
      query: ({
        data,
        documentKey,
      }: {
        data: FormData;
        documentKey: string | null;
      }) => {
       
        return {
          url: `/candidate/documents/required/${documentKey}/upload`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["candidateDocuments"],
    }),
    uploadCandidateAdditionalDocument: builder.mutation({
      query: ({ data }: { data: FormData }) => ({
        url: `/candidate/documents/additional`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["candidateDocuments"],
    }),
    signByCandidateDocument: builder.mutation({
      query: (id: string) => ({
        url: `/candidate/documents/required/${id}/sign`,
        method: "POST",
      }),
      invalidatesTags: ["candidateDocuments"],
    }),
  }),
});

export const {
  useGetCandidateDocumentQuery,
  useDeleteCandidateDocumentMutation,
  useDeleteCandidateAdditionalDocumentMutation,
  useUploadCandidateDocumentMutation,
  useUploadCandidateAdditionalDocumentMutation,
  useSignByCandidateDocumentMutation,
} = candidateDocumentSlice;
