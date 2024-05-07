"use client";

import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";

import { useToastNotificationStore } from "@/store";
import { Navbar } from "@/components";

import Providers from "./provider";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { isVisible } = useToastNotificationStore();

  return (
    <html lang="pt">
      <head />
      <body className="bg-slate-300">
        <Providers>
          {pathname !== "/pages/SignIn" ? (
            <>
              <Navbar />
              <main className="mx-auto mt-5 max-w-7xl sm:px-6 lg:px-8 ">
                {children}
              </main>
            </>
          ) : (
            <main className="mx-auto max-w-7xl sm:px-6 lg:px-8 ">
              {children}
              {isVisible && <ToastContainer />}
            </main>
          )}
        </Providers>
      </body>
    </html>
  );
}
