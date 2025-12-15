import React from "react";
import WorkShopHero from "./workshopHero";
import EventsCalendar from "./eventCalendar/eventCalendar";
import SightSeeing from "../resort/sightseeing/sights";
import RetreatCards from "../retreats/RetreatCards";
import Footer from "../footer";
import FullPageScrollWrapper from "../../sccrollwatcher";
import UpcomingCarousel from "./upcoming/upcoming";

const WorkshopMain = () => {
  return (
    <FullPageScrollWrapper>
      <WorkShopHero />
      <UpcomingCarousel />
      <EventsCalendar />
      <SightSeeing />
      <RetreatCards />
      <Footer />
    </FullPageScrollWrapper>
  );
};

export default WorkshopMain;
