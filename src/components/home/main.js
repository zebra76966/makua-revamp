import React from "react";
import RetreatHero from "./hero";

import FoldedPaperReveal from "../animation/CrumpledPaperReveal";
import SpiritOfWaterEarth from "./spiritWater";
import RetreatCollage from "./gallery/gallery";
import RetreatCards from "./retreats/RetreatCards";
import ReviewCarousel from "./reviews/reviews";
import FullPageScrollWrapper from "../sccrollwatcher";

const Main = () => {
  return (
    <FullPageScrollWrapper>
      <RetreatHero />
      <SpiritOfWaterEarth />
      <RetreatCollage />
      <RetreatCards />
      <ReviewCarousel />
    </FullPageScrollWrapper>
  );
};

export default Main;
