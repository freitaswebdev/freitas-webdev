"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
export function MotionSystem() {
  const pathname = usePathname();
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const items = document.querySelectorAll<HTMLElement>(
      "[data-reveal], .section-heading, .about-grid, .faq-section > div, .case-block",
    );
    if (reduced) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
      },
      { threshold: 0.1 },
    );
    items.forEach((el, index) => {
      el.style.setProperty("--reveal-order", String(index % 4));
      el.classList.add("will-reveal");
      observer.observe(el);
    });
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        document.documentElement.style.setProperty(
          "--scroll-progress",
          String(
            window.scrollY /
              Math.max(
                1,
                document.documentElement.scrollHeight - window.innerHeight,
              ),
          ),
        );
        document.body.classList.toggle("scrolled", window.scrollY > 35);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    const orbitals = window.matchMedia("(pointer:fine)").matches
      ? Array.from(document.querySelectorAll<HTMLElement>(".orbital"))
      : [];
    const move = (event: PointerEvent) => {
      const target = event.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      target.style.setProperty(
        "--pointer-x",
        `${((event.clientX - rect.left) / rect.width - 0.5) * 12}deg`,
      );
      target.style.setProperty(
        "--pointer-y",
        `${((event.clientY - rect.top) / rect.height - 0.5) * -12}deg`,
      );
    };
    const leave = (event: PointerEvent) => {
      const target = event.currentTarget as HTMLElement;
      target.style.setProperty("--pointer-x", "0deg");
      target.style.setProperty("--pointer-y", "0deg");
    };
    orbitals.forEach((el) => {
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
    });

    return () => {
      orbitals.forEach((el) => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      });
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      items.forEach((el) => el.classList.remove("will-reveal"));
    };
  }, [pathname]);
  return <div className="scroll-progress" aria-hidden="true" />;
}
