import React, { useState } from "react";
import { Accordion, Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import "./faqs.css";

const faqData = [
  {
    question: "What is Ayahuasca?",
    answer: `Ayahuasca originates from the Amazon rainforest, primarily in Peru, Brazil, and Colombia. At Makua, we honor the traditional roots of this medicine while offering it in a safe and intentional setting.`,
  },
  {
    question: "Where does Ayahuasca come from?",
    answer: ` Ayahuasca originates from the Amazon rainforest, primarily in Peru, Brazil, and Colombia. At Makua, we honor the traditional roots of this medicine while offering it in a safe and intentional setting.`,
  },
  {
    question: "What is Ayahuasca?",
    answer: `Ayahuasca originates from the Amazon rainforest, primarily in Peru, Brazil, and Colombia. At Makua, we honor the traditional roots of this medicine while offering it in a safe and intentional setting.`,
  },
  {
    question: "Where does Ayahuasca come from?",
    answer: ` Ayahuasca originates from the Amazon rainforest, primarily in Peru, Brazil, and Colombia. At Makua, we honor the traditional roots of this medicine while offering it in a safe and intentional setting.`,
  },
  {
    question: "What is Ayahuasca?",
    answer: `Ayahuasca originates from the Amazon rainforest, primarily in Peru, Brazil, and Colombia. At Makua, we honor the traditional roots of this medicine while offering it in a safe and intentional setting.`,
  },
  {
    question: "Where does Ayahuasca come from?",
    answer: ` Ayahuasca originates from the Amazon rainforest, primarily in Peru, Brazil, and Colombia. At Makua, we honor the traditional roots of this medicine while offering it in a safe and intentional setting.`,
  },
  {
    question: "What is Ayahuasca?",
    answer: `Ayahuasca originates from the Amazon rainforest, primarily in Peru, Brazil, and Colombia. At Makua, we honor the traditional roots of this medicine while offering it in a safe and intentional setting.`,
  },
  {
    question: "Where does Ayahuasca come from?",
    answer: ` Ayahuasca originates from the Amazon rainforest, primarily in Peru, Brazil, and Colombia. At Makua, we honor the traditional roots of this medicine while offering it in a safe and intentional setting.`,
  },
];

const FAQSection = () => {
  const [activeKey, setActiveKey] = useState(null);
  const handleToggle = (key) => setActiveKey(activeKey === key ? null : key);

  // parent variants so children inherit the "rest"/"hover" labels
  const containerVariants = { rest: {}, hover: {} };

  const textVariants = {
    rest: { y: 0 },
    hover: { y: -6, transition: { type: "spring", stiffness: 450, damping: 22 } },
  };

  // Animate the SVG path 'd' to create a wide U sag and a quick snap
  const underlineVariants = {
    rest: { d: "M0,5 Q50,5 100,5" },
    hover: {
      d: [
        "M0,5 Q50,5 100,5", // flat -> start
        "M0,5 Q50,20 100,5", // deep sag (center down a lot)
        "M0,5 Q50,-4 100,5", // sharp snap up
        "M0,5 Q50,5 100,5", // settle back
      ],
      transition: {
        duration: 0.6, // quicker overall
        ease: "easeInOut",
        times: [0, 0.25, 0.45, 1], // snap happens earlier
      },
    },
  };

  return (
    <div className="faq-section text-light py-5 px-lg-5 px-2 ch-100 pFont pb-5">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
        <Container fluid className="px-lg-5 px-2 pt-5 pb-5">
          <Accordion activeKey={activeKey} className="mt-5 pt-5 px-lg-5 px-2">
            {faqData.map((item, index) => (
              <motion.div key={index} className="faq-item py-4 pFont" variants={containerVariants} initial="rest" whileHover="hover" animate="rest">
                <Row className="align-items-center text-secondary-color" onClick={() => handleToggle(index.toString())} style={{ cursor: "pointer" }}>
                  <Col xs={10} className="fs-5 fw-bold">
                    <motion.span className="faq-question pFont" variants={textVariants}>
                      {item.question}
                    </motion.span>
                  </Col>

                  <Col xs={1} className="text-end">
                    {activeKey === index.toString() ? <img alt="" src="/eyeClose.svg" height={50} className="ico" /> : <img alt="" src="/eyeOpen.svg" height={35} className="ico" />}
                  </Col>
                </Row>

                <Row className="align-items-center justify-content-start">
                  <Col xs={10}>
                    <Accordion.Collapse eventKey={index.toString()}>
                      <div className="pt-3 pe-3 text-secondary-color lead pFont">{item.answer}</div>
                    </Accordion.Collapse>
                  </Col>
                </Row>

                {/* SVG underline — child will pick up parent's "hover" label */}
                <motion.svg className="faq-underline" width="100%" height="14" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <motion.path
                    variants={underlineVariants}
                    d="M0,5 Q50,5 100,5"
                    stroke="var(--secondary-color)"
                    strokeWidth="2"
                    fill="transparent"
                    style={{ pointerEvents: "none" }} // prevent it capturing pointer events
                  />
                </motion.svg>
              </motion.div>
            ))}
          </Accordion>
        </Container>
      </motion.div>
    </div>
  );
};

export default FAQSection;
