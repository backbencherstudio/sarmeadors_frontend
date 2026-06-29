import { baseApi } from "@/feature/api/baseApi";

const ClientPaymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getClientPayment: builder.query({
      query: (params) => ({
        url: "/client/payments",
        method: "GET",
        params,
      }),
    }),
    getPaymentInvoice: builder.query({
      query: () => ({
        url: `/client/payments/invoices`,
        method: "GET",
      }),
    }),
    getPaymentInvoiceDetails: builder.query({
      query: (id) => ({
        url: `/client/payments/invoices/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetClientPaymentQuery,
  useGetPaymentInvoiceQuery,
  useGetPaymentInvoiceDetailsQuery,
} = ClientPaymentApi;
