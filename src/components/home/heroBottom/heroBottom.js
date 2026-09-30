import React from "react";
import { motion } from "framer-motion";
import "./heroBottom.css";
import { useNavigate } from "react-router-dom";

const HeroPoster = () => {
  const navigate = useNavigate();

  return (
    <div className="hero-poster-wrapper">
      <video
        className="hero-bg-video"
        src="/HeroVidBtm.mp4" // <-- put your video here
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="hero-content">
        <motion.h1 className="hero-text text-primary-secondary" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          HEALING ROOTED IN
          <br />
          TRADITION, GUIDED BY
          <br />
          TODAY. JOIN US AT
          <br />
          MAKUA.
        </motion.h1>

        <motion.button
          className=" px-5 py-5 fs-4 blob-btn mt-4"
          onClick={() => {
            navigate("/retreats");
          }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.97 }}
        >
          RESERVE
        </motion.button>
      </div>
    </div>
  );
};

export default HeroPoster;
