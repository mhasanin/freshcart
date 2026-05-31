"use client";
import { UserPlus } from "lucide-react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupDataType, signupSchema } from "../schemas/signup.schem";
import signupAction from "../server/signup.actions";

import { toast, Slide } from "react-toastify";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignupDataType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
      terms: false,
    },
    resolver: zodResolver(signupSchema),
    mode: "onChange",
    // reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<SignupDataType> = async (SignupData) => {
    try {
      const response = await signupAction(SignupData);
      if (response?.success) {
        toast.success(response.message);
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        if (response?.errors) {
          const errorKeys = Object.keys(response.errors) as Array<
            keyof typeof response.errors
          >;

          errorKeys.forEach((key) => {
            setError(key as keyof SignupDataType, {
              message: response.errors[key],
            });
          });
        }
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Signup failed");
    }
  };

  return (
    <section className="w-full max-w-lg bg-white p-6 md:p-8 rounded-lg border border-slate-100 shadow-sm">
      <header className="text-center">
        <h2 className="text-2xl font-extrabold text-slate-900">
          Create Your Account
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Start your fresh journey with us today
        </p>
      </header>

      <div className="mt-6 grid gap-3">
        <div className="flex gap-3">
          <button
            type="button"
            className="flex-1 flex items-center justify-center gap-2 border rounded-md py-2 px-3 text-sm text-slate-700 hover:shadow-sm"
          >
            <FaGoogle className="text-red-500" />
            <span>Google</span>
          </button>
          <button
            type="button"
            className="flex-1 flex items-center justify-center gap-2 border rounded-md py-2 px-3 text-sm text-slate-700 hover:shadow-sm"
          >
            <FaFacebookF className="text-blue-600" />
            <span>Facebook</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex-1 border-t border-slate-200" />
          <div className="text-sm text-slate-400">or</div>
          <div className="flex-1 border-t border-slate-200" />
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="name" className="block text-sm text-slate-700 mb-1">
              Name*
            </label>
            <div className="relative">
              <input
                className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm placeholder-slate-400"
                placeholder="Ali"
                id="name"
                type="text"
                {...register("name")}
              />
              {errors.name && (
                <p className="absolute text-xs text-red-500 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm text-slate-700 mb-1"
            >
              Email*
            </label>
            <input
              className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm placeholder-slate-400"
              placeholder="ali@example.com"
              id="email"
              type="email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm text-slate-700 mb-1"
            >
              Password*
            </label>
            <input
              type="password"
              className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm placeholder-slate-400"
              placeholder="create a strong password"
              id="password"
              {...register("password")}
            />

            <div className="mt-2">
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="w-1/3 h-2 bg-amber-400" />
              </div>
              <p className="mt-1 text-xs text-slate-400">Fair</p>
            </div>
            {errors.password ? (
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message}
              </p>
            ) : (
              <p className="mt-1 text-xs text-slate-400">
                Password Must Contain At Least 8 Characters, One Uppercase
                Letter, One Lowercase Letter, One Number, and One Special
                Character
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="rePassword"
              className="block text-sm text-slate-700 mb-1"
            >
              Confirm Password*
            </label>
            <input
              type="password"
              className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm placeholder-slate-400"
              placeholder="confirm your password"
              id="rePassword"
              {...register("rePassword")}
            />
            {errors.rePassword && (
              <p className="text-xs text-red-500 mt-1">
                {errors.rePassword.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm text-slate-700 mb-1"
            >
              Phone Number*
            </label>
            <input
              className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm placeholder-slate-400"
              placeholder="+1 234 567 8900"
              id="phone"
              type="tel"
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-xs text-red-500 mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="terms"
              className="mt-1"
              {...register("terms")}
            />
            {errors.terms && (
              <p className="text-xs text-red-500 mt-1">
                {errors.terms.message}
              </p>
            )}
            <label htmlFor="terms" className="text-sm text-slate-600">
              I agree to the{" "}
              <Link href="/terms" className="text-emerald-500">
                Terms of Service
              </Link>
              <span> and </span>
              <Link href="/privacy-policy" className="text-emerald-500">
                Privacy Policy
              </Link>
            </label>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-emerald-600 text-white rounded-md py-2 text-sm font-semibold hover:bg-emerald-700 disabled:bg-emerald-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <AiOutlineLoading3Quarters className="animate-spin text-lg" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <UserPlus className="text-lg" />
                  <span>Create Account</span>
                </>
              )}
            </button>
          </div>
        </form>
        <div>
          <p className="text-sm text-slate-600">
            Already have an account?{" "}
            <Link href="/login" className="text-emerald-500">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
