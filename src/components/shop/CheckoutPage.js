import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useAsync from "../../hooks/useAsync";
import { shopAPI, money, mediaUrl } from "../../services/api";
import { getMember, signedIn } from "../../services/portalApi";
import { useCart } from "../../context/CartContext";
import Footer from "../home/footer";
import "../booking/booking.css";
import "./shop.css";

const FALLBACK = "/events/events1.png";

const BLANK = {
  name: "", email: "", phone: "", notes: "", website: "",
  fulfilment: "ship",
  address_line1: "", address_line2: "", city: "", region: "", postcode: "", country: "",
};

/**
 * Checkout.
 *
 * No payment step yet — Shane hasn't decided how money is taken, and the
 * retreat bookings work the same way. The order is recorded and we email
 * about payment. When that decision lands, the payment step slots in
 * between "place order" and the confirmation, and nothing else moves.
 */
export default function CheckoutPage() {
  const { lines, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const { data: info } = useAsync(() => shopAPI.info(), [], null);

  const [form, setForm] = useState(BLANK);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(null);

  /* If they're already signed in for a booking, don't ask again. */
  useEffect(() => {
    if (!signedIn()) return;
    const m = getMember();
    if (!m) return;
    setForm((f) => ({
      ...f,
      name: f.name || [m.firstName, m.lastName].filter(Boolean).join(" ") || f.name,
      email: f.email || m.email || "",
    }));
  }, []);

  const set = (k) => (e) => {
    const v = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [k]: v }));
    setError("");
  };

  const shipping = form.fulfilment === "ship" ? Number(info?.shippingFlatRate || 0) : 0;
  const total = subtotal + shipping;

  const submit = async (e) => {
    e.preventDefault();
    if (!lines.length) return;
    setSending(true);
    setError("");
    try {
      const res = await shopAPI.order({
        ...form,
        items: lines.map((l) => ({ variantId: l.variantId, quantity: l.quantity })),
      });
      clear();
      setDone(res);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  };

  /* ── After ── */
  if (done) {
    return (
      <>
        <div className="mk-page grain-bg-light">
          <div className="mk-wrap">
            <p className="mk-eyebrow">Order {done.reference}</p>
            <h1 className="mk-title">Thank you.</h1>
            <p className="mk-muted">
              We've emailed the details to you. We'll be in touch about payment and about
              getting this to you — reply to that email with anything you need to change.
            </p>
            <div className="mk-actions">
              <button className="mk-btn mk-btn--primary" onClick={() => navigate("/account")}>SEE MY ORDERS</button>
              <button className="mk-btn mk-btn--ghost" onClick={() => navigate("/shop")}>BACK TO THE SHOP</button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  /* ── Empty ── */
  if (!lines.length) {
    return (
      <>
        <div className="mk-page grain-bg-light">
          <div className="mk-wrap">
            <h1 className="mk-title">Your basket is empty.</h1>
            <p className="mk-muted">Nothing to check out just yet.</p>
            <div className="mk-actions">
              <button className="mk-btn mk-btn--primary" onClick={() => navigate("/shop")}>VISIT THE SHOP</button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="mk-page grain-bg-light">
        <div className="mk-wrap mk-wrap--wide">
          <p className="mk-eyebrow">Checkout</p>
          <h1 className="mk-title">Almost there.</h1>

          <div className="co-grid">
            {/* ── Details ── */}
            <form className="mk-card mk-form" onSubmit={submit}>
              <h2 className="mk-step-title">Where it's going</h2>

              <div className="mk-toggle">
                <button type="button" className={form.fulfilment === "ship" ? "is-on" : ""}
                  onClick={() => setForm((f) => ({ ...f, fulfilment: "ship" }))}>Ship it to me</button>
                <button type="button" className={form.fulfilment === "collect" ? "is-on" : ""}
                  onClick={() => setForm((f) => ({ ...f, fulfilment: "collect" }))}>I'll collect it</button>
              </div>

              {form.fulfilment === "collect" && info?.collectNote && (
                <p className="mk-muted mb-0">{info.collectNote}</p>
              )}

              <div className="mk-row">
                <label className="mk-field">
                  <span>Your name</span>
                  <input value={form.name} onChange={set("name")} required maxLength={150} autoComplete="name" />
                </label>
                <label className="mk-field">
                  <span>Phone <em>(optional)</em></span>
                  <input value={form.phone} onChange={set("phone")} maxLength={40} autoComplete="tel" />
                </label>
              </div>

              <label className="mk-field">
                <span>Email</span>
                <input type="email" value={form.email} onChange={set("email")} required maxLength={190} autoComplete="email" />
              </label>

              {form.fulfilment === "ship" && (
                <>
                  <label className="mk-field">
                    <span>Address</span>
                    <input value={form.address_line1} onChange={set("address_line1")} required
                      maxLength={200} autoComplete="address-line1" placeholder="Street and number" />
                  </label>
                  <label className="mk-field">
                    <span>Address line 2 <em>(optional)</em></span>
                    <input value={form.address_line2} onChange={set("address_line2")} maxLength={200} autoComplete="address-line2" />
                  </label>
                  <div className="mk-row">
                    <label className="mk-field">
                      <span>City</span>
                      <input value={form.city} onChange={set("city")} required maxLength={120} autoComplete="address-level2" />
                    </label>
                    <label className="mk-field">
                      <span>Region <em>(optional)</em></span>
                      <input value={form.region} onChange={set("region")} maxLength={120} autoComplete="address-level1" />
                    </label>
                  </div>
                  <div className="mk-row">
                    <label className="mk-field">
                      <span>Postcode <em>(optional)</em></span>
                      <input value={form.postcode} onChange={set("postcode")} maxLength={30} autoComplete="postal-code" />
                    </label>
                    <label className="mk-field">
                      <span>Country</span>
                      <input value={form.country} onChange={set("country")} required maxLength={120} autoComplete="country-name" />
                    </label>
                  </div>
                </>
              )}

              <label className="mk-field">
                <span>Anything we should know? <em>(optional)</em></span>
                <textarea rows={3} value={form.notes} onChange={set("notes")} maxLength={500} />
              </label>

              {/* Left empty by people, filled by bots. */}
              <input className="wk-hp" type="text" tabIndex={-1} autoComplete="off"
                aria-hidden="true" value={form.website} onChange={set("website")} />

              {error && <p className="mk-error">{error}</p>}

              <div className="mk-actions">
                <button type="submit" className="mk-btn mk-btn--primary" disabled={sending}>
                  {sending ? "PLACING…" : "PLACE ORDER"}
                </button>
              </div>
              <p className="mk-muted mb-0">
                No payment is taken here. We'll email you about paying once we've checked
                everything is in stock.
              </p>
            </form>

            {/* ── Summary ── */}
            <aside className="mk-card co-summary">
              <h2 className="mk-step-title">Your order</h2>

              <ul className="co-lines">
                {lines.map((l) => (
                  <li key={l.variantId}>
                    <img src={mediaUrl(l.image) || FALLBACK} alt="" />
                    <div>
                      <p className="co-line-name">{l.name}</p>
                      {(l.colour || l.size) && (
                        <p className="co-line-opt">{[l.colour, l.size].filter(Boolean).join(" · ")}</p>
                      )}
                      <p className="co-line-opt">×{l.quantity}</p>
                    </div>
                    <span className="co-line-total">{money(l.price * l.quantity)}</span>
                  </li>
                ))}
              </ul>

              <div className="mk-summary">
                <div className="mk-summary-row"><span>Subtotal</span><b>{money(subtotal)}</b></div>
                <div className="mk-summary-row">
                  <span>{form.fulfilment === "collect" ? "Collection" : "Shipping"}</span>
                  <b>{shipping > 0 ? money(shipping) : "Free"}</b>
                </div>
                <div className="mk-summary-row is-strong"><span>Total</span><b>{money(total)}</b></div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
