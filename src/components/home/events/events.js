import React, { useRef, useState, useEffect } from "react";
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
 */
const ScrollableEvents = () => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const navigate = useNavigate();

  const { workshops, loading } = useWorkshops();
  const items = workshops.slice(0, 6);

  const checkScroll = () => {
    const scroll = scrollRef.current;
    if (!scroll) return;
    setCanScrollLeft(scroll.scrollLeft > 20);
    setCanScrollRight(scroll.scrollLeft + scroll.clientWidth < scroll.scrollWidth - 20);
  };

  useEffect(() => {
    checkScroll();
  }, [items.length]);

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 800, behavior: "smooth" });
    setTimeout(checkScroll, 300);
  };

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -800, behavior: "smooth" });
    setTimeout(checkScroll, 300);
  };

  /* Nothing scheduled is a normal state — the strip steps aside rather
     than showing an empty rail. */
  if (!loading && items.length === 0) return null;

  return (
    <div className="events-section grain-bg d-flex align-items-center justify-content-center ch-100 px-lg-5 px-0">
      <Container fluid className="px-lg-5 px-2">
        <h2 className="events-title text-center mb-2 fs-5 pFont text-secondary-color fw-bold">
          WORKSHOPS <span className="d-block pFont"> &amp; EVENTS</span>
        </h2>

        {loading ? (
          <p className="text-center text-secondary-color fs-4 py-5 mb-0">Loading what's coming up…</p>
        ) : (
          <div className="scroll-wrapper mx-auto ps-5">
            <div className="scroll-container mx-auto ps-5" ref={scrollRef} onScroll={checkScroll}>
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

                        <div className="date-tag position-absolute top-0 start-0 m-5 px-3 py-2 rounded-4 text-center text-warning-color bg-secondary-color">
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

            {canScrollLeft && (
              <motion.button className="scroll-btn left-btn p-4 rounded-circle" whileHover={{ scale: 1.1 }} onClick={scrollLeft} aria-label="Scroll left">
                <FaArrowLeft size={28} />
              </motion.button>
            )}

            {canScrollRight && (
              <motion.button
                className="scroll-btn right-btn p-4 rounded-circle"
                animate={{ x: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
                onClick={scrollRight}
                aria-label="Scroll right"
              >
                <FaArrowRight size={28} />
              </motion.button>
            )}
          </div>
        )}
      </Container>
    </div>
  );
};

export default ScrollableEvents;
