import React, { useRef, useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useInView } from "framer-motion";
import "./FoldedPaperReveal.css";

const FoldedPaperReveal = ({ image, heightDef, widthDef }) => {
  const ref = useRef(null);

  const isInView = useInView(ref, {
    margin: "-80px", // optional: trigger earlier
  });

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isInView) setOpen(true);
  }, [isInView]);

  return (
    <Container className="d-flex flex-column align-items-center py-5">
      <div ref={ref} className="fold-container" style={{ height: heightDef, width: widthDef }}>
        {/* LEFT PANEL */}
        <div className={`panel left ${open ? "open" : ""}`} style={{ backgroundImage: `url(${image})` }}>
          <div className="panel-front"></div>
          <div className="panel-back"></div>
        </div>

        {/* MIDDLE COLUMN */}
        <div className="middle-column">
          <div className={`panel middle-top ${open ? "open" : ""}`} style={{ backgroundImage: `url(${image})` }}>
            <div className="panel-front"></div>
            <div className="panel-back"></div>
          </div>

          <div className={`panel middle-bottom ${open ? "open" : ""}`} style={{ backgroundImage: `url(${image})` }}>
            <div className="panel-front"></div>
            <div className="panel-back"></div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className={`panel fright ${open ? "open" : ""}`} style={{ backgroundImage: `url(${image})` }}>
          <div className="panel-front"></div>
          <div className="panel-back"></div>
        </div>
      </div>
    </Container>
  );
};

export default FoldedPaperReveal;
