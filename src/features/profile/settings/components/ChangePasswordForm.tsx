'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { KeyRound, Save, Loader2, Eye, EyeOff } from 'lucide-react';
import { passwordSchema, PasswordFormDataType } from '../schemas/settings.schema';
import { changePasswordAction } from '../server/settings.actions';
import useLogout from '@/features/auth/hooks/useLogout';

export default function ChangePasswordForm() {
  const { logout } = useLogout();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<PasswordFormDataType>({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit = async (data: PasswordFormDataType) => {
    setIsSubmitting(true);
    setServerError(null);

    const response = await changePasswordAction(data);

    if (response.success) {
      await logout("Security settings updated. Please sign in again.");
    } else {
      setIsSubmitting(false);
      if (response.errors) {
        Object.entries(response.errors).forEach(([key, value]) => {
          setError(key as keyof PasswordFormDataType, {
            type: 'server',
            message: value,
          });
        });
      } else {
        setServerError(response.message);
      }
    }
  };

  return (
    <div className="p-6 sm:p-8 group">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0 text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all duration-300 transform group-hover:scale-105 shadow-sm shadow-green-100">
          <KeyRound className="w-[20px] h-[20px] stroke-[2]" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900 group-hover:text-green-700 transition-colors">Security Settings</h3>
          <p className="text-sm text-gray-500">Update your password to secure your account</p>
        </div>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        {serverError && (
          <div className="p-4 text-sm text-red-800 bg-red-50 rounded-xl border border-red-100">
            {serverError}
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
          <div className="relative">
            <input
              type={showCurrentPass ? 'text' : 'password'}
              placeholder="Enter your current password"
              {...register('currentPassword')}
              className={`w-full px-4 py-3 pr-12 rounded-xl border ${
                errors.currentPassword ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-200 focus:border-green-500 focus:ring-green-500/20'
              } outline-none transition-all focus:ring-2`}
            />
            <button
              type="button"
              onClick={() => setShowCurrentPass(!showCurrentPass)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              {showCurrentPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.currentPassword && (
            <p className="text-sm text-red-600 mt-1">{errors.currentPassword.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
          <div className="relative">
            <input
              type={showNewPass ? 'text' : 'password'}
              placeholder="Enter your new password"
              {...register('password')}
              className={`w-full px-4 py-3 pr-12 rounded-xl border ${
                errors.password ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-200 focus:border-green-500 focus:ring-green-500/20'
              } outline-none transition-all focus:ring-2`}
            />
            <button
              type="button"
              onClick={() => setShowNewPass(!showNewPass)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password</label>
          <div className="relative">
            <input
              type={showConfirmPass ? 'text' : 'password'}
              placeholder="Confirm your new password"
              {...register('rePassword')}
              className={`w-full px-4 py-3 pr-12 rounded-xl border ${
                errors.rePassword ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-200 focus:border-green-500 focus:ring-green-500/20'
              } outline-none transition-all focus:ring-2`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPass(!showConfirmPass)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              {showConfirmPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.rePassword && (
            <p className="text-sm text-red-600 mt-1">{errors.rePassword.message}</p>
          )}
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex cursor-pointer items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 active:scale-[0.98] transition-all duration-200 shadow-md shadow-green-600/15 hover:shadow-lg hover:shadow-green-600/25 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
}