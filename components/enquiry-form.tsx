"use client";

import { useActionState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { submitEnquiry } from "@/app/actions/enquiry";
import { initialEnquiryState } from "@/lib/enquiry-state";
import type { Product } from "@/lib/types";

/**
 * The enquiry form. Reads ?piece=slug so that "Enquire about this piece" on a
 * product page arrives here with the piece already selected — done on the
 * client so the contact page itself stays static.
 */
export function EnquiryForm({ products }: { products: Pick<Product, "slug" | "name">[] }) {
  const [state, formAction, pending] = useActionState(submitEnquiry, initialEnquiryState);
  const searchParams = useSearchParams();
  const piece = searchParams.get("piece") ?? "";
  const successRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (state.status === "success") successRef.current?.focus();
  }, [state.status]);

  if (state.status === "success") {
    return (
      <div className="border border-stone bg-linen p-10 sm:p-14">
        <p
          ref={successRef}
          tabIndex={-1}
          className="font-display text-[1.75rem] leading-snug outline-none"
        >
          Thank you.
        </p>
        <p className="mt-4 max-w-[46ch] leading-relaxed text-graphite">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="flex flex-col gap-7">
      {/* honeypot — hidden from people, catches most bots */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-7 sm:grid-cols-2">
        <Field
          label="Your name"
          name="name"
          required
          defaultValue={state.values.name}
          error={state.errors.name}
          autoComplete="name"
        />
        <Field
          label="Email"
          name="email"
          type="email"
          required
          defaultValue={state.values.email}
          error={state.errors.email}
          autoComplete="email"
        />
      </div>

      <div className="grid gap-7 sm:grid-cols-2">
        <Field
          label="Phone or WhatsApp"
          name="phone"
          type="tel"
          optional
          defaultValue={state.values.phone}
          error={state.errors.phone}
          autoComplete="tel"
        />

        <div className="flex flex-col gap-2.5">
          <label htmlFor="piece" className="eyebrow">
            About a piece <span className="normal-case tracking-normal text-ash">(optional)</span>
          </label>
          <select
            id="piece"
            name="piece"
            defaultValue={piece || state.values.piece}
            className="w-full appearance-none rounded-none border-0 border-b border-stone bg-transparent py-3 pr-8 text-[1.0625rem] text-ink transition-colors focus:border-clay focus:outline-none"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1.5 6 6.5l5-5' stroke='%2357504a' stroke-width='1.4' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 2px center",
              backgroundSize: "12px 8px",
            }}
          >
            <option value="">General enquiry</option>
            {products.map((product) => (
              <option key={product.slug} value={product.slug}>
                {product.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <label htmlFor="message" className="eyebrow">
          Your message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          defaultValue={state.values.message}
          aria-invalid={Boolean(state.errors.message)}
          aria-describedby={state.errors.message ? "message-error" : undefined}
          placeholder="Tell us about the piece you have in mind, the room it is for, and roughly when you need it."
          className="w-full resize-y rounded-none border-0 border-b border-stone bg-transparent py-3 text-[1.0625rem] leading-relaxed text-ink transition-colors placeholder:text-ash focus:border-clay focus:outline-none"
        />
        {state.errors.message && (
          <p id="message-error" className="text-sm text-clay">
            {state.errors.message}
          </p>
        )}
      </div>

      {state.status === "error" && state.message && (
        <p role="alert" className="border-l-2 border-clay bg-linen py-3 pl-4 text-sm text-graphite">
          {state.message}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-6 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center rounded-full bg-ink px-9 py-4 text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-bone transition-colors duration-300 hover:bg-clay disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Sending…" : "Send enquiry"}
        </button>
        <p className="text-[0.8125rem] text-ash">You will hear back within two working days.</p>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  error,
  optional = false,
  type = "text",
  ...props
}: {
  label: string;
  name: string;
  error?: string;
  optional?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-2.5">
      <label htmlFor={name} className="eyebrow">
        {label}
        {optional && <span className="normal-case tracking-normal text-ash"> (optional)</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className="w-full rounded-none border-0 border-b border-stone bg-transparent py-3 text-[1.0625rem] text-ink transition-colors placeholder:text-ash focus:border-clay focus:outline-none"
        {...props}
      />
      {error && (
        <p id={`${name}-error`} className="text-sm text-clay">
          {error}
        </p>
      )}
    </div>
  );
}
