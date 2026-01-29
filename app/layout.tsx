import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/language-context";
import { getServerLanguage } from "@/lib/server-language";
import  { Noto_Kufi_Arabic } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const notoKufiArabic = Noto_Kufi_Arabic({
  variable: "--font-noto-kufi-arabic",
  subsets: ["arabic"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});
export const metadata: Metadata = {
  title: "BF6 Stats - Battlefield 6 Player Statistics",
  description: "View Battlefield 6 player statistics and performance metrics",
  other: {
    'google-fonts': 'Noto+Kufi+Arabic:wght@100..900',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const language = await getServerLanguage();
  const isRTL = language === 'ar';

  return (
    <html lang={language} dir={isRTL ? 'rtl' : 'ltr'} className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${notoKufiArabic.variable} antialiased`}
      >
        <LanguageProvider initialLanguage={language}>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
