import React, { useMemo } from "react";
import { Container, Carousel, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import "./upcomingCar.css";

const facilitiesData = [
  {
    title: "08.08.2025 8PM -  late",
    image: "/events/workshop1.jpg",
    points: ["An immersive gathering for healing, connection, and transformation—held in the sacred lands of Cerro Tusa."],
    cta: "RSVP",
  },
  {
    title: "Every Thursday 8AM",
    image: "/events/workshop2.png",
    points: [
      "A grounding yoga workshop designed to reconnect body, breath, and spirit. Open to all levels, this practice blends movement, stillness, and intention to support deeper presence and inner clarity.",
      "Location: by the waterfall \n No registration required",
    ],
    cta: null,
  },
  {
    title: "12.12.2025 (all day)",
    image: "/events/workshop3.jpg",
    points: ["An immersive gathering for healing, connection, and transformation—held in the sacred lands of Cerro Tusa.", "Price: $100"],
    cta: "BOOK NOW",
  },
  {
    title: "08.08.2025 8PM -  late",
    image: "/events/workshop1.jpg",
    points: ["An immersive gathering for healing, connection, and transformation—held in the sacred lands of Cerro Tusa."],
    cta: "RSVP",
  },
  {
    title: "Every Thursday 8AM",
    image: "/events/workshop2.png",
    points: [
      "A grounding yoga workshop designed to reconnect body, breath, and spirit. Open to all levels, this practice blends movement, stillness, and intention to support deeper presence and inner clarity.",
      "Location: by the waterfall \n No registration required",
    ],
    cta: null,
  },
  {
    title: "12.12.2025 (all day)",
    image: "/events/workshop3.jpg",
    points: ["An immersive gathering for healing, connection, and transformation—held in the sacred lands of Cerro Tusa.", "Price: $100"],
    cta: "BOOK NOW",
  },
];

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
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

const UpcomingCarousel = () => {
  const desktopChunks = useMemo(() => chunkArray(facilitiesData, 3), []);
  const tabletChunks = useMemo(() => chunkArray(facilitiesData, 2), []);
  const mobileChunks = useMemo(() => chunkArray(facilitiesData, 1), []);

  return (
    <div className="grain-bg-offwhite facilities-section px-5 ch-100">
      <div className="px-5">
        <Container fluid className="px-lg-5">
          <h2 className="facilities-title text-center mb-5 display-6">UPCOMING</h2>

          {/* DESKTOP */}
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
                      <Col lg={4} key={i}>
                        <FacilityCard item={item} i={i} />
                      </Col>
                    ))}
                  </Row>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>

          {/* TABLET */}
          <div className="d-none d-md-block d-lg-none">
            <Carousel interval={null} indicators={false}>
              {tabletChunks.map((group, index) => (
                <Carousel.Item key={index}>
                  <Row className="g-4">
                    {group.map((item, i) => (
                      <Col md={6} key={i}>
                        <FacilityCard item={item} i={i} />
                      </Col>
                    ))}
                  </Row>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>

          {/* MOBILE */}
          <div className="d-block d-md-none">
            <Carousel interval={null} indicators={false}>
              {mobileChunks.map((group, index) => (
                <Carousel.Item key={index}>
                  <FacilityCard item={group[0]} i={index} />
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        </Container>
      </div>
    </div>
  );
};

const FacilityCard = ({ item, i }) => (
  <motion.div custom={i} variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="facility-card ">
    <div className="facility-img-wrapper bg-secondary-color pb-2 shadow rounded-2 px-4 pt-4">
      <img src={item.image} alt={item.title} />
      <h5 className="facility-card-title fw-bold pFont text-center mt-3">{item.title}</h5>
    </div>

    <ul className="facility-list mt-4" style={{ listStyle: "none" }}>
      {item.points.map((point, idx) => (
        <li className="lead mt-4" key={idx}>
          {point}
        </li>
      ))}
    </ul>
    {item.cta && <button className="blob-btn px-5 fs-4 py-3 mt-auto">{item.cta}</button>}
  </motion.div>
);

export default UpcomingCarousel;
