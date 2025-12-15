import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { color, motion } from "framer-motion";
import "./ayahuascaContact.css";

const AyahuascaContact = () => {
  return (
    <div className="grain-bg d-flex align-items-center justify-content-center  py-5 px-5 ch-100">
      <Container fluid className="px-5">
        <Row className="align-items-start justify-content-center g-5 px-5 text-center">
          {/* LEFT SIDE TEXT */}
          <Col md={12} xl={10} lg={9}>
            <motion.h1 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="display-4  text-secondary-color text-uppercase mb-4">
              Download the Ayahuasca <br /> Preparation Guide
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="mt-4 text-secondary-color fs-4 px-lg-5 px-2 mb-5">
              Learn how to prepare your body, mind, and spirit before attending a ceremony at Makua. Enter your email to receive the free PDF.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="form-box p-4">
              <Form>
                <div className="d-md-flex gap-3">
                  <Form.Group className="mb-3 w-100 text-start">
                    <Form.Label className="text-secondary-color pFont lead fw-bold " style={{ letterSpacing: "0.3em" }}>
                      NAME
                    </Form.Label>
                    <Form.Control type="text" placeholder="Enter name" className="p-3 py-4 bg-secondary-color border-0 rounded-0" />
                  </Form.Group>

                  <Form.Group className="mb-3 w-100 text-start">
                    <Form.Label className="text-secondary-color pFont lead fw-bold " style={{ letterSpacing: "0.3em" }}>
                      E-MAIL
                    </Form.Label>
                    <Form.Control type="email" placeholder="Enter e-mail" className="p-3 py-4 rounded-0 bg-secondary-color border-0 " />
                  </Form.Group>
                </div>

                <div className="d-md-flex align-items-center justify-content-between">
                  <div className="d-flex gap-3">
                    <div className="d-flex align-items-center gap-3 bg-secondary-color py-3 ps-3 pe-5  text-primary-color lead">
                      <Form.Check type="checkbox" id="not-robot" label="I am not a robot" className="custom-check" />
                    </div>
                    <div className="d-flex align-items-center gap-3 bg-secondary-color py-3 ps-3 pe-5  text-primary-color lead ">
                      <Form.Check type="checkbox" id="join-newsletter" label="Join our newsletter for updates" className="custom-check" />
                    </div>
                  </div>

                  <Button className=" px-5 py-4 blob-btn border-0 fs-4 text-primary-color fw-bold" style={{ backgroundColor: "transparent" }}>
                    SUBMIT
                  </Button>
                </div>
              </Form>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AyahuascaContact;
