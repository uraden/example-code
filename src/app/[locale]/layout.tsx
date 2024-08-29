import { Providers } from "../../reduxStore/provider";
import type { Metadata } from "next";
import { GoogleAnalytics } from '@next/third-parties/google'
import { getTranslations } from "next-intl/server";

import "./globals.css";
import { Toaster } from "sonner";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { Ubuntu } from 'next/font/google'



const oxygen = Ubuntu({
  display: 'swap',
  variable: '--font-oxygen',
  subsets: ['latin'],
  weight: "500"
})

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {

  const t = await getTranslations({locale, namespace: 'Metadata'});

  return {
    metadataBase: new URL("https://www.signaturesend.uz"),
    alternates: {
      canonical: '/',
      languages: {
        ru: '/ru',
        uz: '/uz',
        en: '/en',
      },
    },
    title: {
      default: t("main"),
      template: "SignatureSend",
    },
    description: t("mainDesc"),
    openGraph: {
      title:
        "SignatureSend - это служба доставки на основе подписки, которая доставляет различные продукты в ваш офис.",
      description:
        "SignatureSend - это компания, которая предоставляет доставку на основе подписки и привозит разнообразные продукты прямо в ваш офис.",
      type: "website",
      locale: "ru_RU",
      url: "www.signaturesend.uz",
      siteName: "signaturesend",
    },
    verification: {
      google: 'Bt91Af2m28bFpdM51HdHU7O22Y3Dxz9RAjnfVEyMVmg'
    }
  };
}




interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<RootLayoutProps>) {
  const messages = useMessages();

  return (
    <html lang={locale}>
      <head>
      <link rel="icon" href="/favicon.ico"/>
      </head>
      <Providers>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <body className={`${oxygen.className} min-h-screen`}>{children}</body>
          <GoogleAnalytics gaId="G-VMK9XG47XC" />
        </NextIntlClientProvider>
        <Toaster />
      </Providers>
    </html>
  );
}
