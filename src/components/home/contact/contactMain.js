import React from "react";
import RetreatContact from "./retreatContact";
import Footer from "../footer";

/**
 * /contact — the address the menu has always pointed at. It reuses the
 * enquiry form, tagged as coming from the contact page.
 */
const ContactMain = () => (
  <>
    <RetreatContact source="contact" />
    <Footer />
  </>
);

export default ContactMain;
