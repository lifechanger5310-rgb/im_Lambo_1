import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "APEX PREDATOR — Engineered to Hunt",
  description:
    "The Apex Predator. A 1,180-horsepower hybrid hypercar built for one purpose: to be the fastest thing on the road that noticed you first.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-black text-white antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
