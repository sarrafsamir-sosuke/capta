import { ImageResponse } from "next/og"
import { SITE } from "@/lib/constants"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = `${SITE.nome} — ${SITE.tagline}`

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#09090B",
          padding: "72px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: "0.14em",
            color: "#F4F4F5",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#1D9E75",
            }}
          />
          {SITE.nome.toUpperCase()}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 68,
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "#F4F4F5",
            }}
          >
            Seu negócio achado no Google.
          </div>
          <div
            style={{
              fontSize: 68,
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "#F4F4F5",
            }}
          >
            Seu WhatsApp respondendo às 23h.
          </div>
          <div
            style={{
              marginTop: 32,
              fontSize: 27,
              color: "#A1A1AA",
            }}
          >
            {`Sites e automação de WhatsApp · ${SITE.cidade}`}
          </div>
        </div>
      </div>
    ),
    size
  )
}
