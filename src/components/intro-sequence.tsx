"use client";

import { useEffect, useState } from "react";

export function IntroSequence() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduced) {
      document.body.classList.add("intro-complete");
      setVisible(false);
      return;
    }

    document.body.classList.add("intro-active");
    const complete = window.setTimeout(() => {
      document.body.classList.remove("intro-active");
      document.body.classList.add("intro-complete");
      setVisible(false);
    }, 2850);

    return () => {
      window.clearTimeout(complete);
      document.body.classList.remove("intro-active");
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="intro-sequence" aria-hidden="true">
      <div className="intro-grid" />
      <div className="intro-cross intro-cross-a">+</div>
      <div className="intro-cross intro-cross-b">+</div>

      <div className="intro-center">
        <div className="intro-mark">
          <span>f</span>
          <span>↗</span>
        </div>
        <div className="intro-wordmark">
          <span>FREITAS</span>
          <small>WEBDEV</small>
        </div>
      </div>

      <div className="intro-build">
        <div className="intro-build-copy">
          <span>INICIANDO EXPERIÊNCIA</span>
          <span className="intro-counter">001 / 001</span>
        </div>
        <div className="intro-track">
          <span />
        </div>
      </div>

      <span className="intro-coordinate">23°11′ S · 46°53′ W</span>
    </div>
  );
}
