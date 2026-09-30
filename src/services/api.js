/**
 * services/api.js — everything the website reads from, or sends to, the
 * Makua backend.
 *
 * The address comes from REACT_APP_API_URL at build time
 * (e.g. https://api.makuaretreats.com/api). In development it falls back
 * to the local backend.
 */
const BASE = (process.env.REACT_APP_API_URL || "http://localhost:5055/api").replace(/\/$/, "");

/** Where the API lives, without the trailing /api — uploads are served there. */
const API_ORIGIN = BASE.replace(/\/api\/?$/, "");
/**
 * A stored image path turned into something a browser can actually load.
 *
 * Uploaded pictures are written by the backend and served from its own
 * host (/uploads/...). The website and the admin panel are on different
 * hostnames, so a bare "/uploads/media/x.png" would resolve against THEM
 * and 404. Files that ship with the website stay relative, because those
 * really are served from the site itself.
 */
export const mediaUrl = (p) => {
  if (!p) return "";
  if (/^(https?:)?\/\//i.test(p) || p.startsWith("data:")) return p;
  if (p.startsWith("/uploads/")) return `${API_ORIGIN}${p}`;
  return p;
};


async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });

  let body = null;
  try { body = await res.json(); } catch (_) { /* empty or not JSON */ }

  if (!res.ok || body?.success === false) {
    const err = new Error(body?.message || "Something went wrong. Please try again.");
    err.status = res.status;
    throw err;
  }
  return body?.data ?? {};
}

/* ── What's on sale ─────────────────────────────────────── */
export const retreatsAPI = {
  list: () => request("/public/retreats").then((d) => d.retreats || []),
  get: (slug) => request(`/public/retreats/${encodeURIComponent(slug)}`).then((d) => d.retreat),
};

/* ── The site's own chrome: name, contact, socials, legal ─ */
export const siteAPI = {
  get: () => request("/public/site"),
};

/* ── Workshops and one-off events ───────────────────────── */
export const workshopsAPI = {
  list: ({ from, to } = {}) => {
    const q = new URLSearchParams();
    if (from) q.set("from", from);
    if (to) q.set("to", to);
    const qs = q.toString();
    return request(`/public/workshops${qs ? `?${qs}` : ""}`).then((d) => d.workshops || []);
  },
  signup: (id, payload) =>
    request(`/public/workshops/${id}/signup`, { method: "POST", body: JSON.stringify(payload) }),
};

/* ── Forms ──────────────────────────────────────────────── */
export const formsAPI = {
  enquiry: (payload) => request("/public/enquiries", { method: "POST", body: JSON.stringify(payload) }),
  subscribe: (email, source) =>
    request("/public/subscribe", { method: "POST", body: JSON.stringify({ email, source }) }),
};

/* ── Formatting used across the site ────────────────────── */
export const money = (n) =>
  Number(n || 0).toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

/**
 * Dates arrive as wall-clock strings with no timezone on them —
 * "2026-11-06" or "2026-10-02 19:00:00" — because a retreat that starts
 * on the 6th starts on the 6th wherever you're reading this from.
 *
 * `new Date("2026-11-06")` would read that as UTC midnight and show
 * 5 November to anyone in the Americas, so the pieces are handed to the
 * Date constructor separately, which builds it in local time.
 */
export const parseDate = (v) => {
  if (!v) return null;
  if (v instanceof Date) return v;
  const m = String(v).match(/^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2})(?::(\d{2}))?)?/);
  if (!m) return new Date(v);
  const [, y, mo, d, hh = 0, mi = 0, ss = 0] = m;
  return new Date(+y, +mo - 1, +d, +hh, +mi, +ss);
};

export const shortDate = (d) =>
  d ? parseDate(d).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "";

export const longDate = (d) =>
  d ? parseDate(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "";

/** "Nov 6 – 13, 2026" */
export const dateRange = (a, b) => {
  if (!a) return "";
  const s = parseDate(a), e = b ? parseDate(b) : null;
  const year = (e || s).getFullYear();
  if (!e) return `${shortDate(a)}, ${year}`;
  const sameMonth = s.getMonth() === e.getMonth();
  return `${shortDate(a)} – ${sameMonth ? e.getDate() : shortDate(b)}, ${year}`;
};

export const timeOfDay = (d) =>
  d ? parseDate(d).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }) : "";
