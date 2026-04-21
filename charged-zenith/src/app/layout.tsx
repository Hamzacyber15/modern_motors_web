import type { Metadata } from "next";
import { Inter, Antonio, Tajawal } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-premium",
  subsets: ["latin"],
});

const antonio = Antonio({
  variable: "--font-industrial",
  subsets: ["latin"],
});

const tajawal = Tajawal({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Modern Motors LLC | Ultra-Premium Digital Showroom",
  description: "Experience the future of Omani transport. Immersive 3D truck showroom featuring world-class heavy-duty machines.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${antonio.variable} ${tajawal.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
