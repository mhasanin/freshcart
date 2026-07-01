'use client';

import React from 'react';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { Mail, ArrowLeft, Key, Lock, Loader2 } from 'lucide-react';
import { ForgetPasswordDataType, forgetPasswordSchema } from '../../schemas/forget-password.schem';
import forgetPasswordAction from '../../server/forget-password.actions';

interface RequestResetCodeFormProps {
  onSuccess: (email: string) => void;
}

export default function RequestResetCodeForm({ onSuccess }: RequestResetCodeFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ForgetPasswordDataType>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgetPasswordSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<ForgetPasswordDataType> = async (forgetPasswordFormData) => {
    try {
      const response = await forgetPasswordAction(forgetPasswordFormData);

      if (!response.success) {
        toast.error(response.message || "Failed to send reset code");
        
        if (response.errors) {
          const backendErrors = response.errors as Record<string, string>;
          Object.keys(backendErrors).forEach((key) => {
            setError(key as keyof ForgetPasswordDataType, {
              message: backendErrors[key],
            });
          });
        }
        return;
      }

      toast.success(response.message);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onSuccess(forgetPasswordFormData.email);
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
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Forgot Password?</h1>
          <p className="text-gray-600">No worries, we'll send you a reset code</p>
        </div>

        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-emerald-600 text-white ring-4 ring-emerald-100 shadow">
              <Mail className="w-4 h-4" />
            </div>
            <div className="w-16 h-0.5 mx-2 bg-gray-200" />
          </div>
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 text-gray-400">
              <Key className="w-4 h-4" />
            </div>
            <div className="w-16 h-0.5 mx-2 bg-gray-200" />
          </div>
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 text-gray-400">
              <Lock className="w-4 h-4" />
            </div>
          </div>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <input
                {...register('email')}
                id="email"
                type="email"
                className={`w-full px-4 py-3 pl-12 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-emerald-50 transition-all ${
                  errors.email
                    ? 'border-red-300 focus:border-red-500'
                    : 'border-gray-100 focus:border-emerald-500'
                }`}
                placeholder="Enter your email address"
              />
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1 font-medium">*{errors.email.message}</p>
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
                <span>Sending Code...</span>
              </>
            ) : (
              <span>Send Reset Code</span>
            )}
          </button>

          <div className="text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Sign In
            </Link>
          </div>
        </form>

        <div className="text-center mt-8 pt-6 border-t border-gray-50">
          <p className="text-gray-600 text-sm">
            Remember your password?{' '}
            <Link href="/login" className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}