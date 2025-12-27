import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Aivora Digitals",
  description: "Award-winning digital agency providing web, UX, and AI solutions.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Aivora Digitals",
    description: "Award-winning digital agency",
    url: "https://aivora-digitals.netlify.app",
    siteName: "Aivora Digitals",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Aivora Digitals Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aivora Digitals",
    description: "Future Award-winning digital agency",
    images: ["/images/logo.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Aivora Digitals",
        "url": "https://aivora-digitals.netlify.app",
        "logo": "https://aivora-digitals.netlify.app/images/logo.jpeg",
        "sameAs": [
          "https://www.linkedin.com/company/aivora-digitals",
          "https://www.facebook.com/aivora-digitals",
          "https://www.instagram.com/aivora-digitals"
        ]
      }),
    }}
  />
</head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
