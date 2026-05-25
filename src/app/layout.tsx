import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400","500","600","700","800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300","400","500","600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Professional Cleaning Services in Winnipeg | RiseClear Property Services",
  description:
    "Residential & commercial cleaning services in Winnipeg, Manitoba. Standard, deep, move-in/out, window, and post-construction cleaning. Free quotes — call +1 431 816 4106.",
  keywords: [
    "cleaning services Winnipeg",
    "residential cleaning Winnipeg",
    "commercial cleaning Winnipeg",
    "deep cleaning Winnipeg",
    "move in move out cleaning Winnipeg",
    "window cleaning Winnipeg",
    "post construction cleaning Winnipeg",
    "RiseClear Property Services",
    "cleaning company Winnipeg Manitoba",
  ],
  authors: [{ name: "RiseClear Property Services" }],
  metadataBase: new URL("https://risecleaning.ca"),
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://risecleaning.ca",
    title: "Professional Cleaning Services in Winnipeg | RiseClear Property Services",
    description:
      "Residential & commercial cleaning in Winnipeg, MB. Standard, deep, move-in/out, window, and post-construction. Free quotes.",
    siteName: "RiseClear Property Services",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://risecleaning.ca" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0EA5E9" />
        <meta name="geo.region" content="CA-MB" />
        <meta name="geo.placename" content="Winnipeg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "RiseClear Property Services",
              description: "Professional residential and commercial cleaning services in Winnipeg, Manitoba.",
              url: "https://risecleaning.ca",
              telephone: "+14318164106",
              email: "info@risecleaning.ca",
              address: { "@type": "PostalAddress", addressLocality: "Winnipeg", addressRegion: "MB", addressCountry: "CA" },
              geo: { "@type": "GeoCoordinates", latitude: 49.8951, longitude: -97.1384 },
              serviceArea: { "@type": "City", name: "Winnipeg" },
              priceRange: "$$",
            }),
          }}
        />
      </head>
      <body className="antialiased bg-white text-brand-ink" style={{ fontFamily: "var(--font-inter),sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
