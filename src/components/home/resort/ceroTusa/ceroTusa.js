import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Modal, Carousel } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { HiArrowLongRight } from "react-icons/hi2";
import { motion, AnimatePresence } from "framer-motion";
import "./ceroTusa.css";

export default function CerroTusaSprings() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const images = ["/gallery/gal1.jpg", "/gallery/gal2.jpg", "/gallery/gal3.jpg", "/gallery/gal1.jpg"];

  return (
    <div className="grain-bg-offwhite ch-100 d-flex align-items-center px-5">
      <div className="px-xl-5">
        <Container fluid className="px-lg-5">
          <h1 className="cerro-title text-center display-5">CERRO TUSA SPRINGS</h1>

          <Row className="mt-5 align-items-start gap-4">
            {/* LEFT SECTION */}
            <Col md={6}>
              <div className="main-img-wrapper">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeIndex}
                    src={images[activeIndex]}
                    className="main-img"
                    alt="resort"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                  />
                </AnimatePresence>

                {/* <div className="plus-icon" onClick={() => setShow(true)}>
                <FaPlus />
              </div> */}
              </div>

              <Row className="mt-3 g-2">
                {images.slice(0, 3).map((img, idx) => (
                  <Col md={4} xs={4} key={idx}>
                    <div className="position-relative">
                      <motion.img
                        src={img}
                        className={`thumb-img ${activeIndex === idx ? "active" : ""}`}
                        alt="thumb"
                        onClick={() => setActiveIndex(idx)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                      />
                      {idx === 2 && (
                        <div className="toggler d-flex align-items-center justify-content-center" onClick={() => setShow(true)}>
                          <FaPlus className="fs-1 text-secondary-color" />
                        </div>
                      )}
                    </div>
                  </Col>
                ))}
              </Row>
            </Col>

            {/* RIGHT SECTION */}
            <Col md={6} xl={5}>
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className=" text-dark-color fs-4 ">
                Set in the sacred Cerro Tusa region of Colombia, Cerro Tusa Springs offers private cabinas, suites, and chalets—each with a bathroom, terrace, and kitchenette. Guests can unwind in
                thermal and spring-fed pools, soak in natural lagoons, and enjoy spa services, yoga, and energy healing on request.
              </motion.p>
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className=" text-dark-color  ">
                The on-site restaurant serves Colombian and international cuisine, with a poolside bar and included continental breakfast. Guests can explore nature trails, relax in hammocks, or
                gather by the fire pit. With multilingual staff, free Wi-Fi, event support, and eco-conscious design, Cerro Tusa Springs is ideal for both personal getaways and transformative
                retreats.
              </motion.p>

              <h6 className="facilities-title pFont mt-5 mb-4 fw-bold text-dark-color">FACILITIES OVERVIEW</h6>

              <p className="facilities-list fs-5">COMFORTABLE STAYS | NATURAL WATER POOLS | WELLNESS & HEALING | CONSCIOUS DINING | IMMERSED IN NATURE | RETREAT-READY SERVICES</p>

              <button className="cstm-cta border-0 fs-5 text-dark-color pFont fw-bold p-0 mt-5" onClick={() => navigate("/retreats")}>
                <span className="d-block pFont ps-0 pe-0 text-start d-flex align-items-center">
                  BROWSE <HiArrowLongRight className="ms-auto ico me-0" />
                </span>
                RETREATS
              </button>
            </Col>
          </Row>
        </Container>
      </div>

      {/* MODAL SLIDESHOW */}
      <Modal show={show} onHide={() => setShow(false)} centered size="xl">
        <Modal.Body className="p-0">
          <Carousel activeIndex={activeIndex} onSelect={(i) => setActiveIndex(i)} indicators={true} interval={3500}>
            {images.map((img, index) => (
              <Carousel.Item key={index}>
                <img className="d-block w-100" src={img} alt={`slide ${index}`} />
              </Carousel.Item>
            ))}
          </Carousel>
        </Modal.Body>
      </Modal>
    </div>
  );
}
