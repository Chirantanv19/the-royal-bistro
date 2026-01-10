import type { Metadata } from "next";
import { Inter } from "next/font/google"; // ✅ Added missing import
import "./globals.css";
import { Toaster } from "sonner";

// Uploadthing Setup
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";

// ✅ Initialize the font correctly
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Royal Bistro",
  description: "Authentic Dining Experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* ✅ The Uploadthing Plugin */}
        <NextSSRPlugin
          routerConfig={extractRouterConfig(ourFileRouter)}
        />

        {children}
        <Toaster />
      </body>
    </html>
  );
}