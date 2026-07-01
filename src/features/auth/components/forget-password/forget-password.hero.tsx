import React from 'react';
import { Lock, Mail, ShieldCheck } from 'lucide-react';

export default function ForgetPasswordHero() {
  return (
    <div className="hidden lg:block">
      <div className="text-center space-y-6">
        <div className="w-full h-96 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-2xl shadow-lg flex items-center justify-center relative overflow-hidden">
          <div className="absolute top-8 left-8 w-24 h-24 rounded-full bg-emerald-100/50" />
          <div className="absolute bottom-12 right-10 w-32 h-32 rounded-full bg-green-100/50" />
          <div className="absolute top-20 right-20 w-16 h-16 rounded-full bg-teal-100/50" />
          
          <div className="relative flex flex-col items-center gap-6 z-10">
            <div className="w-28 h-28 rounded-3xl bg-white shadow-xl flex items-center justify-center rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="w-20 h-20 rounded-2xl bg-emerald-50 flex items-center justify-center">
                <Lock className="text-emerald-600 w-10 h-10" />
              </div>
            </div>
            
            <div className="absolute -left-16 top-4 w-14 h-14 rounded-xl bg-white shadow-lg flex items-center justify-center -rotate-12">
              <Mail className="text-emerald-500 w-6 h-6" />
            </div>
            
            <div className="absolute -right-16 top-8 w-14 h-14 rounded-xl bg-white shadow-lg flex items-center justify-center rotate-12">
              <ShieldCheck className="text-green-500 w-6 h-6" />
            </div>
            
            <div className="flex gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse [animation-delay:150ms]" />
              <div className="w-3 h-3 rounded-full bg-emerald-600 animate-pulse [animation-delay:300ms]" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">Reset Your Password</h2>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Don't worry, it happens to the best of us. We'll help you get back into your account in no time.
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500 pt-2">
            <div className="flex items-center gap-2">
              <Mail className="text-emerald-600 w-4 h-4" />
              <span>Email Verification</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-emerald-600 w-4 h-4" />
              <span>Secure Reset</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="text-emerald-600 w-4 h-4" />
              <span>Encrypted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}