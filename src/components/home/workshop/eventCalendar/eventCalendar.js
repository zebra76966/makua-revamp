import React, { useState, useMemo, useEffect } from "react";
import { Container, Row, Col, Carousel } from "react-bootstrap";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import dayjs from "dayjs";

import { money } from "../../../../services/api";
import { ctaLabel, placesLabel } from "../useWorkshops";
import "./eventsCalendar.css";
import "../workshops.css";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/**
 * The month view and the list beside it, both drawn from the same live
 * workshops list. The month it opens on is the month of the next thing
 * happening, so the calendar is never showing an empty page.
 */
const EventsCalendar = ({ workshops = [], loading, error, onPick }) => {
  const [currentMonth, setCurrentMonth] = useState(() => dayjs().startOf("month"));
  const [hoveredDate, setHoveredDate] = useState(null);
  const [filterType, setFilterType] = useState("all"); // event | workshop | all
  const [jumped, setJumped] = useState(false);

  /* Open on the month of the next thing, once the list arrives. */
  useEffect(() => {
    if (jumped || !workshops.length) return;
    setCurrentMonth(dayjs(workshops[0].startsAt).startOf("month"));
    setJumped(true);
  }, [workshops, jumped]);

  const filtered = useMemo(() => {
    if (filterType === "all") return workshops;
    return workshops.filter((w) => (w.kind === "event" ? "event" : "workshop") === filterType);
  }, [workshops, filterType]);

  const byDate = useMemo(
    () =>
      filtered.reduce((acc, w) => {
        const key = dayjs(w.startsAt).format("YYYY-MM-DD");
        (acc[key] = acc[key] || []).push(w);
        return acc;
      }, {}),
    [filtered],
  );

  /* The list beside the calendar follows the month you're looking at,
     and falls back to everything upcoming when that month is empty. */
  const monthItems = useMemo(
    () => filtered.filter((w) => dayjs(w.startsAt).isSame(currentMonth, "month")),
    [filtered, currentMonth],
  );
  const listed = monthItems.length ? monthItems : filtered;

  useEffect(() => { setHoveredDate(null); }, [currentMonth]);

  const startDay = currentMonth.startOf("month").day();
  const daysInMonth = currentMonth.daysInMonth();
  const atFirstMonth = currentMonth.isSame(dayjs(), "month") || currentMonth.isBefore(dayjs(), "month");

  const slides = useMemo(() => {
    const out = [];
    for (let i = 0; i < listed.length; i += 5) out.push(listed.slice(i, i + 5));
    return out;
  }, [listed]);

  return (
    <div className="w-100 ch-100 grain-bg-offwhite d-flex align-items-center px-5">
      <div className="px-lg-5 w-100">
        <Container fluid className="px-xl-5">
          <Row className="g-5 justify-content-center">
            {/* LEFT LIST */}
            <Col lg={6}>
              <h1 className="events-title mb-4 text-dark display-5">EVENTS &amp; WORKSHOPS</h1>

              {monthItems.length === 0 && listed.length > 0 && (
                <p className="wk-list-note mb-4">
                  Nothing in {currentMonth.format("MMMM")} — here's what's coming up.
                </p>
              )}

              {loading && <p className="fs-5 text-primary-color">Loading the calendar…</p>}

              {!loading && error && (
                <p className="fs-5 text-primary-color">
                  We couldn't load the calendar just now. Please try again in a moment.
                </p>
              )}

              {!loading && !error && listed.length === 0 && (
                <p className="fs-5 text-primary-color wk-empty">
                  {filterType === "all"
                    ? "Nothing is scheduled just yet. Dates go up here as soon as they're set."
                    : `No ${filterType}s are scheduled at the moment.`}
                </p>
              )}

              {!loading && !error && listed.length > 0 && (
                <Carousel indicators={slides.length > 1} controls={slides.length > 1} interval={null} style={{ minHeight: "52dvh" }}>
                  {slides.map((slide, idx) => (
                    <Carousel.Item key={idx}>
                      {slide.map((w) => (
                        <motion.div
                          key={w.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6 }}
                          className="event-row mb-4 py-4 pFont justify-content-between d-flex border-bottom border-dark"
                        >
                          <div className="d-flex align-items-center">
                            <span className={`dot ${w.kind === "event" ? "event" : "workshop"}`} />
                            <span className="event-date ms-3">{dayjs(w.startsAt).format("YYYY MMMM DD")}</span>
                          </div>

                          <div className="text-start w-25">
                            <span className="event-name">{w.title}</span>
                          </div>

                          {ctaLabel(w) ? (
                            <button className="event-action fw-bold wk-link-btn" onClick={() => onPick?.(w)}>
                              {w.full ? "WAITLIST" : w.free ? "RSVP" : "BOOK"}
                            </button>
                          ) : (
                            <span className="event-action fw-bold wk-open">OPEN</span>
                          )}
                        </motion.div>
                      ))}
                    </Carousel.Item>
                  ))}
                </Carousel>
              )}
            </Col>

            {/* RIGHT CALENDAR */}
            <Col lg={6} xl={5} className="px-lg-5">
              <div className="calendar-card h-100 shadow">
                <div className="calendar-header fs-5">
                  <button
                    type="button"
                    className="wk-month-btn"
                    aria-label="Previous month"
                    disabled={atFirstMonth}
                    onClick={() => setCurrentMonth(currentMonth.subtract(1, "month"))}
                  >
                    <FiChevronLeft />
                  </button>
                  <span>{currentMonth.format("MMMM YYYY")}</span>
                  <button
                    type="button"
                    className="wk-month-btn"
                    aria-label="Next month"
                    onClick={() => setCurrentMonth(currentMonth.add(1, "month"))}
                  >
                    <FiChevronRight />
                  </button>
                </div>

                <div className="calendar-grid">
                  {WEEKDAYS.map((d) => (
                    <div key={d} className="day-label mb-5">{d}</div>
                  ))}

                  {[...Array(startDay)].map((_, i) => <div key={`empty-${i}`} />)}

                  {[...Array(daysInMonth)].map((_, i) => {
                    const date = currentMonth.date(i + 1);
                    const key = date.format("YYYY-MM-DD");
                    const dayEvents = byDate[key];
                    const first = dayEvents?.[0];

                    return (
                      <div
                        key={key}
                        className={`calendar-day position-relative ${dayEvents ? "has-event" : ""}`}
                        onMouseEnter={() => dayEvents && setHoveredDate(key)}
                        onMouseLeave={() => setHoveredDate(null)}
                        onClick={() => first && onPick?.(first)}
                      >
                        <span className="day-number">{i + 1}</span>

                        {first && <span className={`event-dot ${first.kind === "event" ? "event" : "workshop"}`} />}

                        <AnimatePresence>
                          {first && hoveredDate === key && (
                            <motion.div
                              className="calendar-popup border-2 shadow"
                              initial={{ opacity: 0, y: -4, scale: 0.98 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -4, scale: 0.98 }}
                              transition={{ duration: 0.2, ease: "easeOut" }}
                            >
                              <div className="d-flex justify-content-between">
                                <p className="popup-date small fw-bold mb-1">{dayjs(key).format("DD.MM.YYYY")}</p>
                                <p className="popup-time small fw-bold mb-1">{dayjs(first.startsAt).format("h:mm A")}</p>
                              </div>

                              <h5 className="pFont fs-6 my-0">{first.title}</h5>

                              <hr className="my-2" />

                              {first.summary && <p className="popup-desc fs-6">{first.summary}</p>}

                              <p className="popup-desc fs-6 mb-2">
                                {first.free ? "Free" : money(first.price)}
                                {placesLabel(first) ? ` · ${placesLabel(first)}` : ""}
                              </p>

                              {dayEvents.length > 1 && (
                                <p className="popup-desc fs-6 mb-2">
                                  +{dayEvents.length - 1} more that day
                                </p>
                              )}

                              {ctaLabel(first) && (
                                <button
                                  type="button"
                                  className="popup-btn pFont bg-none text-dark wSpacing border-0 fw-bold"
                                  onClick={(e) => { e.stopPropagation(); onPick?.(first); }}
                                >
                                  {ctaLabel(first)}
                                </button>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

                <div className="calendar-legend mt-5 d-flex gap-4">
                  <span
                    className={`legend-item ${filterType === "event" ? "active" : ""}`}
                    onClick={() => setFilterType(filterType === "event" ? "all" : "event")}
                  >
                    <span className="dot event me-1" style={{ padding: "0.1em 0.6em" }} /> Events
                  </span>

                  <span
                    className={`legend-item ${filterType === "workshop" ? "active" : ""}`}
                    onClick={() => setFilterType(filterType === "workshop" ? "all" : "workshop")}
                  >
                    <span className="dot workshop me-1" style={{ padding: "0.1em 0.6em" }} /> Workshops
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default EventsCalendar;
