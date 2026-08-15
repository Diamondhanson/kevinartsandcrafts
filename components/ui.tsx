import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/* ------------------------------------------------------------------ layout */

export function Container({
  children,
  className = "",
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
}) {
  const width =
    size === "narrow" ? "max-w-3xl" : size === "wide" ? "max-w-[100rem]" : "max-w-[82rem]";
  return <div className={`mx-auto w-full ${width} px-6 sm:px-8 lg:px-12 ${className}`}>{children}</div>;
}

export function Section({
  children,
  className = "",
  tone = "bone",
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: "bone" | "linen" | "ink";
  id?: string;
}) {
  const tones = {
    bone: "bg-bone text-ink",
    linen: "bg-linen text-ink",
    ink: "bg-ink text-bone",
  };
  return (
    <section id={id} className={`${tones[tone]} py-20 sm:py-28 lg:py-36 ${className}`}>
      {children}
    </section>
  );
}

/* ---------------------------------------------------------------- typography */

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`eyebrow ${className}`}>{children}</p>;
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  const alignment = align === "center" ? "text-center mx-auto items-center" : "items-start";
  return (
    <div className={`flex max-w-2xl flex-col gap-5 ${alignment} ${className}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="text-[2rem] leading-[1.12] sm:text-[2.6rem] lg:text-[3.1rem]">{title}</h2>
      {intro && (
        <p className="max-w-[60ch] text-[1.0625rem] leading-[1.75] text-graphite">{intro}</p>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------- links */

type ButtonTone = "solid" | "outline" | "ghost" | "light";

const buttonBase =
  "inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-[0.8125rem] font-semibold uppercase tracking-[0.14em] transition-colors duration-300";

const buttonTones: Record<ButtonTone, string> = {
  solid: "bg-ink text-bone hover:bg-clay",
  outline: "border border-stone text-ink hover:border-ink hover:bg-ink hover:text-bone",
  ghost: "text-ink hover:text-clay",
  light: "border border-bone/30 text-bone hover:bg-bone hover:text-ink",
};

export function ButtonLink({
  tone = "solid",
  className = "",
  ...props
}: ComponentProps<typeof Link> & { tone?: ButtonTone }) {
  return <Link {...props} className={`${buttonBase} ${buttonTones[tone]} ${className}`} />;
}

export function ButtonAnchor({
  tone = "solid",
  className = "",
  ...props
}: ComponentProps<"a"> & { tone?: ButtonTone }) {
  return <a {...props} className={`${buttonBase} ${buttonTones[tone]} ${className}`} />;
}

export function TextLink({
  className = "",
  children,
  ...props
}: ComponentProps<typeof Link>) {
  return (
    <Link
      {...props}
      className={`link-underline inline-flex items-center gap-2 text-[0.8125rem] font-semibold uppercase tracking-[0.14em] ${className}`}
    >
      {children}
      <ArrowRight className="h-3 w-3" />
    </Link>
  );
}

/* -------------------------------------------------------------------- icons */

export function ArrowRight({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <path
        d="M1 8h13M9.5 3.5 14 8l-4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.08-.3-.15-1.26-.47-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.38-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35Z" />
      <path d="M12.04 2C6.6 2 2.18 6.42 2.18 11.86c0 1.74.46 3.44 1.32 4.94L2 22l5.34-1.4a9.82 9.82 0 0 0 4.7 1.2h.01c5.43 0 9.85-4.42 9.85-9.86 0-2.63-1.02-5.11-2.88-6.97A9.79 9.79 0 0 0 12.04 2Zm0 17.96h-.01a8.2 8.2 0 0 1-4.16-1.14l-.3-.18-3.09.81.83-3.01-.2-.31a8.17 8.17 0 0 1-1.25-4.37c0-4.52 3.68-8.2 8.2-8.2 2.19 0 4.25.86 5.8 2.41a8.15 8.15 0 0 1 2.4 5.8c0 4.52-3.68 8.19-8.2 8.19Z" />
    </svg>
  );
}
