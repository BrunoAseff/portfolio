import { Roboto, Handjet } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import FaviconLoop from "@/components/FaviconLoop";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ThemeProvider } from "@/components/theme-provider";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }) {
  const locale = params?.locale || 'pt';
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('title'),
    description: t('description'),
    icons: {
      icon: "/favicons/typescript.ico",
    },
  };
}

const inter = Roboto({ subsets: ["latin"],
    weight: ["100", "300", "400", "500", "700", "900"],

 });

const handjet = Handjet({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-handjet",
});

export default async function LocaleLayout({ children, params }) {
  // Extract locale with fallback
  const locale = params?.locale || 'pt';
  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body className={`${inter.className} ${handjet.variable}`}>
        <NextIntlClientProvider messages={messages}>
          <FaviconLoop />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main className="h-screen relative  flex flex-col items-center justify-between w-full ">
              <Image
                priority
                alt="Background"
                src="/new3.png"
                quality={100}
                fill
                sizes="100vw"
                style={{
                  objectFit: "cover",
                }}
              />

              <Navbar />
              {children}
            </main>
            <Toaster />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
      <GoogleAnalytics gaId="G-MCL1RFVL2S" />
    </html>
  );
}
