'use client';

import React from 'react';
import { X, Loader2 } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { addressSchema, type AddressFormDataType } from '../schemas/addresses.schema';
import { addAddressAction } from '../server/addresses.actions';

interface AddressFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddressFormModal({ isOpen, onClose }: AddressFormModalProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddressFormDataType>({
    defaultValues: {
      name: '',
      details: '',
      phone: '',
      city: '',
    },
    resolver: zodResolver(addressSchema),
    mode: 'onChange',
  });

  if (!isOpen) return null;

  const onSubmit: SubmitHandler<AddressFormDataType> = async (addressFormData) => {
    try {
      const response = await addAddressAction(addressFormData);

      if (!response.success) {
        if (response.errors) {
          Object.keys(response.errors).forEach((key) => {
            setError(key as keyof AddressFormDataType, {
              message: response.errors?.[key],
            });
          });
        }
        toast.error(response.message || 'Failed to add address');
        return;
      }

      toast.success(response.message || 'Address added successfully');
      reset();
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
          <h2 className="text-xl font-bold text-gray-900">Add New Address</h2>
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
              <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Address</label>
            <textarea 
              placeholder="Street, building, apartment..." 
              rows={3} 
              className={`w-full px-4 py-3 rounded-xl border ${errors.details ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-200 focus:border-green-500 focus:ring-green-500/20'} outline-none transition-all resize-none`}
              {...register('details')}
            />
            {errors.details && (
              <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.details.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input 
                type="tel"
                placeholder="01xxxxxxxxx" 
                className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-200 focus:border-green-500 focus:ring-green-500/20'} outline-none transition-all`}
                {...register('phone')}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
              <input 
                type="text"
                placeholder="Cairo" 
                className={`w-full px-4 py-3 rounded-xl border ${errors.city ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-200 focus:border-green-500 focus:ring-green-500/20'} outline-none transition-all`}
                {...register('city')}
              />
              {errors.city && (
                <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.city.message}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4">
            <button 
              type="button" 
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 py-3 px-6 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="flex-1 py-3 px-6 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors shadow-lg shadow-green-600/25 cursor-pointer active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Adding...</span>
                </                >
              ) : (
                <span>Add Address</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}