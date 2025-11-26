import React, { useMemo } from "react";
import { Container, Card, Carousel, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import retreatsData from "./retreatsData.json";
import "./RetreatCards.css";
import Floating3DCard from "../../animation/3dCardFlip";

const cardVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
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

const RetreatCards = () => {
  // RESPONSIVE CHUNK LOGIC:
  const desktopChunks = useMemo(() => chunkArray(retreatsData, 3), []);
  const tabletChunks = useMemo(() => chunkArray(retreatsData, 2), []);
  const mobileChunks = useMemo(() => chunkArray(retreatsData, 1), []);

  return (
    <div className="ch-100 grain-bg-light d-flex align-items-center px-lg-5">
      <Container fluid className="py-5 px-5">
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
                    <Col lg={4} key={i} className="d-flex">
                      <motion.div custom={i} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: false }} className="w-100 h-100">
                        <Floating3DCard item={item} id={i} />

                        {/* <Card className="retreat-card shadow-sm text-center rounded-0 h-100" style={{ background: "transparent" }}>
                          <div className="retreat-img-wrapper">
                            {item.tag && <div className="retreat-tag px-3 py-1 fs-6">{item.tag}</div>}
                            <Card.Img src={item.image} alt={item.title} className="retreat-img" />
                          </div>

                          <Card.Body className="mt-3 d-flex flex-column pb-5">
                            <p className="retreat-desc fs-4 mb-5 text-primary-color">{item.description}</p>

                            <div className="mt-auto">
                              <div className="retreat-tags-container mb-4 ">
                                {item.focus.map((focus, idx) => (
                                  <span className="focus-tag text-primary-color fs-6" key={idx}>
                                    {focus}
                                  </span>
                                ))}
                              </div>
                              <button className="blob-btn px-5 fs-4 py-3 ">RESERVE</button>
                            </div>
                          </Card.Body>
                        </Card> */}
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
const CardSlide = ({ item, i }) => (
  <motion.div custom={i} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="w-100 h-100">
    <Card className="retreat-card shadow-sm text-center rounded-0 h-100" style={{ background: "transparent" }}>
      <div className="retreat-img-wrapper">
        {item.tag && <div className="retreat-tag px-3 py-1 fs-6">{item.tag}</div>}
        <Card.Img src={item.image} alt={item.title} className="retreat-img" />
      </div>

      <Card.Body className="mt-3 d-flex flex-column pb-5">
        <p className="retreat-desc fs-5 mb-5">{item.description}</p>

        <div className="mt-auto">
          <div className="retreat-tags-container mb-4">
            {item.focus.map((focus, idx) => (
              <span className="focus-tag" key={idx}>
                {focus}
              </span>
            ))}
          </div>

          <button className="blob-btn px-5 fs-4 py-3">RESERVE</button>
        </div>
      </Card.Body>
    </Card>
  </motion.div>
);

export default RetreatCards;
