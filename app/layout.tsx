import ChatWidget from "@/components/ChatWidget";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const nohemi = localFont({
  variable: "--font-nohemi",
  display: "swap",
  src: [
    { path: "../public/font/Web-TT/Nohemi-Thin.woff", weight: "100", style: "normal" },
    { path: "../public/font/Web-TT/Nohemi-ExtraLight.woff", weight: "200", style: "normal" },
    { path: "../public/font/Web-TT/Nohemi-Light.woff", weight: "300", style: "normal" },
    { path: "../public/font/Web-TT/Nohemi-Regular.woff", weight: "400", style: "normal" },
    { path: "../public/font/Web-TT/Nohemi-Medium.woff", weight: "500", style: "normal" },
    { path: "../public/font/Web-TT/Nohemi-SemiBold.woff", weight: "600", style: "normal" },
    { path: "../public/font/Web-TT/Nohemi-Bold.woff", weight: "700", style: "normal" },
    { path: "../public/font/Web-TT/Nohemi-ExtraBold.woff", weight: "800", style: "normal" },
    { path: "../public/font/Web-TT/Nohemi-Black.woff", weight: "900", style: "normal" },
  ],
});

export const metadata: Metadata = {
  title: "ImmobiLei",
  description: "Il mondo immobiliare, spiegato semplice.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className={`${nohemi.variable} antialiased`}>
        {children}
        <ChatWidget />
        </body>
    </html>
  );
}
