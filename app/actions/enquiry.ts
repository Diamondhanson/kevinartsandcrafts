"use server";

import { sendEnquiryEmail } from "@/lib/email";
import { insertInto } from "@/lib/supabase/rest";
import { emptyEnquiryValues, type EnquiryState } from "@/lib/enquiry-state";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function text(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

/**
 * Server Action for the enquiry form.
 *
 * With `useActionState` the previous state is the FIRST argument and the
 * FormData is the SECOND — that is the Next 16 / React 19 signature.
 *
 * Server Actions are reachable by a direct POST, not only through the form, so
 * everything is validated here rather than relying on the browser.
 */
export async function submitEnquiry(
  _prev: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  const values = {
    name: text(formData, "name"),
    email: text(formData, "email"),
    phone: text(formData, "phone"),
    piece: text(formData, "piece"),
    message: text(formData, "message"),
  };

  // Honeypot: a field hidden from people but filled in by most bots.
  if (text(formData, "company")) {
    return { status: "success", message: "Thank you — your message has been sent.", errors: {}, values: emptyEnquiryValues };
  }

  const errors: EnquiryState["errors"] = {};
  if (values.name.length < 2) errors.name = "Please tell us your name.";
  if (!EMAIL.test(values.email)) errors.email = "Please enter a valid email address.";
  if (values.phone && values.phone.replace(/\D/g, "").length < 6) {
    errors.phone = "That phone number looks too short.";
  }
  if (values.message.length < 10) {
    errors.message = "Please give us a little more detail — at least a sentence.";
  }
  if (values.message.length > 4000) {
    errors.message = "That message is too long. Please keep it under 4000 characters.";
  }

  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Please check the highlighted fields.", errors, values };
  }

  const enquiry = {
    name: values.name,
    email: values.email,
    phone: values.phone || undefined,
    piece: values.piece || undefined,
    message: values.message,
  };

  // Store first, so an enquiry is never lost if the mail provider is down.
  // Silently does nothing until Supabase is configured.
  await insertInto("enquiries", {
    name: enquiry.name,
    email: enquiry.email,
    phone: enquiry.phone ?? null,
    piece: enquiry.piece ?? null,
    message: enquiry.message,
    source: "website",
  });

  const sent = await sendEnquiryEmail(enquiry);

  if (!sent) {
    return {
      status: "error",
      message:
        "Something went wrong sending your message. Please try WhatsApp instead — it is the quickest way to reach us.",
      errors: {},
      values,
    };
  }

  return {
    status: "success",
    message: "Thank you — your message has been sent. You will hear back within two working days.",
    errors: {},
    values: emptyEnquiryValues,
  };
}
