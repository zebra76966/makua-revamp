import React, { useState, useRef, useEffect } from "react";
import { Container } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";

export default function ResortHero() {
  const [soundOn, setSoundOn] = useState(false);
  const videoRef = useRef(null);
  const audioRef = useRef(null);

  const toggleSound = () => {
    const video = videoRef.current;
    const audio = audioRef.current;
    if (!video) return;

    if (soundOn) {
      video.muted = true;
      audio.pause();
    } else {
      video.muted = false;
      video.volume = 1.0;
      audio.play();
    }

    setSoundOn(!soundOn);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure the video starts muted + autoplay-friendly
    video.muted = true;
    video.play().catch(() => {});
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
      {/* Background Video */}
      <video
        ref={videoRef}
        className="hero-bg-video"
        src="/resortHero.mp4" // <-- your video path
        poster="/about.jpg" // <-- set poster
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: "translate(-50%, -50%)",
          zIndex: 1,
        }}
      />

      {/* Dark Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.1)",
          zIndex: 2,
        }}
      />

      {/* Main Content */}
      <Container fluid className="d-flex flex-column justify-content-center  align-items-center text-center text-secondary-color mt-5" style={{ height: "100%", position: "relative", zIndex: 3 }}>
        <motion.h1 className="display-3 pb-4 pt-5 text-uppercase" style={{ whiteSpace: "pre-line" }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          {"Need a cool \n rounded,\nphrase or quote  \n here"}
        </motion.h1>

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
        <audio ref={audioRef} loop src="/audio2.mp3" />
      </div>
    </div>
  );
}
