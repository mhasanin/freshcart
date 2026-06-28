'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaUser } from 'react-icons/fa';
import { MapPin, Settings, ChevronRight } from 'lucide-react';
import AddressesView from '../addresses/views/addresses.view';
import SettingsView from '../settings/views/settings.view';

type ActiveTab = 'addresses' | 'settings';

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('addresses');

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Dynamic Banner: Fallback to green gradient if primary custom color configuration isn't loaded */}
      <div className="bg-gradient-to-br from-emerald-600 via-green-500 to-emerald-500 from-primary-600 via-primary-500 to-primary-400 text-white">
        <div className="container mx-auto px-4 py-10 sm:py-12">
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-6">
            <Link className="hover:text-white transition-colors duration-200" href="/">
              Home
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-white font-medium">My Account</span>
          </nav>
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30">
              <FaUser className="text-3xl text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">My Account</h1>
              <p className="text-white/80 mt-1">Manage your addresses and account settings</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          
          <aside className="w-full lg:w-72 shrink-0">
            <nav className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h2 className="font-bold text-gray-900">My Account</h2>
              </div>
              <ul className="p-2 space-y-1">
                <li>
                  <button
                    onClick={() => setActiveTab('addresses')}
                    className={`w-full flex cursor-pointer items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                      activeTab === 'addresses'
                        ? 'bg-green-50 bg-primary-50 text-green-700 text-primary-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                        activeTab === 'addresses'
                          ? 'bg-green-500 bg-primary-500 text-white'
                          : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
                      }`}
                    >
                      <MapPin className="w-4 h-4" />
                    </div>
                    <span className="font-medium flex-1 text-left">My Addresses</span>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        activeTab === 'addresses' ? 'text-green-500 text-primary-500' : 'text-gray-400'
                      }`}
                    />
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`w-full flex cursor-pointer items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                      activeTab === 'settings'
                        ? 'bg-green-50 bg-primary-50 text-green-700 text-primary-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                        activeTab === 'settings'
                          ? 'bg-green-500 bg-primary-500 text-white'
                          : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
                      }`}
                    >
                      <Settings className="w-4 h-4" />
                    </div>
                    <span className="font-medium flex-1 text-left">Settings</span>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        activeTab === 'settings' ? 'text-green-500 text-primary-500' : 'text-gray-400'
                      }`}
                    />
                  </button>
                </li>
              </ul>
            </nav>
          </aside>

          <main className="flex-1 min-w-0">
            {activeTab === 'addresses' ? <AddressesView /> : <SettingsView />}
          </main>

        </div>
      </div>
    </div>
  );
}