"use client";
import Script from "next/script";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}
export function AnalyticsConsent({ id }: { id: string }) {
  const [choice, setChoice] = useState<string | null>("loading");
  const pathname = usePathname();
  useEffect(() => {
    try {
      setChoice(localStorage.getItem("freitas-analytics"));
    } catch {
      setChoice(null);
    }
  }, []);
  useEffect(() => {
    if (choice === "yes" && window.gtag)
      window.gtag("event", "page_view", {
        page_path: pathname,
        page_location: window.location.origin + pathname,
      });
  }, [pathname, choice]);
  function choose(value: string) {
    try {
      localStorage.setItem("freitas-analytics", value);
    } catch {}
    setChoice(value);
  }
  if (!/^G-[A-Z0-9]+$/.test(id)) return null;
  return (
    <>
      {choice === "yes" && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
            strategy="afterInteractive"
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
          >{`window.dataLayer=window.dataLayer||[];window.gtag=function(){window.dataLayer.push(arguments)};gtag('js',new Date());gtag('config','${id}',{send_page_view:false,allow_google_signals:false,allow_ad_personalization_signals:false});gtag('event','page_view',{page_path:location.pathname,page_location:location.origin+location.pathname});`}</Script>
        </>
      )}
      {choice === null ? (
        <aside className="consent-banner" aria-label="Preferência de métricas">
          <p>
            Podemos usar métricas de navegação para melhorar o site? Os
            formulários funcionam independentemente da sua escolha.
          </p>
          <div>
            <button onClick={() => choose("no")}>Recusar</button>
            <button onClick={() => choose("yes")}>Permitir métricas</button>
          </div>
        </aside>
      ) : (
        choice !== "loading" && (
          <button
            className="privacy-preference"
            onClick={() => {
              if (choice === "yes") {
                try {
                  localStorage.setItem("freitas-analytics", "no");
                } catch {}
                window.location.reload();
              } else setChoice(null);
            }}
          >
            {choice === "yes"
              ? "Desativar métricas"
              : "Preferência de métricas"}
          </button>
        )
      )}
    </>
  );
}
