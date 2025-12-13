import React, { useMemo } from "react";
import { Container, Carousel, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import "./FacilitiesCarousel.css";

const facilitiesData = [
  {
    title: "ACCOMMODATIONS",
    image: "/gallery/gal2.jpg",
    points: [
      "Private cabinas, suites, and chalets",
      "All with private bathrooms and views",
      "Balcony or terrace in every unit",
      "Mini kitchenette (fridge, microwave, stovetop)",
      "Ceiling fan or AC depending on room type",
    ],
  },
  {
    title: "POOLS & WATER FEATURES",
    image: "/retreat/bathtub.jpg",
    points: ["4 outdoor pools (thermal-fed & spring-fed)", "Natural-style lagoon for relaxing dips", "Open-air soaking baths", "Water features blended with the landscape"],
  },
  {
    title: "WELLNESS & RELAXATION",
    image: "/gallery/gal4.jpg",
    points: ["Full spa services: massages, body treatments", "Yoga and meditation spaces", "Energy healing & alternative therapies", "Outdoor fitness area and gym zone"],
  },
  {
    title: "ACCOMMODATIONS",
    image: "/gallery/gal2.jpg",
    points: [
      "Private cabinas, suites, and chalets",
      "All with private bathrooms and views",
      "Balcony or terrace in every unit",
      "Mini kitchenette (fridge, microwave, stovetop)",
      "Ceiling fan or AC depending on room type",
    ],
  },
  {
    title: "POOLS & WATER FEATURES",
    image: "/gallery/gal2.jpg",
    points: ["4 outdoor pools (thermal-fed & spring-fed)", "Natural-style lagoon for relaxing dips", "Open-air soaking baths", "Water features blended with the landscape"],
  },
  {
    title: "WELLNESS & RELAXATION",
    image: "/gallery/gal5.jpg",
    points: ["Full spa services: massages, body treatments", "Yoga and meditation spaces", "Energy healing & alternative therapies", "Outdoor fitness area and gym zone"],
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

const FacilitiesCarousel = () => {
  const desktopChunks = useMemo(() => chunkArray(facilitiesData, 3), []);
  const tabletChunks = useMemo(() => chunkArray(facilitiesData, 2), []);
  const mobileChunks = useMemo(() => chunkArray(facilitiesData, 1), []);

  return (
    <div className="grain-bg-offwhite facilities-section px-5 ch-100">
      <div className="px-5">
        <Container fluid className="px-lg-5">
          <h2 className="facilities-title text-center mb-5 display-6">FACILITIES</h2>

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

    <ul className="facility-list mt-4">
      {item.points.map((point, idx) => (
        <li className="lead mt-2" key={idx}>
          {point}
        </li>
      ))}
    </ul>
  </motion.div>
);

export default FacilitiesCarousel;
