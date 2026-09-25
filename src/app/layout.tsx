import type { Metadata, Viewport } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MotionSystem } from "@/components/motion-system";
import { getContacts } from "@/lib/contacts";
import { siteUrl } from "@/lib/site";
import { JsonLd } from "@/components/ui";
import { AnalyticsConsent } from "@/components/analytics-consent";
import { IntroSequence } from "@/components/intro-sequence";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Freitas WebDev — Sites, Sistemas e SaaS em Jundiaí",
    template: "%s | Freitas WebDev",
  },
  description:
    "Websites, sistemas web e SaaS com design próprio e engenharia para o seu negócio. Atendimento em Jundiaí, Campo Limpo Paulista e Várzea Paulista.",
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#070a11",
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const contacts = await getContacts();
  return (
    <html lang="pt-BR">
      <body id="top" className="intro-pending">
        <noscript>
          <style>{`.intro-pending > :not(.intro-sequence) { opacity: 1 !important; }`}</style>
        </noscript>
        <IntroSequence />
        <a className="skip-link" href="#conteudo">
          Pular para o conteúdo
        </a>
        <MotionSystem />
        <Header />
        <main id="conteudo">{children}</main>
        <Footer contacts={contacts} />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <AnalyticsConsent id={process.env.NEXT_PUBLIC_GA_ID} />
        )}
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": ["Organization", "ProfessionalService"],
                "@id": `${siteUrl}/#organization`,
                name: "Freitas WebDev",
                url: siteUrl,
                telephone: `+${contacts.whatsapp}`,
                email: contacts.email,
                description:
                  "Desenvolvimento de websites, sistemas web e SaaS.",
                areaServed: [
                  "Jundiaí",
                  "Campo Limpo Paulista",
                  "Várzea Paulista",
                  "Brasil",
                ],
                ...(contacts.instagram ? { sameAs: [contacts.instagram] } : {}),
              },
              {
                "@type": "WebSite",
                "@id": `${siteUrl}/#website`,
                url: siteUrl,
                name: "Freitas WebDev",
                inLanguage: "pt-BR",
                publisher: { "@id": `${siteUrl}/#organization` },
              },
            ],
          }}
        />
      </body>
    </html>
  );
}
