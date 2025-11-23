import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import { motion } from "framer-motion";

// Animation for leaves / flowers
const leafVariant = {
  hidden: { scale: 0, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.9, ease: "easeOut" },
  },
};

export default function SpiritOfWaterEarth() {
  return (
    <Container fluid className="d-flex flex-column align-items-center justify-content-start py-5 ch-100 text-light text-center grain-bg">
      {/* FROG (HOVER ANIMATION) */}
      <motion.img
        src="/patterns/froggyMeditate.svg"
        alt="frog"
        style={{ height: "15dvh" }}
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* TITLE */}
      <div className="d-flex align-items-end justify-content-center mb-4" style={{ gap: 20 }}>
        {/* TOP LEFT */}
        <motion.img src="/patterns/LeafsLeft.svg" style={{ width: "10dvw", maxWidth: "250px" }} variants={leafVariant} initial="hidden" whileInView="show" viewport={{ once: false }} />

        <h1>
          THE SPIRIT OF WATER <br /> AND EARTH
        </h1>

        {/* TOP RIGHT */}
        <motion.img
          src="/patterns/LeafsLeft.svg"
          style={{ width: "10dvw", maxWidth: "250px", rotateY: "180deg" }}
          variants={leafVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
        />
      </div>

      <Row className="px-0">
        <Col md={7} lg={12} className="mx-auto">
          <div className="d-flex align-items-center justify-content-center w-100">
            <div className="text-end ">
              <motion.img
                src="/patterns/leafFlower.svg"
                className="mb-3 d-block ms-auto"
                style={{ width: "10dvw", maxWidth: "130px" }}
                variants={leafVariant}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false }}
              />
              <motion.img src="/patterns/leafsBranchDown.svg" style={{ width: "18dvw", maxWidth: "408px" }} variants={leafVariant} initial="hidden" whileInView="show" viewport={{ once: false }} />
            </div>

            <p className="fs-3 w-75 mx-4 my-0" style={{ maxWidth: "1051px" }}>
              Makua is a sanctuary of healing and transformation set in the sacred landscapes of Cerro Tusa, Colombia. Rooted in ancient wisdom and the natural elements, it offers a space where water
              and earth unite to support deep renewal—physically, emotionally, and spiritually. Honoring the earth as the “Mother of All,” Makua blends ancestral knowledge with alternative therapies
              to help veterans, seekers, and all who arrive break free from cycles of trauma and rediscover their inner strength and purpose. More than just a retreat, Makua is a return to the
              source—a place where nature guides the path back to wholeness.
            </p>

            <div className="text-start">
              <motion.img
                src="/patterns/leafFlower.svg"
                className="mb-3 d-block"
                style={{ width: "10dvw", maxWidth: "130px", rotateY: "180deg" }}
                variants={leafVariant}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false }}
              />
              <motion.img
                src="/patterns/leafsBranchDown.svg"
                style={{ width: "18dvw", maxWidth: "408px", rotateY: "180deg" }}
                variants={leafVariant}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false }}
              />
            </div>
          </div>

          <div className="d-flex align-items-start justify-content-center w-100" style={{ transform: "translateY(-60px)" }}>
            <div className="justify-content-center d-flex gap-1 align-items-end">
              <motion.img
                src="/patterns/leafsBranch.svg"
                className="d-block ms-auto"
                style={{ width: "50dvw", maxWidth: "482px" }}
                variants={leafVariant}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false }}
              />
              <motion.img src="/patterns/leafEmb.svg" style={{ width: "30dvw", maxWidth: "262px" }} variants={leafVariant} initial="hidden" whileInView="show" viewport={{ once: false }} />
              <motion.img
                src="/patterns/leafsBranch.svg"
                className=" d-block ms-auto"
                style={{ width: "50dvw", maxWidth: "482px", rotateY: "180deg" }}
                variants={leafVariant}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false }}
              />{" "}
            </div>
          </div>
        </Col>
      </Row>

      {/* BOTTOM LEFT */}

      {/* BOTTOM RIGHT */}
    </Container>
  );
}
