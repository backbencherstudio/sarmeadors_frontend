"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { FiSearch } from "react-icons/fi";

type FormValues = {
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  userType: string;
  location: string;
  heardAboutUs: string;
};

function ClientCreateForm() {
  const { register, handleSubmit, setValue, watch, formState } =
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

  const filteredTypes = typeFilters.filter((t) =>
    t.label.toLowerCase().includes(typeSearch.toLowerCase())
  );
  const filteredLocations = locationFilters.filter((l) =>
    l.label.toLowerCase().includes(locationSearch.toLowerCase())
  );

  const onSubmit = (data: FormValues) => {
    // TODO: replace with real API integration
    console.log("Add New Client form submitted:", data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="px-4 py-2 bg-primary text-white rounded-md">
          Add New Client
        </button>
      </DialogTrigger>
      <DialogContent className="p-0 sm:max-w-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg">
          <div className="p-6 border-b border-borderColor">
            <DialogHeader>
              <DialogTitle>Add New Client</DialogTitle>
            </DialogHeader>
          </div>

          <div className="p-6 space-y-4">
            {/* Email */}
            <div className="space-y-1">
              <Label className="text-sm">Email</Label>
              <Input
                type="email"
                placeholder="Enter your email"
                className="h-11"
                {...register("email", { required: true })}
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-1">
              <Label className="text-sm">Phone Number</Label>
              <Input
                type="text"
                placeholder="Password"
                className="h-11"
                {...register("phoneNumber", { required: true })}
              />
            </div>

            {/* First Name */}
            <div className="space-y-1">
              <Label className="text-sm">First Name</Label>
              <Input
                type="text"
                placeholder="Password"
                className="h-11"
                {...register("firstName", { required: true })}
              />
            </div>

            {/* Last Name */}
            <div className="space-y-1">
              <Label className="text-sm">Last Name</Label>
              <Input
                type="text"
                placeholder="Password"
                className="h-11"
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
                <SelectTrigger className="h-11 w-full">
                  <SelectValue placeholder="Start typing to filter" />
                </SelectTrigger>
                <SelectContent className="p-2">
                  <div className="pb-2">
                    <div
                      className="w-full relative"
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      <Input
                        type="text"
                        placeholder="Start typing to filter"
                        value={typeSearch}
                        onChange={(e) => setTypeSearch(e.target.value)}
                        onKeyDown={(e) => e.stopPropagation()}
                        className="pl-8 h-9"
                      />
                      <FiSearch
                        className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                        size={16}
                      />
                    </div>
                  </div>
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
                <SelectTrigger className="h-11 w-full">
                  <SelectValue placeholder="Start typing to filter" />
                </SelectTrigger>
                <SelectContent className="p-2">
                  <div className="pb-2">
                    <div
                      className="w-full relative"
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      <Input
                        type="text"
                        placeholder="Start typing to filter"
                        value={locationSearch}
                        onChange={(e) => setLocationSearch(e.target.value)}
                        onKeyDown={(e) => e.stopPropagation()}
                        className="pl-8 h-9"
                      />
                      <FiSearch
                        className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                        size={16}
                      />
                    </div>
                  </div>
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
                className="min-h-24"
                placeholder="How did you hear about us?"
                {...register("heardAboutUs")}
              />
            </div>
          </div>

          <DialogFooter className="p-6 border-t border-borderColor">
            <DialogClose asChild>
              <button
                type="button"
                className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md"
              >
                Cancel
              </button>
            </DialogClose>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-md"
            >
              Add
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ClientCreateForm;
