import "./globals.css";
import type { Metadata } from "next";
import { Orbitron, Poppins } from "next/font/google"; // <-- Import Orbitron and Poppins
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Setup for the body font
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "700"], // Add weights you need
});

// Setup for the heading/logo font
const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "700", "900"], // Add weights you need
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
      {/* Apply both font variables to the body */}
      <body className={`${poppins.variable} ${orbitron.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
