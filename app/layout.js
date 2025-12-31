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
  description: "Agency that helps businesses grow with AI-powered solutions.",
  alternates: {
    // Replace this with your actual live URL
    canonical: 'https://aivora-digitals.vercel.app/', 
  },
  // This helps with the sitemap you showed earlier
  metadataBase: new URL('https://aivora-digitals.vercel.app/'),
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },

  openGraph: {
    title: "Aivora Digitals",
    description: "Agency that helps businesses grow with AI-powered solutions.",
    url: "https://aivora-digitals.vercel.app/",
    siteName: "Aivora Digitals",
    images: [
      {
        url: "/images/ai banner.png",
        width: 1200,
        height: 630,
        alt: "Aivora Digitals",
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
        "url": "https://aivora-digitals.vercel.app/",
        "logo": "https://aivora-digitals.vercel.app/images/logo.jpeg",
        "sameAs": [
          "https://www.linkedin.com/company/aivora-digitals",
          "https://www.facebook.com/aivora-digitals",
          "https://www.instagram.com/aivora-digitals"
        ]
      }),
    }}
  />
  <meta name="google-site-verification" content="BUTXNsOi8kn9JXAG7qp6iSxbUSUhog_rgAZSjIQRMsg" />
</head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
