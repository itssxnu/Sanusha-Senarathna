import type { Metadata, Viewport } from "next";
import "./globals.css";
import Script from "next/script";
import { Outfit, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

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

export const viewport: Viewport = {
  themeColor: "#04070a",
};

export const metadata: Metadata = {
  title: "Sanusha Dilmin Senarathna | Data Science Undergraduate & AI/ML Developer / Full-Stack Developer",
  description: "Portfolio of Sanusha Dilmin Senarathna, Data Science undergraduate at SLIIT and full-stack software developer. Specialized in building intelligent AI systems, NLP, semantic search, and modern web apps.",
  keywords: ["Sanusha Dilmin Senarathna", "Sanu", "SLIIT", "Data Scientist", "Machine Learning Portfolio", "Full Stack Developer", "Software Engineer Colombo", "React Developer Sri Lanka"],
  authors: [{ name: "Sanusha Dilmin Senarathna" }],
  creator: "Sanusha Dilmin Senarathna",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sanusha-senarathna.vercel.app",
    title: "Sanusha Dilmin Senarathna | Data Science Undergraduate & AI/ML Developer / Full-Stack Developer",
    description: "Portfolio of Sanusha Dilmin Senarathna, Data Science undergraduate and full-stack software engineer. Building intelligent machine learning solutions and modern web applications.",
    siteName: "Sanusha Dilmin Senarathna Portfolio",
    images: [
      {
        url: "https://sanusha-senarathna.vercel.app/og-img.png",
        width: 1200,
        height: 630,
        alt: "Sanusha Dilmin Senarathna - Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sanusha Dilmin Senarathna | Data Science Undergraduate & AI/ML Developer / Full-Stack Developer",
    description: "Portfolio of Sanusha Dilmin Senarathna, Data Science undergraduate and full-stack software engineer, AI/ML developer.",
    images: ["https://sanusha-senarathna.vercel.app/twitter.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "L1_35PRmQ6xREY4FPWCK4oyZUiIJU3K596g0A9QueJk",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${jetbrainsMono.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",

              "name": "Sanusha Dilmin Senarathna",

              "givenName": "Sanusha",

              "familyName": "Senarathna",

              "url": "https://sanusha-senarathna.vercel.app",

              "image": "https://sanusha-senarathna.vercel.app/profile2.png",

              "description": "Data Science undergraduate specializing in Machine Learning, AI, and modern web development.",

              "jobTitle": "Data Science Undergraduate and AI/ML Developer",

              "nationality": "Sri Lankan",

              "knowsAbout": [
                "Machine Learning",
                "Artificial Intelligence",
                "Python",
                "JavaScript",
                "FastAPI",
                "Node.js",
                "Java",
                "Data Science"
              ],

              "alumniOf": {
                "@type": "EducationalOrganization",
                "name": "SLIIT (Sri Lanka Institute of Information Technology)"
              },

              "sameAs": [
                "https://github.com/itssxnu",
                "https://linkedin.com/in/sanusha-senarathna",
                "https://x.com/sanusha_dilmin",
                "https://www.instagram.com/its_sxnu?igsh=MWxrdHB3enV5aHZkaw%3D%3D&utm_source=qr",
                "https://www.facebook.com/sxnusha?mibextid=wwXIfr&mibextid=wwXIfr"
              ],

              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Colombo",
                "addressCountry": "Sri Lanka"
              }
            })
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
        <SpeedInsights />
        <Script
          src="/scripts/liquidGL.js?v=3"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
