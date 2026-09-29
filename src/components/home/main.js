import React from "react";
import RetreatHero from "./hero";

import SpiritOfWaterEarth from "./spiritWater";
import RetreatCollage from "./gallery/gallery";
import RetreatCards from "./retreats/RetreatCards";
import ReviewCarousel from "./reviews/reviews";
import FullPageScrollWrapper from "../sccrollwatcher";
import RetreatContact from "./contact/retreatContact";
import ScrollableEvents from "./events/events";
import HeroPoster from "./heroBottom/heroBottom";
import Footer from "./footer";

const Main = () => {
  return (
    <FullPageScrollWrapper>
      <RetreatHero />
      <SpiritOfWaterEarth />
      <RetreatCollage />
      <RetreatCards />
      <ReviewCarousel />
      <RetreatContact />
      <ScrollableEvents />
      <HeroPoster />
      {/* <Floating3DCardOg /> */}
      <Footer />
    </FullPageScrollWrapper>
  );
};

export default Main;
