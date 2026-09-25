import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { navigation } from "@/data/content";
import { whatsappUrl } from "@/lib/site";
import type { ContactSettings } from "@/types/content";
export function Footer({ contacts }: { contacts: ContactSettings }) {
  return (
    <>
      <footer className="footer container">
        <div className="footer-top">
          <div>
            <Link href="/" className="footer-brand">
              freitas<span>↗</span>
            </Link>
            <p>Engenharia digital. Impacto real.</p>
            <span className="micro">
              DESENVOLVIDO COM INTENÇÃO, EM CADA DETALHE.
            </span>
          </div>
          <div>
            <h2>Explore</h2>
            {navigation.slice(1).map(([name, href]) => (
              <Link key={href} href={href}>
                {name}
              </Link>
            ))}
          </div>
          <div>
            <h2>Vamos conversar</h2>
            <a href={`mailto:${contacts.email}`}>
              {contacts.email}
              <ArrowUpRight size={14} />
            </a>
            <a href={whatsappUrl(contacts.whatsapp)}>
              WhatsApp <ArrowUpRight size={14} />
            </a>
            {contacts.instagram && (
              <a
                href={contacts.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram <ArrowUpRight size={14} />
              </a>
            )}
            <p className="region">
              Jundiaí · Campo Limpo Paulista
              <br />
              Várzea Paulista · Brasil
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Freitas WebDev.</span>
          <Link href="/privacidade">Privacidade</Link>
          <a href="#top">Voltar ao topo ↑</a>
        </div>
      </footer>
      <aside aria-label="Contato rápido">
        <a
          className="floating-contact"
          href={whatsappUrl(contacts.whatsapp)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Vamos conversar? Falar com a Freitas WebDev no WhatsApp"
        >
          <MessageCircle size={20} />
          <span>Vamos conversar?</span>
          <i />
        </a>
      </aside>
    </>
  );
}
