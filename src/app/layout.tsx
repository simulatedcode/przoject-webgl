import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import CanvasRig from "@/components/webgl/CanvasRig";
import SmoothScroll from "@/components/dom/SmoothScroll";
import NoSSR from "@/components/dom/NoSSR";

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
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
      <body className={`${ibmPlexSans.variable} ${ibmPlexMono.variable} antialiased`}>
        <SmoothScroll>
          {/* WebGL Canvas Layer (Fixed to background) */}
          <div className="fixed inset-0 -z-10 pointer-events-none">
            <NoSSR>
              <CanvasRig>{null}</CanvasRig>
            </NoSSR>
          </div>

          {/* HTML UI Layer */}
          <main className="w-full">{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}

