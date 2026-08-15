"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";
import { nav, site, whatsappLink } from "@/lib/site";
import { ButtonAnchor, WhatsAppIcon } from "@/components/ui";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation, and lock the body while it is open.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-500 ${
        scrolled || open ? "bg-bone/92 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div
        className={`transition-opacity duration-500 ${scrolled ? "opacity-100" : "opacity-0"}`}
        aria-hidden="true"
      >
        <div className="absolute inset-x-0 bottom-0 h-px bg-stone" />
      </div>

      <div className="mx-auto flex w-full max-w-[82rem] items-center justify-between px-6 py-5 sm:px-8 lg:px-12">
        <Link href="/" aria-label={`${site.name} — home`} className="text-ink">
          <Logo markClassName="h-8 w-8 sm:h-9 sm:w-9" />
        </Link>

        <nav className="hidden items-center gap-9 lg:flex" aria-label="Main">
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`link-underline text-[0.8125rem] font-semibold uppercase tracking-[0.16em] transition-colors ${
                  active ? "text-clay" : "text-ink hover:text-clay"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <ButtonAnchor
            href={whatsappLink(`Hello ${site.founder}, I found you through your website.`)}
            target="_blank"
            rel="noopener noreferrer"
            tone="outline"
            className="!py-3 !text-[0.6875rem]"
          >
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp
          </ButtonAnchor>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="-mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span className="flex w-6 flex-col gap-[5px]">
            <span
              className={`h-px w-full bg-ink transition-transform duration-300 ${
                open ? "translate-y-[3px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-full bg-ink transition-transform duration-300 ${
                open ? "-translate-y-[3px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {/* mobile menu */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-stone bg-bone lg:hidden"
      >
        <nav className="flex flex-col px-6 py-3 sm:px-8" aria-label="Main">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="border-b border-stone/70 py-5 font-display text-2xl last:border-0"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="px-6 pb-8 sm:px-8">
          <ButtonAnchor
            href={whatsappLink(`Hello ${site.founder}, I found you through your website.`)}
            target="_blank"
            rel="noopener noreferrer"
            tone="solid"
            className="w-full"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Message on WhatsApp
          </ButtonAnchor>
        </div>
      </div>
    </header>
  );
}
