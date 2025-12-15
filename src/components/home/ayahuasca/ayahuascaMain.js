import React from "react";
import AyahuascaHero from "./ayahuascaHero";
import OriginOfAmazon from "./originAmazon";
import AyahuascaAbout from "./ayahuascaAbout";
import AyahuascaContact from "./ayahuascaContact";
import FullPageScrollWrapper from "../../sccrollwatcher";
import RetreatCards from "../retreats/RetreatCards";
import Footer from "../footer";

const AyahuascaMain = () => {
  return (
    <FullPageScrollWrapper>
      <AyahuascaHero />
      <OriginOfAmazon />
      <AyahuascaAbout />
      <AyahuascaContact />
      <RetreatCards />
      <Footer />
    </FullPageScrollWrapper>
  );
};

export default AyahuascaMain;
