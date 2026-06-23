import { baseApi } from "@/feature/api/baseApi";

const ClientMyCandidatedApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getShortTermJob: builder.query({
            query: (q) => ({
                url: `/client/jobs/short-term?filter[status]=${q}`,
                method: "GET",
            }),
        }),
        shortTermHireRequest: builder.mutation({
            query: (id) => ({
                url: `/client/candidates/${id}/hire-request`,
                method: "POST",
            }),
        }),
        PaymentService: builder.mutation({
            query: (body) => ({
                url: `/client/jobs/short-term`,
                method: "POST",
                body,
            }),
        }),
        PaymentCheck: builder.query({
            query: () => ({
                url: `/client/jobs/short-term/payment-check`,
                method: "GET",
            }),
        }),
        locations: builder.query({
            query: () => ({
                url: `/client/locations`,
                method: "GET",
            }),
        }),
    }),
});

export const {
    useGetShortTermJobQuery,
    useShortTermHireRequestMutation,
    usePaymentServiceMutation,
    usePaymentCheckQuery,
    useLocationsQuery
} = ClientMyCandidatedApi;
