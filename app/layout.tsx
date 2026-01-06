import "./globals.css";
import type { Metadata } from "next";
import { Oxanium } from "next/font/google";

const oxanium = Oxanium({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Skynova",
  description: "Demo marketplace for Counter-Strike skins",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={oxanium.className}>{children}</body>
    </html>
  );
}

