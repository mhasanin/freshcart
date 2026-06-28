'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Building, Pencil, Trash2, Loader2 } from 'lucide-react';
import { type AddressItem } from '../types/addresses.types';
import { deleteAddressAction } from '../server/addresses.actions';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const ReactSwal = withReactContent(Swal);

interface AddressCardProps {
  address: AddressItem;
  onEdit: () => void; 
}

export default function AddressCard({ address, onEdit }: AddressCardProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const addressName = address.name || 'this address';

    // استخدام الـ SweetAlert2 بنفس التنسيق والألوان الخاصة بالتطبيق
    const result = await ReactSwal.fire({
      title: 'Delete Address?',
      text: `Are you sure you want to delete "${addressName}" from your profile?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#dc2626', 
      cancelButtonColor: '#6b7280',  
    });

    if (!result.isConfirmed) return;
    
    setIsDeleting(true);
    try {
      const response = await deleteAddressAction(address._id);
      if (response.success) {
        toast.success(response.message || 'Address deleted successfully');
        router.refresh();
      } else {
        toast.error(response.message || 'Failed to delete address');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const hasFullDetails = address.name && address.details && address.phone && address.city;

  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-sm hover:shadow-md hover:border-green-200 transition-all duration-300 group flex items-start justify-between gap-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[3px] h-0 bg-green-500 group-hover:h-full transition-all duration-300" />

      <div className="flex items-start gap-3.5 flex-1 min-w-0">
        <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center shrink-0 text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all duration-300 transform group-hover:scale-105">
          <MapPin className="w-[18px] h-[18px] stroke-[2]" />
        </div>
        
        <div className="flex-1 min-w-0 pt-0.5">
          <h3 className="font-bold text-gray-900 mb-1 text-base group-hover:text-green-700 transition-colors truncate">
            {address.name || <span className="text-gray-400 italic font-normal text-sm">Unnamed Address Slot</span>}
          </h3>
          
          <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2 min-h-[40px]">
            {address.details || <span className="text-red-400/80 text-xs block bg-red-50/50 p-2 rounded-lg border border-red-100/40">This entry was corrupted from Postman (Missing body data)</span>}
          </p>
          
          {hasFullDetails && (
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-gray-400 border-t border-gray-50 pt-3">
              <span className="flex items-center gap-1.5 hover:text-gray-600 transition-colors">
                <Phone className="w-3.5 h-3.5 text-gray-400/80" />
                {address.phone}
              </span>
              <span className="flex items-center gap-1.5 hover:text-gray-600 transition-colors">
                <Building className="w-3.5 h-3.5 text-gray-400/80" />
                {address.city}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1.5 shrink-0 bg-gray-50/50 p-1 rounded-xl border border-gray-100 opacity-80 group-hover:opacity-100 transition-opacity">
        <button
          type="button"
          onClick={onEdit} 
          disabled={isDeleting}
          className="w-8 h-8 rounded-lg text-gray-500 hover:bg-white hover:text-green-600 hover:shadow-sm flex items-center justify-center transition-all cursor-pointer active:scale-95 disabled:opacity-50"
          title="Edit address"
        >
          <Pencil className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={handleDelete}
          disabled={isDeleting}
          className="w-8 h-8 rounded-lg text-gray-500 hover:bg-white hover:text-red-600 hover:shadow-sm flex items-center justify-center transition-all cursor-pointer active:scale-95 disabled:opacity-50"
          title="Delete address"
        >
          {isDeleting ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin text-red-500" />
          ) : (
            <Trash2 className="w-3.5 h-3.5" />
          )}
        </button>
      </div>
    </div>
  );
}