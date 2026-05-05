"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
    <div className="p-6">
      {/* Header */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        Add New Agency
      </button>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Agency Details */}
        <div>
          <h2 className="text-base font-semibold text-gray-900">
            Agency details
          </h2>
          <p className="text-sm text-gray-400 mt-0.5 mb-4">
            Fill in the details to create a new agency
          </p>

          <div className="space-y-4">
            {/* Agency Name + Subdomain */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="agency_name">
                  Agency Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="agency_name"
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

              <div className="space-y-1.5">
                <Label htmlFor="subdomain">
                  Subdomain <span className="text-red-500">*</span>
                </Label>
                <div className="flex items-center gap-0">
                  <Input
                    id="subdomain"
                    placeholder="talentbridge"
                    {...register("subdomain", {
                      required: "Subdomain is required",
                    })}
                    className={`rounded-r-none ${errors.subdomain ? "border-red-400" : ""}`}
                  />
                  <span className="px-3 h-9 flex items-center border border-l-0 border-gray-200 bg-gray-50 text-sm text-gray-500 rounded-r-md whitespace-nowrap">
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
              <div className="space-y-1.5">
                <Label htmlFor="email">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
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

              <div className="space-y-1.5">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  placeholder="+1 (555) 000-0000"
                  {...register("phone")}
                />
              </div>
            </div>

            {/* Address */}
            <div className="space-y-1.5">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                placeholder="123 Business Ave, City, State ZIP"
                {...register("address")}
              />
            </div>

            {/* Logo URL + Favicon URL */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="logo_url">Logo URL</Label>
                <Input
                  id="logo_url"
                  placeholder="https://cdn.agency.io/logo.png"
                  {...register("logo_url")}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="favicon_url">Favicon URL</Label>
                <Input
                  id="favicon_url"
                  placeholder="https://cdn.agency.io/favicon.ico"
                  {...register("favicon_url")}
                />
              </div>
            </div>

            {/* Stripe Account ID + Entry End ID */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="stripe_account_id">Stripe Account ID</Label>
                <Input
                  id="stripe_account_id"
                  placeholder="acct_1xxxxxxxxxx"
                  {...register("stripe_account_id")}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="entry_end_id">Entry End ID</Label>
                <Input
                  id="entry_end_id"
                  placeholder="ent_xxxxxx"
                  {...register("entry_end_id")}
                />
              </div>
            </div>

            {/* Status */}
            <div className="space-y-1.5">
              <Label>Status</Label>
              <Select
                defaultValue="Active"
                onValueChange={(val) => setValue("status", val)}
              >
                <SelectTrigger className="w-full">
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

        {/* Usage Limits */}
        <div>
          <h2 className="text-base font-semibold text-gray-900">
            Usage Limits
          </h2>
          <p className="text-sm text-gray-400 mt-0.5 mb-4">
            Enter a number or type{" "}
            <span className="font-medium text-gray-600">Unlimited</span> for no
            cap.
          </p>

          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50/50">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="max_management_member">
                  Max Management Member <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="max_management_member"
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

              <div className="space-y-1.5">
                <Label htmlFor="max_candidates">
                  Max Candidates <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="max_candidates"
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

              <div className="space-y-1.5">
                <Label htmlFor="max_clients">
                  Max Clients <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="max_clients"
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

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-gray-900 hover:bg-gray-800 text-white"
          >
            Create Agency
          </Button>
        </div>
      </form>
    </div>
  );
}
