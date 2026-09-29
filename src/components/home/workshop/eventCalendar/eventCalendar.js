import React, { useState, useMemo, useEffect } from "react";
import { Container, Row, Col, Carousel } from "react-bootstrap";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import dayjs from "dayjs";
import "./eventsCalendar.css";
const eventsData = [
  {
    id: 1,
    type: "event",
    title: "Retreat",
    date: "2025-09-04",
    time: "8pm - late",
    description: "An immersive gathering for healing, connection, and transformation—held in the sacred lands of Cerro Tusa.",
  },
  {
    id: 2,
    type: "workshop",
    title: "Hiking",
    date: "2025-11-26",
  },
  {
    id: 3,
    type: "event",
    title: "Yoga with Kasandra",
    date: "2025-11-26",
  },
  {
    id: 4,
    type: "event",
    title: "Christmas Party",
    date: "2025-12-26",
  },
  {
    id: 5,
    type: "event",
    title: "Retreat",
    date: "2025-09-08",
    time: "8pm - late",
    description: "An immersive gathering for healing, connection, and transformation—held in the sacred lands of Cerro Tusa.",
  },
  {
    id: 6,
    type: "workshop",
    title: "Hiking",
    date: "2025-11-20",
  },
  {
    id: 7,
    type: "event",
    title: "Yoga with Kasandra",
    date: "2025-11-18",
  },
  {
    id: 8,
    type: "event",
    title: "Christmas Party",
    date: "2025-12-15",
  },
];

const EventsCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(dayjs("2025-09-01"));
  const [, setActiveDate] = useState(null);
  const [hoveredDate, setHoveredDate] = useState(null);
  const [filterType, setFilterType] = useState("all"); // event | workshop | all

  const startDay = currentMonth.startOf("month").day();
  const daysInMonth = currentMonth.daysInMonth();

  const filteredEvents = useMemo(() => {
    if (filterType === "all") return eventsData;
    return eventsData.filter((e) => e.type === filterType);
  }, [filterType]);

  const eventsByDate = useMemo(() => {
    return filteredEvents.reduce((acc, e) => {
      acc[e.date] = acc[e.date] ? [...acc[e.date], e] : [e];
      return acc;
    }, {});
  }, [filteredEvents]);

  useEffect(() => {
    setActiveDate(null);
    setHoveredDate(null);
  }, [currentMonth]);

  const chunkEvents = (arr, size = 5) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };

  const eventSlides = useMemo(() => chunkEvents(filteredEvents, 5), [filteredEvents]);

  return (
    <div className="w-100 ch-100 grain-bg-offwhite d-flex align-items-center px-5">
      <div className="px-lg-5 w-100">
        <Container fluid className="px-xl-5 ">
          <Row className="g-5 justify-content-center">
            {/* LEFT LIST */}
            <Col lg={6}>
              <h1 className="events-title mb-5 text-dark display-5">EVENTS & WORKSHOPS</h1>

              <Carousel indicators={true} controls={true} interval={null} style={{ minHeight: "52dvh" }}>
                {eventSlides.map((slide, idx) => (
                  <Carousel.Item key={idx}>
                    {slide.map((e) => (
                      <motion.div
                        key={e.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="event-row mb-4 py-4 pFont justify-content-between d-flex border-bottom border-dark"
                      >
                        <div className="d-flex align-items-center">
                          <span className={`dot ${e.type}`} />
                          <span className="event-date ms-3">{dayjs(e.date).format("YYYY MMMM DD")}</span>
                        </div>

                        <div className="text-start w-25">
                          <span className="event-name">{e.title}</span>
                        </div>

                        <span className="event-action fw-bold">{e.type === "event" ? "RSVP" : "BOOK"}</span>
                      </motion.div>
                    ))}
                  </Carousel.Item>
                ))}
              </Carousel>
            </Col>

            {/* RIGHT CALENDAR */}
            <Col lg={6} xl={5} className="px-lg-5">
              <div className="calendar-card h-100 shadow">
                {/* HEADER */}
                <div className="calendar-header fs-5">
                  <FiChevronLeft onClick={() => setCurrentMonth(currentMonth.subtract(1, "month"))} />
                  <span>{currentMonth.format("MMMM YYYY")}</span>
                  <FiChevronRight onClick={() => setCurrentMonth(currentMonth.add(1, "month"))} />
                </div>

                {/* DAYS */}
                <div className="calendar-grid">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                    <div key={d} className="day-label mb-5">
                      {d}
                    </div>
                  ))}

                  {[...Array(startDay)].map((_, i) => (
                    <div key={`empty-${i}`} />
                  ))}

                  {[...Array(daysInMonth)].map((_, i) => {
                    const date = currentMonth.date(i + 1);
                    const key = date.format("YYYY-MM-DD");
                    const hasEvent = eventsByDate[key];

                    return (
                      <div key={key} className="calendar-day position-relative" onMouseEnter={() => hasEvent && setHoveredDate(key)} onMouseLeave={() => setHoveredDate(null)}>
                        <span className="day-number">{i + 1}</span>

                        {hasEvent && <span className={`event-dot ${hasEvent[0].type}`} />}

                        <AnimatePresence>
                          {hasEvent && hoveredDate === key && (
                            <motion.div
                              className="calendar-popup border-2 shadow"
                              initial={{ opacity: 0, y: -4, scale: 0.98 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -4, scale: 0.98 }}
                              transition={{ duration: 0.2, ease: "easeOut" }}
                            >
                              <div className="d-flex justify-content-between">
                                <p className="popup-date small fw-bold">{dayjs(key).format("DD.MM.YYYY")}</p>
                                <p className="popup-time small fw-bold">{eventsByDate[key][0].time}</p>
                              </div>

                              <h5 className="pFont fs-6 my-0">{eventsByDate[key][0].title}</h5>

                              <hr className="my-2" />

                              <p className="popup-desc fs-6">{eventsByDate[key][0].description}</p>

                              <button className="popup-btn pFont bg-none text-dark wSpacing border-0 fw-bold">RSVP</button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

                {/* LEGEND */}
                <div className="calendar-legend mt-5 d-flex gap-4">
                  <span className={`legend-item ${filterType === "event" ? "active" : ""}`} onClick={() => setFilterType(filterType === "event" ? "all" : "event")}>
                    <span className="dot event me-1" style={{ padding: "0.1em 0.6em" }} /> Events
                  </span>

                  <span className={`legend-item ${filterType === "workshop" ? "active" : ""}`} onClick={() => setFilterType(filterType === "workshop" ? "all" : "workshop")}>
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
