'use client'

import { Inter } from "next/font/google";
import "./globals.css";
import { SidebarLayout } from "@/components/layout/Sidebar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "sonner";
import ForSalePopup from "@/components/ForSalePopup";
import { useForSalePopup } from "@/hooks/use-for-sale-popup";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isOpen, closePopup } = useForSalePopup();

  return (
    <html lang="en">
      <head />
      <body className={`${inter.variable} font-sans antialiased`}>
        <div className="flex min-h-screen">
          <SidebarLayout>
            <div className="flex flex-col flex-1">
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
          </SidebarLayout>
        </div>
        <Toaster richColors position="top-right" />
        <ForSalePopup isOpen={isOpen} onClose={closePopup} />
      </body>
    </html>
  );
}
