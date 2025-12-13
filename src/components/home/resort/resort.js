import React from "react";

import RetreatCards from "../retreats/RetreatCards";

import FullPageScrollWrapper from "../../sccrollwatcher";
import RetreatContact from "../contact/retreatContact";
import HeroPoster from "../heroBottom/heroBottom";
import Footer from "../footer";
import IntroSpirit from "./introSpirit/introSpirit";

import SightSeeing from "./sightseeing/sights";
import ResortHero from "./resortHero";
import CerroTusaSprings from "./ceroTusa/ceroTusa";
import FacilitiesCarousel from "./facilities/facilties";

const Resort = () => {
  return (
    <FullPageScrollWrapper>
      <ResortHero />
      <CerroTusaSprings />

      <FacilitiesCarousel />
      <SightSeeing />

      <RetreatCards />

      <Footer />
    </FullPageScrollWrapper>
  );
};

export default Resort;
