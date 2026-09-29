import React, { useState } from "react";
import { Container, Row, Col, Modal, Carousel } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { HiArrowLongRight } from "react-icons/hi2";
import { TfiPlus } from "react-icons/tfi";
import { motion, AnimatePresence } from "framer-motion";
import prodsData from "../merch.json";
import "./productDetail.css";
import { useNavigate, useNavigation, useParams } from "react-router-dom";
import { BsArrowLeftCircle } from "react-icons/bs";

const whatsIncluded = [
  {
    title: "Ceremony & Integration",
    items: [
      "3 to 4 Ayahuasca ceremonies with experienced facilitators",
      "1:1 preparation and integration support",
      "Daily sharing circles and guided reflection",
      "Optional energy healing and alternative therapies",
    ],
  },
  {
    title: "Wellness & Healing",
    items: ["Daily yoga and meditation sessions", "Access to spa treatments (massages, bodywork)", "Use of natural soaking baths and thermal-fed pools"],
  },
  {
    title: "Accommodation & Comfort",
    items: ["6 nights / 7 days stay at Cerro Tusa Springs", "Private or shared cabins, suites, or chalets", "Rooms include private bathroom, balcony, kitchenette, fan or AC"],
  },
  {
    title: "Food & Nourishment",
    items: ["Daily plant-based or retreat-friendly meals (breakfast, lunch, dinner)", "Continental breakfast included", "Herbal teas and hydration available throughout"],
  },
  {
    title: "Nature & Amenities",
    items: ["Access to natural pools, lagoons, and gardens", "Scenic nature trails and outdoor gathering spaces", "Fire pit for group use and evening connection"],
  },
  {
    title: "Guest Support",
    items: ["Airport or local shuttle assistance (optional add-on)", "Wi-Fi in rooms and common areas", "Retreat coordination & event support", "Multilingual staff on-site"],
  },
];

const ProductDetail = () => {
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [openIndex, setOpenIndex] = useState(0);
  const navigate = useNavigate();

  const images = ["/gallery/gal1.jpg", "/gallery/gal2.jpg", "/gallery/gal3.jpg", "/gallery/gal1.jpg"];
  return (
    <>
      <div className="ch-100 grain-bg-light">
        <div className="h-100 position-relative">
          <motion.img
            src={prodsData[id].image}
            className="prodHero"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          />

          <button className="d-flex gap-2 border-0 ms-5 mb-2 position-absolute bottom-0 start-0 bg-none d-flex align-items-center" onClick={() => navigate(-1)}>
            <BsArrowLeftCircle className="fs-1 me-2" />
            <span className="wSpacing pFont fw-bold lead"> GO BACK</span>
          </button>
        </div>
      </div>

      <div className="grain-bg-light ch-100 d-flex align-items-center px-5">
        <div className="px-xl-5">
          <Container fluid className="px-lg-5">
            <Row className="mt-5 align-items-start ">
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
                        {idx == 2 && (
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
              <Col md={6} className="ps-xl-5">
                <h1 className=" text-start display-4 mt-0 ">AYAHUASCA RETREAT</h1>
                <div className="d-flex gap-5 fw-bold tabValue my-3">
                  <p className=" fs-5">$300</p>
                  <p className=" fs-5">
                    <span className="text-warning-color pFont me-2">10 SPOTS</span>
                    AVAILABLE
                  </p>
                </div>

                <div className="d-flex gap-2 fw-bold tabValue my-4 py-2 align-items-center">
                  <img src="/location-pin.svg" height={40} />
                  <p className=" fs-5 my-0">CERRO TUSA</p>
                </div>

                <div className=" fw-bold tabValue mb-3 mt-4">
                  <p className=" fs-5 mb-0 fw-bold">DAYS</p>
                </div>
                <div className="d-flex gap-2 fw-bold tabValue mb-4 align-items-center mt-2 justify-content-start">
                  <button className="btnDays fs-5 fw-bold pFont">3,5</button>
                  <button className="btnDays fs-5 fw-bold pFont">7</button>
                </div>

                <h6 className="facilities-title pFont mt-5 mb-4 fw-bold text-dark-color fs-5">OVERVIEW</h6>

                <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className=" text-dark-color  fs-5">
                  In the heart of the Colombian mountains, where rivers whisper and stars witness the night, Makua invites you to step into a sacred tradition that transcends time. Here, ayahuasca is
                  not a trend—it’s a teacher. Woven from the ancestral wisdom of the Amazon, this powerful plant medicine offers a portal to healing, truth, and transformation. Each ceremony is a
                  return: to the body, to the earth, and to the soul.
                </motion.p>
                <button className="btn bg-black rounded-0 border-0 fs-5 pFont fw-bold text-secondary-color  wSpacing p-4 py-5 w-100 mt-5">ADD TO CART</button>

                {/* ---------------- WHAT'S INCLUDED ---------------- */}
                <div className="included-section mt-5 pt-5">
                  <p className="included-eyebrow pFont text-uppercase mb-3 fs-5 fw-bold wSpacing">WHAT’S INCLUDED</p>

                  <div className="included-list">
                    {whatsIncluded.map((section, idx) => {
                      const isOpen = openIndex === idx;

                      return (
                        <div key={idx} className="included-item">
                          <button className="included-header" onClick={() => setOpenIndex(isOpen ? null : idx)}>
                            <span className="pFont fs-3">{section.title}</span>
                            <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.25 }} className="included-icon display-5">
                              <TfiPlus />
                            </motion.span>
                          </button>

                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.ul
                                className="included-content lead"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.35, ease: "easeOut" }}
                              >
                                {section.items.map((item, i) => (
                                  <li key={i}>{item}</li>
                                ))}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>

                  <div className="included-divider mt-5" />
                </div>
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
    </>
  );
};

export default ProductDetail;
