import React, { useRef, useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { motion } from "framer-motion";
import events from "./eventsData.json";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import "./events.css";

const ScrollableEvents = () => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

  // Check scroll availability
  const checkScroll = () => {
    const scroll = scrollRef.current;
    if (!scroll) return;

    setCanScrollLeft(scroll.scrollLeft > 20);
    setCanScrollRight(scroll.scrollLeft + scroll.clientWidth < scroll.scrollWidth - 20);
  };

  useEffect(() => {
    checkScroll();
  }, []);

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 800, behavior: "smooth" });
    setTimeout(checkScroll, 300);
  };

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -800, behavior: "smooth" });
    setTimeout(checkScroll, 300);
  };

  return (
    <div className="events-section grain-bg d-flex align-items-center justify-content-center ch-100 px-5">
      <Container fluid className="px-5">
        <h2 className="events-title text-center mb-2 fs-5 pFont text-secondary-color fw-bold">
          WORKSHOPS <span className="d-block pFont"> & EVENTS</span>
        </h2>

        {/* Scroll Container */}
        <div className="scroll-wrapper mx-auto ps-5">
          <div className="scroll-container mx-auto ps-5" ref={scrollRef} onScroll={checkScroll}>
            {events.map((item, i) => (
              <motion.div custom={i} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="event-card pb-0" key={i}>
                <img src="pin.png" className="pin-img mx-auto" alt="pin" />
                <div className="eventcard-body position-relative">
                  <div className="polaroid-img-wrapper">
                    <img src={item.image} className="event-image" alt="event" />

                    <div className="date-tag position-absolute top-0 start-0 m-5 px-3 py-2 rounded-4 text-center  text-warning-color bg-secondary-color">
                      <div className="dt-day hFont fs-1">{item.date.split(" ")[0]}</div>
                      <div className="dt-rest pFont fs-5 fw-bold" style={{ letterSpacing: "0.4em" }}>
                        {item.date.split(" ")[1]}
                      </div>
                      <div className="dt-time pFont fs-6 fw-bold " style={{ letterSpacing: "0.4em" }}>
                        {item.time}
                      </div>
                    </div>
                  </div>

                  <div className="event-title fs-1 text-center text-primary-color mb-4 hFont">{item.title}</div>
                  <div className="bg-primary-color px-2 py-3">
                    <p className="event-desc text-secondary-color text-center lead">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {canScrollLeft && (
            <motion.button className="scroll-btn left-btn p-4 rounded-circle" whileHover={{ scale: 1.1 }} onClick={scrollLeft}>
              <FaArrowLeft size={28} />
            </motion.button>
          )}

          {canScrollRight && (
            <motion.button className="scroll-btn right-btn p-4 rounded-circle" animate={{ x: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }} onClick={scrollRight}>
              <FaArrowRight size={28} />
            </motion.button>
          )}
        </div>
      </Container>
    </div>
  );
};

export default ScrollableEvents;
