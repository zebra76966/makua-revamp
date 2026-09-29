/**
 * services/api.js — everything the website reads from, or sends to, the
 * Makua backend.
 *
 * The address comes from REACT_APP_API_URL at build time
 * (e.g. https://api.makuaretreats.com/api). In development it falls back
 * to the local backend.
 */
const BASE = (process.env.REACT_APP_API_URL || "http://localhost:5055/api").replace(/\/$/, "");

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

export const shortDate = (d) =>
  d ? new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "";

export const longDate = (d) =>
  d ? new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "";

/** "Nov 6 – 13, 2026" */
export const dateRange = (a, b) => {
  if (!a) return "";
  const s = new Date(a), e = b ? new Date(b) : null;
  const year = (e || s).getFullYear();
  if (!e) return `${shortDate(a)}, ${year}`;
  const sameMonth = s.getMonth() === e.getMonth();
  return `${shortDate(a)} – ${sameMonth ? e.getDate() : shortDate(b)}, ${year}`;
};

export const timeOfDay = (d) =>
  d ? new Date(d).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }) : "";
