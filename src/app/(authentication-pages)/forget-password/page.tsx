'use client';

import { useState } from 'react';
import RequestResetCodeForm from '@/features/auth/components/forget-password/RequestResetCodeForm';
import VerifyResetCodeForm from '@/features/auth/components/forget-password/VerifyResetCodeForm';
import ResetPasswordForm from '@/features/auth/components/forget-password/ResetPasswordForm';
import ForgetPasswordHero from '@/features/auth/components/forget-password/forget-password.hero';

export default function ForgetPasswordPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState('');

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 font-sans dark:bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        <ForgetPasswordHero />

        <div className="w-full max-w-xl mx-auto">
          {step === 1 && (
            <RequestResetCodeForm 
              onSuccess={(submittedEmail) => {
                setEmail(submittedEmail);
                setStep(2);
              }} 
            />
          )}
          {step === 2 && (
            <VerifyResetCodeForm 
              email={email} 
                onSuccess={() => setStep(3)}
              onBackToEmail={() => setStep(1)} 
            />
          )}
          {step === 3 && (
            <ResetPasswordForm email={email} />
          )}
        </div>

      </div>
    </div>
  );
}