/**
 * A tiny Supabase client built on plain `fetch`.
 *
 * Why not `@supabase/supabase-js`? So that this project has ZERO extra
 * dependencies and `npm run dev` works the moment you clone it. Supabase
 * exposes every table over a REST API (PostgREST), which is all this site
 * needs — it only ever reads the catalogue and inserts enquiries.
 *
 * If you later want the official SDK (for auth, realtime or storage), install
 * it and rewrite the two functions below. Nothing else in the codebase talks
 * to Supabase directly.
 */

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** True once both environment variables are present in .env.local */
export const supabaseConfigured = Boolean(url && anonKey);

function headers(extra: Record<string, string> = {}) {
  return {
    apikey: anonKey as string,
    Authorization: `Bearer ${anonKey}`,
    "Content-Type": "application/json",
    ...extra,
  };
}

/**
 * SELECT. `query` is a PostgREST query string, e.g.
 *   selectFrom("products", "select=*,product_images(*)&order=sort_order")
 */
export async function selectFrom<T>(
  table: string,
  query: string,
  { revalidate = 300 }: { revalidate?: number } = {},
): Promise<T[] | null> {
  if (!supabaseConfigured) return null;

  try {
    const res = await fetch(`${url}/rest/v1/${table}?${query}`, {
      headers: headers(),
      next: { revalidate, tags: [`supabase:${table}`] },
    });

    if (!res.ok) {
      console.error(`[supabase] ${table} responded ${res.status}: ${await res.text()}`);
      return null;
    }

    return (await res.json()) as T[];
  } catch (error) {
    console.error(`[supabase] could not reach the database for "${table}":`, error);
    return null;
  }
}

/** INSERT. Returns true on success. Used by the enquiry form. */
export async function insertInto(table: string, row: Record<string, unknown>): Promise<boolean> {
  if (!supabaseConfigured) return false;

  try {
    const res = await fetch(`${url}/rest/v1/${table}`, {
      method: "POST",
      headers: headers({ Prefer: "return=minimal" }),
      body: JSON.stringify(row),
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(`[supabase] insert into ${table} failed ${res.status}: ${await res.text()}`);
      return false;
    }

    return true;
  } catch (error) {
    console.error(`[supabase] could not insert into "${table}":`, error);
    return false;
  }
}
