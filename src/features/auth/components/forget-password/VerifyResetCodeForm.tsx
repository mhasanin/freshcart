'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { ShieldCheck, ArrowLeft, Loader2 } from 'lucide-react';
import { VerifyResetCodeDataType, verifyResetCodeSchema } from '../../schemas/forget-password.schem';
import verifyResetCodeAction from '../../server/verify-reset-code.actions';

interface VerifyResetCodeFormProps {
  email: string;
  onBackToEmail: () => void;
  onSuccess?: () => void;
}

export default function VerifyResetCodeForm({ email, onBackToEmail, onSuccess }: VerifyResetCodeFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isValid },
  } = useForm<VerifyResetCodeDataType>({
    defaultValues: {
      resetCode: "",
    },
    resolver: zodResolver(verifyResetCodeSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<VerifyResetCodeDataType> = async (formData) => {
    try {
      const response = await verifyResetCodeAction(formData);

      if (!response.success) {
        // إظهار خطأ السيرفر الفعلي مباشرة مثل: "Reset code is invalid or has expired"
        toast.error(response.message || "Failed to verify code");

        if (response.errors) {
          const backendErrors = response.errors as Record<string, string>;
          Object.keys(backendErrors).forEach((key) => {
            setError(key as keyof VerifyResetCodeDataType, {
              message: backendErrors[key],
            });
          });
        }
        return;
      }

      toast.success(response.message);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (onSuccess) {
        onSuccess();
        return;
      }

      router.push("/reset-password");
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 border border-slate-50">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <span className="text-3xl font-bold text-emerald-600">
              Fresh<span className="text-gray-800">Cart</span>
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Check Your Email</h1>
          <p className="text-gray-600">
            Enter the 6-digit code sent to <span className="font-semibold text-gray-800">{email}</span>
          </p>
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
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold bg-emerald-600 text-white ring-4 ring-emerald-100">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
            <div className="w-16 h-0.5 mx-2 bg-gray-200" />
          </div>
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold bg-gray-100 text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="resetCode" className="block text-sm font-semibold text-gray-700 mb-2">
              Verification Code
            </label>
            <div className="relative">
              <input
                {...register("resetCode")}
                id="resetCode"
                maxLength={6}
                className={`w-full px-4 py-3 pl-12 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-emerald-50 transition-all text-center text-2xl tracking-[0.5em] font-mono ${
                  errors.resetCode ? "border-red-300 focus:border-red-500" : "border-gray-100 focus:border-emerald-500"
                }`}
                placeholder="••••••"
                type="text"
              />
              <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
            {errors.resetCode && (
              <p className="text-red-500 text-xs mt-1 font-medium">*{errors.resetCode.message}</p>
            )}
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500">
              Didn't receive the code?{' '}
              <button type="button" className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors">
                Resend Code
              </button>
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !isValid}
            className="w-full bg-emerald-600 text-white py-3.5 px-4 rounded-xl hover:bg-emerald-700 disabled:bg-emerald-400 disabled:cursor-not-allowed transition-all duration-200 font-semibold text-lg shadow-lg shadow-emerald-100 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin text-xl w-5 h-5" />
                <span>Verifying...</span>
              </>
            ) : (
              <span>Verify Code</span>
            )}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={onBackToEmail}
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-600 font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Change email address
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}