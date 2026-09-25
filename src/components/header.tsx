"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navigation } from "@/data/content";
export function Logo() {
  return (
    <Link href="/" className="logo" title="Freitas WebDev — Home">
      <span className="logo-symbol" aria-hidden="true">
        f<span>↗</span>
      </span>
      <span>
        freitas<span className="logo-sub">WEBDEV</span>
      </span>
    </Link>
  );
}
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const links = panel.current?.querySelectorAll<HTMLElement>("a,button");
    links?.[0]?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
      if (e.key === "Tab" && links?.length) {
        const first = links[0],
          last = links[links.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", key);
    };
  }, [open]);
  const close = () => {
    setOpen(false);
    trigger.current?.focus();
  };
  return (
    <header className="header">
      <div className="header-inner">
        <Logo />
        <nav className="desktop-nav" aria-label="Navegação principal">
          {navigation.map(([name, href]) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname === href ? "page" : undefined}
            >
              {name}
            </Link>
          ))}
        </nav>
        <Link className="header-cta" href="/solicitar-projeto">
          Iniciar projeto <ArrowUpRight size={16} />
        </Link>
        <button
          ref={trigger}
          className="menu-trigger"
          aria-label="Abrir menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(true)}
        >
          <Menu />
        </button>
      </div>
      {open && (
        <div
          ref={panel}
          id="mobile-menu"
          className="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu principal"
        >
          <div className="mobile-menu-top">
            <span className="eyebrow">Freitas WebDev</span>
            <button
              onClick={close}
              className="icon-button"
              aria-label="Fechar menu"
            >
              <X />
            </button>
          </div>
          <nav>
            {navigation.map(([name, href], i) => (
              <Link key={href} href={href} onClick={() => setOpen(false)}>
                <small>0{i + 1}</small>
                {name}
                <ArrowUpRight />
              </Link>
            ))}
          </nav>
          <Link
            href="/solicitar-projeto"
            className="button"
            onClick={() => setOpen(false)}
          >
            Iniciar projeto <ArrowUpRight />
          </Link>
          <p>Design, código e negócio. Conectados.</p>
        </div>
      )}
    </header>
  );
}
