import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NutriTrack",
  description: "Track your nutrition and meals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased px-12 py-8 bg-gray-300`}
      >
        <div className="mx-auto flex w-full max-w-5xl flex-grow flex-col items-stretch justify-stretch rounded-md bg-white md:p-8">
          <header className="flex items-center justify-between mb-6 pb-3 border-b">
            <Link href={"/"}>
            <div className="flex items-center">
              <div className="mr-3 text-2xl text-green-600">🥗</div>
              <h1 className="text-xl text-primary font-bold">NutriTeen</h1>
            </div>
            </Link>
            
            <nav className="flex space-x-4 text-sm">
              <Link href="/" className="text-green-600 font-medium">
                Food Log
              </Link>
              <Link
                href="/recommended-intake"
                className="text-gray-600 hover:text-green-600 transition-colors"
              >
                Recommended Intake
              </Link>

              <Link
                href="/resources"
                className="text-gray-600 hover:text-green-600 transition-colors"
              >
                Resources
              </Link>
            </nav>
          </header>
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
