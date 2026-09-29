/**
 * services/portalApi.js — the signed-in part: accounts and bookings.
 *
 * Accounts are the same ones the Forge codebase uses: no password, just
 * a six-digit code emailed to you. The token lives in localStorage under
 * `makua_token` and is sent as a Bearer token.
 */
const BASE = (process.env.REACT_APP_API_URL || "http://localhost:5055/api").replace(/\/$/, "");
const TOKEN_KEY = "makua_token";
const MEMBER_KEY = "makua_member";

export const getToken = () => {
  try { return localStorage.getItem(TOKEN_KEY); } catch (_) { return null; }
};
export const getMember = () => {
  try { return JSON.parse(localStorage.getItem(MEMBER_KEY) || "null"); } catch (_) { return null; }
};
export const signedIn = () => !!getToken();
export const signOut = () => {
  try { localStorage.removeItem(TOKEN_KEY); localStorage.removeItem(MEMBER_KEY); } catch (_) {}
};
const remember = (token, member) => {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    if (member) localStorage.setItem(MEMBER_KEY, JSON.stringify(member));
  } catch (_) {}
};

async function request(path, { method = "GET", body } = {}) {
  const token = getToken();
  const res = await fetch(`${BASE}/portal${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  let payload = null;
  try { payload = await res.json(); } catch (_) {}

  if (res.status === 401) {
    signOut();
    const err = new Error(payload?.message || "Please sign in again.");
    err.status = 401;
    throw err;
  }
  if (!res.ok || payload?.success === false) {
    const err = new Error(payload?.message || "Something went wrong. Please try again.");
    err.status = res.status;
    throw err;
  }
  return payload?.data ?? {};
}

export const accountAPI = {
  /** New account: name + email, then a code by email. */
  register: (payload) => request("/auth/register", { method: "POST", body: payload }),
  /** Existing account: send me a code. */
  requestCode: (email) => request("/auth/request-otp", { method: "POST", body: { email } }),
  /** Finish either of the above. */
  verifyCode: async (email, otp) => {
    const data = await request("/auth/verify-otp", { method: "POST", body: { email, otp } });
    remember(data.token, data.member);
    return data;
  },
};

export const bookingAPI = {
  options: () => request("/booking/options"),
  mine: () => request("/booking"),
  create: (payload) => request("/booking", { method: "POST", body: payload }),
  update: (payload) => request("/booking", { method: "PATCH", body: payload }),
};
