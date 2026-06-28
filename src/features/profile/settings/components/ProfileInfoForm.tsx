'use client';

import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, Save, Loader2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import type { RootState } from '@/store/store';
import { profileSchema, ProfileFormDataType } from '../schemas/settings.schema';
import { updateProfileAction } from '../server/settings.actions';
import {
  setSettingsLoading,
  setSettingsError,
  setSettingsSuccess,
  clearSettingsStatus,
} from '../store/settings.slice';
import { updateUserInfo } from '@/features/auth/store/auth.slice';
import useLogout from '@/features/auth/hooks/useLogout';

export default function ProfileInfoForm() {
  const dispatch = useAppDispatch();
  const { logout } = useLogout();
  const { isLoading, error, successMessage } = useAppSelector(
    (state: RootState) => state.settings,
  );
  const currentUser = useAppSelector((state: RootState) => state.auth.userInfo);
  const shouldSyncFromAuthRef = useRef(true);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<ProfileFormDataType>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      phone: currentUser?.phone || '',
    },
  });

  useEffect(() => {
    if (!currentUser || !shouldSyncFromAuthRef.current) {
      return;
    }

    reset({
      name: currentUser.name,
      email: currentUser.email || '',
      phone: currentUser.phone || '',
    });
  }, [currentUser, reset]);

  useEffect(() => {
    return () => {
      shouldSyncFromAuthRef.current = true;
      dispatch(clearSettingsStatus());
    };
  }, [dispatch]);

  const onSubmit = async (data: ProfileFormDataType) => {
    shouldSyncFromAuthRef.current = false;
    clearErrors();
    dispatch(setSettingsLoading(true));
    const response = await updateProfileAction(data);

    if (response.success && response.user) {
      const emailChanged = data.email !== currentUser?.email;

      dispatch(updateUserInfo(response.user));
      dispatch(setSettingsSuccess(response.message));
      shouldSyncFromAuthRef.current = true;

      if (emailChanged) {
        await logout("Your email was updated. Please sign in again to continue.");
      }

      return;
    }

    if (response.errors) {
      Object.entries(response.errors).forEach(([key, value]) => {
        setError(key as keyof ProfileFormDataType, {
          type: 'server',
          message: value,
        });
      });
      dispatch(setSettingsLoading(false));
      return;
    }

    dispatch(setSettingsError(response.message));
  };

  return (
    <div className="p-6 sm:p-8 border-b border-gray-100 group">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0 text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all duration-300 transform group-hover:scale-105 shadow-sm shadow-green-100">
          <User className="w-[20px] h-[20px] stroke-[2]" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900 group-hover:text-green-700 transition-colors">Profile Information</h3>
          <p className="text-sm text-gray-500">Update your personal details</p>
        </div>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        {successMessage && (
          <div className="p-4 rounded-xl bg-green-50 text-sm text-green-800 border border-green-100">
            {successMessage}
          </div>
        )}

        {error && (
          <div className="p-4 rounded-xl bg-red-50 text-sm text-red-800 border border-red-100">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            {...register("name")}
            className={`w-full px-4 py-3 rounded-xl border ${
              errors.name
                ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                : "border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
            } outline-none transition-all`}
          />
          {errors.name && (
            <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
          <input
            type="email"
            placeholder="Enter your new email"
            {...register("email")}
            className={`w-full px-4 py-3 rounded-xl border ${
              errors.email
                ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                : "border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
            } outline-none transition-all`}
          />
          {errors.email && (
            <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
          <input
            type="tel"
            placeholder="01xxxxxxxxx"
            {...register("phone")}
            className={`w-full px-4 py-3 rounded-xl border ${
              errors.phone
                ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                : "border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
            } outline-none transition-all`}
          />
          {errors.phone && (
            <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex cursor-pointer items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 active:scale-[0.98] transition-all duration-200 shadow-md shadow-green-600/15 hover:shadow-lg hover:shadow-green-600/25 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}