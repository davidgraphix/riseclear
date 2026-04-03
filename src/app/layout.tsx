import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Window Cleaning Services in Winnipeg | RiseClear Property Services",
  description:
    "Professional window cleaning, gutter cleaning, pressure washing, and home cleaning services in Winnipeg, Manitoba. Get a free quote today. Call +1 431 816 4106.",
  keywords: [
    "window cleaning Winnipeg",
    "gutter cleaning Winnipeg",
    "home cleaning services Winnipeg",
    "pressure washing Winnipeg",
    "deep cleaning Winnipeg",
    "move in move out cleaning Winnipeg",
    "LED light installation Winnipeg",
    "RiseClear Property Services",
    "cleaning company Winnipeg Manitoba",
  ],
  authors: [{ name: "RiseClear Property Services" }],
  creator: "RiseClear Property Services",
  metadataBase: new URL("https://risecleaning.ca"),
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://risecleaning.ca",
    title: "Window Cleaning Services in Winnipeg | RiseClear Property Services",
    description:
      "Professional window cleaning, gutter cleaning, pressure washing, and home cleaning services in Winnipeg, Manitoba. Get a free quote today.",
    siteName: "RiseClear Property Services",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "RiseClear Property Services — Winnipeg's Premium Cleaning Company",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Window Cleaning Services in Winnipeg | RiseClear Property Services",
    description:
      "Professional window cleaning and property services in Winnipeg, MB. Call +1 431 816 4106.",
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
  alternates: {
    canonical: "https://risecleaning.ca",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#080C10" />
        <meta name="geo.region" content="CA-MB" />
        <meta name="geo.placename" content="Winnipeg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "RiseClear Property Services",
              description:
                "Professional window cleaning, gutter cleaning, pressure washing, and home cleaning services in Winnipeg, Manitoba.",
              url: "https://risecleaning.ca",
              telephone: "+14318164106",
              email: "info@risecleaning.ca",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Winnipeg",
                addressRegion: "MB",
                addressCountry: "CA",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 49.8951,
                longitude: -97.1384,
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ],
                opens: "08:00",
                closes: "18:00",
              },
              serviceArea: {
                "@type": "City",
                name: "Winnipeg",
              },
              priceRange: "$$",
            }),
          }}
        />
      </head>
      <body className="font-body antialiased">
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
