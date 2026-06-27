import { baseApi } from "@/feature/api/baseApi";

const candidateDocumentSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCandidateDocument: builder.query({   
    query: () => ({
        url: `/candidate/documents`,
        method: "GET",
      }),
    })
})
})

export const { useGetCandidateDocumentQuery } = candidateDocumentSlice; 