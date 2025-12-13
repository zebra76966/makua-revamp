import React from "react";
import "./frogBlink.css";
const FrogBlink = () => {
  return (
    <div className="frogBlinkWrapper">
      <img src={"/froghero-no.svg"} alt="Frog Blinking" className="h-100 w-100" />

      <div className="eyeBlink eleft"></div>
      <div className="eyeBlink eright"></div>
    </div>
  );
};

export default FrogBlink;
