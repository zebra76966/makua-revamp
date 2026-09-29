import React, { useState } from "react";

import WorkShopHero from "./workshopHero";
import EventsCalendar from "./eventCalendar/eventCalendar";
import SightSeeing from "../resort/sightseeing/sights";
import RetreatCards from "../retreats/RetreatCards";
import Footer from "../footer";
import FullPageScrollWrapper from "../../sccrollwatcher";
import UpcomingCarousel from "./upcoming/upcoming";
import WorkshopSignupModal from "./SignupModal";
import useWorkshops from "./useWorkshops";

const WorkshopMain = () => {
  /* One request for the whole page: the carousel and the calendar are two
     views of the same list, so they can't drift apart. */
  const { workshops, loading, error, reload } = useWorkshops();
  const [picked, setPicked] = useState(null);

  return (
    <>
      <FullPageScrollWrapper>
        <WorkShopHero />
        <UpcomingCarousel workshops={workshops} loading={loading} error={error} onPick={setPicked} />
        <EventsCalendar workshops={workshops} loading={loading} error={error} onPick={setPicked} />
        <SightSeeing />
        <RetreatCards heading="RETREATS" />
        <Footer />
      </FullPageScrollWrapper>

      {/* Outside the wrapper on purpose: it turns every child into a
          full-height snap section, and an empty one would leave a blank
          screen in the middle of the page. */}
      <WorkshopSignupModal
        workshop={picked}
        onClose={() => setPicked(null)}
        /* A confirmed place changes what's left, so refresh the counts. */
        onDone={reload}
      />
    </>
  );
};

export default WorkshopMain;
