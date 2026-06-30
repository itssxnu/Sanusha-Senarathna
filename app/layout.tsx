import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Sanusha Senarathna | Data Scientist & Full-Stack Developer",
  description: "Portfolio of Sanusha Senarathna, Data Science undergraduate at SLIIT and full-stack software developer. Specialized in building intelligent AI systems, NLP, semantic search, and modern web apps.",
  keywords: ["Sanusha Senarathna", "Sanu", "SLIIT", "Data Scientist", "Machine Learning Portfolio", "Full Stack Developer", "Software Engineer Colombo", "React Developer Sri Lanka"],
  authors: [{ name: "Sanusha Senarathna" }],
  creator: "Sanusha Senarathna",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sanusha-senarathna.vercel.app",
    title: "Sanusha Senarathna | Data Scientist & Full-Stack Developer",
    description: "Portfolio of Sanusha Senarathna, Data Science undergraduate and full-stack software engineer. Building intelligent machine learning solutions and modern web applications.",
    siteName: "Sanusha Senarathna Portfolio",
    images: [
      {
        url: "https://sanusha-senarathna.vercel.app/og-img.png",
        width: 1200,
        height: 630,
        alt: "Sanusha Senarathna - Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sanusha Senarathna | Data Scientist & Full-Stack Developer",
    description: "Portfolio of Sanusha Senarathna, Data Science undergraduate and full-stack software engineer.",
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
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&family=JetBrains+Mono:wght@100..800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Sanusha Senarathna",
              "url": "https://sanusha-senarathna.vercel.app",
              "image": "https://sanusha-senarathna.vercel.app/profile2.png",
              "jobTitle": "Data Scientist & Full-Stack Developer",
              "alumniOf": {
                "@type": "EducationalOrganization",
                "name": "SLIIT (Sri Lanka Institute of Information Technology)"
              },
              "sameAs": [
                "https://github.com/itssxnu",
                "https://linkedin.com/in/sanusha-senarathna"
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
        <Script
          src="/scripts/liquidGL.js?v=3"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
