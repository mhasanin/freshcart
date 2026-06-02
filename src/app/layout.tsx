import { ReactNode } from "react";
import "../styles/globals.css";
import NavBar from "@/components/shared/NavBar";
import Footer from "@/components/shared/Footer";
import { Exo } from "next/font/google";

import "react-toastify/dist/ReactToastify.css";
import Providers from "@/components/providers/providers";
import { varifyToken } from "@/features/auth/server/auth.actions";

const exo = Exo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-exo",
});

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const tokenVarificationResult = await varifyToken();

  console.log("PRELOADED STATE:", tokenVarificationResult);
  return (
    <html lang="en">
      <body
        className={`${exo.className} font-medium bg-zinc-50 font-sans dark:bg-black`}
        id={exo.className}
      >
        <Providers preloadedState={{ auth: tokenVarificationResult }}>
          <NavBar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
