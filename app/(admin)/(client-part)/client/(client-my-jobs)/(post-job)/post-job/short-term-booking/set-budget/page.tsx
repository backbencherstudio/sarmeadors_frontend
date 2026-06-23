"use client";

import { usePaymentCheckQuery, usePaymentServiceMutation } from "@/feature/dashboard/client/myJob";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { toast } from "sonner";

const labelClass = "mb-2 block text-sm font-medium text-[#111827]";
const requiredClass = "text-[#EF4444]";
const selectClass =
  "h-11 w-full appearance-none rounded-md border border-[#DDE3EA] bg-[#F8FAFC] px-3 pr-10 text-sm text-[#111827] outline-none transition-[color,box-shadow] focus:border-[#111827] focus:ring-1 focus:ring-[#111827]";
const inputClass =
  "h-11 w-full rounded-md border border-[#DDE3EA] bg-[#F8FAFC] px-3 text-sm text-[#111827] outline-none transition-[color,box-shadow] placeholder:text-[#8A94A6] focus:border-[#111827] focus:ring-1 focus:ring-[#111827]";
const errorInputClass = "border-[#EF4444] focus:border-[#EF4444] focus:ring-[#EF4444]";
const errorTextClass = "mt-1 text-xs text-[#EF4444]";

const STORAGE_KEY = "short-term-job-details";

function RequiredMark() {
  return <span className={requiredClass}>*</span>;
}

function SelectField({
  id,
  value,
  onChange,
  children,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
}) {
  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={selectClass}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#475569]" />
    </div>
  );
}

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

function buildJobFormData(
  storedData: Record<string, unknown> | undefined,
): FormData {
  const formData = new FormData();

  if (storedData) {
    Object.entries(storedData).forEach(([key, value]) => {
      appendToFormData(formData, key, value);
    });
  }

  return formData;
}

export default function Page() {
  const [currency, setCurrency] = useState("usd");
  const [compensationAmount, setCompensationAmount] = useState("");
  const [rateType, setRateType] = useState("hour");
  const [submitting, setSubmitting] = useState(false);
  const [amountError, setAmountError] = useState<string | undefined>();
  const router = useRouter();

  const { data: paymentCheck, isLoading } = usePaymentCheckQuery({});
  const [createPayment] = usePaymentServiceMutation();

  const saveDraft = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const currentDraft = stored ? JSON.parse(stored) : {};

    const draft = {
      ...currentDraft,
      compensation_currency: currency,
      compensation_amount:
        compensationAmount.trim() === "" ? "" : Number(compensationAmount),
      compensation_type: rateType,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    return draft;
  };

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) return;

    try {
      const parsed = JSON.parse(stored);
      setCurrency(parsed.compensation_currency || "usd");
      setCompensationAmount(
        parsed.compensation_amount !== undefined &&
          parsed.compensation_amount !== ""
          ? String(parsed.compensation_amount)
          : "",
      );
      setRateType(parsed.compensation_type || "hour");
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    saveDraft();
  }, [currency, compensationAmount, rateType]);

  const sendToPaymentPage = () => {
    if (paymentCheck?.data?.payment_required) {
      router.push("/client/payment");
    }
  };

  const validate = (): string | undefined => {
    if (compensationAmount.trim() === "") {
      return "Compensation amount is required.";
    }
    if (Number(compensationAmount) <= 0) {
      return "Compensation amount must be greater than 0.";
    }
    return undefined;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextAmountError = validate();
    setAmountError(nextAmountError);

    if (nextAmountError) {
      document
        .getElementById("compensation-amount")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    const draft = saveDraft();
    const formData = buildJobFormData(draft);

    setSubmitting(true);
    try {
      await createPayment(formData).unwrap();
      toast.success("Job details saved!");
      router.push('/client/post-job/short-term-booking/job-details')
      sendToPaymentPage();
    } catch (err: any) {
      toast.error(err?.data?.message ?? "Failed to submit job post");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="pb-8 pt-5" onSubmit={handleSubmit} noValidate>
      <div className="mb-7">
        <h1 className="text-xl font-semibold text-[#111827]">Set the Budget</h1>
        <p className="mt-2 text-sm text-[#64748B]">
          Define the financial details for this job
        </p>
      </div>

      <div>
        <label htmlFor="compensation-amount" className={labelClass}>
          Compensation <RequiredMark />
        </label>
        <div className="grid gap-2 md:grid-cols-[84px_1fr_1fr]">
          <SelectField id="currency" value={currency} onChange={setCurrency}>
            <option value="usd">$</option>
            <option value="eur">EUR</option>
            <option value="gbp">GBP</option>
          </SelectField>

          <input
            id="compensation-amount"
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            value={compensationAmount}
            onChange={(event) => setCompensationAmount(event.target.value)}
            className={`${inputClass} ${amountError ? errorInputClass : ""}`}
            aria-invalid={Boolean(amountError)}
          />

          <SelectField id="rate-type" value={rateType} onChange={setRateType}>
            <option value="per_hour">Per Hour</option>
            <option value="per_day">Per Day</option>
            <option value="per_week">Per Week</option>
          </SelectField>
        </div>
        {amountError && <p className={errorTextClass}>{amountError}</p>}
      </div>

      <div className="mt-8 rounded-lg border border-[#2684FF] bg-[#EAF3FF] px-5 py-5 text-[#0065FF]">
        <h2 className="text-base font-semibold">Budget Planning Tips</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm">
          <li>Consider market rates for similar positions.</li>
          <li>Factor in experience level requirements.</li>
          <li>Include any additional benefits or bonuses.</li>
        </ul>
      </div>

      <div className="mt-10 flex items-center justify-between">
        <button
          type="button"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-[#E5E7EB] bg-white px-5 text-sm font-medium text-[#111827] transition-colors hover:bg-[#F8FAFC]"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </button>

        <button
          type="submit"
          disabled={submitting || isLoading}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#111827] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#1F2937] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          {submitting ? "Submitting..." : "Submit Short-term Job Post"}
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}