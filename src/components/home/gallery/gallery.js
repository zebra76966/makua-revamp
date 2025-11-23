import React from "react";
import { Container } from "react-bootstrap";
import { motion } from "framer-motion";
import "./gallery.css";
import FoldedPaperReveal from "../../animation/CrumpledPaperReveal";

const fadeIn = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export default function RetreatCollage() {
  return (
    <Container fluid className="grain-bg retreat-wrapper py-5 ch-100">
      <div className="retreat-collage">
        <motion.img src="/retreat/pool.png" className="collage-img pool-img" variants={fadeIn} initial="hidden" whileInView="show" />

        <motion.div className="collage-img frog-top">
          <FoldedPaperReveal image={"/retreat/froggyYoga.png"} heightDef={"220px"} widthDef={"340px"} />
        </motion.div>

        <motion.div className="center-polaroid" variants={fadeIn} initial="hidden" whileInView="show">
          <img src="/retreat/forest.png" alt="" />
        </motion.div>

        <motion.img src="/retreat/bedroom.jpg" className="collage-img bedroom-top" variants={fadeIn} initial="hidden" whileInView="show" />

        <motion.img src="/retreat/treehouse.png" className="collage-img treehouse-img" variants={fadeIn} initial="hidden" whileInView="show" />

        <div className="collage-img frog-right">
          <FoldedPaperReveal image={"/retreat/froggyHold.png"} heightDef={"350px"} widthDef={"228px"} />
        </div>
        <motion.img src="/retreat/bedroom1.png" className="collage-img bedroom-bottom" variants={fadeIn} initial="hidden" whileInView="show" />

        <motion.img src="/retreat/bathtub.jpg" className="collage-img bathtub-img" variants={fadeIn} initial="hidden" whileInView="show" />

        <motion.img src="/retreat/areialViewPond.png" className="collage-img pond-img" variants={fadeIn} initial="hidden" whileInView="show" />
      </div>
    </Container>
  );
}
