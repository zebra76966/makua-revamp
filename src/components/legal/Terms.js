import React from "react";
import LegalPage from "./LegalPage";

/**
 * DRAFT — needs a lawyer's eyes before launch, more than the other two.
 * A retreat holding plant-medicine ceremonies carries real liability, and
 * the wording here is a sensible starting point rather than advice.
 *
 * The square-bracketed items are decisions only Shane can make.
 */
const SECTIONS = [
  {
    heading: "Booking a place",
    body: [
      "A booking is confirmed when we send you a confirmation email, not when you submit the form. Until then the place is not held.",
      "Places are limited and allocated in the order bookings are confirmed. If a retreat fills while you are booking, we will tell you and offer you the waiting list or another date.",
      "You must be 18 or over to book.",
    ],
  },
  {
    heading: "Paying",
    body: [
      "Prices are shown in US dollars per person and include what is listed on the retreat page. Rooms above the shared option carry a per-night supplement, shown before you confirm.",
      "[Shane to confirm: deposit amount, when the balance is due, and whether payment is taken online or on arrival. This paragraph is a placeholder until that is decided.]",
      "Travel to and from Colombia, visas, insurance and anything not listed as included are yours to arrange and pay for.",
    ],
  },
  {
    heading: "Your health, and being honest with us",
    body: [
      "Our ceremonies are not suitable for everyone. Some medications — including many antidepressants — and some heart, liver and psychiatric conditions do not combine safely with the plants we work with.",
      "Before your retreat we will ask you about your health and any medication you take. You must answer honestly and completely. If your health changes between booking and arriving, tell us.",
      "We may decline or cancel a booking on the advice of our facilitators if we believe taking part would not be safe for you. Where we do that, we will refund you in line with our cancellation policy.",
      "We are not a medical service and nothing on this website is medical advice. If you are in any doubt, speak to your doctor before booking. You take part of your own free will and at your own risk.",
    ],
  },
  {
    heading: "Insurance",
    body: [
      "We require every guest to hold travel insurance covering medical treatment and repatriation for the whole of their stay. We may ask to see it.",
    ],
  },
  {
    heading: "While you're with us",
    body: [
      "We ask you to follow the guidance of the facilitators, to respect the other guests and the staff, and to respect the land and the community around us.",
      "Alcohol and recreational drugs are not permitted on site during a retreat. They interact unpredictably with the work and they affect everyone else's experience.",
      "We may ask someone to leave if their behaviour puts others at risk. In that situation no refund is given and travel home is at their own cost.",
    ],
  },
  {
    heading: "If we have to change or cancel",
    body: [
      "Very occasionally a retreat has to move or be cancelled — illness among the facilitators, weather, or something outside our control.",
      "If we cancel, you choose between a transfer to another date or a full refund of what you have paid us. We cannot refund flights or other travel you have booked, which is why we ask you to be insured.",
      "If we have to change facilitators, accommodation or the running order, we will tell you as soon as we can. A change of that kind is not by itself grounds for a refund.",
    ],
  },
  {
    heading: "Photographs",
    body: [
      "We sometimes photograph the grounds and group activities. We will always ask before photographing you, and we never photograph ceremonies.",
      "If you would rather not appear anywhere, tell us at any point and we will make sure you don't.",
    ],
  },
  {
    heading: "Workshops and events",
    body: [
      "Single-day workshops and evening events follow the same terms where they apply. Some are free and some are paid; the price is shown when you sign up.",
      "If a workshop is full you can join the waiting list, and we will contact you if a place opens.",
    ],
  },
  {
    heading: "Liability",
    body: [
      "Nothing here limits our liability for death or personal injury caused by our negligence, or for anything else that cannot lawfully be limited.",
      "Beyond that, our liability in connection with a booking is limited to the amount you paid us for it.",
      "[Shane and a lawyer to confirm: which country's law governs these terms and where disputes are heard. Colombia is the obvious answer, but it should be a deliberate one.]",
    ],
  },
];

export default function Terms() {
  return (
    <LegalPage
      title="Terms &amp; Conditions"
      updated="September 2026"
      intro="These are the terms you agree to when you book a retreat or sign up for a workshop with us. Please read the section on health carefully — it is the one that matters most."
      sections={SECTIONS}
    />
  );
}
