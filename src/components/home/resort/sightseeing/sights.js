import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { motion } from "framer-motion";
import "./sights.css";

export default function SightSeeing() {
  return (
    <div className="ch-100">
      {[...Array(3)].map((_, i) => {
        return (
          <div className={`panelSlide slide${i + 1}`}>
            <Container className=" py-5">
              <motion.p initial={{ opacity: 0, y: -100 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="small p-Font mb-0 fs-5 fw-bold  text-secondary-color">
                SIGHT <br /> SEEING
              </motion.p>
              <Row className="d-flex align-items-center justify-content-center py-3">
                <Col md={6} lg={5}>
                  <motion.h1 initial={{ opacity: 0, y: -100 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="display-6   text-secondary-color mt-2">
                    Name of activity or
                    <br />
                    location
                  </motion.h1>
                </Col>
                <Col md={6} lg={5}>
                  <motion.p initial={{ opacity: 0, y: -100 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className=" text-secondary-color  mt-2">
                    In the sacred lands where Cerro Tusa rises, surrounded by rivers and watertalls that whisper ancient melodies, lies Makua, a place where water and earth unite in an eternal
                    embrace. In the language of the ancestors, Makua means "mother of the earth", the origin of all life, where every drop and grain of earth carries the memory of the sacred.
                  </motion.p>
                </Col>
              </Row>
            </Container>
          </div>
        );
      })}
    </div>
  );
}
