import type { Metadata } from "next";
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://freitas-webdev.vercel.app"
).replace(/\/$/, "");
export function metadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} — Freitas WebDev`,
      description,
      url: path,
      type: "website",
      locale: "pt_BR",
      siteName: "Freitas WebDev",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "Freitas WebDev — Engenharia digital. Impacto real.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
  };
}
export const whatsappUrl = (
  number: string,
  message = "Olá! Conheci a Freitas WebDev pelo site e gostaria de conversar sobre um projeto.",
) =>
  `https://wa.me/${number.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
