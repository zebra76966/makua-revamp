import React, { useState } from "react";
import { Accordion, Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import "./faqs.css";

/**
 * The questions people actually ask before booking, in the order they ask
 * them. Anything medical is answered honestly rather than reassuringly —
 * someone on an SSRI needs to learn that here, not on arrival.
 *
 * Shane should check the specifics against how Makua actually runs:
 * ceremony counts, what the screening asks, and who the facilitators are.
 */
const faqData = [
  {
    question: "What is ayahuasca?",
    answer: `A traditional Amazonian brew made from the ayahuasca vine and the leaves of a companion plant. It has been used for generations by Indigenous communities across Peru, Brazil and Colombia, in ceremony and under the care of someone trained to hold it.\n\nIt is not recreational, and it is not a guaranteed experience. People describe it very differently from one another — and often differently from one ceremony to the next.`,
  },
  {
    question: "Is it safe? What about my medication?",
    answer: `This is the question that matters most, and the honest answer is: it depends on you.\n\nSome medications are genuinely dangerous in combination with ayahuasca — particularly SSRIs and other antidepressants, MAOIs, and some medications for blood pressure and the heart. Some heart, liver and psychiatric conditions also make it unsafe, and a personal or family history of psychosis or bipolar disorder usually rules it out.\n\nBefore your retreat we ask you about your health and what you take, and our facilitators review every answer. If we think it isn't safe for you, we will say so and refund you. Please answer honestly — this screening exists to protect you, not to filter you out.\n\nIf you're unsure, talk to your doctor before you book.`,
  },
  {
    question: "Do I need experience?",
    answer: `No. Most people who come to Makua have never sat in a ceremony before.\n\nWhat helps far more than experience is arriving rested, having followed the preparation we send you, and being willing to let the retreat be whatever it turns out to be.`,
  },
  {
    question: "What happens during a retreat?",
    answer: `Ceremonies happen at night and are held by experienced facilitators. Days are quieter: sharing circles, rest, time outside, simple food, and space to make sense of what came up.\n\nYou'll get the full schedule before you arrive. Nothing is compulsory — if you need to sit something out, you sit it out.`,
  },
  {
    question: "Where are you, and how do I get there?",
    answer: `We're at Cerro Tusa in Antioquia, Colombia — the pyramid-shaped mountain south of Medellín.\n\nMost guests fly into Medellín (MDE) and travel from there. Once your booking is confirmed we'll send directions and help you arrange the last stretch.`,
  },
  {
    question: "What's included in the price?",
    answer: `Your accommodation, all meals, the ceremonies, and the preparation and integration support around them.\n\nFlights, travel insurance and anything you arrange yourself are not included. The shared room is included in the retreat price; private rooms and the treehouse carry a per-night supplement, shown before you confirm.`,
  },
  {
    question: "What should I bring?",
    answer: `Loose comfortable clothes, something warm for the evenings, a torch, a refillable water bottle, and a notebook if you're someone who writes.\n\nWe'll send a full list, along with the dietary preparation, once you've booked.`,
  },
  {
    question: "Can I come with a friend or partner?",
    answer: `Yes, and many people do. You can book together and share a room.\n\nOne thing worth knowing: ceremony is an individual experience even in a group, and you may want space from each other afterwards. That's normal.`,
  },
  {
    question: "What if I need to cancel?",
    answer: `Plans change and we'd rather find a way than keep your money. You can usually move to another date, or pass your place to someone else.\n\nThe full detail — including what's refundable and when — is on our cancellations page.`,
  },
  {
    question: "Do you run workshops as well as retreats?",
    answer: `Yes. Alongside the multi-day retreats we run single-day workshops and evening events — breathwork, cacao circles, sound, movement. Some are free, some are paid, and some you can simply turn up to.\n\nWhat's coming up is always on the workshops page.`,
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
                      <div className="pt-3 pe-3 text-secondary-color lead pFont">{item.answer.split(String.fromCharCode(10,10)).map((para, k) => (
                        <span key={k} className="faq-para">{para}</span>
                      ))}</div>
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
