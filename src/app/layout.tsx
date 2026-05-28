import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "English Learning Resources",
  description: "Master authentic English through real-world context and interactive resources.",
  icons: {
    icon: [
      {
        rel: 'icon',
        url: '/logo.webp',
      },
    ],
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased bg-background text-foreground selection:bg-primary selection:text-white overflow-x-hidden">
        <Navbar />
        <main className="min-h-screen pt-[112px]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}