import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CanvasRig from "@/components/webgl/CanvasRig";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Speculative Futures Landscape",
  description: "Awwwards-level interactive portfolio architecture",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* HTML UI Layer */}
        <main className="relative z-10 w-full">{children}</main>

        {/* WebGL Canvas Layer (Fixed to background) */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <CanvasRig>{null}</CanvasRig>
        </div>
      </body>
    </html>
  );
}
