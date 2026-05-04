// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Petrobarr",
  description: "Premium Petrochemical & Oil Industry Domain",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-gradient-to-br from-purple-50 to-orange-50" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
