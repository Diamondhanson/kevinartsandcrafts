import Link from "next/link";
import { Logo } from "@/components/logo";
import { nav, site, whatsappLink } from "@/lib/site";
import { Container, WhatsAppIcon } from "@/components/ui";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-bone">
      <Container className="py-20 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo markClassName="h-10 w-10" />
            <p className="mt-7 text-[0.9375rem] leading-[1.8] text-stone">
              {site.description}
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="eyebrow !text-ash">Explore</h2>
            <ul className="mt-6 flex flex-col gap-3.5">
              <li>
                <Link href="/" className="link-underline text-[0.9375rem] text-stone hover:text-bone">
                  Home
                </Link>
              </li>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="link-underline text-[0.9375rem] text-stone hover:text-bone"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow !text-ash">Get in touch</h2>
            <ul className="mt-6 flex flex-col gap-3.5 text-[0.9375rem] text-stone">
              <li>
                <a href={`mailto:${site.email}`} className="link-underline hover:text-bone">
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.phoneDisplay.replace(/\s/g, "")}`}
                  className="link-underline hover:text-bone"
                >
                  {site.phoneDisplay}
                </a>
              </li>
              <li className="pt-1">
                {site.location.city}, {site.location.country}
              </li>
              <li>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 text-bone hover:text-clay-soft"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  <span className="link-underline text-[0.8125rem] font-semibold uppercase tracking-[0.14em]">
                    WhatsApp
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-bone/15 pt-8 text-[0.8125rem] text-ash sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. Every piece made by hand.
          </p>
          <p>{site.hours}</p>
        </div>
      </Container>
    </footer>
  );
}
