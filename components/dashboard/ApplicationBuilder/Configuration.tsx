import ReusableInput from "@/components/common/InputFiled/ReusableInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller, useForm } from "react-hook-form";

type FormValues = {
  name: string;
  type: string;
  status: string;
};

export default function Configuration({ onNext }: { onNext?: () => void }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log(data);
    onNext?.();
  };

  return (
    <div className="mt-8">
      <h1 className="text-gray-900 font-semibold text-2xl">
        Step 1: Configuration
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 flex flex-col gap-6"
      >
        {/* Name */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">
            Name <span className="text-red-500">*</span>
          </label>

          <ReusableInput
            {...register("name")}
            placeholder="Name this template for internal use, e.g., Ask candidate to schedule first interview."
            className="w-full"
          />

          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Type + Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Type */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Type</label>

            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full py-5">
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="candidate">Candidate</SelectItem>
                    <SelectItem value="job">Job</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="reference">Reference</SelectItem>
                    <SelectItem value="event-care">Event Care</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {/* Status */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Status</label>

            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full py-5">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="pre-application">
                      Pre Application
                    </SelectItem>
                    <SelectItem value="application-started">
                      Application Started
                    </SelectItem>
                    <SelectItem value="applied">Applied</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="application-approved">
                      Application Approved
                    </SelectItem>
                    <SelectItem value="interview-complete">
                      Interview Complete
                    </SelectItem>
                    <SelectItem value="profile-complete">
                      Profile Complete
                    </SelectItem>
                    <SelectItem value="hired">Hired</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 pt-6 border-t">
          <button
            type="button"
            className="px-6 py-2.5 rounded-md cursor-pointer border border-gray-200 text-sm font-medium hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-md cursor-pointer bg-[#111827] text-white text-sm font-medium hover:bg-black flex items-center gap-2"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}
