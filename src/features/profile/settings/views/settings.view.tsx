import React from 'react';
import ProfileInfoForm from '@/features/profile/settings/components/ProfileInfoForm';
import ChangePasswordForm from '@/features/profile/settings/components/ChangePasswordForm';
import AccountInfoFooter from '@/features/profile/settings/components/AccountInfoFooter';


export default function SettingsView() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Account Settings</h2>
        <p className="text-gray-500 text-sm mt-1">Update your profile information and change your password</p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
        <ProfileInfoForm />
        <AccountInfoFooter />
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
        <ChangePasswordForm />
      </div>
    </div>
  );
}