"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ArrowRightIcon from "../icon/ArrowRightIcon";
import ButtonReuseable from "../reusable/CustomButton";
type NewPasswordFormInputs = {
  new_password: string;
  confirm_password: string;
};
export default function NewPasswordForm() {
  const [isDisable, setIsDisable] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      new_password: "",
      confirm_password: "",
    },
  });
  const [rememberMe, setRememberMe] = useState("123456");
  const router = useRouter();

  const onSubmit = async (data: NewPasswordFormInputs) => {
    setIsDisable(true);
    try {
      // const response = await UserService.login(data);

      // if (response?.data?.success === true) {
      //   const tokenNumber = response?.data?.tokens?.accessToken;
      //   const userType = response?.data?.data?.role;
      //   CookieHelper.set({
      //     key: "jobtoken",
      //     value: tokenNumber,
      //   });
      //   toast.success("Successfully login!");
      //   router.push(userType == "admin" ? "/dashboard" : "/");
      //   reset();
      //   setIsDisable(false);
      // }
      router.push(rememberMe == "123456" ? "/new-password" : "/");
    } catch (error) {
      toast.error("Wrong Email or Password");
      setIsDisable(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 border border-borderColor rounded-2xl p-6 bg-whiteColor"
    >
      <div className="space-y-2">
        <Label
          htmlFor="new_password"
          className="text-[14px] font-medium text-headerColor "
        >
          New password<span className="text-redColor">*</span>
        </Label>
        <Input
          id="new_password"
          {...register("new_password", {
            required: "New Password is required",
            minLength: {
              value: 6,
              message: "New Password must be at least 6 characters",
            },
          })}
          placeholder="New Password"
          type="password"
          className="rounded-md !h-[52px] text-[14px] text-blackColor bg-bgColor "
        />
        {errors.new_password && (
          <span className="text-sm text-red-500">
            {errors.new_password.message}
          </span>
        )}
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="confirm_password"
          className="text-[14px] font-medium text-headerColor "
        >
          Confirm password<span className="text-redColor">*</span>
        </Label>
        <div className="relative">
          <Input
            id="confirm_password"
            {...register("confirm_password", {
              required: "Confirm Password is required",
              minLength: {
                value: 6,
                message: "Confirm Password must be at least 6 characters",
              },
            })}
            type="password"
            placeholder="Confirm password"
            className="rounded-md !h-[52px] text-[14px] pr-10 text-blackColor bg-bgColor "
          />
        </div>
        {errors.confirm_password && (
          <span className="text-sm text-red-500">
            {errors.confirm_password.message}
          </span>
        )}
      </div>

      <div className="w-full gap-3 mt-6">
        <ButtonReuseable
          type="submit"
          aria-label="log-in-button"
          loading={isDisable}
          sendingMsg="Sending..."
          className="w-full py-4!"
          title="Next"
          rightIcon={<ArrowRightIcon />}
        />
      </div>
    </form>
  );
}
