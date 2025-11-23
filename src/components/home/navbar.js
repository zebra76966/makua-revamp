import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { Container, Row, Col } from "react-bootstrap";
import FrogBlink from "../animation/frogBlink";
import "./navbar.css";

export default function MakuaNavbar() {
  const [open, setOpen] = useState(false);
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    const handleSectionChange = (e) => {
      const index = e.detail.index;
      setShowLogo(index === 0); // show only on the first section
    };

    window.addEventListener("sectionChange", handleSectionChange);
    return () => window.removeEventListener("sectionChange", handleSectionChange);
  }, []);

  return (
    <>
      {/* TOP NAVBAR */}
      <div className={`position-absolute top-0 start-0 w-100 py-3 px-4 d-flex justify-content-between align-items-center text-light`} style={{ zIndex: 50 }}>
        {/* MENU BUTTON */}
        <div onClick={() => setOpen(true)} className="d-flex flex-column fs-5 fw-bold" style={{ cursor: "pointer", letterSpacing: "4px" }}>
          <span className="mb-1">MENU</span>
          <div className="bg-light" style={{ width: "50px", height: "2px" }}></div>
        </div>

        {/* LOGO */}
        <motion.img
          src="/logo-color.svg"
          alt="logo"
          className="img-fluid"
          animate={{ opacity: showLogo ? 1 : 0, y: showLogo ? 0 : -20, height: showLogo ? "10dvw" : "2dvw" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />

        {/* CART + USER */}
        <div className="d-flex align-items-center gap-3 fs-3">
          <div className="position-relative" style={{ cursor: "pointer" }}>
            <FaShoppingCart />
            <div
              className="position-absolute d-flex justify-content-center align-items-center text-white rounded-circle"
              style={{ top: "-8px", right: "-10px", background: "#c68445", width: "20px", height: "20px", fontSize: "12px" }}
            >
              1
            </div>
          </div>
          <FaUser style={{ cursor: "pointer" }} />
        </div>
      </div>

      {/* FULLSCREEN MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "100vh" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="position-fixed w-100 d-flex flex-column align-items-center overflow-hidden py-2"
            style={{
              inset: 0,
              backgroundColor: "#CFC3B4",
              // backgroundImage: `url(froghero-close.svg)`,
              // backgroundRepeat: "no-repeat",
              // backgroundPosition: "center",
              // backgroundSize: "400dvh",
              zIndex: 100,
            }}
          >
            <div className="navFroggy">
              <FrogBlink />
            </div>

            {/* CLOSE BUTTON */}
            <div className="w-100 px-4 d-flex justify-content-between align-items-center text-light" style={{ letterSpacing: "4px", fontWeight: 300, zIndex: 100 }}>
              <div onClick={() => setOpen(false)} className="d-flex flex-column" style={{ cursor: "pointer" }}>
                <span className="mb-1 fw-bold fs-5">CLOSE</span>
                <div className="bg-light" style={{ width: "50px", height: "2px" }} />
              </div>

              {/* LOGO */}
              <img src="/logo-color.svg" alt="logo" className="img-fluid" style={{ height: "10dvw" }} />

              {/* CART + USER */}
              <div className="d-flex align-items-center gap-3 fw-bold fs-3">
                <div className="position-relative" style={{ cursor: "pointer" }}>
                  <FaShoppingCart />
                  <div
                    className="position-absolute d-flex justify-content-center align-items-center text-white rounded-circle"
                    style={{
                      top: "-8px",
                      right: "-10px",
                      background: "#c68445",
                      width: "20px",
                      height: "20px",
                      fontSize: "1rem",
                    }}
                  >
                    1
                  </div>
                </div>
                <FaUser style={{ cursor: "pointer" }} />
              </div>
            </div>

            {/* CONTENT */}
            <Container className="text-center mt-4" style={{ zIndex: 100 }}>
              <Row className="justify-content-center">
                <Col xs="auto">
                  <div
                    className="d-flex flex-column align-items-center"
                    style={{
                      gap: "18px",
                      fontSize: "28px",
                      color: "#38482e",

                      fontFamily: "monospace",
                      letterSpacing: "2px",
                    }}
                  >
                    {["ABOUT", "RESORT", "RETREATS", "WORKSHOPS & EVENTS", "AYAHUASCA", "CONTACT", "FAQ"].map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        style={{ cursor: "pointer" }}
                        className="txt-stroke fs-2 fw-bold"
                      >
                        {item}
                      </motion.div>
                    ))}
                  </div>
                </Col>
              </Row>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
