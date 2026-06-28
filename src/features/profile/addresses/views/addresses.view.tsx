'use client';

import React, { useState } from 'react';
import { useAppSelector } from '@/store/hooks'; 
import { MapPin, Plus } from 'lucide-react';
import AddressFormModal from '../components/AddressFormModal';
import EditAddressModal from '../components/EditAddressModal';
import AddressCard from '../components/AddressCard';
import { type AddressItem } from '../types/addresses.types';

export default function AddressesView() {
  const { items: addresses, isLoading, error } = useAppSelector((state) => state.addresses);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  const [selectedAddressForEdit, setSelectedAddressForEdit] = useState<AddressItem | null>(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-spin rounded-full h-9 w-9 border-2 border-green-600 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 flex items-center gap-3 shadow-sm">
        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        <div>
          <p className="font-semibold text-sm">Error loading addresses</p>
          <p className="text-xs text-red-500 mt-0.5">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-gray-100 pb-5">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">My Addresses</h2>
          <p className="text-gray-500 text-sm mt-1">Manage your saved delivery addresses</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex cursor-pointer items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 active:scale-[0.98] transition-all duration-200 shadow-md shadow-green-600/15 hover:shadow-lg hover:shadow-green-600/25"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          Add New Address
        </button>
      </div>

      {addresses.length === 0 ? (
        <div className="group text-center py-20 bg-gradient-to-b from-gray-50/50 to-white rounded-3xl border-2 border-dashed border-gray-200 p-8 transition-all duration-300 hover:border-green-300 hover:shadow-xl hover:shadow-gray-100/40 flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-gray-50 text-gray-400 flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:bg-green-50 group-hover:text-green-600 group-hover:rotate-3 shadow-sm border border-gray-100">
            <MapPin className="w-7 h-7" />
          </div>
          <p className="text-gray-900 font-bold text-lg tracking-tight">No addresses saved yet</p>
          <p className="text-gray-500 text-sm mt-2 max-w-xs mx-auto leading-relaxed">
            Please add a shipping address to use during checkout and speed up your orders.
          </p>
          <div className="mt-8">
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex cursor-pointer items-center justify-center gap-2 px-6 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 active:scale-[0.98] transition-all duration-200 shadow-md shadow-green-600/15 hover:shadow-lg hover:shadow-green-600/25"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              Add New Address
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {addresses.map((address) => (
            <AddressCard 
              key={address._id} 
              address={address} 
              onEdit={() => setSelectedAddressForEdit(address)} 
            />
          ))}
        </div>
      )}

      <AddressFormModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />

      <EditAddressModal 
        isOpen={selectedAddressForEdit !== null} 
        address={selectedAddressForEdit} 
        onClose={() => setSelectedAddressForEdit(null)} 
      />
    </div>
  );
}