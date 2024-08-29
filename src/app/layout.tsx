export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {

  // const t = await getTranslations({locale, namespace: 'Metadata'});

  return {
    metadataBase: new URL("https://www.signaturesend.uz"),
    alternates: {
      canonical: './',
      languages: {
        ru: '/ru',
        uz: '/uz',
        en: '/en',
      },
    },
    title: {
      default: "SignatureSend",
      template: "SignatureSend",
    },
    description: "SignatureSend - Премиум-сервис онлайн-подписки для офисов",
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
      google: 'dK9ghtwMaHOhiMNaRuyH4J2sEZSdbQRP93HZvZoGS60'
    }
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
