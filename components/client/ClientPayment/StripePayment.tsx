"use client";

import DateIcon from "@/components/icon/DateIcon";
import LocationIcon from "@/components/icon/LocationIcon";
import StripeIcon from "@/components/icon/StripeIcon";
import { usePaymentCheckQuery, usePaymentServiceMutation } from "@/feature/dashboard/client/myJob";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export type PaymentData = {
  payment_required?: boolean;
  stripe_publishable_key?: string;
  amount?: number;
  total?: number;
  agency_fee?: number;
  tax?: number | string;
  job_title?: string;
  compensation?: string;
  total_hours?: string;
  total_hour?: string;
  location?: string;
  date?: string;
  job_date?: string;
  job?: {
    title?: string;
  };
};

const stripeElementOptions = {
  style: {
    base: {
      fontSize: "14px",
      color: "#111827",
      "::placeholder": {
        color: "#9CA3AF",
      },
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

const PENDING_JOBS_ROUTE =
  "/client/client-my-jobs/client-my-jobs/short-term-job/pending";

/**
 * Recursively appends a value onto a FormData instance using bracket
 * notation for arrays/objects, e.g.
 *   dates[0][booking_date] = "25-Mar-2016"
 *   children[0][first_name] = "Wallace"
 * Files (instances of File/Blob) are appended directly.
 */
function appendToFormData(
  formData: FormData,
  key: string,
  value: unknown,
): void {
  if (value === undefined || value === null) {
    return;
  }

  if (value instanceof File || value instanceof Blob) {
    formData.append(key, value);
    return;
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return;
    }
    value.forEach((item, index) => {
      appendToFormData(formData, `${key}[${index}]`, item);
    });
    return;
  }

  if (typeof value === "object") {
    Object.entries(value as Record<string, unknown>).forEach(
      ([nestedKey, nestedValue]) => {
        appendToFormData(formData, `${key}[${nestedKey}]`, nestedValue);
      },
    );
    return;
  }

  formData.append(key, String(value));
}

/**
 * Builds the full FormData payload from the stored job draft plus the
 * Stripe payment method id obtained at submit time.
 */
function buildPaymentFormData(
  storedData: Record<string, unknown> | undefined,
  extra: { payment_method_id: string } & Record<string, unknown>,
): FormData {
  const formData = new FormData();

  if (storedData) {
    Object.entries(storedData).forEach(([key, value]) => {
      appendToFormData(formData, key, value);
    });
  }

  Object.entries(extra).forEach(([key, value]) => {
    appendToFormData(formData, key, value);
  });

  return formData;
}

export default function PaymentPage({ storedData }: { storedData?: any }) {
  const router = useRouter();
  const { data: paymentCheck, isLoading } = usePaymentCheckQuery({});
  const paymentData = paymentCheck?.data as PaymentData | undefined;

  const stripePromise = useMemo(() => {
    if (!paymentData?.stripe_publishable_key) return null;
    return loadStripe(paymentData.stripe_publishable_key);
  }, [paymentData?.stripe_publishable_key]);

  // useEffect(() => {
  //   if (paymentData?.payment_required === false) {
  //     router.replace(PENDING_JOBS_ROUTE);
  //   }
  // }, [paymentData?.payment_required, router]);

  if (isLoading || paymentData?.payment_required === false) {
    return null;
  }

  if (!stripePromise) {
    return null;
  }

  return (
    <Elements stripe={stripePromise}>
      <PaymentPageContent paymentData={paymentData} storedData={storedData} />
    </Elements>
  );
}

function PaymentPageContent({
  paymentData,
  storedData,
}: {
  paymentData?: PaymentData;
  storedData?: any;
}) {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [createPayment] = usePaymentServiceMutation();

  const [saveCard, setSaveCard] = useState(false);
  const [cardholderName, setCardholderName] = useState("");
  const [billingCountry, setBillingCountry] = useState("");
  const [billingZip, setBillingZip] = useState("");
  const [additionalNote, setAdditionalNote] = useState("");
  const [loading, setLoading] = useState(false);

  const jobTitle =
    paymentData?.job?.title ??
    paymentData?.job_title ??
    "Full Time Nanny / Family Assistant in Miami Beach + travel (ideally live in)";
  const compensation = paymentData?.compensation ?? "$25/hr";
  const totalHours =
    paymentData?.total_hours ?? paymentData?.total_hour ?? "8hr";
  const location = paymentData?.location ?? "Daactur, Georgia 30030";
  const jobDate = paymentData?.date ?? paymentData?.job_date ?? "11/03/2025";
  const agencyFee = paymentData?.agency_fee ?? 40;
  const tax = paymentData?.tax ?? "-";
  const total =
    paymentData?.amount ??
    paymentData?.total ??
    paymentData?.agency_fee ??
    40;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardNumber = elements.getElement(CardNumberElement);
    if (!cardNumber) {
      toast.error("Card details are required");
      return;
    }

    setLoading(true);

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardNumber,
        billing_details: {
          name: cardholderName || undefined,
          address: {
            country: billingCountry || undefined,
            postal_code: billingZip || undefined,
          },
        },
      });

      if (error) {
        toast.error(error.message ?? "Invalid card details");
        return;
      }

      if (!paymentMethod?.id) {
        toast.error("Could not create payment method");
        return;
      }

      const formData = buildPaymentFormData(storedData, {
        payment_method_id: paymentMethod.id,
        cardholder_name: cardholderName,
        billing_country: billingCountry,
        billing_zip: billingZip,
        additional_note: additionalNote,
        save_card: saveCard,
      });

      await createPayment(formData).unwrap();

      toast.success("Payment successful!");
      // router.push(PENDING_JOBS_ROUTE);
    } catch (err: any) {
      toast.error(err?.data?.message ?? "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="flex items-center justify-center p-6 container"
      onSubmit={handleSubmit}
    >
      <div className="w-full grid grid-cols-3 gap-8">
        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-4 flex-1 col-span-2">
          {/* Payment Information Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-[20px] font-medium leading-[120%] text-[#111927]">
              Payment Information
            </h2>
            <p className="text-[14px] leading-[142.857%] text-[#111927] mt-1.5 mb-5">
              Your card will be charged for the booking fee only.
            </p>

            <input
              type="text"
              placeholder="Enter name as on card"
              value={cardholderName}
              onChange={(event) => setCardholderName(event.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#111827] mb-3 focus:outline-none focus:border-[#111827] focus:ring-1 focus:ring-[#111827]"
            />

            {/* Card Number */}
            <div className="relative mb-3">
              <div className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#111827] pr-20 focus-within:border-[#111827] focus-within:ring-1 focus-within:ring-[#111827]">
                <CardNumberElement options={stripeElementOptions} />
              </div>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-none">
                {/* Mastercard */}
                <div className="relative w-8 h-5">
                  <div className="absolute left-0 w-5 h-5 bg-red-500 rounded-full opacity-90" />
                  <div className="absolute left-3 w-5 h-5 bg-yellow-400 rounded-full opacity-90" />
                </div>
                {/* Visa */}
                <div className="bg-[#1a1f71] text-white text-[9px] font-black px-1.5 py-0.5 rounded italic tracking-tight">
                  VISA
                </div>
              </div>
            </div>

            {/* Expiry + CVV */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#111827] focus-within:border-[#111827] focus-within:ring-1 focus-within:ring-[#111827]">
                <CardExpiryElement options={stripeElementOptions} />
              </div>
              <div className="border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#111827] focus-within:border-[#111827] focus-within:ring-1 focus-within:ring-[#111827]">
                <CardCvcElement options={stripeElementOptions} />
              </div>
            </div>

            {/* Checkbox */}
            <label className="flex items-start gap-2 cursor-pointer mb-5">
              <input
                type="checkbox"
                checked={saveCard}
                onChange={() => setSaveCard(!saveCard)}
                className="mt-0.5 accent-[#111827] cursor-pointer"
              />
              <span className="text-[12px] text-[#384250] leading-[133.333%] font-medium">
                Your payment information is securely stored in our system to be
                used for future bookings.
              </span>
            </label>

            {/* Stripe Badge */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <span className="text-[16px] font-bold text-[#111827] leading-[137.5%]">
                Stripe
              </span>
              <StripeIcon />
            </div>
          </div>

          {/* Billing Address Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-[20px] leading-[120%] font-medium text-[#111827] mb-4">
              Billing Address
            </h2>

            <div className="relative mb-3">
              <select
                value={billingCountry}
                onChange={(event) => setBillingCountry(event.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm appearance-none bg-white cursor-pointer focus:outline-none focus:border-[#111827] focus:ring-1 focus:ring-[#111827]"
              >
                <option value="" disabled>
                  Select your country
                </option>
                <option value="US">United States</option>
                <option value="GB">United Kingdom</option>
                <option value="CA">Canada</option>
                <option value="AU">Australia</option>
              </select>
              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            <input
              type="text"
              placeholder="Enter your ZIP code"
              value={billingZip}
              onChange={(event) => setBillingZip(event.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#111827] focus:outline-none focus:border-[#111827] focus:ring-1 focus:ring-[#111827]"
            />
          </div>

          {/* Additional Note Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-[20px] leading-[120%] font-medium text-[#111827] mb-4">
              Add additional note
            </h2>
            <textarea
              placeholder="Write message..."
              rows={4}
              value={additionalNote}
              onChange={(event) => setAdditionalNote(event.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#111827] resize-none focus:outline-none focus:border-[#111827] focus:ring-1 focus:ring-[#111827]"
            />
          </div>
        </div>

        {/* RIGHT COLUMN: Order Summary */}
        <div className="flex-shrink-0 col-span-1">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl">
              {/* Job Info */}
              <h3 className="text-[16px] font-semibold text-[#111827] leading-[137.5%] mb-6">
                {jobTitle}
              </h3>

              {/* Compensation & Hours */}
              <div className="flex justify-between items-centermb-1">
                <span className="text-[#384250] text-[14px] leading-[142.857%]">
                  Compensation
                </span>
                <span className="font-bold text-[14px] text-[#111827] leading-[142.857%]">
                  {compensation}
                </span>
              </div>
              <div className="flex justify-between items-centermb-4">
                <span className="text-[#384250] text-[14px] leading-[142.857%]">
                  Total Hour
                </span>
                <span className="font-bold text-[14px] text-[#111827] leading-[142.857%]">
                  {totalHours}
                </span>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100 my-4" />

              {/* Location & Date */}
              <div className="flex items-center justify-between text-[11px] text-gray-400 mb-5">
                <div className="flex items-center gap-1">
                  <LocationIcon />
                  <span className="text-[#384250] leading-[142.857%] text-[14px]">
                    {location}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <DateIcon />
                  <span className="text-[#384250] leading-[142.857%] text-[14px]">
                    {jobDate}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl my-5">
              {/* Order Summary */}
              <h4 className="text-[16px] font-semibold leading-[137.5%] text-[#111827] mb-3">
                Order Summary
              </h4>

              <div className="flex justify-between mb-2">
                <span className="text-[14px] tetx-[#384250] leading-[142.857%]">
                  Agency Fee
                </span>
                <span className="text-[#384250] text-[14px] leading-[142.857%] font-semibold">
                  ${agencyFee}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-[#778593] leading-[142.857%] text-[14px]">
                  Tax
                </span>
                <span className="text-[#778593] leading-[142.857%] text-[14px]">
                  {typeof tax === "number" ? `$${tax}` : tax}
                </span>
              </div>
              {/* Divider */}
              <div className="border-t border-gray-100 my-2" />
              <div className="flex justify-between mb-4">
                <span className="text-[#161A1E] text-[14px] font-medium">
                  Total
                </span>
                <span className="text-[#161A1E] text-[14px] font-medium">
                  ${total}
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <button
              type="submit"
              disabled={loading || !stripe}
              className="px-6 py-4 bg-[#111927] border border-[#384250] rounded-[12px] text-lg text-[#FCFCFD] font-semibold leading-[100%] w-full cursor-pointer hover:bg-[#111927]/90 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Processing..." : `Confirm & Pay $${total}`}
            </button>

            {/* Secured by Stripe */}
            <div className="flex flex-col items-center gap-1">
              <p className="text-[#9DA4AE] text-[16px] leading-[137.5%] font-semibold mt-3">
                Secured by SecureTrust !
              </p>
              <p className="text-[#111927] font-bold text-[18px] leading-[137.5%]">
                stripe
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}