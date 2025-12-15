import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { Container, Row, Col } from "react-bootstrap";
import FrogBlink from "../animation/frogBlink";
import { useLocation, useNavigate } from "react-router-dom";

import { Link, Outlet } from "react-router-dom";
import "./navbar.css";

export default function MakuaNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isProductDetail, setIsProductDetail] = useState(false);
  useEffect(() => {
    const isDetailPage = location.pathname.startsWith("/product_detail/");
    setIsProductDetail(isDetailPage);
  }, [location.pathname]);

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
      <div className={`position-absolute top-0 start-0 w-100 py-3 px-4 d-flex justify-content-between align-items-center text-light`} style={{ zIndex: 50 }}>
        <div onClick={() => setOpen(true)} className="d-flex flex-column justify-content-center fs-5 fw-bold" style={{ cursor: "pointer", letterSpacing: "4px" }}>
          <span className="mb-1 pFont text-secondary-color" style={{ cursor: "pointer", filter: isProductDetail ? "brightness(0) saturate(100%)" : "none" }}>
            MENU
          </span>
          <div className="bg-secondary-color mx-auto" style={{ width: "70%", height: "2px", filter: isProductDetail ? "brightness(0) saturate(100%)" : "none" }}></div>
        </div>

        <motion.img
          src="/logo-color.svg"
          alt="logo"
          className="img-fluid"
          animate={{ opacity: showLogo ? 1 : 0, y: showLogo ? 0 : -20, height: showLogo ? "9dvw" : "2dvw" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{
            filter: isProductDetail ? "brightness(0) saturate(100%)" : "none",
          }}
          onClick={() => navigate("/")}
        />

        <div className="d-flex align-items-center gap-3 fs-3 text-secondary-color">
          <div className="position-relative" style={{ cursor: "pointer" }}>
            <img src="/shopping-cart.svg" height={40} style={{ cursor: "pointer", filter: isProductDetail ? "brightness(0) saturate(100%)" : "none" }} />
            <div
              className="position-absolute d-flex justify-content-center align-items-center text-white rounded-circle pFont"
              style={{ top: "-8px", right: "-10px", background: "#c68445", width: "20px", height: "20px", fontSize: "12px" }}
            >
              1
            </div>
          </div>
          <img src="/user.svg" height={35} style={{ cursor: "pointer", filter: isProductDetail ? "brightness(0) saturate(100%)" : "none" }} />
        </div>
      </div>

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
              zIndex: 9999,
            }}
          >
            <div className="navFroggy">
              <FrogBlink />
            </div>

            <div className="w-100 px-4 d-flex justify-content-between align-items-center text-light" style={{ letterSpacing: "4px", fontWeight: 300, zIndex: 100 }}>
              <div onClick={() => setOpen(false)} className="d-flex flex-column" style={{ cursor: "pointer" }}>
                <span className="mb-1 fw-bold fs-5 pFont text-secondary-color">CLOSE</span>
                <div className="bg-secondary-color mx-auto" style={{ width: "70%", height: "2px" }} />
              </div>

              <img
                src="/logo-color-primary.svg"
                alt="logo"
                className="img-fluid"
                style={{ height: "8dvw" }}
                onClick={() => {
                  navigate("/");
                  setOpen(false);
                }}
              />

              <div className="d-flex align-items-center gap-3 fw-bold fs-3">
                <div className="position-relative" style={{ cursor: "pointer" }}>
                  <img src="/shopping-cart.svg" height={40} />
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
                <img src="/user.svg" height={35} style={{ cursor: "pointer" }} />
              </div>
            </div>

            <Container className="text-center mt-4" style={{ zIndex: 100 }}>
              <Row className="justify-content-center">
                <Col xs="auto">
                  <div className="d-flex flex-column align-items-center">
                    {[
                      { label: "ABOUT", path: "/about" },
                      { label: "RESORT", path: "/resort" },
                      { label: "RETREATS", path: "/retreats" },
                      { label: "WORKSHOPS & EVENTS", path: "/workshops" },
                      { label: "AYAHUASCA", path: "/ayahuasca" },
                      { label: "CONTACT", path: "/contact" },
                      { label: "FAQ", path: "/faq" },
                    ].map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        style={{ cursor: "pointer" }}
                        className="fs-1 fw-bold  text-primary-color navItems"
                        onClick={() => setOpen(false)}
                      >
                        <Link to={item.path} className=" hFont text-primary-color" style={{ textDecoration: "none" }}>
                          {item.label}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </Col>
              </Row>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>

      <Outlet />
    </>
  );
}
