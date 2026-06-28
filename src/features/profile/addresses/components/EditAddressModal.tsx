'use client';

import React, { useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { addressSchema, type AddressFormDataType } from '../schemas/addresses.schema';
import { updateAddressAction } from '../server/addresses.actions';
import { type AddressItem } from '../types/addresses.types';

interface EditAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  address: AddressItem | null;
}

export default function EditAddressModal({ isOpen, onClose, address }: EditAddressModalProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddressFormDataType>({
    resolver: zodResolver(addressSchema),
    mode: 'onChange',
  });

  // إعادة تعيين قيم الاستمارة بالبيانات الحالية للعنوان المختار فور فتح المودال
  useEffect(() => {
    if (address) {
      reset({
        name: address.name || '',
        details: address.details || '',
        phone: address.phone || '',
        city: address.city || '',
      });
    }
  }, [address, reset]);

  if (!isOpen || !address) return null;

  const onSubmit: SubmitHandler<AddressFormDataType> = async (addressFormData) => {
    try {
      const response = await updateAddressAction(address._id, addressFormData);

      if (!response.success) {
        if (response.errors) {
          Object.keys(response.errors).forEach((key) => {
            setError(key as keyof AddressFormDataType, {
              message: response.errors?.[key],
            });
          });
        }
        toast.error(response.message || 'Failed to update address');
        return;
      }

      toast.success(response.message || 'Address updated successfully');
      onClose();
      router.refresh();
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg p-6 sm:p-8 animate-in zoom-in-95 duration-200"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Edit Address</h2>
          <button 
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Address Name</label>
            <input 
              type="text"
              placeholder="e.g. Home, Office" 
              className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-200 focus:border-green-500 focus:ring-green-500/20'} outline-none transition-all`}
              {...register('name')}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Address Details</label>
            <textarea 
              placeholder="e.g. Street, Building, Apartment"
              className={`w-full px-4 py-3 rounded-xl border ${errors.details ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-200 focus:border-green-500 focus:ring-green-500/20'} outline-none transition-all`}
              {...register('details')}
            />
            {errors.details && (
              <p className="text-red-500 text-sm mt-1">{errors.details.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="text"
              placeholder="e.g. +1234567890"
              className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-200 focus:border-green-500 focus:ring-green-500/20'} outline-none transition-all`}
              {...register('phone')}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
            <input
              type="text"
              placeholder="e.g. Cairo"
              className={`w-full px-4 py-3 rounded-xl border ${errors.city ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-200 focus:border-green-500 focus:ring-green-500/20'} outline-none transition-all`}
              {...register('city')}
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-green-600 hover:bg-green-700 text-white px-5 py-3 font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
            Update Address
          </button>
        </form>
      </div>
    </div>
  );
}

