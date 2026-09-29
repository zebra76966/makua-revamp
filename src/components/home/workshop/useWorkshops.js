import { useMemo } from "react";
import dayjs from "dayjs";

import useAsync from "../../../hooks/useAsync";
import { workshopsAPI } from "../../../services/api";

/**
 * Loads every published workshop from today onwards, once, and hands the
 * same list to the carousel and the calendar so they can never disagree.
 *
 * The window is a year wide: far enough ahead for anything Shane puts in
 * the admin, short enough that the page stays one small request.
 */
export default function useWorkshops() {
  const from = useMemo(() => dayjs().format("YYYY-MM-DD"), []);
  const to = useMemo(() => dayjs().add(1, "year").format("YYYY-MM-DD"), []);

  const { data, loading, error, reload } = useAsync(
    () => workshopsAPI.list({ from, to }),
    [from, to],
    [],
  );

  return { workshops: data || [], loading, error, reload };
}

/** "Fri 10 Oct · 6:30 – 8:00 AM", or just the date if there's no end time. */
export const whenLabel = (w) => {
  const s = dayjs(w.startsAt);
  const day = s.format("ddd D MMM");
  if (!w.endsAt) return `${day} · ${s.format("h:mm A")}`;
  const e = dayjs(w.endsAt);
  const sameDay = s.isSame(e, "day");
  return sameDay
    ? `${day} · ${s.format("h:mm")} – ${e.format("h:mm A")}`
    : `${day} – ${e.format("ddd D MMM")}`;
};

/**
 * What the card's button should say. Kept short on purpose — these sit in
 * the blob button, which is a fixed shape, and a long phrase wraps to four
 * lines on a phone. The full wording lives inside the dialog, where there
 * is room for it.
 */
export const ctaLabel = (w) => {
  if (!w.signupRequired) return null;
  if (w.full) return "WAITLIST";
  return w.free ? "RSVP" : "BOOK NOW";
};

/** "12 places left" / "Fully booked" / "" when there's no limit. */
export const placesLabel = (w) => {
  if (w.placesLeft === null) return "";
  if (w.placesLeft <= 0) return "Fully booked";
  return `${w.placesLeft} ${w.placesLeft === 1 ? "place" : "places"} left`;
};
