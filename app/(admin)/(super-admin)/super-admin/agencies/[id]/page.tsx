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
import {
  useCreateAgencyMutation,
  useGetSingleAgencieQuery,
  useUpdateAgencyMutation,
} from "@/feature/dashboard/super-admin/agency";
import { ChevronLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type FormValues = {
  name: string;
  subdomain_prefix: string;
  email: string;
  mobile: string;
  address: string;
  password: string;
  password_confirmation: string;
  max_users: string;
  max_clients: string;
  max_candidates: string;
  status: string;
};

export default function AddNewAgency() {
  const { id } = useParams();
  const { data: agencyData, refetch } = useGetSingleAgencieQuery(id);
  const [updateAgency, { isLoading }] = useUpdateAgencyMutation();

  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { status: "active" },
  });

  // Populate form fields when agency data is fetched
  useEffect(() => {
    if (agencyData?.data) {
      const agency = agencyData.data;
      setValue("name", agency.name || "");
      setValue("subdomain_prefix", agency.subdomain_prefix || "");
      setValue("email", agency.email || "");
      setValue("mobile", agency.mobile || "");
      setValue("address", agency.address || "");
      setValue("status", agency.status || "active");
      setValue("max_users", String(agency.max_users ?? ""));
      setValue("max_clients", String(agency.max_clients ?? ""));
      setValue("max_candidates", String(agency.max_candidates ?? ""));
    }
  }, [agencyData, setValue]);

  const onSubmit = async (data: FormValues) => {
    try {
      const payload = {
        ...data,
        max_users: Number(data.max_users),
        max_clients: Number(data.max_clients),
        max_candidates: Number(data.max_candidates),
      };
      const result = await updateAgency({ id, data: payload }).unwrap();
      console.log(result.status);
      if (result.status) {
        toast.success(result.message || "Agency update successfully");
        refetch();
        router.push("/super-admin/agencies");
      }
    } catch (error) {
      toast.error(error?.data?.message);
      // console.error("Failed to create agency:", error?.data);
    }
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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 pl-10">
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
                  Name <span className="text-red-500">*</span>
                </Label>
                <ReusableInput
                  placeholder="e.g. TalentBridge Solutions"
                  {...register("name", {
                    required: "Name is required",
                    maxLength: { value: 100, message: "Max 100 characters" },
                  })}
                  className={errors.name ? "border-red-400" : ""}
                />
                {errors.name && (
                  <p className="text-xs text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <Label className="text-xs font-medium text-[#111927]">
                  Subdomain Prefix <span className="text-red-500">*</span>
                </Label>
                <div className="flex">
                  <div className="w-full">
                    <ReusableInput
                      placeholder="talentbridge"
                      {...register("subdomain_prefix", {
                        required: "Subdomain prefix is required",
                        maxLength: { value: 50, message: "Max 50 characters" },
                        pattern: {
                          value: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                          message:
                            "Only lowercase letters, numbers, and hyphens",
                        },
                      })}
                      className={`rounded-r-none border-r-0 ${errors.subdomain_prefix ? "border-red-400" : ""}`}
                    />
                  </div>
                  <span className="h-12! md:h-13! px-3 flex items-center border border-gray-200 bg-gray-50 text-xs text-gray-400 rounded-r-md whitespace-nowrap">
                    .platform.io
                  </span>
                </div>
                {errors.subdomain_prefix && (
                  <p className="text-xs text-red-500">
                    {errors.subdomain_prefix.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email + Mobile */}
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
                    maxLength: { value: 100, message: "Max 100 characters" },
                  })}
                  className={errors.email ? "border-red-400" : ""}
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <Label className="text-xs font-medium text-[#111927]">
                  Mobile
                </Label>
                <ReusableInput
                  placeholder="+1 (555) 000-0000"
                  {...register("mobile", {
                    maxLength: { value: 20, message: "Max 20 characters" },
                  })}
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
                {...register("address", {
                  maxLength: { value: 500, message: "Max 500 characters" },
                })}
              />
            </div>

            {/* Password + Confirm Password */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-xs font-medium text-[#111927]">
                  Password <span className="text-red-500">*</span>
                </Label>
                <ReusableInput
                  type="password"
                  placeholder="Min 6 characters"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Min 6 characters" },
                  })}
                  className={errors.password ? "border-red-400" : ""}
                />
                {errors.password && (
                  <p className="text-xs text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <Label className="text-xs font-medium text-[#111927]">
                  Confirm Password <span className="text-red-500">*</span>
                </Label>
                <ReusableInput
                  type="password"
                  placeholder="Re-enter password"
                  {...register("password_confirmation", {
                    required: "Please confirm your password",
                    validate: (value, formValues) =>
                      value === formValues.password || "Passwords do not match",
                  })}
                  className={
                    errors.password_confirmation ? "border-red-400" : ""
                  }
                />
                {errors.password_confirmation && (
                  <p className="text-xs text-red-500">
                    {errors.password_confirmation.message}
                  </p>
                )}
              </div>
            </div>

            {/* Status */}
            <div className="space-y-1">
              <Label className="text-xs font-medium text-[#111927]">
                Status
              </Label>
              <Select
                defaultValue="active"
                onValueChange={(val) => setValue("status", val)}
              >
                <SelectTrigger className="w-full text-sm">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
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
                  Max Users <span className="text-red-500">*</span>
                </Label>
                <ReusableInput
                  placeholder="e.g. 20 or Unlimited"
                  {...register("max_users", {
                    required: "Required",
                    min: { value: 1, message: "Min 1" },
                  })}
                  className={`bg-white ${errors.max_users ? "border-red-400" : ""}`}
                />
                {errors.max_users ? (
                  <p className="text-xs text-red-500">
                    {errors.max_users.message}
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
                  {...register("max_candidates", {
                    required: "Required",
                    min: { value: 1, message: "Min 1" },
                  })}
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
                  {...register("max_clients", {
                    required: "Required",
                    min: { value: 1, message: "Min 1" },
                  })}
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
            className="text-sm cursor-pointer"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-[#111927] hover:bg-[#1f2937] text-white text-sm cursor-pointer"
          >
            {isLoading ? "Update..." : "Update Agency"}
          </Button>
        </div>
      </form>
    </div>
  );
}
