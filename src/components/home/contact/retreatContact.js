import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { formsAPI } from "../../../services/api";
import "./contact.css";

/**
 * "Host your retreat at Makua" — goes to the team's inbox and is stored
 * in admin under enquiries. `source` says which form it came from.
 */
const RetreatContact = ({ source = "host-a-retreat" }) => {
  const [form, setForm] = useState({ name: "", email: "", message: "", website: "" });
  const [confirmed, setConfirmed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setError("");
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!confirmed) {
      setError("Please tick the box to confirm you're a person.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      await formsAPI.enquiry({ ...form, source });
      setSent(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="grain-bg d-flex align-items-center justify-content-center  py-5 px-xl-5 ch-100">
      <Container fluid className="px-lg-5">
        <Row className="align-items-start g-5 px-lg-5 px-2">
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
              {sent ? (
                <div className="text-secondary-color py-5 text-center">
                  <p className="fs-3 mb-2">Thank you, {form.name.split(" ")[0] || "and welcome"}.</p>
                  <p className="lead mb-0">We've got your message and someone will write back to {form.email}.</p>
                </div>
              ) : (
                <Form onSubmit={submit} noValidate>
                  <Form.Group className="mb-3" controlId="contact-name">
                    <Form.Label className="text-secondary-color pFont lead fw-bold" style={{ letterSpacing: "0.3em" }}>
                      NAME
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter name"
                      value={form.name}
                      onChange={set("name")}
                      required
                      autoComplete="name"
                      className="p-3 py-4 bg-secondary-color border-0 rounded-0"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="contact-email">
                    <Form.Label className="text-secondary-color pFont lead fw-bold" style={{ letterSpacing: "0.3em" }}>
                      E-MAIL
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter e-mail"
                      value={form.email}
                      onChange={set("email")}
                      required
                      autoComplete="email"
                      className="p-3 py-4 rounded-0 bg-secondary-color border-0 "
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="contact-message">
                    <Form.Label className="text-secondary-color pFont lead fw-bold" style={{ letterSpacing: "0.3em" }}>
                      MESSAGE
                    </Form.Label>
                    <Form.Control as="textarea" rows={10} placeholder="Enter Message" value={form.message} onChange={set("message")} required className="bg-secondary-color border-0 rounded-0" />
                  </Form.Group>

                  {/* Left empty by people; only robots fill it in. */}
                  <input type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={set("website")} style={{ position: "absolute", left: "-9999px", opacity: 0 }} aria-hidden="true" />

                  {error && <p className="text-warning-color lead mb-3">{error}</p>}

                  <div className="d-flex gap-3 align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-3 bg-secondary-color py-4 ps-3  w-50">
                      <Form.Check
                        type="checkbox"
                        id="not-robot"
                        label="I am not a robot"
                        className="custom-check"
                        checked={confirmed}
                        onChange={(e) => {
                          setConfirmed(e.target.checked);
                          setError("");
                        }}
                      />
                    </div>

                    <Button type="submit" disabled={busy} className=" px-lg-5 px-3 py-lg-4 py-3 blob-btn border-0 fs-4 text-primary-color fw-bold" style={{ backgroundColor: "transparent" }}>
                      {busy ? "SENDING…" : "SUBMIT"}
                    </Button>
                  </div>
                </Form>
              )}
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RetreatContact;
