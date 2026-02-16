"use client";
import { Label } from "@/components/ui/label";
import { locationFilters, typeFilters } from "@/demoData/DashboardData";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ReusableInput from "../common/InputFiled/ReusableInput";
import SelecteInputField from "../common/InputFiled/SelecteInputField";
import ReusableTextarea from "../common/InputFiled/TextAreaField";
import RootDialog from "../common/RootDialog";
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
  const { register, handleSubmit, setValue, control, watch, reset, formState } =
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
    <RootDialog open={open} setOpen={setOpen}>
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
            <ReusableInput
              type="email"
              placeholder="Enter your email"
              label="Email"
              {...register("email", { required: true })}
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-1">
            <ReusableInput
              type="text"
              placeholder="Enter your phone number"
              label="Phone Number"
              {...register("phoneNumber", { required: true })}
            />
          </div>

          {/* First Name */}
          <div className="space-y-1">
            <ReusableInput
              type="text"
              placeholder="Enter your first name"
              label="First Name"
              {...register("firstName", { required: true })}
            />
          </div>

          {/* Last Name */}
          <div className="space-y-1">
            <ReusableInput
              type="text"
              placeholder="Enter your last name"
              label="Last Name"
              {...register("lastName", { required: true })}
            />
          </div>

          {/* User Types */}
          <div className="space-y-2">
            <Label className="text-sm">User Types</Label>

            <Controller
              control={control}
              name="userType"
              rules={{ required: "User Type is required" }}
              render={({ field }) => {
                return (
                  <SelecteInputField
                    options={filteredTypes}
                    value={field.value}
                    onValueChange={field.onChange}
                    placeholder="Select status"
                  />
                );
              }}
            />

            <div className="text-secondaryColor text-sm">Clear</div>
          </div>

          {/* Locations */}
          <div className="space-y-2">
            <Label className="text-sm">Locations</Label>
            <Controller
              control={control}
              name="location"
              rules={{ required: "Location is required" }}
              render={({ field }) => {
                return (
                  <SelecteInputField
                    options={filteredLocations}
                    value={field.value}
                    onValueChange={field.onChange}
                    placeholder="Select status"
                  />
                );
              }}
            />
            <div className="text-secondaryColor text-sm">Clear</div>
          </div>

          {/* How did you hear about us? */}
          <div className="">
            <ReusableTextarea
              label="How did you hear about us?"
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
    </RootDialog>
  );
}

export default ClientCreateForm;
