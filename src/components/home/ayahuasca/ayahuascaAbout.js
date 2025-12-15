import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { motion } from "framer-motion";

const AyahuascaAbout = () => {
  return (
    <div className="ch-100 px-5 d-flex align-items-center justify-content-center grain-bg-offwhite">
      <div className="px-lg-5">
        <Container fluid className="px-xl-5 text-primary-color">
          <Row>
            <Col md={6} className="px-lg-5">
              <div className="w-100 mb-5">
                <motion.h1 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className=" text-start display-4 mt-0 text-uppercase mb-3">
                  The Ceremony
                </motion.h1>

                <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className=" text-dark-color  ">
                  For countless generations, tribes have gathered under the night sky, guided by shamans who carry songs older than memory. The bitter drink is shared in silence. The fire glows, the
                  icaros (healing songs) rise, and the journey begins. Ayahuasca is not consumed casually - it is a ritual, a dialogue between human and spirit, where the plants reveal what lies
                  beneath the surface of ordinary life.
                </motion.p>
              </div>

              <div className="w-100 mb-5">
                <motion.h1 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className=" text-start display-4 mt-0 text-uppercase mb-3">
                  The Medicine
                </motion.h1>

                <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className=" text-dark-color  ">
                  To outsiders, ayahuasca has often been reduced to a hallucinogen. But for those who carry the tradition, it is never about chasing visions. It is a teacher. It shows the pain we
                  hide, the wounds we carry, and the illusions we cling to. It can purge the body, but it also purges the soul, clearing space for clarity, peace, and connection.
                </motion.p>
              </div>

              <div className="w-100 mb-5">
                <motion.h1 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className=" text-start display-4 mt-0 text-uppercase mb-3">
                  The Experience
                </motion.h1>

                <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className=" text-dark-color  ">
                  Ayahuasca is not predictable. Some nights bring vivid visions, others bring silence. For some, it feels like a conversation with the universe. For others, it is a confrontation with
                  fear, grief, or the past. Always, it is personal. Always, it asks for courage. It does not give easy answers. Instead, it reflects what you need to see, not what you expect to see.{" "}
                </motion.p>
              </div>
            </Col>
            <Col md={6} className="px-lg-5">
              <div className="w-100 mb-5">
                <motion.h1 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className=" text-start display-4 mt-0 text-uppercase mb-3">
                  The Science
                </motion.h1>

                <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className=" text-dark-color  ">
                  Modern research is beginning to catch up with what the shamans already knew. The vine contains harmala alkaloids that allow the leaves’ DMT to be active in the body. Neuroscientists
                  observe that ayahuasca changes brain networks, loosening rigid patterns of thought, and often helping those with depression, trauma, and addiction. What was once dismissed as
                  superstition is now studied as one of the most promising plant medicines for mental and spiritual healing.
                </motion.p>
              </div>

              <div className="w-100 mb-5">
                <motion.h1 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className=" text-start display-4 mt-0 text-uppercase mb-3">
                  Ayahuasca at Makua
                </motion.h1>

                <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className=" text-dark-color  ">
                  At Makua, we carry this medicine with reverence. We are not inventing something new; we are stepping into an ancient river that has been flowing for centuries. Every ceremony here is
                  guided with respect - for the plants, for the traditions that protect them, and for each person who drinks. Ayahuasca is not about escape. It is about truth. Healing begins not
                  outside of you, but within.{" "}
                </motion.p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default AyahuascaAbout;
