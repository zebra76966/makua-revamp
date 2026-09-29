import React, { useMemo } from "react";
import { Container, Carousel, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";

import { money, mediaUrl } from "../../../../services/api";
import { whenLabel, ctaLabel, placesLabel } from "../useWorkshops";
import "./upcomingCar.css";
import "../workshops.css";

const cardVariants = {
  hidden: { opacity: 0, y: 80 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

const chunkArray = (arr, size) => {
  const result = [];
  for (let i = 0; i < arr.length; i += size) result.push(arr.slice(i, i + size));
  return result;
};

const FALLBACK_IMAGE = "/events/workshop1.jpg";

/**
 * The first few things coming up, three at a time.
 *
 * Everything here comes from the workshops table, so adding an evening in
 * the admin puts it on this page — nothing to edit in the code.
 */
const UpcomingCarousel = ({ workshops = [], loading, error, onPick }) => {
  const soon = useMemo(() => workshops.slice(0, 9), [workshops]);
  const desktopChunks = useMemo(() => chunkArray(soon, 3), [soon]);
  const tabletChunks = useMemo(() => chunkArray(soon, 2), [soon]);
  const mobileChunks = useMemo(() => chunkArray(soon, 1), [soon]);

  return (
    <div className="grain-bg-offwhite facilities-section px-5 ch-100">
      <div className="px-5">
        <Container fluid className="px-lg-5">
          <h2 className="facilities-title text-center mb-5 display-6">UPCOMING</h2>

          {loading && <p className="text-center fs-4 text-primary-color">Loading what's coming up…</p>}

          {!loading && error && (
            <p className="text-center fs-5 text-primary-color">
              We couldn't load the calendar just now. Please try again in a moment.
            </p>
          )}

          {!loading && !error && soon.length === 0 && (
            <p className="text-center fs-5 text-primary-color wk-empty">
              Nothing is scheduled at the moment. New workshops and evenings are added here as
              soon as the dates are set.
            </p>
          )}

          {!loading && !error && soon.length > 0 && (
            <>
              {/* DESKTOP */}
              <div className="d-none d-lg-block">
                <Carousel
                  interval={null}
                  indicators={false}
                  controls={desktopChunks.length > 1}
                  prevIcon={
                    <span className="custom-carousel-arrow prev-arrow">
                      <img src="/arrowLeft.svg" alt="Previous" />
                    </span>
                  }
                  nextIcon={
                    <span className="custom-carousel-arrow next-arrow">
                      <img src="/arrowLeft.svg" alt="Next" style={{ transform: "rotateY(180deg)" }} />
                    </span>
                  }
                >
                  {desktopChunks.map((group, index) => (
                    <Carousel.Item key={index}>
                      <Row className="g-4 justify-content-center">
                        {group.map((item, i) => (
                          <Col lg={4} key={item.id}>
                            <FacilityCard item={item} i={i} onPick={onPick} />
                          </Col>
                        ))}
                      </Row>
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>

              {/* TABLET */}
              <div className="d-none d-md-block d-lg-none">
                <Carousel interval={null} indicators={false} controls={tabletChunks.length > 1}>
                  {tabletChunks.map((group, index) => (
                    <Carousel.Item key={index}>
                      <Row className="g-4">
                        {group.map((item, i) => (
                          <Col md={6} key={item.id}>
                            <FacilityCard item={item} i={i} onPick={onPick} />
                          </Col>
                        ))}
                      </Row>
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>

              {/* MOBILE */}
              <div className="d-block d-md-none">
                <Carousel interval={null} indicators={false} controls={mobileChunks.length > 1}>
                  {mobileChunks.map((group, index) => (
                    <Carousel.Item key={group[0].id}>
                      <FacilityCard item={group[0]} i={index} onPick={onPick} />
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>
            </>
          )}
        </Container>
      </div>
    </div>
  );
};

const FacilityCard = ({ item, i, onPick }) => {
  const cta = ctaLabel(item);
  const places = placesLabel(item);

  return (
    <motion.div
      custom={i}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="facility-card"
    >
      <div className="facility-img-wrapper bg-secondary-color pb-2 shadow rounded-2 px-4 pt-4">
        <img src={mediaUrl(item.image) || FALLBACK_IMAGE} alt={item.title} />
        <h5 className="facility-card-title fw-bold pFont text-center mt-3">{whenLabel(item)}</h5>
      </div>

      <h4 className="wk-card-title mt-4 mb-0">{item.title}</h4>

      <ul className="facility-list mt-3" style={{ listStyle: "none" }}>
        {item.summary && <li className="lead mt-3">{item.summary}</li>}
        <li className="lead mt-3 wk-card-meta">
          {item.free ? "Free" : `${money(item.price)} per person`}
          {item.location ? ` · ${item.location}` : ""}
          {places ? ` · ${places}` : ""}
        </li>
        {!item.signupRequired && <li className="lead mt-3 wk-card-meta">Just turn up — no booking needed.</li>}
      </ul>

      {cta && (
        <button className="blob-btn px-5 fs-4 py-3 mt-auto" onClick={() => onPick?.(item)}>
          {cta}
        </button>
      )}
    </motion.div>
  );
};

export default UpcomingCarousel;
