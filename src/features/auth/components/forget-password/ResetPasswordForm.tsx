'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { CheckCircle2, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import resetPasswordAction from '../../server/reset-password.actions';
import { ResetPasswordDataType, resetPasswordSchema } from '../../schemas/forget-password.schem';

interface ResetPasswordFormProps {
  email: string;
}

export default function ResetPasswordForm({ email }: ResetPasswordFormProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ResetPasswordDataType>({
    defaultValues: {
      email: email,
      newPassword: "",
      confirmPassword: "",
    },
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<ResetPasswordDataType> = async (formData) => {
    try {
      const response = await resetPasswordAction(formData);

      if (!response.success) {
        toast.error(response.message || "Failed to reset password");

        if (response.errors) {
          const backendErrors = response.errors as Record<string, string>;
          Object.keys(backendErrors).forEach((key) => {
            setError(key as keyof ResetPasswordDataType, {
              message: backendErrors[key],
            });
          });
        }
        return;
      }

      toast.success(response.message);
      setIsSuccess(true);
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  if (isSuccess) {
    return (
      <div className="w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 border border-slate-50">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-600" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Password Reset Successful</h1>
            <p className="text-gray-600">Your password has been updated. You can now sign in with your new password.</p>
          </div>

          <button
            type="button"
            onClick={() => router.push('/login')}
            className="w-full bg-emerald-600 text-white py-3.5 px-4 rounded-xl hover:bg-emerald-700 transition-all duration-200 font-semibold text-lg shadow-lg shadow-emerald-100"
          >
            Back to Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 border border-slate-50">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <span className="text-3xl font-bold text-emerald-600">
              Fresh<span className="text-gray-800">Cart</span>
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Create New Password</h1>
          <p className="text-gray-600">Your new password must be different from previous passwords</p>
        </div>

        {/* Stepper Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold bg-emerald-600 text-white">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="w-16 h-0.5 mx-2 bg-emerald-600" />
          </div>
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold bg-emerald-600 text-white">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="w-16 h-0.5 mx-2 bg-emerald-600" />
          </div>
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold bg-emerald-600 text-white ring-4 ring-emerald-100">
              <Lock className="w-4 h-4" />
            </div>
          </div>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="newPassword" className="block text-sm font-semibold text-gray-700 mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                {...register("newPassword")}
                id="newPassword"
                className={`w-full px-4 py-3 pl-12 pr-12 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-emerald-50 transition-all ${
                  errors.newPassword ? "border-red-300 focus:border-red-500" : "border-gray-100 focus:border-emerald-500"
                }`}
                placeholder="Enter new password"
                type={showPassword ? "text" : "password"}
              />
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-red-500 text-xs mt-1 font-medium">*{errors.newPassword.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                {...register("confirmPassword")}
                id="confirmPassword"
                className={`w-full px-4 py-3 pl-12 pr-12 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-emerald-50 transition-all ${
                  errors.confirmPassword ? "border-red-300 focus:border-red-500" : "border-gray-100 focus:border-emerald-500"
                }`}
                placeholder="Confirm new password"
                type={showConfirmPassword ? "text" : "password"}
              />
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1 font-medium">*{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !isValid}
            className="w-full bg-emerald-600 text-white py-3.5 px-4 rounded-xl hover:bg-emerald-700 disabled:bg-emerald-400 disabled:cursor-not-allowed transition-all duration-200 font-semibold text-lg shadow-lg shadow-emerald-100 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin text-xl w-5 h-5" />
                <span>Resetting Password...</span>
              </>
            ) : (
              <span>Reset Password</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}