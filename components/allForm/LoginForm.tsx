"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ArrowRightIcon from "../icon/ArrowRightIcon";
import ButtonReuseable from "../reusable/CustomButton";
import { Checkbox } from "../ui/checkbox";
import { useLoginMutation } from "@/feature/auth/auth";
import { toast } from "react-toastify";
import setToken from "@/feature/token/token";

type LoginFormInputs = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const [isDisable, setIsDisable] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  const [login] = useLoginMutation();

  const getSubDomain = () => {
    if (typeof window === "undefined") return "";

    const host = window.location.hostname.toLowerCase();

    if (host === "localhost" || host === "127.0.0.1") {
      return "localhost";
    }

    if (host.endsWith(".localhost")) {
      return host.replace(".localhost", "");
    }

    const parts = host.split(".");

    return parts.length > 1 ? parts[0] : host;
  };

  const onSubmit = async (data: LoginFormInputs) => {
    setIsDisable(true);

    try {
      const subDomain = getSubDomain();
      console.log("Subdomain:", subDomain);
      const response = await login({
        data,
        subDomain,
      }).unwrap();

      const payload = response?.data ?? response;
      const userType = payload?.user?.role ?? payload?.role ?? "admin";
      const isSuccess = payload?.success === true || response?.success === true;
      const message = payload?.message || response?.message;

      if (!isSuccess) {
        toast.error(message || "Login failed!");
        return;
      }

      if (isSuccess) {
        await setToken(response?.token, userType);
      }

      toast.success(message || "Successfully login!");

      if (userType === "client") {
        router.push("/client/dashboard");
      } else if (userType === "candidate") {
        router.push("/candidate/dashboard");
      } else if (userType === "super-admin") {
        router.push("/super-admin/dashboard");
      } else {
        router.push("/dashboard");
      }

      localStorage.setItem("isLoggedIn", userType);
      // localStorage.setItem("accessToken", response?.token);
      reset();
    } catch (error: any) {
      console.log(error);
      const message =
        error?.data?.message || error?.message || "Wrong Email or Password";

      toast.error(message);
    } finally {
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
          htmlFor="email"
          className="text-[14px] font-medium text-headerColor "
        >
          Email<span className="text-redColor">*</span>
        </Label>
        <Input
          id="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Please enter a valid email address",
            },
          })}
          placeholder="example@example.com"
          className="rounded-md !h-[52px] text-[14px] text-blackColor bg-bgColor "
        />
        {errors.email && (
          <span className="text-sm text-red-500">{errors.email.message}</span>
        )}
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="password"
          className="text-[14px] font-medium text-headerColor "
        >
          Password<span className="text-redColor">*</span>
        </Label>
        <div className="relative">
          <Input
            id="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            type={showPassword ? "text" : "password"}
            placeholder="Your password"
            className="rounded-md !h-[52px] text-[14px] pr-10 text-blackColor bg-bgColor "
          />
          <button
            type="button"
            aria-label="toggle-password-visibility"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none transition-colors duration-200 cursor-pointer"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        {errors.password && (
          <span className="text-sm text-red-500">
            {errors.password.message}
          </span>
        )}
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Checkbox
            id="remember-me"
            className="cursor-pointer"
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(checked as boolean)}
          />{" "}
          <label
            htmlFor="remember-me"
            className="text-base text-lightblackColor"
          >
            Remember me
          </label>
        </div>
        <div>
          <Link
            href="#"
            className="text-base font-semibold text-headerColor underline  mt-2"
          >
            Forgot password?
          </Link>
        </div>
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
      <div>
        <p className="text-base text-secondaryColor text-center md:px-20">
          First time logging in? Please try your email address as your password!
        </p>
      </div>
    </form>
  );
}
