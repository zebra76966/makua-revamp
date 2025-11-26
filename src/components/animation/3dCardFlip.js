import React from "react";
import { Container, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import "./3dCardFlip.css";

export default function Floating3DCard({ item, id }) {
  return (
    <div className="h-100">
      <motion.div
        className="card-3d-wrapper h-100"
        whileInView={{ rotateY: [0, 180] }}
        transition={{
          duration: 2,
          ease: "easeOut",
          delay: 1,
        }}
      >
        {/* ------------------------------------
              FRONT SIDE  (with floating items)
          ------------------------------------- */}
        <div className="card-face card-front">
          <div className="card-base"></div>

          {/* ⭐ Floating items stay on FRONT side */}
          <motion.img
            src="/cards/stars.svg"
            className="floating-item"
            style={{
              height: "30%",
              width: "90%",
              left: "50%",
              top: "2%",
              transform: "translateX(-50%) translateZ(40px)",
            }}
          />

          <motion.img
            src="/cards/sun.svg"
            className="floating-item"
            style={{
              height: "40%",
              left: "20%",
              top: "10%",
              transform: "translateZ(60px)",
            }}
            animate={{ rotate: [0, 360] }}
            transition={{
              duration: 20,
              ease: "linear",
              delay: 0.5,
              repeat: Infinity,
            }}
          />

          <motion.img
            src="/cards/clouds.svg"
            className="floating-item w-100"
            style={{
              left: "50%",
              top: "30%",
              transform: "translateX(-50%) translateZ(100px)",
            }}
          />

          <motion.img
            src="/cards/forggy.svg"
            className="floating-item"
            style={{
              height: "50%",
              left: "50%",
              top: "50%",
              transform: "translateX(-50%) translateZ(150px)",
            }}
          />

          <motion.img
            src="/cards/flower.svg"
            className="floating-item w-100"
            style={{
              left: "50%",
              top: "60%",
              transform: "translateX(-50%) translateZ(180px)",
            }}
          />

          <motion.img
            src="/logo-color-primary.svg"
            className="floating-item w-100"
            style={{
              left: "80%",
              top: "105%",
              height: "10%",
              transform: "translateX(-50%) translateZ(100px)",
            }}
          />
        </div>

        {/* ------------------------------------
              BACK SIDE (your Retreat Card)
          ------------------------------------- */}
        <div className="card-face card-back grain-bg-light">
          <Card className="retreat-card shadow-sm text-center rounded-0 h-100" style={{ background: "transparent" }}>
            <div className="retreat-img-wrapper">
              {item?.tag && <div className="retreat-tag px-3 py-1 fs-6">{item.tag}</div>}
              <Card.Img src={item?.image} alt={item?.title} className="retreat-img" />
            </div>

            <Card.Body className="mt-3 d-flex flex-column pb-5">
              <p className="retreat-desc fs-4 mb-5 text-primary-color">{item?.description}</p>

              <div className="mt-auto">
                <div className="retreat-tags-container mb-4">
                  {item?.focus?.map((focus, idx) => (
                    <span className="focus-tag text-primary-color fs-6" key={idx}>
                      {focus}
                    </span>
                  ))}
                </div>
                <button className="blob-btn px-5 fs-4 py-3">RESERVE</button>
              </div>
            </Card.Body>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
