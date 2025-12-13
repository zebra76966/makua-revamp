import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { motion } from "framer-motion";
import "./cero.css";
import FoldedPaperReveal from "../../../animation/CrumpledPaperReveal";
import { HiArrowLongRight } from "react-icons/hi2";

const fadeIn = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export default function Cero() {
  return (
    <Container fluid className="grain-bg retreat-wrapper py-5 ch-100 px-5 ch-100 d-flex align-items-center py-5">
      <div className="px-xl-5 py-xl-5">
        <Row>
          <Col md={6}>
            <motion.h1 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="display-1   text-secondary-color">
              Facilitated
              <br />
              by Cerro Tusa
              <br />
              Springs
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className=" text-secondary-color fs-4 mt-5">
              In the sacred lands where Cerro Tusa rises, surrounded by rivers and watertalls that whisper ancient melodies, lies Makua, a place where water and earth unite in an eternal embrace. In
              the language of the ancestors, Makua means "mother of the earth", the origin of all life, where every drop and grain of earth carries the memory of the sacred.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className=" text-secondary-color  mt-5">
              In the sacred lands where Cerro Tusa rises, surrounded by rivers and watertalls that whisper ancient melodies, lies Makua, a place where water and earth unite in an eternal embrace. In
              the language of the ancestors, Makua means "mother of the earth", the origin of all life, where every drop and grain of earth carries the memory of the sacred.
            </motion.p>

            <button className="cstm-cta border-0 fs-5 mt-4 text-secondary-color pFont fw-bold p-0">
              FIND OUT
              <span className="d-block pFont ps-0 text-start d-flex align-items-center">
                MORE <HiArrowLongRight className="ms-auto ico me-2" />
              </span>
            </button>
          </Col>

          <Col md={6}>
            <div className="cero-collage">
              <motion.div className="center-polaroid-cero">
                <img src="/retreat/forest.png" alt="" />
              </motion.div>

              <motion.img src="/retreat/bedroom.jpg" className="collage-img bedroom-top-cero" variants={fadeIn} initial="hidden" whileInView="show" />

              <motion.img src="/retreat/treehouse.png" className="collage-img treehouse-img-cero" variants={fadeIn} initial="hidden" whileInView="show" />

              <div className="collage-img frog-right">
                <FoldedPaperReveal image={"/retreat/froggyHold.png"} heightDef={"350px"} widthDef={"228px"} />
              </div>
              <motion.img src="/retreat/bedroom1.png" className="collage-img bedroom-bottom-cero" variants={fadeIn} initial="hidden" whileInView="show" />
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
}
