import React, { useRef, useState, useEffect, useCallback } from "react";
import { Container } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import useWorkshops from "../workshop/useWorkshops";
import { money, mediaUrl } from "../../../services/api";
import "./events.css";

const FALLBACK_IMAGES = ["/events/eventsA.jpg", "/events/eventsB.jpg", "/events/eventsC.jpg"];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.6, ease: "easeOut" } },
};

/**
 * The postcard strip on the home page. Same list as the workshops page,
 * cut to the next six, and every card takes you there to book.
 *
 * It scrolls by exactly one card, measured from the cards themselves
 * rather than a guessed number of pixels, so a card never ends up half
 * on and half off the screen.
 */
const ScrollableEvents = () => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [active, setActive] = useState(0);
  const navigate = useNavigate();

  const { workshops, loading } = useWorkshops();
  const items = workshops.slice(0, 6);

  /* One card plus the gap between two of them. Measured from the first
     two cards so it stays right when the card width changes with the
     viewport. */
  const step = useCallback(() => {
    const rail = scrollRef.current;
    const cards = rail?.querySelectorAll(".event-card");
    if (!cards?.length) return 400;
    if (cards.length > 1) return cards[1].offsetLeft - cards[0].offsetLeft;
    return cards[0].offsetWidth;
  }, []);

  const checkScroll = useCallback(() => {
    const rail = scrollRef.current;
    if (!rail) return;
    setCanScrollLeft(rail.scrollLeft > 8);
    setCanScrollRight(rail.scrollLeft + rail.clientWidth < rail.scrollWidth - 8);
    setActive(Math.round(rail.scrollLeft / step()));
  }, [step]);

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [items.length, checkScroll]);

  const by = (n) => {
    scrollRef.current?.scrollBy({ left: n * step(), behavior: "smooth" });
    window.setTimeout(checkScroll, 400);
  };

  const goTo = (i) => {
    scrollRef.current?.scrollTo({ left: i * step(), behavior: "smooth" });
    window.setTimeout(checkScroll, 400);
  };

  /* Nothing scheduled is a normal state — the strip steps aside rather
     than showing an empty rail. */
  if (!loading && items.length === 0) return null;

  const scrollable = canScrollLeft || canScrollRight;

  return (
    <div className="events-section grain-bg d-flex align-items-center justify-content-center ch-100 px-lg-5 px-0">
      <Container fluid className="px-lg-5 px-3">
        <h2 className="events-title text-center mb-2 fs-5 pFont text-secondary-color fw-bold">
          WORKSHOPS <span className="d-block pFont"> &amp; EVENTS</span>
        </h2>

        {loading ? (
          <p className="text-center text-secondary-color fs-4 py-5 mb-0">Loading what's coming up…</p>
        ) : (
          <div className="scroll-wrapper mx-auto">
            <div className="scroll-container" ref={scrollRef} onScroll={checkScroll}>
              {items.map((item, i) => {
                const start = dayjs(item.startsAt);
                return (
                  <motion.div
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="event-card pb-0"
                    key={item.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => navigate("/workshops")}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") navigate("/workshops");
                    }}
                  >
                    <img src="pin.png" className="pin-img mx-auto" alt="" />
                    <div className="eventcard-body position-relative">
                      <div className="polaroid-img-wrapper">
                        <img src={mediaUrl(item.image) || FALLBACK_IMAGES[i % FALLBACK_IMAGES.length]} className="event-image" alt={item.title} />

                        <div className="date-tag position-absolute top-0 start-0 px-3 py-2 rounded-4 text-center text-warning-color bg-secondary-color">
                          <div className="dt-day hFont fs-1">{start.format("ddd").toUpperCase()}</div>
                          <div className="dt-rest pFont fs-5 fw-bold" style={{ letterSpacing: "0.4em" }}>
                            {start.format("DD.MM")}
                          </div>
                          <div className="dt-time pFont fs-6 fw-bold" style={{ letterSpacing: "0.4em" }}>
                            {start.format("h A")}
                          </div>
                        </div>
                      </div>

                      <div className="event-title fs-1 text-center text-primary-color mb-4 hFont">{item.title}</div>
                      <div className="bg-primary-color px-2 py-3">
                        <p className="event-desc text-secondary-color text-center lead mb-1">{item.summary || item.description}</p>
                        <p className="event-meta text-secondary-color text-center pFont mb-0">
                          {item.free ? "Free" : money(item.price)}
                          {item.location ? ` · ${item.location}` : ""}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Only drawn when there's somewhere to go. */}
            {scrollable && (
              <div className="ev-controls">
                <div className="ev-dots">
                  {items.map((item, i) => (
                    <button key={item.id} type="button" className={`ev-dot ${i === active ? "is-on" : ""}`} aria-label={`Show ${item.title}`} aria-current={i === active} onClick={() => goTo(i)} />
                  ))}
                </div>

                <div className="ev-arrows">
                  <button type="button" className="scroll-btn" onClick={() => by(-1)} disabled={!canScrollLeft} aria-label="Previous workshops">
                    <FaArrowLeft />
                  </button>

                  {/* Still, the way the design has it. The old one nudged
                      itself sideways for ever, which is a lot of movement to
                      put on screen permanently. */}
                  <button type="button" className="scroll-btn" onClick={() => by(1)} disabled={!canScrollRight} aria-label="More workshops">
                    <FaArrowRight />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </Container>
    </div>
  );
};

export default ScrollableEvents;
