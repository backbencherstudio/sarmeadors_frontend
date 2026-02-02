"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { locationFilters, typeFilters } from "@/demoData/DashboardData";
import { useState } from "react";
import { useForm } from "react-hook-form";
import RootDrawer from "../common/RootDrawer";
import ButtonReuseable from "../reusable/CustomButton";

type FormValues = {
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  userType: string;
  location: string;
  heardAboutUs: string;
};

function ClientCreateForm({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { register, handleSubmit, setValue, watch, reset, formState } =
    useForm<FormValues>({
      defaultValues: {
        email: "",
        phoneNumber: "",
        firstName: "",
        lastName: "",
        userType: "",
        location: "",
        heardAboutUs: "",
      },
    });

  const { errors } = formState;
  const [typeSearch, setTypeSearch] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const filteredTypes = typeFilters.filter((t) =>
    t.label.toLowerCase().includes(typeSearch.toLowerCase()),
  );
  const filteredLocations = locationFilters.filter((l) =>
    l.label.toLowerCase().includes(locationSearch.toLowerCase()),
  );

  const onSubmit = (data: FormValues) => {
    // TODO: replace with real API integration
    setLoading(true);
    setTimeout(() => {
      reset();
      setOpen(false);
      setLoading(false);
    }, 300);

    console.log("Add New Client form submitted:", data);
  };

  return (
    <RootDrawer open={open} setOpen={setOpen}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-lg p-6"
      >
        <div className="">
          <h3 className="text-xl lg:text-2xl font-semibold text-blackColor">
            Add New Client
          </h3>
        </div>

        <div className="pt-6 space-y-4 pb-5">
          {/* Email */}
          <div className="space-y-1">
            <Label className="text-sm">Email</Label>
            <Input
              type="email"
              placeholder="Enter your email"
              className="h-12! bg-bgColor"
              {...register("email", { required: true })}
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-1">
            <Label className="text-sm">Phone Number</Label>
            <Input
              type="text"
              placeholder="Enter your phone number"
              className="h-12! bg-bgColor"
              {...register("phoneNumber", { required: true })}
            />
          </div>

          {/* First Name */}
          <div className="space-y-1">
            <Label className="text-sm">First Name</Label>
            <Input
              type="text"
              placeholder="Enter your first name"
              className="h-12! bg-bgColor"
              {...register("firstName", { required: true })}
            />
          </div>

          {/* Last Name */}
          <div className="space-y-1">
            <Label className="text-sm">Last Name</Label>
            <Input
              type="text"
              placeholder="Enter your last name"
              className="h-12! bg-bgColor"
              {...register("lastName", { required: true })}
            />
          </div>

          {/* User Types */}
          <div className="space-y-2">
            <Label className="text-sm">User Types</Label>
            <Select
              value={watch("userType")}
              onValueChange={(v) =>
                setValue("userType", v, { shouldValidate: true })
              }
            >
              <SelectTrigger className="h-12! bg-bgColor w-full">
                <SelectValue placeholder="Start typing to filter" />
              </SelectTrigger>
              <SelectContent className="p-2 w-full">
                {filteredTypes.map((t) => (
                  <SelectItem
                    key={t.value}
                    value={t.value}
                    className="cursor-pointer"
                  >
                    {t.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="text-secondaryColor text-sm">Clear</div>
          </div>

          {/* Locations */}
          <div className="space-y-2">
            <Label className="text-sm">Locations</Label>
            <Select
              value={watch("location")}
              onValueChange={(v) =>
                setValue("location", v, { shouldValidate: true })
              }
            >
              <SelectTrigger className="h-12! bg-bgColor w-full">
                <SelectValue placeholder="Start typing to filter" />
              </SelectTrigger>
              <SelectContent className="p-2 w-full">
                {filteredLocations.map((l) => (
                  <SelectItem
                    key={l.value}
                    value={l.value}
                    className="cursor-pointer"
                  >
                    {l.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="text-secondaryColor text-sm">Clear</div>
          </div>

          {/* How did you hear about us? */}
          <div className="space-y-1">
            <Label className="text-sm">How did you hear about us?</Label>
            <Textarea
              className="min-h-16"
              placeholder="How did you hear about us?"
              {...register("heardAboutUs")}
            />
          </div>
        </div>

        <div className="flex items-center  gap-4 pt-5 border-t ">
          <ButtonReuseable
            type="submit"
            title="  Add"
            className="px-6!"
            sendingMsg="Creating..."
            loading={loading}
          />

          <ButtonReuseable
            type="button"
            title=" Cancel"
            onClick={() => setOpen(false)}
            className="bg-bgColor! text-blackColor! border hover:bg-gray-100!"
          />
        </div>
      </form>
    </RootDrawer>
  );
}

export default ClientCreateForm;
