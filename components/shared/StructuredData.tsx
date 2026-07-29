import { FAQ, WHATSAPP_NUMERO } from "@/lib/constants"

const SITE_URL = "https://capta-beta.vercel.app"

// Server Component. Injeta os 3 JSON-LDs (LocalBusiness, WebSite, FAQPage) no
// <head> para SEO técnico e AIO. Perguntas do FAQPage vêm de FAQ (constants),
// a mesma fonte usada na seção visível, para não duplicar texto.
export function StructuredData() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#organization`,
    name: "Capta",
    description:
      "Agência digital especializada em criação de sites profissionais e automação de atendimento via WhatsApp para micro e pequenas empresas em São Luís, Maranhão.",
    url: SITE_URL,
    telephone: `+${WHATSAPP_NUMERO}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "São Luís",
      addressRegion: "MA",
      addressCountry: "BR",
    },
    areaServed: {
      "@type": "City",
      name: "São Luís",
    },
    serviceType: [
      "Criação de Sites",
      "Automação de Atendimento WhatsApp",
      "SEO",
      "Marketing Digital",
    ],
    priceRange: "R$700 - R$3.500",
    openingHours: "Mo-Fr 08:00-18:00",
    sameAs: [`https://wa.me/${WHATSAPP_NUMERO}`],
    knowsAbout: [
      "SEO local",
      "Automação de WhatsApp",
      "Criação de sites para pequenas empresas",
      "Otimização para inteligência artificial",
      "AIO",
      "GEO",
    ],
  }

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "Capta",
    url: SITE_URL,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "pt-BR",
  }

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.perguntas.map((item) => ({
      "@type": "Question",
      name: item.pergunta,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.resposta,
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
    </>
  )
}
