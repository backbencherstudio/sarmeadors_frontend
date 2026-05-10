"use client";
import ReusableInput from "@/components/common/InputFiled/ReusableInput";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type FormValues = {
  agency_name: string;
  subdomain: string;
  email: string;
  phone: string;
  address: string;
  logo_url: string;
  favicon_url: string;
  stripe_account_id: string;
  entry_end_id: string;
  status: string;
  max_management_member: string;
  max_candidates: string;
  max_clients: string;
};

export default function AddNewAgency() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { status: "Active" },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Agency Created:", data);
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Header */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1 text-sm font-medium text-[#111927] cursor-pointer mb-6 transition-colors hover:opacity-70"
      >
        <ChevronLeft className="w-4 h-4" />
        Add New Agency
      </button>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 pl-10 max-w-3xl"
      >
        {/* ── Agency Details ── */}
        <div>
          <h2 className="text-sm font-semibold text-[#111927]">
            Agency details
          </h2>
          <p className="text-xs text-gray-400 mt-0.5 mb-5">
            Fill in the details to create a new agency
          </p>

          <div className="space-y-4">
            {/* Agency Name + Subdomain */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-xs font-medium text-[#111927]">
                  Agency Name <span className="text-red-500">*</span>
                </Label>
                <ReusableInput
                  placeholder="e.g. TalentBridge Solutions"
                  {...register("agency_name", {
                    required: "Agency name is required",
                  })}
                  className={errors.agency_name ? "border-red-400" : ""}
                />
                {errors.agency_name && (
                  <p className="text-xs text-red-500">
                    {errors.agency_name.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <Label className="text-xs font-medium text-[#111927]">
                  Subdomain <span className="text-red-500">*</span>
                </Label>
                <div className="flex items-center">
                  <ReusableInput
                    placeholder="talentbridge"
                    {...register("subdomain", {
                      required: "Subdomain is required",
                    })}
                    className={`rounded-r-none border-r-0 ${errors.subdomain ? "border-red-400" : ""}`}
                  />
                  <span className="h-9 px-3 flex items-center border border-gray-200 bg-gray-50 text-xs text-gray-400 rounded-r-md whitespace-nowrap">
                    .platform.io
                  </span>
                </div>
                {errors.subdomain && (
                  <p className="text-xs text-red-500">
                    {errors.subdomain.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email + Phone */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-xs font-medium text-[#111927]">
                  Email <span className="text-red-500">*</span>
                </Label>
                <ReusableInput
                  type="email"
                  placeholder="admin@agency.io"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                  className={errors.email ? "border-red-400" : ""}
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <Label className="text-xs font-medium text-[#111927]">
                  Phone
                </Label>
                <ReusableInput
                  placeholder="+1 (555) 000-0000"
                  {...register("phone")}
                />
              </div>
            </div>

            {/* Address */}
            <div className="space-y-1">
              <Label className="text-xs font-medium text-[#111927]">
                Address
              </Label>
              <ReusableInput
                placeholder="123 Business Ave, City, State ZIP"
                {...register("address")}
              />
            </div>

            {/* Logo URL + Favicon URL */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-xs font-medium text-[#111927]">
                  Logo URL
                </Label>
                <ReusableInput
                  placeholder="https://cdn.agency.io/logo.png"
                  {...register("logo_url")}
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs font-medium text-[#111927]">
                  Favicon URL
                </Label>
                <ReusableInput
                  placeholder="https://cdn.agency.io/favicon.ico"
                  {...register("favicon_url")}
                />
              </div>
            </div>

            {/* Stripe Account ID + Entry End ID */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-xs font-medium text-[#111927]">
                  Stripe Account ID
                </Label>
                <ReusableInput
                  placeholder="acct_1xxxxxxxxxx"
                  {...register("stripe_account_id")}
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs font-medium text-[#111927]">
                  Entry End ID
                </Label>
                <ReusableInput
                  placeholder="ent_xxxxxx"
                  {...register("entry_end_id")}
                />
              </div>
            </div>

            {/* Status */}
            <div className="space-y-1">
              <Label className="text-xs font-medium text-[#111927]">
                Status
              </Label>
              <Select
                defaultValue="Active"
                onValueChange={(val) => setValue("status", val)}
              >
                <SelectTrigger className="w-full text-sm">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Suspended">Suspended</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* ── Usage Limits ── */}
        <div>
          <h2 className="text-sm font-semibold text-[#111927]">Usage Limits</h2>
          <p className="text-xs text-gray-400 mt-0.5 mb-5">
            Enter a number or type{" "}
            <span className="font-semibold text-gray-600">Unlimited</span> for
            no cap.
          </p>

          <div className="border border-[#E5E7EB] rounded-lg p-5 bg-[#F9FAFB]">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1">
                <Label className="text-xs font-medium text-[#111927]">
                  Max Management Member <span className="text-red-500">*</span>
                </Label>
                <ReusableInput
                  placeholder="e.g. 20 or Unlimited"
                  {...register("max_management_member", {
                    required: "Required",
                  })}
                  className={`bg-white ${errors.max_management_member ? "border-red-400" : ""}`}
                />
                {errors.max_management_member ? (
                  <p className="text-xs text-red-500">
                    {errors.max_management_member.message}
                  </p>
                ) : (
                  <p className="text-xs text-gray-400">Team seats per agency</p>
                )}
              </div>

              <div className="space-y-1">
                <Label className="text-xs font-medium text-[#111927]">
                  Max Candidates <span className="text-red-500">*</span>
                </Label>
                <ReusableInput
                  placeholder="e.g. 20 or Unlimited"
                  {...register("max_candidates", { required: "Required" })}
                  className={`bg-white ${errors.max_candidates ? "border-red-400" : ""}`}
                />
                {errors.max_candidates ? (
                  <p className="text-xs text-red-500">
                    {errors.max_candidates.message}
                  </p>
                ) : (
                  <p className="text-xs text-gray-400">
                    Candidate profiles stored
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <Label className="text-xs font-medium text-[#111927]">
                  Max Clients <span className="text-red-500">*</span>
                </Label>
                <ReusableInput
                  placeholder="e.g. 20 or Unlimited"
                  {...register("max_clients", { required: "Required" })}
                  className={`bg-white ${errors.max_clients ? "border-red-400" : ""}`}
                />
                {errors.max_clients ? (
                  <p className="text-xs text-red-500">
                    {errors.max_clients.message}
                  </p>
                ) : (
                  <p className="text-xs text-gray-400">
                    Client accounts linked
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-100">
          <Button
            type="button"
            variant="outline"
            className="text-sm"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-[#111927] hover:bg-[#1f2937] text-white text-sm"
          >
            Create Agency
          </Button>
        </div>
      </form>
    </div>
  );
}
