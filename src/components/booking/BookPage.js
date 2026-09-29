import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import useAsync from "../../hooks/useAsync";
import { retreatsAPI, money, dateRange } from "../../services/api";
import { bookingAPI, signedIn, getMember, signOut } from "../../services/portalApi";
import AccountStep from "./AccountStep";
import Footer from "../home/footer";
import "./booking.css";

/**
 * Reserve a place on one retreat.
 *
 * Account → room → activity → food → confirm. No money is taken here:
 * the team follows up about payment, the same as Forge.
 */
const BookPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [authed, setAuthed] = useState(signedIn());
  const [step, setStep] = useState(0);            // 0 account · 1 room · 2 activity · 3 food · 4 confirm
  const [choice, setChoice] = useState({ roomId: null, activityId: null, dietId: null, dietNotes: "" });
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [done, setDone] = useState(null);

  const { data: retreat, loading: loadingRetreat, error: retreatError } = useAsync(() => retreatsAPI.get(slug), [slug]);
  const { data: options, loading: loadingOptions, error: optionsError, reload: reloadOptions } =
    useAsync(() => (authed ? bookingAPI.options() : Promise.resolve(null)), [authed, slug]);

  /* The retreat block that holds this pathway, as the booking API sees it. */
  const match = useMemo(() => {
    if (!options?.blocks || !retreat) return null;
    for (const block of options.blocks) {
      const pathway = (block.pathways || []).find((p) => p.id === retreat.id || p.slug === retreat.slug);
      if (pathway) return { block, pathway };
    }
    return null;
  }, [options, retreat]);

  const rooms = match?.block?.room_types || [];
  const activities = match?.block?.activities || [];
  const diets = options?.diets || [];
  const nights = retreat?.nights || 0;
  const room = rooms.find((r) => r.id === choice.roomId) || null;
  const total = (retreat?.price || 0) + (room ? Number(room.nightly_rate) * nights : 0);

  const goNext = () => setStep((s) => Math.min(4, s + 1));
  const goBack = () => setStep((s) => Math.max(authed ? 1 : 0, s - 1));

  const confirm = async () => {
    setSaving(true); setSaveError("");
    try {
      const booking = await bookingAPI.create({
        retreat_block_id: match.block.id,
        pathway_id: match.pathway.id,
        room_type_id: choice.roomId || undefined,
        block_activity_id: choice.activityId || undefined,
        diet_option_id: choice.dietId || undefined,
        diet_notes: choice.dietNotes.trim() || undefined,
      });
      setDone(booking);
    } catch (err) {
      setSaveError(err.message);
      reloadOptions();          // something may have filled up while they decided
    } finally { setSaving(false); }
  };

  /* ── States before the form proper ─────────────────────── */
  if (loadingRetreat) return <Shell><p className="mk-muted">Loading…</p></Shell>;

  if (retreatError || !retreat) {
    return (
      <Shell>
        <h1 className="mk-title">We couldn't find that retreat</h1>
        <button className="mk-btn mk-btn--primary" onClick={() => navigate("/retreats")}>See all retreats</button>
      </Shell>
    );
  }

  if (done) {
    return (
      <Shell>
        <p className="mk-eyebrow">You're booked</p>
        <h1 className="mk-title">See you at {retreat.title}</h1>
        <p className="mk-muted">
          {dateRange(retreat.startDate, retreat.endDate)} · {nights} nights{retreat.location ? ` · ${retreat.location}` : ""}
        </p>
        <div className="mk-card mk-summary">
          <Row label="Retreat" value={retreat.title} />
          {room && <Row label="Room" value={room.name} />}
          <Row label="Total" value={money(done.total ?? total)} />
          <p className="mk-muted mt-3">
            We've emailed you a confirmation. No payment is taken here — someone from the team will be in touch
            about payment and everything you need before you travel.
          </p>
        </div>
        <button className="mk-btn mk-btn--ghost" onClick={() => navigate("/retreats")}>Back to retreats</button>
      </Shell>
    );
  }

  if (retreat.soldOut) {
    return (
      <Shell>
        <h1 className="mk-title">{retreat.title} is fully booked</h1>
        <p className="mk-muted">Write to us and we'll let you know the moment a place opens up, or when the next dates go live.</p>
        <button className="mk-btn mk-btn--primary" onClick={() => navigate("/contact")}>Get in touch</button>
      </Shell>
    );
  }

  /* ── Already have a booking ─────────────────────────────── */
  if (options && options.reason === "already_booked" && options.booking) {
    const b = options.booking;
    return (
      <Shell>
        <p className="mk-eyebrow">You're already booked</p>
        <h1 className="mk-title">{b.pathway_name || b.block_name}</h1>
        <div className="mk-card mk-summary">
          <Row label="Retreat" value={b.block_name} />
          {b.pathway_name && <Row label="Pathway" value={b.pathway_name} />}
          {b.room_type_name && <Row label="Room" value={b.room_type_name} />}
          <Row label="Total" value={money(b.total)} />
          <p className="mk-muted mt-3">To change anything, reply to your confirmation email and we'll sort it out.</p>
        </div>
        <button className="mk-btn mk-btn--ghost" onClick={() => navigate("/retreats")}>Back to retreats</button>
      </Shell>
    );
  }

  return (
    <Shell wide>
      <p className="mk-eyebrow">Reserve your place</p>
      <h1 className="mk-title">{retreat.title}</h1>
      <p className="mk-muted mk-sub">
        {dateRange(retreat.startDate, retreat.endDate)} · {nights} nights · {money(retreat.price)} per person
        {retreat.placesLeft <= 5 ? ` · ${retreat.placesLeft} left` : ""}
      </p>

      <ol className="mk-steps" aria-label="Booking steps">
        {["Your details", "Room", "Activity", "Food", "Confirm"].map((label, i) => (
          <li key={label} className={i === step ? "is-now" : i < step ? "is-done" : ""}>
            <span>{i + 1}</span> {label}
          </li>
        ))}
      </ol>

      {/* 0 — account */}
      {step === 0 && !authed && (
        <AccountStep onDone={() => { setAuthed(true); setStep(1); }} />
      )}
      {step === 0 && authed && (
        <div className="mk-card">
          <h2 className="mk-step-title">Your details</h2>
          <p className="mk-muted">
            Signed in as <b>{getMember()?.email || "your account"}</b>.
          </p>
          <div className="mk-actions">
            <button className="mk-btn mk-btn--primary" onClick={() => setStep(1)}>Continue</button>
            <button className="mk-btn mk-btn--ghost" onClick={() => { signOut(); setAuthed(false); }}>Use another account</button>
          </div>
        </div>
      )}

      {/* everything past the account needs the booking options */}
      {step > 0 && loadingOptions && <div className="mk-card"><p className="mk-muted">Checking what's still available…</p></div>}

      {step > 0 && !loadingOptions && (optionsError || !match) && (
        <div className="mk-card">
          <h2 className="mk-step-title">This retreat isn't open for booking</h2>
          <p className="mk-muted">
            {optionsError ? optionsError.message : "It may have just filled up, or the dates may have closed."}
          </p>
          <div className="mk-actions">
            <button className="mk-btn mk-btn--primary" onClick={reloadOptions}>Try again</button>
            <button className="mk-btn mk-btn--ghost" onClick={() => navigate("/contact")}>Ask us about it</button>
          </div>
        </div>
      )}

      {step > 0 && !loadingOptions && match && (
        <>
          {/* 1 — room */}
          {step === 1 && (
            <div className="mk-card">
              <h2 className="mk-step-title">Where you'll stay</h2>
              {rooms.length === 0 ? (
                <>
                  <p className="mk-muted">Rooms are allocated by the team for this retreat, so there's nothing to choose here.</p>
                  <div className="mk-actions"><button className="mk-btn mk-btn--primary" onClick={goNext}>Continue</button></div>
                </>
              ) : (
                <>
                  <p className="mk-muted">Room prices are per night, on top of the retreat price.</p>
                  <div className="mk-options">
                    {rooms.map((r) => (
                      <button
                        key={r.id}
                        type="button"
                        className={`mk-option ${choice.roomId === r.id ? "is-picked" : ""}`}
                        disabled={r.remaining <= 0}
                        onClick={() => setChoice((c) => ({ ...c, roomId: r.id }))}
                      >
                        <span className="mk-option-name">{r.name}</span>
                        {r.description && <span className="mk-option-desc">{r.description}</span>}
                        <span className="mk-option-meta">
                          {Number(r.nightly_rate) === 0 ? "Included" : `${money(r.nightly_rate)} / night · ${money(Number(r.nightly_rate) * nights)} total`}
                          {r.remaining <= 0 ? " · full" : r.remaining <= 3 ? ` · ${r.remaining} left` : ""}
                        </span>
                      </button>
                    ))}
                  </div>
                  <div className="mk-actions">
                    <button className="mk-btn mk-btn--primary" disabled={!choice.roomId} onClick={goNext}>Continue</button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* 2 — activity */}
          {step === 2 && (
            <div className="mk-card">
              <h2 className="mk-step-title">One activity is included</h2>
              {activities.length === 0 ? (
                <>
                  <p className="mk-muted">No activities are open for these dates yet. We'll tell you nearer the time.</p>
                  <div className="mk-actions">
                    <button className="mk-btn mk-btn--ghost" onClick={goBack}>Back</button>
                    <button className="mk-btn mk-btn--primary" onClick={goNext}>Continue</button>
                  </div>
                </>
              ) : (
                <>
                  <p className="mk-muted">Places are limited. You can also decide later.</p>
                  <div className="mk-options">
                    {activities.map((a) => (
                      <button
                        key={a.id}
                        type="button"
                        className={`mk-option ${choice.activityId === a.id ? "is-picked" : ""}`}
                        disabled={a.remaining <= 0}
                        onClick={() => setChoice((c) => ({ ...c, activityId: a.id }))}
                      >
                        <span className="mk-option-name">{a.name}</span>
                        {a.description && <span className="mk-option-desc">{a.description}</span>}
                        <span className="mk-option-meta">
                          {a.remaining <= 0 ? "Full" : `${a.remaining} places left`}
                        </span>
                      </button>
                    ))}
                    <button
                      type="button"
                      className={`mk-option ${choice.activityId === null ? "is-picked" : ""}`}
                      onClick={() => setChoice((c) => ({ ...c, activityId: null }))}
                    >
                      <span className="mk-option-name">I'll decide later</span>
                      <span className="mk-option-meta">You can pick any time before you arrive</span>
                    </button>
                  </div>
                  <div className="mk-actions">
                    <button className="mk-btn mk-btn--ghost" onClick={goBack}>Back</button>
                    <button className="mk-btn mk-btn--primary" onClick={goNext}>Continue</button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* 3 — food */}
          {step === 3 && (
            <div className="mk-card">
              <h2 className="mk-step-title">Food</h2>
              <p className="mk-muted">All meals are prepared on site. Tell us how you eat, and anything we must know about.</p>
              <div className="mk-options mk-options--tight">
                {diets.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    className={`mk-option ${choice.dietId === d.id ? "is-picked" : ""}`}
                    onClick={() => setChoice((c) => ({ ...c, dietId: d.id }))}
                  >
                    <span className="mk-option-name">{d.name}</span>
                  </button>
                ))}
              </div>
              <label className="mk-field mt-3">
                <span>Allergies or anything else <em>optional</em></span>
                <textarea
                  rows={3}
                  value={choice.dietNotes}
                  onChange={(e) => setChoice((c) => ({ ...c, dietNotes: e.target.value.slice(0, 500) }))}
                  placeholder="Severe nut allergy, no shellfish…"
                />
              </label>
              <div className="mk-actions">
                <button className="mk-btn mk-btn--ghost" onClick={goBack}>Back</button>
                <button className="mk-btn mk-btn--primary" onClick={goNext}>Continue</button>
              </div>
            </div>
          )}

          {/* 4 — confirm */}
          {step === 4 && (
            <div className="mk-card">
              <h2 className="mk-step-title">Check and confirm</h2>
              <div className="mk-summary">
                <Row label="Retreat" value={`${retreat.title} · ${dateRange(retreat.startDate, retreat.endDate)}`} />
                <Row label="Per person" value={money(retreat.price)} />
                {room && <Row label={`Room · ${nights} nights`} value={Number(room.nightly_rate) === 0 ? "Included" : money(Number(room.nightly_rate) * nights)} />}
                {choice.activityId && <Row label="Activity" value={activities.find((a) => a.id === choice.activityId)?.name || "—"} />}
                {choice.dietId && <Row label="Food" value={diets.find((d) => d.id === choice.dietId)?.name || "—"} />}
                <Row label="Total" value={money(total)} strong />
              </div>

              <p className="mk-muted mt-3">
                No payment is taken now. We'll confirm your place by email and be in touch about payment.
              </p>

              {saveError && <p className="mk-error">{saveError}</p>}

              <div className="mk-actions">
                <button className="mk-btn mk-btn--ghost" onClick={goBack} disabled={saving}>Back</button>
                <button className="mk-btn mk-btn--primary" onClick={confirm} disabled={saving}>
                  {saving ? "Confirming…" : "Confirm my place"}
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </Shell>
  );
};

const Row = ({ label, value, strong }) => (
  <div className={`mk-summary-row ${strong ? "is-strong" : ""}`}>
    <span>{label}</span>
    <b>{value}</b>
  </div>
);

const Shell = ({ children, wide }) => (
  <>
    <div className="mk-page grain-bg-light">
      <div className={`mk-wrap ${wide ? "mk-wrap--wide" : ""}`}>{children}</div>
    </div>
    <Footer />
  </>
);

export default BookPage;
