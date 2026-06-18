"use client";

import React from "react";

import Link from "next/link";

import {
  FaGoogle,
  FaFacebookF,
  FaEnvelope,
  FaLock,
  FaEye,
  FaShieldAlt,
  FaUsers,
  FaStar,
} from "react-icons/fa";

import { LogIn } from "lucide-react";

import { SubmitHandler, useForm } from "react-hook-form";

import { LoginDataType, loginSchema } from "../../schemas/login.schem";

import { zodResolver } from "@hookform/resolvers/zod";

import loginActions from "../../server/login.actions";

import { toast } from "react-toastify";

import { useRouter } from "next/navigation";

import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { setToken } from "../../server/auth.actions";

import { setAuthState } from "../../store/auth.slice";

import { useDispatch } from "react-redux";

export default function LoginForm() {
  const router = useRouter();

  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<LoginDataType> = async (loginFormData) => {
    try {
      const response = await loginActions(loginFormData);

      if (!response.success) {
        if (response.errors) {
          Object.keys(response.errors).forEach((key) => {
            setError(key as keyof LoginDataType, {
              message: response.errors[key],
            });
          });
        }

        // toast.error(response.message);

        return;
      }

      await setToken(response.data.token, loginFormData.rememberMe);

      dispatch(
        setAuthState({
          isAuthenticated: true,

          userInfo: response.data.user,
        }),
      );

      toast.success(response.message);

      await new Promise((resolve) => setTimeout(resolve, 1500));

      router.push("/");
    } catch (error) {
      //   toast.error("Something went wrong");
    }
  };

  const {
    setError,

    register,

    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm<LoginDataType>({
    defaultValues: {
      email: "",

      password: "",

      rememberMe: false,
    },

    resolver: zodResolver(loginSchema),

    mode: "onChange",
  });

  return (
    <div className="w-full bg-white rounded-2xl shadow-xl p-8 lg:p-12 border border-slate-50">
      {/* Header */}

      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <span className="text-3xl font-bold text-emerald-600">
            Fresh<span className="text-gray-800">Cart</span>
          </span>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back!</h1>

        <p className="text-gray-600">
          Sign in to continue your fresh shopping experience
        </p>
      </div>

      {/* Social Login */}

      <div className="space-y-3 mb-6">
        <button
          type="button"
          className="w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-gray-100 rounded-xl hover:border-emerald-200 hover:bg-emerald-50 transition-all duration-200"
        >
          <FaGoogle className="text-red-500 text-lg" />

          <span className="font-medium text-gray-700">
            Continue with Google
          </span>
        </button>

        <button
          type="button"
          className="w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-gray-100 rounded-xl hover:border-emerald-200 hover:bg-emerald-50 transition-all duration-200"
        >
          <FaFacebookF className="text-blue-600 text-lg" />

          <span className="font-medium text-gray-700">
            Continue with Facebook
          </span>
        </button>
      </div>

      {/* Divider */}

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-100"></div>
        </div>

        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-400 font-medium uppercase tracking-wider text-xs">
            Or continue with email
          </span>
        </div>
      </div>

      {/* Form */}

      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email Address
          </label>

          <div className="relative">
            <input
              className="w-full px-4 py-3 pl-12 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all"
              placeholder="Enter your email"
              type="email"
              id="email"
              {...register("email")}
            />

            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          {errors.email && (
            <p className="text-red-500 mt-1">*{errors.email.message}</p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-semibold text-gray-700">
              Password
            </label>

            <Link
              href="/forget-password"
              className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
            >
              Forgot Password?
            </Link>
          </div>

          <div className="relative">
            <input
              className="w-full px-4 py-3 pl-12 pr-12 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all"
              placeholder="Enter your password"
              type="password"
              id="password"
              {...register("password")}
            />

            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-600"
            >
              <FaEye />
            </button>
          </div>

          {errors.password && (
            <p className="text-red-500 mt-1">*{errors.password.message}</p>
          )}
        </div>

        <div className="flex items-center">
          <label className="flex items-center cursor-pointer">
            <input
              className="h-4 w-4 text-emerald-600 accent-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
              type="checkbox"
              id="rememberMe"
              {...register("rememberMe")}
            />

            <span className="ml-3 text-sm text-gray-600">
              Keep me signed in
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-emerald-600 text-white py-3.5 px-4 rounded-xl hover:bg-emerald-700 disabled:bg-emerald-400 disabled:cursor-not-allowed transition-all duration-200 font-semibold text-lg shadow-lg shadow-emerald-100 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <AiOutlineLoading3Quarters className="animate-spin text-xl" />

              <span>Signing In...</span>
            </>
          ) : (
            <>
              <LogIn size={20} />

              <span>Sign In</span>
            </>
          )}
        </button>
      </form>

      {/* Footer link */}

      <div className="text-center mt-8 pt-6 border-t border-gray-50">
        <p className="text-gray-600 text-sm">
          New to FreshCart?
          <Link
            href="/signup"
            className="text-emerald-600 hover:text-emerald-700 ms-2 font-bold transition-colors"
          >
            Create an account
          </Link>
        </p>
      </div>

      {/* Trust Badges */}

      <div className="flex items-center justify-center space-x-6 mt-6 text-[11px] text-gray-400 font-medium uppercase tracking-tighter">
        <div className="flex items-center gap-1.5">
          <FaShieldAlt className="text-emerald-500" /> SSL Secured
        </div>

        <div className="flex items-center gap-1.5">
          <FaUsers className="text-emerald-500" /> 50K+ Users
        </div>

        <div className="flex items-center gap-1.5">
          <FaStar className="text-emerald-500" /> 4.9 Rating
        </div>
      </div>
    </div>
  );
}
