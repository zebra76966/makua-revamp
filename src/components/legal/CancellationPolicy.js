import React from "react";
import LegalPage from "./LegalPage";

/**
 * DRAFT — the numbers here are the industry-standard shape for a retreat
 * of this kind, not a decision. Shane needs to set the actual deposit and
 * the actual windows, and they must match whatever the payment flow ends
 * up doing. Everything Shane must decide is in square brackets.
 */
const SECTIONS = [
  {
    heading: "If you cancel a retreat",
    body: [
      "[Shane to confirm these windows and amounts. What follows is a common arrangement, offered as a starting point.]",
      "- More than 60 days before the retreat starts: everything you have paid refunded, less the deposit",
      "- 30 to 60 days before: half of what you have paid refunded",
      "- Less than 30 days before: no refund, but you may transfer your place",
      "The deposit covers the costs we commit to as soon as we hold a place for you — facilitators, food and the room — and is not refundable.",
    ],
  },
  {
    heading: "Moving to another date",
    body: [
      "Up to 30 days before your retreat you can move to another date within the following twelve months, once, at no charge. If the new retreat costs more, you pay the difference.",
      "Inside 30 days a transfer depends on whether we can fill your place. Ask us — we would rather find a way than keep your money.",
    ],
  },
  {
    heading: "Giving your place to someone else",
    body: [
      "You can pass your place to someone else at any point up to 14 days before, as long as they complete the same health screening and we are satisfied it is safe for them to take part.",
    ],
  },
  {
    heading: "If we decline your booking on health grounds",
    body: [
      "If our facilitators conclude that taking part would not be safe for you, and you told us about your health honestly when we asked, we refund everything you have paid us — including the deposit.",
      "If that conclusion is reached because something was not disclosed, the ordinary cancellation terms apply.",
    ],
  },
  {
    heading: "If we cancel",
    body: [
      "You choose: a full refund of everything you have paid us, or a transfer to another date.",
      "We cannot refund flights, accommodation or other travel you have arranged yourself. That is what travel insurance is for, and we ask every guest to have it.",
    ],
  },
  {
    heading: "Workshops and events",
    body: [
      "Free workshops: just let us know you can't make it, so we can offer your place to someone on the waiting list.",
      "Paid workshops: refunded in full if you cancel more than 7 days before, not refunded inside 7 days, though you can send someone else in your place.",
    ],
  },
  {
    heading: "How to cancel",
    body: [
      "Email {email} with your name and which retreat or workshop you booked. We will confirm in writing, and any refund goes back the way you paid within 14 days of that confirmation.",
    ],
  },
];

export default function CancellationPolicy() {
  return (
    <LegalPage
      title="Cancellations &amp; Refunds"
      updated="September 2026"
      intro="Plans change. This is what happens to your money when they do — for you and for us."
      sections={SECTIONS}
    />
  );
}
