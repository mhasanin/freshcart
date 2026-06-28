'use client';

import React from 'react';

export default function AccountInfoFooter() {
  return (
    <div className="p-6 sm:p-8 bg-gray-50/70 border-t border-gray-100/50">
      <h3 className="font-bold text-gray-900 mb-4 text-sm tracking-wide uppercase text-gray-400">Account Information</h3>
      <div className="space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-gray-500 font-medium">User ID</span>
          <span className="font-mono text-gray-700 bg-gray-100 px-2 py-0.5 rounded-md text-xs select-all">6a326a25fc33d800121e42e6</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500 font-medium">Role</span>
          <span className="px-3 py-1 rounded-lg bg-green-50 text-green-700 font-bold text-xs capitalize border border-green-100">user</span>
        </div>
      </div>
    </div>
  );
}