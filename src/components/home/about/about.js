import React from "react";
import AboutHero from "./aboutHero";

import RetreatCards from "../retreats/RetreatCards";

import FullPageScrollWrapper from "../../sccrollwatcher";
import RetreatContact from "../contact/retreatContact";
import HeroPoster from "../heroBottom/heroBottom";
import Footer from "../footer";
import IntroSpirit from "./introSpirit/introSpirit";
import Cero from "./cero/cero";
import SightSeeing from "./sightseeing/sights";

const About = () => {
  return (
    <FullPageScrollWrapper>
      <AboutHero />
      <IntroSpirit />
      <Cero />

      <SightSeeing />

      <RetreatCards />

      <RetreatContact />

      <HeroPoster />

      <Footer />
    </FullPageScrollWrapper>
  );
};

export default About;
