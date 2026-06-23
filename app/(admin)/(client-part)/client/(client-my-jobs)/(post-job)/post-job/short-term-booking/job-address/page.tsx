"use client";

import { Input } from "@/components/ui/input";
import { useLocationsQuery } from "@/feature/dashboard/client/myJob";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const inputClass =
  "h-11 rounded-md border-[#DDE3EA] bg-[#F8FAFC] px-3 text-sm text-[#111827] shadow-none placeholder:text-[#8A94A6] focus-visible:ring-1 focus-visible:ring-[#111827]";
const labelClass = "mb-2 block text-sm font-medium text-[#111827]";
const requiredClass = "text-[#EF4444]";
const selectClass =
  "h-11 w-full appearance-none rounded-md border border-[#DDE3EA] bg-[#F8FAFC] px-3 pr-10 text-sm text-[#111827] outline-none transition-[color,box-shadow] focus:border-[#111827] focus:ring-1 focus:ring-[#111827]";
const errorInputClass = "border-[#EF4444] focus-visible:ring-[#EF4444]";
const errorSelectClass = "border-[#EF4444] focus:border-[#EF4444] focus:ring-[#EF4444]";
const errorTextClass = "mt-1 text-xs text-[#EF4444]";

const STORAGE_KEY = "short-term-job-details";

type FieldErrors = {
  job_address?: string;
  home_city?: string;
  home_province?: string;
  home_postal_code?: string;
  country?: string;
  location?: string;
};

function RequiredMark() {
  return <span className={requiredClass}>*</span>;
}

export default function Page() {
  const [jobAddress, setJobAddress] = useState("");
  const [homeCity, setHomeCity] = useState("");
  const [homeProvince, setHomeProvince] = useState("");
  const [homePostalCode, setHomePostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [location, setLocation] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const router = useRouter();

  const { data } = useLocationsQuery({});

  const saveDraft = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const currentDraft = stored ? JSON.parse(stored) : {};

    const draft = {
      ...currentDraft,
      job_address: jobAddress,
      home_city: homeCity,
      home_province: homeProvince,
      home_postal_code: homePostalCode,
      country,
      location_id: location,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  };

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return;

    try {
      const parsed = JSON.parse(stored);
      setJobAddress(parsed.job_address || "");
      setHomeCity(parsed.home_city || "");
      setHomeProvince(parsed.home_province || "");
      setHomePostalCode(parsed.home_postal_code || "");
      setCountry(parsed.country || "");
      setLocation(parsed.location_id || "");
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    saveDraft();
  }, [jobAddress, homeCity, homeProvince, homePostalCode, country, location]);

  const validate = (): FieldErrors => {
    const nextErrors: FieldErrors = {};

    if (!jobAddress.trim()) nextErrors.job_address = "Job address is required.";
    if (!homeCity.trim()) nextErrors.home_city = "Home city is required.";
    if (!homeProvince.trim()) nextErrors.home_province = "Home province/state is required.";
    if (!homePostalCode.trim()) nextErrors.home_postal_code = "Home postal code is required.";
    if (!country.trim()) nextErrors.country = "Country is required.";
    if (!location.trim()) nextErrors.location = "Please select a location.";

    return nextErrors;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      const firstErrorEl = document.querySelector("[data-error='true']");
      firstErrorEl?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    saveDraft();
    router.push("/client/post-job/short-term-booking/set-budget");
  };

  return (
    <form className="pb-8 pt-5" onSubmit={handleSubmit} noValidate>
      <div className="mb-7">
        <h1 className="text-xl font-semibold text-[#111827]">Define Job Address</h1>
        <p className="mt-2 text-sm text-[#64748B]">
          Provide detailed address about the job posting
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <label htmlFor="job-address" className={labelClass}>
            Job Address <RequiredMark />
          </label>
          <Input
            id="job-address"
            value={jobAddress}
            onChange={(event) => setJobAddress(event.target.value)}
            className={`${inputClass} ${errors.job_address ? errorInputClass : ""}`}
            data-error={Boolean(errors.job_address)}
            aria-invalid={Boolean(errors.job_address)}
          />
          {errors.job_address && <p className={errorTextClass}>{errors.job_address}</p>}
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="home-city" className={labelClass}>
              Home City <RequiredMark />
            </label>
            <Input
              id="home-city"
              value={homeCity}
              onChange={(event) => setHomeCity(event.target.value)}
              className={`${inputClass} ${errors.home_city ? errorInputClass : ""}`}
              data-error={Boolean(errors.home_city)}
              aria-invalid={Boolean(errors.home_city)}
            />
            {errors.home_city && <p className={errorTextClass}>{errors.home_city}</p>}
          </div>
          <div>
            <label htmlFor="home-province" className={labelClass}>
              Home Province/State <RequiredMark />
            </label>
            <Input
              id="home-province"
              value={homeProvince}
              onChange={(event) => setHomeProvince(event.target.value)}
              className={`${inputClass} ${errors.home_province ? errorInputClass : ""}`}
              data-error={Boolean(errors.home_province)}
              aria-invalid={Boolean(errors.home_province)}
            />
            {errors.home_province && <p className={errorTextClass}>{errors.home_province}</p>}
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="home-postal-code" className={labelClass}>
              Home Postal Code <RequiredMark />
            </label>
            <Input
              id="home-postal-code"
              value={homePostalCode}
              onChange={(event) => setHomePostalCode(event.target.value)}
              className={`${inputClass} ${errors.home_postal_code ? errorInputClass : ""}`}
              data-error={Boolean(errors.home_postal_code)}
              aria-invalid={Boolean(errors.home_postal_code)}
            />
            {errors.home_postal_code && <p className={errorTextClass}>{errors.home_postal_code}</p>}
          </div>
          <div>
            <label htmlFor="country" className={labelClass}>
              Country <RequiredMark />
            </label>
            <Input
              id="country"
              value={country}
              onChange={(event) => setCountry(event.target.value)}
              className={`${inputClass} ${errors.country ? errorInputClass : ""}`}
              data-error={Boolean(errors.country)}
              aria-invalid={Boolean(errors.country)}
            />
            {errors.country && <p className={errorTextClass}>{errors.country}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="location" className={labelClass}>
            Location <RequiredMark />
          </label>
          <div className="relative">
            <select
              id="location"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              className={`${selectClass} ${errors.location ? errorSelectClass : ""}`}
              data-error={Boolean(errors.location)}
              aria-invalid={Boolean(errors.location)}
            >
              <option value="" disabled>
                Start typing to filter
              </option>
              {data?.data?.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.location}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#475569]" />
          </div>
          {errors.location && <p className={errorTextClass}>{errors.location}</p>}
        </div>
      </div>

      <div className="mt-10 flex items-center justify-between">
        <button
          type="button"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-[#E5E7EB] bg-white px-5 text-sm font-medium text-[#111827] transition-colors hover:bg-[#F8FAFC] cursor-pointer"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </button>

        <button
          type="submit"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#111827] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#1F2937] cursor-pointer"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}