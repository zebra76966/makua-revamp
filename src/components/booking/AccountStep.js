import React, { useState } from "react";
import { accountAPI } from "../../services/portalApi";

/**
 * Sign in, or create an account, with a six-digit code sent by email.
 * There are no passwords anywhere in this flow.
 *
 * onDone(member) fires once the code has been accepted.
 */
const AccountStep = ({ onDone, intro = "First, let's set up your account. We'll email you a code — no password to remember." }) => {
  const [mode, setMode] = useState("start");      // start | code
  const [isNew, setIsNew] = useState(true);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "" });
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [note, setNote] = useState("");

  const set = (k) => (e) => { setForm((f) => ({ ...f, [k]: e.target.value })); setError(""); };

  const sendCode = async (e) => {
    e.preventDefault();
    setBusy(true); setError("");
    try {
      if (isNew) {
        await accountAPI.register({
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          email: form.email.trim(),
          phone: form.phone.trim() || undefined,
        });
      } else {
        await accountAPI.requestCode(form.email.trim());
      }
      setNote(`We've emailed a code to ${form.email.trim()}. It's good for the next 15 minutes.`);
      setMode("code");
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  };

  const verify = async (e) => {
    e.preventDefault();
    setBusy(true); setError("");
    try {
      const { member } = await accountAPI.verifyCode(form.email.trim(), code.trim());
      onDone?.(member);
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  };

  return (
    <div className="mk-card">
      <h2 className="mk-step-title">Your details</h2>
      <p className="mk-muted">{intro}</p>

      {mode === "start" ? (
        <form onSubmit={sendCode} className="mk-form">
          <div className="mk-toggle" role="tablist">
            <button type="button" role="tab" aria-selected={isNew} className={isNew ? "is-on" : ""} onClick={() => { setIsNew(true); setError(""); }}>
              I'm new here
            </button>
            <button type="button" role="tab" aria-selected={!isNew} className={!isNew ? "is-on" : ""} onClick={() => { setIsNew(false); setError(""); }}>
              I've booked before
            </button>
          </div>

          {isNew && (
            <div className="mk-row">
              <label className="mk-field">
                <span>First name</span>
                <input value={form.firstName} onChange={set("firstName")} required autoComplete="given-name" />
              </label>
              <label className="mk-field">
                <span>Last name</span>
                <input value={form.lastName} onChange={set("lastName")} autoComplete="family-name" />
              </label>
            </div>
          )}

          <label className="mk-field">
            <span>Email</span>
            <input type="email" value={form.email} onChange={set("email")} required autoComplete="email" />
          </label>

          {isNew && (
            <label className="mk-field">
              <span>Phone <em>optional</em></span>
              <input value={form.phone} onChange={set("phone")} autoComplete="tel" />
            </label>
          )}

          {error && <p className="mk-error">{error}</p>}

          <button className="mk-btn mk-btn--primary" disabled={busy}>
            {busy ? "Sending…" : "Email me a code"}
          </button>
        </form>
      ) : (
        <form onSubmit={verify} className="mk-form">
          <p className="mk-muted">{note}</p>
          <label className="mk-field">
            <span>Six-digit code</span>
            <input
              value={code}
              onChange={(e) => { setCode(e.target.value.replace(/\D/g, "").slice(0, 6)); setError(""); }}
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              required
              className="mk-code"
            />
          </label>

          {error && <p className="mk-error">{error}</p>}

          <button className="mk-btn mk-btn--primary" disabled={busy || code.length < 6}>
            {busy ? "Checking…" : "Continue"}
          </button>
          <button type="button" className="mk-btn mk-btn--ghost" onClick={() => { setMode("start"); setCode(""); }}>
            Use a different email
          </button>
        </form>
      )}
    </div>
  );
};

export default AccountStep;
