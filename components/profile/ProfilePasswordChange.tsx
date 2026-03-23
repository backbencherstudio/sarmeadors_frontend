"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import ButtonReuseable from "../reusable/CustomButton";

type PasswordChangeForm = {
  newPassword: string;
  repeatPassword: string;
};

function ProfilePasswordChange() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PasswordChangeForm>({
    defaultValues: {
      newPassword: "",
      repeatPassword: "",
    },
  });

  const newPassword = watch("newPassword");

  const onSubmit = async (data: PasswordChangeForm) => {
    console.log("Password change submitted:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full border border-borderColor rounded-[20px] p-4 sm:p-6 bg-whiteColor"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-headerColor">
            Edit password
          </h2>
          <p className="mt-1 text-sm text-secondaryColor leading-[142.857%]">
            Password needs to be 8 characters and contain at least one alphabet
            and one number.
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label
            htmlFor="newPassword"
            className="text-lg font-semibold text-headerColor"
          >
            New Password
          </Label>
          <Input
            id="newPassword"
            type="password"
            placeholder="Enter Password"
            className="h-12 md:h-[50px] rounded-lg border-borderColor bg-bgColor px-4 text-base placeholder:text-secondaryColor"
            {...register("newPassword", {
              required: "New password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d).+$/,
                message:
                  "Password must contain at least one letter and one number",
              },
            })}
          />
          {errors.newPassword && (
            <p className="text-sm text-redColor">
              {errors.newPassword.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="repeatPassword"
            className="text-lg font-semibold text-headerColor"
          >
            Repeat password
          </Label>
          <Input
            id="repeatPassword"
            type="password"
            placeholder="Repeat password"
            className="h-12 md:h-[50px] rounded-lg border-borderColor bg-bgColor px-4 text-base placeholder:text-secondaryColor"
            {...register("repeatPassword", {
              required: "Repeat password is required",
              validate: (value) =>
                value === newPassword || "Passwords do not match",
            })}
          />
          {errors.repeatPassword && (
            <p className="text-sm text-redColor">
              {errors.repeatPassword.message}
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <ButtonReuseable
          type="submit"
          title="Save change"
          loading={isSubmitting}
          sendingMsg="Saving..."
          className="px-6"
        />
      </div>
    </form>
  );
}

export default ProfilePasswordChange;
