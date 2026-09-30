import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { accountAPI, memberAPI, signedIn, signOut, getMember } from "../../services/portalApi";
import { money, longDate, dateRange } from "../../services/api";
import Footer from "../home/footer";
import "../booking/booking.css";
import "./account.css";

/* ══════════════════════════════════════════════════════════
   Signing in — the same six-digit code the booking flow uses,
   so someone who has booked before doesn't make a second
   account to look at the first one.
══════════════════════════════════════════════════════════ */
function SignIn({ onDone }) {
  const [stage, setStage] = useState("email");   // email | code
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [code, setCode] = useState("");
  const [needName, setNeedName] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const sendCode = async (e) => {
    e.preventDefault();
    setBusy(true); setError("");
    try {
      await accountAPI.requestCode(email.trim());
      setStage("code");
    } catch (err) {
      /* No account on that address yet — ask for a name and make one. */
      if (err.status === 404 || /not found|no account/i.test(err.message)) {
        setNeedName(true);
        setError("");
      } else {
        setError(err.message);
      }
    } finally { setBusy(false); }
  };

  const createAndSend = async (e) => {
    e.preventDefault();
    setBusy(true); setError("");
    try {
      await accountAPI.register({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
      });
      setNeedName(false);
      setStage("code");
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  };

  const verify = async (e) => {
    e.preventDefault();
    setBusy(true); setError("");
    try {
      await accountAPI.verifyCode(email.trim(), code.trim());
      onDone();
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  };

  return (
    <div className="mk-wrap">
      <p className="mk-eyebrow">Your account</p>
      <h1 className="mk-title">
        {stage === "code" ? "Check your email." : "Sign in with your email."}
      </h1>
      <p className="mk-muted mk-sub">
        {stage === "code"
          ? `We've sent a six-digit code to ${email}. It's good for ten minutes.`
          : "No password to remember — we'll email you a code. Use the same address you booked with and everything will be here."}
      </p>

      <div className="mk-card">
        {stage === "email" && !needName && (
          <form className="mk-form" onSubmit={sendCode}>
            <label className="mk-field">
              <span>Email</span>
              <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setError(""); }}
                required autoComplete="email" autoFocus />
            </label>
            {error && <p className="mk-error">{error}</p>}
            <div className="mk-actions">
              <button className="mk-btn mk-btn--primary" disabled={busy}>
                {busy ? "SENDING…" : "EMAIL ME A CODE"}
              </button>
            </div>
          </form>
        )}

        {needName && (
          <form className="mk-form" onSubmit={createAndSend}>
            <p className="mk-muted mb-0">
              We don't have an account for {email} yet. Tell us your name and we'll make one.
            </p>
            <div className="mk-row">
              <label className="mk-field">
                <span>First name</span>
                <input value={firstName} onChange={(e) => { setFirstName(e.target.value); setError(""); }}
                  required autoComplete="given-name" autoFocus />
              </label>
              <label className="mk-field">
                <span>Last name</span>
                <input value={lastName} onChange={(e) => { setLastName(e.target.value); setError(""); }}
                  required autoComplete="family-name" />
              </label>
            </div>
            {error && <p className="mk-error">{error}</p>}
            <div className="mk-actions">
              <button className="mk-btn mk-btn--primary" disabled={busy}>
                {busy ? "SENDING…" : "CREATE AND SEND CODE"}
              </button>
              <button type="button" className="mk-btn mk-btn--ghost"
                onClick={() => { setNeedName(false); setError(""); }}>USE ANOTHER EMAIL</button>
            </div>
          </form>
        )}

        {stage === "code" && (
          <form className="mk-form" onSubmit={verify}>
            <label className="mk-field">
              <span>Your code</span>
              <input className="mk-code" inputMode="numeric" maxLength={6} value={code}
                onChange={(e) => { setCode(e.target.value.replace(/\D/g, "")); setError(""); }}
                required autoFocus />
            </label>
            {error && <p className="mk-error">{error}</p>}
            <div className="mk-actions">
              <button className="mk-btn mk-btn--primary" disabled={busy || code.length < 6}>
                {busy ? "CHECKING…" : "SIGN IN"}
              </button>
              <button type="button" className="mk-btn mk-btn--ghost"
                onClick={() => { setStage("email"); setCode(""); setError(""); }}>
                USE ANOTHER EMAIL
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   Signed in
══════════════════════════════════════════════════════════ */
const STATUS_WORD = {
  confirmed: "Confirmed", pending: "Pending", cancelled: "Cancelled",
  waitlist: "Waiting list", new: "Received", paid: "Paid",
  packed: "Being packed", shipped: "Shipped", collected: "Collected",
};

function Section({ title, empty, children, count }) {
  return (
    <section className="acc-section">
      <h2 className="acc-section-title">
        {title}
        {count > 0 && <span className="acc-pill">{count}</span>}
      </h2>
      {count === 0 ? <p className="acc-empty">{empty}</p> : children}
    </section>
  );
}

export default function AccountPage() {
  const navigate = useNavigate();
  const [authed, setAuthed] = useState(signedIn());
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true); setError("");
    try {
      setData(await memberAPI.account());
    } catch (err) {
      if (err.status === 401) { setAuthed(false); return; }
      setError(err.message);
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { if (authed) load(); }, [authed, load]);

  const leave = () => { signOut(); setAuthed(false); setData(null); };

  if (!authed) {
    return (
      <>
        <div className="mk-page grain-bg-light">
          <SignIn onDone={() => setAuthed(true)} />
        </div>
        <Footer />
      </>
    );
  }

  const member = data?.member || getMember() || {};
  const bookings = data?.bookings || [];
  const workshops = data?.workshops || [];
  const orders = data?.orders || [];

  return (
    <>
      <div className="mk-page grain-bg-light">
        <div className="mk-wrap mk-wrap--wide">
          <div className="acc-head">
            <div>
              <p className="mk-eyebrow">Your account</p>
              <h1 className="mk-title">
                {member.firstName ? `Hello, ${member.firstName}.` : "Hello."}
              </h1>
              <p className="mk-muted mb-0">{member.email}</p>
            </div>
            <button className="mk-btn mk-btn--ghost" onClick={leave}>SIGN OUT</button>
          </div>

          {loading && <p className="mk-muted">Loading…</p>}
          {error && <p className="mk-error">{error}</p>}

          {!loading && !error && data && (
            <>
              <Section
                title="Retreats"
                count={bookings.length}
                empty="No retreat bookings yet."
              >
                <div className="acc-list">
                  {bookings.map((b) => (
                    <article className="acc-card" key={b.id}>
                      <div className="acc-card-main">
                        <p className="acc-when">{dateRange(b.startDate, b.endDate)}</p>
                        <h3 className="acc-name">{b.pathway || b.retreat}</h3>
                        <p className="acc-meta">
                          {[b.location, b.room, b.activity, b.diet].filter(Boolean).join(" · ")}
                          {b.nights ? ` · ${b.nights} nights` : ""}
                        </p>
                      </div>
                      <div className="acc-card-side">
                        <span className={`acc-status is-${b.status}`}>{STATUS_WORD[b.status] || b.status}</span>
                        <span className="acc-total">{money(b.total)}</span>
                      </div>
                    </article>
                  ))}
                </div>
              </Section>

              <Section
                title="Workshops"
                count={workshops.length}
                empty="No workshop sign-ups yet."
              >
                <div className="acc-list">
                  {workshops.map((w) => (
                    <article className="acc-card" key={w.id}>
                      <div className="acc-card-main">
                        <p className="acc-when">{longDate(w.startsAt)}</p>
                        <h3 className="acc-name">{w.title}</h3>
                        <p className="acc-meta">
                          {[w.location, w.places > 1 ? `${w.places} places` : null].filter(Boolean).join(" · ")}
                        </p>
                      </div>
                      <div className="acc-card-side">
                        <span className={`acc-status is-${w.status}`}>{STATUS_WORD[w.status] || w.status}</span>
                        <span className="acc-total">{w.price > 0 ? money(w.price) : "Free"}</span>
                      </div>
                    </article>
                  ))}
                </div>
              </Section>

              <Section
                title="Orders"
                count={orders.length}
                empty="No orders yet."
              >
                <div className="acc-list">
                  {orders.map((o) => (
                    <article className="acc-card acc-card--order" key={o.id}>
                      <div className="acc-card-main">
                        <p className="acc-when">{longDate(o.placedAt)} · {o.reference}</p>
                        <ul className="acc-items">
                          {o.items.map((it, i) => (
                            <li key={i}>
                              {it.quantity}× {it.name}
                              {(it.colour || it.size) && (
                                <span className="acc-items-opt"> — {[it.colour, it.size].filter(Boolean).join(" · ")}</span>
                              )}
                            </li>
                          ))}
                        </ul>
                        <p className="acc-meta">
                          {o.fulfilment === "collect" ? "Collecting" : "Shipping"}
                          {o.shipping > 0 ? ` · ${money(o.shipping)} shipping` : ""}
                        </p>
                      </div>
                      <div className="acc-card-side">
                        <span className={`acc-status is-${o.status}`}>{STATUS_WORD[o.status] || o.status}</span>
                        <span className="acc-total">{money(o.total)}</span>
                      </div>
                    </article>
                  ))}
                </div>
              </Section>

              {bookings.length === 0 && workshops.length === 0 && orders.length === 0 && (
                <div className="mk-actions">
                  <button className="mk-btn mk-btn--primary" onClick={() => navigate("/retreats")}>SEE THE RETREATS</button>
                  <button className="mk-btn mk-btn--ghost" onClick={() => navigate("/shop")}>VISIT THE SHOP</button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
