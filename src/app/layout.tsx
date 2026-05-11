import { ReactNode } from "react";
import "../styles/globals.css";
import NavBar from "@/components/shared/NavBar";
import Footer from "@/components/shared/Footer";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <NavBar />
      <body>{children}</body>
      <Footer />
    </html>
  );
}
