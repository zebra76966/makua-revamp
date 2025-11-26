import React from "react";
import { Container } from "react-bootstrap";
import { motion } from "framer-motion";
import "./3dCardFlipOg.css";

export default function Floating3DCardOg() {
  return (
    <div className="bg-black ch-100">
      <Container className="d-flex justify-content-center align-items-center ">
        <motion.div
          className="card-3d-wrapper "
          animate={{
            rotateY: [0, 360],
          }}
          transition={{
            duration: 1,
            ease: "easeInOut",
          }}
        >
          <div className="card-base"></div>

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

          {/* TV Top Left */}
          <motion.img
            src="/cards/sun.svg"
            className="floating-item"
            style={{
              height: "40%",
              left: "50%",
              top: "10%",
              transform: "translateX(-50%) translateZ(60px)",
            }}
          />

          {/* Pacman */}
          <motion.img
            src="/cards/clouds.svg"
            className="floating-item w-100"
            style={{
              left: "50%",
              top: "30%",
              transform: "translateX(-50%) translateZ(100px)",
            }}
          />

          {/* Ghost */}
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

          {/* TV Bottom Right */}
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
        </motion.div>
      </Container>
    </div>
  );
}
