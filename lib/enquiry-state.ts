/**
 * Shared shape for the enquiry form's state.
 *
 * This deliberately lives OUTSIDE app/actions/enquiry.ts: a file marked
 * "use server" may only export async functions, so exporting a plain object
 * from there silently arrives as `undefined` on the client and the form
 * crashes on first render.
 */

export type EnquiryState = {
  status: "idle" | "success" | "error";
  message: string;
  errors: Partial<Record<"name" | "email" | "phone" | "message", string>>;
  /** Echoed back so the form can repopulate itself after a failed submit. */
  values: { name: string; email: string; phone: string; piece: string; message: string };
};

export const emptyEnquiryValues: EnquiryState["values"] = {
  name: "",
  email: "",
  phone: "",
  piece: "",
  message: "",
};

export const initialEnquiryState: EnquiryState = {
  status: "idle",
  message: "",
  errors: {},
  values: emptyEnquiryValues,
};
