import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sanusha Senarathna - Portfolio",
  description: "Portfolio of Sanusha Senarathna, data science undergraduate and web developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className={`${outfit.variable} ${jetbrainsMono.variable} min-h-full flex flex-col`}>
        {children}
        <Script
          src="/scripts/html2canvas.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="/scripts/liquidGL.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
