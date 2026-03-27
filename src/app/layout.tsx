import "./globals.css";
import type { Metadata } from "next";
import { Orbitron, Poppins, IBM_Plex_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Setup for the body font
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "700"],
});

// Setup for the body font
const ibmplexmono = IBM_Plex_Mono({
  variable: "--font-ibmplexmono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Setup for the heading/logo font
const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Conscious Qubit",
  description: "The world is Quantum",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${orbitron.variable} ${ibmplexmono.variable} antialiased bg-white text-black dark:bg-black dark:text-white`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
