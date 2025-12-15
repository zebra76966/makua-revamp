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

export default function OriginOfAmazon() {
  return (
    <Container fluid className="d-flex flex-column align-items-center justify-content-start py-5 ch-100 text-light text-center grain-bg">
      {/* FROG (HOVER ANIMATION) */}
      <motion.img
        src="/patterns/froggyMeditate.svg"
        alt="frog"
        style={{ height: "21dvh" }}
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* TITLE */}
      <div style={{ transform: "translateY(-8%)" }}>
        <div className="d-flex align-items-end justify-content-center mb-0 text-secondary-color" style={{ gap: 20 }}>
          {/* TOP LEFT */}
          <motion.img src="/patterns/LeafsLeft.svg" style={{ width: "10dvw", maxWidth: "250px" }} variants={leafVariant} initial="hidden" whileInView="show" viewport={{ once: false }} />

          <h1 className="display-4 ">
            ORIGINS IN THE <br /> AMAZON
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

              <p className="fs-3 w-75 mx-4 my-0 text-secondary-color" style={{ maxWidth: "1051px" }}>
                In the heart of the rainforest, far from cities and clocks, healers tell of a vine that carries the voice of the spirits. No one knows how the first person found it. Some say the
                plants themselves whispered the recipe. Others believe the jungle revealed it through vision. From this mystery came ayahuasca - a sacred brew made by joining the vine Banisteriopsis
                caapi with the leaves of Psychotria viridis. Alone, neither plant opens the door. Together, they awaken a profound medicine.
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
      </div>

      {/* BOTTOM LEFT */}

      {/* BOTTOM RIGHT */}
    </Container>
  );
}
