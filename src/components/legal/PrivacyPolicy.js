import React from "react";
import LegalPage from "./LegalPage";

/**
 * DRAFT — written to match what this site actually does, so it is
 * accurate rather than generic. It has not been reviewed by a lawyer, and
 * it should be before launch: Makua takes health information as part of
 * booking, which most privacy regimes treat as a special category.
 */
const SECTIONS = [
  {
    heading: "What we collect",
    body: [
      "When you book a retreat or sign up for a workshop, we ask for:",
      "- Your name and email address, so we can confirm your place and reach you",
      "- A phone number, if you give us one",
      "- Your dietary requirements, and any notes you choose to add",
      "- Which retreat, room and activity you chose, and what you paid",
      "When you send us an enquiry through the website, we keep your name, email, phone number if given, and your message.",
      "When you subscribe to the newsletter, we keep your email address and nothing else.",
      "Our web server records the IP address an enquiry came from, which we use only to stop the form being abused.",
    ],
  },
  {
    heading: "Health information",
    body: [
      "Some of what you tell us is health information — dietary needs, and anything you share about medication or medical history when preparing for a ceremony.",
      "We ask for it for one reason: so the people running the retreat can keep you safe. Certain medications and conditions do not combine safely with the plants used in ceremony, and our facilitators need to know in advance.",
      "It is seen only by the facilitators and staff responsible for your retreat. We do not use it for marketing, we do not share it with anyone outside Makua, and we delete it once your retreat is finished and any follow-up is complete.",
    ],
  },
  {
    heading: "Why we're allowed to hold it",
    body: [
      "For booking details, because we need them to provide what you've asked us for.",
      "For health information, because you have given us your explicit consent — and you can withdraw it, though we may then be unable to offer you a place.",
      "For the newsletter, because you asked to receive it. Every newsletter has an unsubscribe link and we act on it immediately.",
    ],
  },
  {
    heading: "Who else sees it",
    body: [
      "Our email provider, so we can send you a booking confirmation or a sign-in code.",
      "Our hosting provider, on whose servers this website and its database run.",
      "If and when we take payments online, our payment processor — they receive your card details directly and we never see or store them.",
      "We do not sell your information, and we do not share it for anyone else's advertising.",
    ],
  },
  {
    heading: "How long we keep it",
    body: [
      "- Booking records: seven years, because we need them for our accounts",
      "- Health information: deleted once your retreat and any follow-up are complete",
      "- Enquiries: two years, or sooner if you ask",
      "- Newsletter subscriptions: until you unsubscribe",
    ],
  },
  {
    heading: "Cookies",
    body: [
      "This website does not use advertising or tracking cookies.",
      "Your browser stores a small amount of data so you stay signed in while you complete a booking. It is used for nothing else, and clearing your browser data removes it.",
    ],
  },
  {
    heading: "Your rights",
    body: [
      "You can ask us for a copy of what we hold about you, ask us to correct it, or ask us to delete it. Email {email} and we will respond within 30 days.",
      "If you are unhappy with how we have handled your information, you can complain to your local data protection authority.",
    ],
  },
  {
    heading: "Keeping it safe",
    body: [
      "The website is served over an encrypted connection. Sign-in codes are stored hashed rather than in plain text, and access to the admin system is limited to named staff accounts.",
      "No system is perfectly secure. If something happens that puts your information at risk, we will tell you.",
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="September 2026"
      intro="This explains what we collect when you book a retreat, sign up for a workshop or get in touch — and what we do with it. It is written in plain English on purpose."
      sections={SECTIONS}
    />
  );
}
