"use client";

import { useEffect, useState } from "react";
import { site, whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "@/components/ui";

/**
 * Floating WhatsApp button. Deliberately quiet: it stays out of the way until
 * the visitor has scrolled past the hero, then fades in bottom-right.
 */
export function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={whatsappLink(`Hello ${site.founder}, I found you through your website.`)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message us on WhatsApp"
      className={`fixed bottom-5 right-5 z-40 flex h-13 w-13 items-center justify-center rounded-full bg-ink text-bone shadow-[0_6px_28px_-8px_rgba(28,25,23,0.55)] transition-all duration-500 hover:bg-clay sm:bottom-8 sm:right-8 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
      style={{ height: "3.25rem", width: "3.25rem" }}
    >
      <WhatsAppIcon className="h-6 w-6" />
    </a>
  );
}
