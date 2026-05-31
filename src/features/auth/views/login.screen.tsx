import React from "react";
import LoginForm from "../components/login/LoginForm";
import LoginHero from "../components/login/LoginHero";

export default function LoginScreen() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          {/* Left Side: Hero */}
          <LoginHero />

          {/* Right Side: Form */}
          <div className="w-full max-w-xl mx-auto lg:mx-0">
            <LoginForm />
          </div>
        </div>
      </div>
    </main>
  );
}
