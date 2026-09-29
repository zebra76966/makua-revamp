import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

import { workshopsAPI, money } from "../../../services/api";
import { whenLabel, placesLabel } from "./useWorkshops";
import "../../booking/booking.css";
import "./workshops.css";

const EMPTY = { name: "", email: "", phone: "", places: 1, notes: "", website: "" };

/**
 * Sign-up form for one workshop.
 *
 * The backend decides whether a sign-up is confirmed or waitlisted — it
 * holds a row lock while it counts, so two people clicking at once can't
 * both take the last place. This form just reports back what it was told.
 */
export default function WorkshopSignupModal({ workshop, onClose, onDone }) {
  const [form, setForm] = useState(EMPTY);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  /* A fresh form each time a different workshop is opened. */
  useEffect(() => {
    if (workshop) { setForm(EMPTY); setError(null); setResult(null); }
  }, [workshop]);

  if (!workshop) return null;

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const maxPlaces = workshop.placesLeft === null ? 10 : Math.max(1, Math.min(10, workshop.placesLeft));

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    try {
      const res = await workshopsAPI.signup(workshop.id, {
        ...form,
        places: Number(form.places) || 1,
      });
      setResult(res.status || "confirmed");
      onDone?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  };

  const total = workshop.free ? null : Number(workshop.price) * (Number(form.places) || 1);

  return (
    <Modal show centered onHide={onClose} contentClassName="wk-modal">
      <Modal.Body className="p-0">
        <div className="wk-modal-head">
          <p className="mk-eyebrow mb-1">{workshop.kind === "event" ? "Event" : "Workshop"}</p>
          <h3 className="mk-title wk-modal-title">{workshop.title}</h3>
          <p className="wk-modal-when mb-0">
            {whenLabel(workshop)}
            {workshop.location ? ` · ${workshop.location}` : ""}
          </p>
        </div>

        <div className="wk-modal-body">
          {result ? (
            <>
              <h4 className="mk-step-title">
                {result === "confirmed" ? "You're in." : "You're on the waiting list."}
              </h4>
              <p className="mk-muted">
                {result === "confirmed"
                  ? `We've emailed the details to ${form.email}. If you can't make it after all, just reply to that email.`
                  : `${workshop.title} is full, so we've put you on the list and we'll email ${form.email} the moment a place opens up.`}
              </p>
              {result === "confirmed" && !workshop.free && (
                <p className="mk-muted">
                  Payment of <b>{money(total)}</b> is taken on the day, in person.
                </p>
              )}
              <div className="mk-actions">
                <button type="button" className="mk-btn mk-btn--primary" onClick={onClose}>DONE</button>
              </div>
            </>
          ) : (
            <form className="mk-form" onSubmit={submit}>
              {workshop.description && <p className="mk-muted">{workshop.description}</p>}

              <div className="wk-modal-facts">
                <span>{workshop.free ? "Free" : `${money(workshop.price)} per person`}</span>
                {placesLabel(workshop) && <span>{placesLabel(workshop)}</span>}
              </div>

              {workshop.full && (
                <p className="mk-muted mb-0">
                  This one is full. Leave your details and we'll be in touch if a place opens up.
                </p>
              )}

              <div className="mk-row">
                <label className="mk-field">
                  <span>Your name</span>
                  <input value={form.name} onChange={set("name")} required maxLength={150} autoComplete="name" />
                </label>
                <label className="mk-field">
                  <span>Email</span>
                  <input type="email" value={form.email} onChange={set("email")} required maxLength={190} autoComplete="email" />
                </label>
              </div>

              <div className="mk-row">
                <label className="mk-field">
                  <span>Phone <em>(optional)</em></span>
                  <input value={form.phone} onChange={set("phone")} maxLength={40} autoComplete="tel" />
                </label>
                <label className="mk-field">
                  <span>How many of you?</span>
                  <input type="number" min={1} max={maxPlaces} value={form.places} onChange={set("places")} />
                </label>
              </div>

              <label className="mk-field">
                <span>Anything we should know? <em>(optional)</em></span>
                <textarea rows={3} value={form.notes} onChange={set("notes")} maxLength={500} />
              </label>

              {/* Left empty by people, filled by bots — the backend drops those. */}
              <input
                className="wk-hp"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={form.website}
                onChange={set("website")}
              />

              {!workshop.free && (
                <p className="mk-muted mb-0">
                  Total <b>{money(total)}</b> — paid on the day, in person.
                </p>
              )}

              {error && <p className="mk-error">{error}</p>}

              <div className="mk-actions">
                <button type="submit" className="mk-btn mk-btn--primary" disabled={sending}>
                  {sending ? "SENDING…" : workshop.full ? "JOIN THE WAITING LIST" : "CONFIRM MY PLACE"}
                </button>
                <button type="button" className="mk-btn mk-btn--ghost" onClick={onClose} disabled={sending}>
                  CANCEL
                </button>
              </div>
            </form>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}
