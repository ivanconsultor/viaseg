import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import CookieConsent from "@/components/ui/CookieConsent";
import ScrollToTop from "@/components/ScrollToTop";
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | ViaSeg Corretora",
    default: "ViaSeg Corretora | Seguros Modernos e Confiáveis",
  },
  description: "Cote com uma das maiores corretoras do Brasil. Atendimento especializado, preço justo e proteção real para você e sua família.",
  openGraph: {
    title: "ViaSeg Corretora | Seguros Modernos e Confiáveis",
    description: "Cote com uma das maiores corretoras do Brasil. Atendimento especializado e preço justo.",
    url: "https://www.viasegcorretora.com.br",
    siteName: "ViaSeg Corretora",
    images: [
      {
        url: "https://www.viasegcorretora.com.br/images/Logo2.webp",
        width: 800,
        height: 600,
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    "name": "ViaSeg Corretora",
    "url": "https://www.viasegcorretora.com.br",
    "logo": "https://www.viasegcorretora.com.br/images/Logo2.webp",
    "description": "Corretora de seguros especializada em soluções de proteção para pessoas e empresas.",
    "areaServed": "BR",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Rua Dr Othon Machado, 150 - Sala 406",
      "addressLocality": "Rio de Janeiro",
      "addressRegion": "RJ",
      "addressCountry": "BR"
    },
    "telephone": "+5521976844444",
    "sameAs": [
      "https://www.facebook.com/corretoraviaseg",
      "https://www.instagram.com/corretoraviaseg/",
      "https://www.linkedin.com/company/corretoraviaseg/?viewAsMember=true",
      "https://x.com/corretoraviaseg",
      "https://www.reddit.com/user/ViaSeg/"
    ]
  };

  return (
    <html lang="pt-BR">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${montserrat.variable} antialiased bg-background text-foreground selection:bg-primary/20 selection:text-primary`}>
        <ScrollToTop />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
