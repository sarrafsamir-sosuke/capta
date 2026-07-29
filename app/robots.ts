import type { MetadataRoute } from "next"

const SITE_URL = "https://capta-beta.vercel.app"

// Libera geral, exceto /api/. Lista explícita de crawlers de IA para AIO.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "cohere-ai", allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
