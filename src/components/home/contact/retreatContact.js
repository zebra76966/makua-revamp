import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { color, motion } from "framer-motion";
import "./contact.css";

const RetreatContact = () => {
  return (
    <div className="grain-bg d-flex align-items-center justify-content-center  py-5 ch-100">
      <Container>
        <Row className="align-items-start g-5">
          {/* LEFT SIDE TEXT */}
          <Col md={6}>
            <motion.h1 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="display-1 fw-bold  text-secondary-color">
              HOST YOUR <br /> RETREAT AT MAKUA
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="mt-4 text-secondary-color fs-4">
              At Makua, we welcome facilitators, teachers, and visionaries to bring their offerings to our land in alignment with nature and spirit. Whether you're planning your own event or seeking
              collaboration, we'd love to hear from you.
            </motion.p>

            <p className="text-secondary-color mt-4 lead ">
              Makua is a healing sanctuary nestled in the sacred lands of Cerro Tusa, offering spaces designed to support deep, transformational work. From plant medicine retreats to wellness
              immersions, our team is here to support your vision every step of the way.
            </p>
          </Col>

          {/* RIGHT SIDE FORM */}
          <Col md={6}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="form-box p-4">
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label className="text-secondary-color">NAME</Form.Label>
                  <Form.Control type="text" placeholder="Enter name" className="p-3 py-4 bg-secondary-color border-0 rounded-0" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="text-secondary-color">E-MAIL</Form.Label>
                  <Form.Control type="email" placeholder="Enter e-mail" className="p-3 py-4 rounded-0 bg-secondary-color border-0 " />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="text-secondary-color">MESSAGE</Form.Label>
                  <Form.Control as="textarea" rows={10} placeholder="Enter Message" className="bg-secondary-color border-0 rounded-0" />
                </Form.Group>

                <div className="d-md-flex gap-3 align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-3 bg-secondary-color py-4 ps-3  w-50">
                    <Form.Check type="checkbox" id="not-robot" label="I am not a robot" className="custom-check" />
                  </div>

                  <Button className=" px-5 py-4 blob-btn border-0 text-primary-color fw-bold" style={{ backgroundColor: "transparent" }}>
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

export default RetreatContact;
