import SignupForm from "../components/SignupForm";
import SignupHero from "../components/SignupHero";

export default function SignupScreen() {
  return (
    <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center p-4 md:p-8 lg:p-12">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="w-full flex justify-center lg:justify-start">
          <SignupHero />
        </div>
        <div className="w-full flex justify-center lg:justify-end">
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
