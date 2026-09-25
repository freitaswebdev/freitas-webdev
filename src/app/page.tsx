import { Hero } from "@/sections/hero";
import { Work } from "@/sections/work";
import { Services } from "@/sections/services";
import { Process } from "@/sections/process";
import { About, Technologies } from "@/sections/about";
import { CTA } from "@/sections/cta";
import { FAQ } from "@/components/faq";
import { getContacts } from "@/lib/contacts";
import { metadata as pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "Sites, Sistemas e SaaS em Jundiaí",
  "Freitas WebDev: desenvolvimento de websites, sistemas personalizados e SaaS. Design, engenharia e performance para empresas de Jundiaí e região.",
  "/",
);
export default async function Home() {
  const contacts = await getContacts();
  return (
    <>
      <Hero />
      <Work />
      <Services />
      <Process />
      <About />
      <Technologies />
      <FAQ />
      <CTA whatsapp={contacts.whatsapp} />
    </>
  );
}
