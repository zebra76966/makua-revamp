import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import "./introSpirit.css";

const IntroSpirit = () => {
  return (
    <div className="grain-bg-offwhite d-flex align-items-center justify-content-center  py-5 px-5 ch-100">
      <div className="px-xl-5">
        <Container fluid className="px-5">
          <Row className="align-items-start g-5 px-5">
            <Col md={7}>
              <motion.h1 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="display-1   text-warning-color">
                The Spirit
                <br />
                of Water
                <br />& Earth
              </motion.h1>
            </Col>

            <Col md={5}>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="form-box ">
                <img alt="" src="/retreat/aboutView.png" className="w-100" />
              </motion.div>
            </Col>

            <Col md={7}>
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className=" text-warning-color fs-4">
                In the sacred lands where Cerro Tusa rises, surrounded by rivers and watertalls that whisper ancient melodies, lies Makua, a place where water and earth unite in an eternal embrace. In
                the language of the ancestors, Makua means "mother of the earth", the origin of all life, where every drop and grain of earth carries the memory of the sacred.
              </motion.p>
            </Col>

            <Col md={5}>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="form-box">
                <p className="text-warning-color  ">
                  Visitors to Makua find in its rivers and lagoons a reflection of their own transformation. Water, always in motion, teaches that true growth occurs when we allow ourselves to flow,
                  embracing the cycles of life. At the same time, Makua's fertile land nourishes both body and spirit, reminding us that everything we need to flourish is already in nature.
                </p>

                <p className="text-warning-color mt-2  ">
                  In Makua, water and earth offer not only sustenance, but also wisdom. Those who come here discover that, by listening to the flow of the rivers and feeling the strength of the
                  mountain, they can reconnect with the very origin of life.
                </p>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default IntroSpirit;
