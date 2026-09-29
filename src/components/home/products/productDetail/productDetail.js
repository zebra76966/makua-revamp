import React, { useState } from "react";
import { Container, Row, Col, Modal, Carousel } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { TfiPlus } from "react-icons/tfi";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { BsArrowLeftCircle } from "react-icons/bs";

import useAsync from "../../../../hooks/useAsync";
import { retreatsAPI, money, dateRange } from "../../../../services/api";
import "./productDetail.css";

/* Shown under "What's included" for every retreat. Anything specific to
   one retreat comes from its own highlights, above this. */
const whatsIncluded = [
  {
    title: "Wellness & Healing",
    items: ["Daily yoga and meditation sessions", "Access to spa treatments (massages, bodywork)", "Use of natural soaking baths and thermal-fed pools"],
  },
  {
    title: "Accommodation & Comfort",
    items: ["Private or shared cabins, suites, or chalets", "Rooms include private bathroom, balcony, kitchenette, fan or AC"],
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

const GALLERY_FALLBACK = ["/gallery/gal1.jpg", "/gallery/gal2.jpg", "/gallery/gal3.jpg", "/gallery/gal4.jpg"];

const ProductDetail = () => {
  const { slug } = useParams();
  const [show, setShow] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [openIndex, setOpenIndex] = useState(0);
  const navigate = useNavigate();

  const { data: retreat, loading, error } = useAsync(() => retreatsAPI.get(slug), [slug]);

  if (loading) {
    return (
      <div className="ch-100 grain-bg-light d-flex align-items-center justify-content-center">
        <p className="fs-3 text-primary-color">Loading…</p>
      </div>
    );
  }

  if (error || !retreat) {
    return (
      <div className="ch-100 grain-bg-light d-flex flex-column align-items-center justify-content-center gap-4 text-center px-4">
        <p className="fs-3 text-primary-color mb-0">
          {error?.status === 404 ? "We couldn't find that retreat." : "We couldn't load that retreat just now."}
        </p>
        <button className="blob-btn px-5 fs-5 py-3" onClick={() => navigate("/retreats")}>SEE ALL RETREATS</button>
      </div>
    );
  }

  /* Photos: the retreat's own picture first, then any room photos. */
  const roomPhotos = (retreat.rooms || []).flatMap((r) => r.photos || []);
  const images = [retreat.image, ...roomPhotos, ...GALLERY_FALLBACK].filter(Boolean).slice(0, 6);
  const included = retreat.highlights?.length
    ? [{ title: "This retreat", items: retreat.highlights }, ...whatsIncluded]
    : whatsIncluded;

  return (
    <>
      <div className="ch-100 grain-bg-light">
        <div className="h-100 position-relative">
          <motion.img
            src={retreat.image || GALLERY_FALLBACK[0]}
            alt={retreat.title}
            className="prodHero"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          />

          <button
            className="d-flex gap-2 border-0 ms-5 mb-2 position-absolute bottom-0 start-0 bg-none d-flex align-items-center"
            onClick={() => navigate(-1)}
          >
            <BsArrowLeftCircle className="fs-1 me-2" />
            <span className="wSpacing pFont fw-bold lead"> GO BACK</span>
          </button>
        </div>
      </div>

      <div className="grain-bg-light ch-100 d-flex align-items-center px-5">
        <div className="px-xl-5">
          <Container fluid className="px-lg-5">
            <Row className="mt-5 align-items-start">
              <Col md={6}>
                <div className="main-img-wrapper">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeIndex}
                      src={images[activeIndex]}
                      className="main-img"
                      alt={`${retreat.title} — view ${activeIndex + 1}`}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                    />
                  </AnimatePresence>
                </div>

                <Row className="mt-3 g-2">
                  {images.slice(0, 3).map((img, idx) => (
                    <Col md={4} xs={4} key={img + idx}>
                      <div className="position-relative">
                        <motion.img
                          src={img}
                          className={`thumb-img ${activeIndex === idx ? "active" : ""}`}
                          alt={`${retreat.title} thumbnail ${idx + 1}`}
                          onClick={() => setActiveIndex(idx)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.97 }}
                        />
                        {idx === 2 && images.length > 3 && (
                          <div
                            className="toggler d-flex align-items-center justify-content-center"
                            onClick={() => setShow(true)}
                            role="button"
                            tabIndex={0}
                            aria-label="See all photos"
                            onKeyDown={(e) => { if (e.key === "Enter") setShow(true); }}
                          >
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
                <h1 className="text-start display-4 mt-0 text-uppercase">{retreat.title}</h1>

                <div className="d-flex gap-5 fw-bold tabValue my-3">
                  <p className="fs-5">{money(retreat.price)}</p>
                  <p className="fs-5">
                    {retreat.soldOut ? (
                      <span className="text-warning-color pFont me-2">FULLY BOOKED</span>
                    ) : (
                      <>
                        <span className="text-warning-color pFont me-2">
                          {retreat.placesLeft} {retreat.placesLeft === 1 ? "PLACE" : "PLACES"}
                        </span>
                        AVAILABLE
                      </>
                    )}
                  </p>
                </div>

                {retreat.location && (
                  <div className="d-flex gap-2 fw-bold tabValue my-4 py-2 align-items-center">
                    <img src="/location-pin.svg" height={40} alt="" />
                    <p className="fs-5 my-0 text-uppercase">{retreat.location}</p>
                  </div>
                )}

                <div className="fw-bold tabValue mb-3 mt-4">
                  <p className="fs-5 mb-0 fw-bold">DATES</p>
                </div>
                <div className="d-flex gap-3 fw-bold tabValue mb-4 align-items-center mt-2 justify-content-start flex-wrap">
                  <span className="fs-5 pFont">{dateRange(retreat.startDate, retreat.endDate)}</span>
                  <span className="fs-5 pFont text-warning-color">·</span>
                  <span className="fs-5 pFont">{retreat.nights} nights</span>
                </div>

                <h6 className="facilities-title pFont mt-5 mb-4 fw-bold text-dark-color fs-5">OVERVIEW</h6>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-dark-color fs-5"
                >
                  {retreat.description}
                </motion.p>

                <button
                  className="btn bg-black rounded-0 border-0 fs-5 pFont fw-bold text-secondary-color wSpacing p-4 py-5 w-100 mt-5"
                  disabled={retreat.soldOut}
                  onClick={() => navigate(`/book/${retreat.slug}`)}
                >
                  {retreat.soldOut ? "FULLY BOOKED" : "RESERVE YOUR PLACE"}
                </button>

                {/* ---------------- WHAT'S INCLUDED ---------------- */}
                <div className="included-section mt-5 pt-5">
                  <p className="included-eyebrow pFont text-uppercase mb-3 fs-5 fw-bold wSpacing">WHAT'S INCLUDED</p>

                  <div className="included-list">
                    {included.map((section, idx) => {
                      const isOpen = openIndex === idx;
                      return (
                        <div key={section.title} className="included-item">
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
                                {section.items.map((item, i) => <li key={i}>{item}</li>)}
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
            <Carousel activeIndex={activeIndex} onSelect={(i) => setActiveIndex(i)} indicators interval={3500}>
              {images.map((img, index) => (
                <Carousel.Item key={img + index}>
                  <img className="d-block w-100" src={img} alt={`${retreat.title} ${index + 1}`} />
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
