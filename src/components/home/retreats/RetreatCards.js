import React, { useMemo } from "react";
import { Container, Card, Carousel, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useAsync from "../../../hooks/useAsync";
import { retreatsAPI, money, dateRange, mediaUrl } from "../../../services/api";
import "./RetreatCards.css";

const FALLBACK_IMAGE = "/events/events1.png";

/** What the card shows on the picture: a note from staff, or how few places are left. */
const cardTag = (item) => {
  if (item.soldOut) return "Fully booked";
  if (item.tagline) return item.tagline;
  if (item.placesLeft <= 3) return `${item.placesLeft} ${item.placesLeft === 1 ? "place" : "places"} left`;
  return null;
};

const cardVariants = {
  hidden: { opacity: 0, x: 500 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

// Helper to chunk data into groups of n
const chunkArray = (arr, size) => {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

/**
 * The retreat carousel, used on the home, about and resort pages, and
 * again at the bottom of a retreat page as "other retreats".
 *
 * exclude — a slug to leave out (the one you're already looking at)
 * heading — small caps title above the carousel
 * dark    — sit on the dark background instead of the light one
 */
const RetreatCards = ({ exclude = null, heading = null, dark = false }) => {
  const { data: retreats, loading } = useAsync(() => retreatsAPI.list(), [], []);
  const navigate = useNavigate();
  const items = (retreats || []).filter((r) => r.slug !== exclude);

  const desktopChunks = useMemo(() => chunkArray(items, 3), [items]);
  const tabletChunks = useMemo(() => chunkArray(items, 2), [items]);
  const mobileChunks = useMemo(() => chunkArray(items, 1), [items]);

  if (loading || items.length === 0) {
    return (
      <div className={`ch-100 ${dark ? "grain-bg" : "grain-bg-light"} d-flex align-items-center justify-content-center px-lg-5`}>
        <p className={`fs-4 mb-0 ${dark ? "text-secondary-color" : "text-primary-color"}`}>
          {loading ? "Loading retreats…" : "New dates are on the way. Join the newsletter below and we'll let you know."}
        </p>
      </div>
    );
  }

  return (
    <div className={`ch-100 ${dark ? "grain-bg" : "grain-bg-light"} d-flex align-items-center px-lg-5`}>
      <Container fluid className="py-5 px-5">
        {heading && <p className={`fs-5 text-center pFont fw-bold wSpacing mb-4 ${dark ? "text-secondary-color" : "text-primary-color"}`}>{heading}</p>}
        {/* DESKTOP (>= 992px) */}
        <div className="d-none d-lg-block">
          <Carousel
            interval={null}
            indicators={false}
            prevIcon={
              <span className="custom-carousel-arrow prev-arrow">
                <img src="/arrowLeft.svg" alt="left arrow" />
              </span>
            }
            nextIcon={
              <span className="custom-carousel-arrow next-arrow">
                <img src="/arrowLeft.svg" alt="left arrow" style={{ transform: "rotateY(180deg)" }} />
              </span>
            }
          >
            {desktopChunks.map((group, index) => (
              <Carousel.Item key={index}>
                <Row className="g-4 justify-content-center">
                  {group.map((item, i) => (
                    <Col lg={4} key={item.id} className="d-flex">
                      <motion.div custom={i} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: false }} className="w-100 h-100">
                        <Card className="retreat-card shadow-sm text-center rounded-0 h-100 bg-grain-light">
                          <div className="retreat-img-wrapper">
                            {cardTag(item) && <div className="retreat-tag px-3 py-1 fs-6">{cardTag(item)}</div>}
                            <Card.Img src={mediaUrl(item.image) || FALLBACK_IMAGE} alt={item.title} className="retreat-img" />
                          </div>

                          <Card.Body className="mt-3 d-flex flex-column pb-5">
                            <h3 className="fs-2 text-primary-color mb-2">{item.title}</h3>
                            <p className="pFont text-primary-color mb-3">
                              {dateRange(item.startDate, item.endDate)} · {money(item.price)}
                            </p>
                            <p className="retreat-desc fs-4 mb-5 text-primary-color">{item.description}</p>

                            <div className="mt-auto">
                              <div className="retreat-tags-container mb-4 ">
                                {(item.focus || []).map((focus, idx) => (
                                  <span className="focus-tag text-primary-color fs-6" key={idx}>
                                    {focus}
                                  </span>
                                ))}
                              </div>
                              <button className="blob-btn px-5 fs-4 py-3 " onClick={() => navigate(`/retreats/${item.slug}`)}>
                                {item.soldOut ? "SEE DETAILS" : "RESERVE"}
                              </button>
                            </div>
                          </Card.Body>
                        </Card>
                      </motion.div>
                    </Col>
                  ))}
                </Row>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>

        {/* TABLETS (≥768px and <992px) */}
        <div className="d-none d-md-block d-lg-none">
          <Carousel interval={null} indicators={false}>
            {tabletChunks.map((group, index) => (
              <Carousel.Item key={index}>
                <Row className="g-4 justify-content-center">
                  {group.map((item, i) => (
                    <Col md={6} key={i} className="d-flex">
                      <CardSlide item={item} i={i} />
                    </Col>
                  ))}
                </Row>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>

        {/* MOBILE (<768px) */}
        <div className="d-block d-md-none">
          <Carousel interval={null} indicators={false}>
            {mobileChunks.map((group, index) => (
              <Carousel.Item key={index}>
                <CardSlide item={group[0]} i={index} />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </Container>
    </div>
  );
};

// Card slide as a component (reused for tablet + mobile)
const CardSlide = ({ item, i }) => {
  const navigate = useNavigate();
  if (!item) return null;
  return (
    <motion.div custom={i} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="w-100 h-100">
      <Card className="retreat-card shadow-sm text-center rounded-0 h-100" style={{ background: "transparent" }}>
        <div className="retreat-img-wrapper">
          {cardTag(item) && <div className="retreat-tag px-3 py-1 fs-6">{cardTag(item)}</div>}
          <Card.Img src={mediaUrl(item.image) || FALLBACK_IMAGE} alt={item.title} className="retreat-img" />
        </div>

        <Card.Body className="mt-3 d-flex flex-column pb-5">
          <h3 className="fs-3 text-primary-color mb-2">{item.title}</h3>
          <p className="pFont text-primary-color mb-3">
            {dateRange(item.startDate, item.endDate)} · {money(item.price)}
          </p>
          <p className="retreat-desc fs-5 mb-5">{item.description}</p>

          <div className="mt-auto">
            <div className="retreat-tags-container mb-4">
              {(item.focus || []).map((focus, idx) => (
                <span className="focus-tag" key={idx}>
                  {focus}
                </span>
              ))}
            </div>

            <button className="blob-btn px-5 fs-4 py-3" onClick={() => navigate(`/retreats/${item.slug}`)}>
              {item.soldOut ? "SEE DETAILS" : "RESERVE"}
            </button>
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default RetreatCards;
