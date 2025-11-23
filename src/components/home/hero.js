import React, { useState, useRef, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";

export default function RetreatHero() {
  const [soundOn, setSoundOn] = useState(true);
  const audioRef = useRef(null);

  const toggleSound = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (soundOn) {
      audio.pause();
    } else {
      audio.play();
    }
    setSoundOn(!soundOn);
  };
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const enableAutoplay = () => {
      audio.play().catch(() => {});
      setSoundOn(true);
      window.removeEventListener("click", enableAutoplay);
      window.removeEventListener("touchstart", enableAutoplay);
      window.removeEventListener("scroll", enableAutoplay);
    };

    window.addEventListener("click", enableAutoplay);
    window.addEventListener("touchstart", enableAutoplay);
    window.addEventListener("scroll", enableAutoplay);

    return () => {
      window.removeEventListener("click", enableAutoplay);
      window.removeEventListener("touchstart", enableAutoplay);
      window.removeEventListener("scroll", enableAutoplay);
    };
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Background Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        style={{
          backgroundImage: "url('/hero.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
        }}
      />

      {/* Dark Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.35)",
          zIndex: 2,
        }}
      />

      {/* Content */}
      <Container fluid className="d-flex flex-column justify-content-center align-items-center text-center" style={{ height: "100%", position: "relative", zIndex: 3 }}>
        {/* Logo */}

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{
            color: "#fff",
            fontFamily: "monospace",
            fontSize: "42px",
            letterSpacing: "2px",
            whiteSpace: "pre-line",
          }}
        >
          {"THIS IS\nNOT A STAY,\nIT'S A RETREAT"}
        </motion.h1>

        {/* Reserve Button */}
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.8 }}>
          <button className="blob-btn px-5 fs-2 py-4">RESERVE</button>
        </motion.div>
      </Container>

      {/* Sound Toggle Icon */}
      <div
        onClick={toggleSound}
        style={{
          position: "absolute",
          bottom: 25,
          right: 25,
          zIndex: 10,
          cursor: "pointer",
          color: "white",
          fontSize: "28px",
        }}
      >
        {soundOn ? <FaVolumeUp /> : <FaVolumeMute />}
      </div>

      {/* Background Audio */}
      <audio ref={audioRef} loop src="/audio2.mp3" />
    </div>
  );
}
