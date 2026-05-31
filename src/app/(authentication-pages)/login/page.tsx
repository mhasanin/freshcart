import LoginScreen from "@/features/auth/views/login.screen";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | FreshCart",
  description: "Sign in to your FreshCart account",
};

export default function LoginPage() {
  return <LoginScreen />;
}
