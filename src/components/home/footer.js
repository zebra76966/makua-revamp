import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="makua-footer grain-bg-dark">
      <div className="footer-inner">
        {/* Left Section */}
        <div className="footer-left">
          <h1 className="footer-heading">
            <span className="highlight hFont">MAKUA</span> THE SPIRIT OF WATER
            <br />
            AND EARTH. WHERE THE SOUL
            <br />
            REMEMBERS YOU.
          </h1>

          <div className="footer-social">
            <a href="#">LINKEDIN</a>
            <a href="#">INSTAGRAM</a>
            <a href="#">FACEBOOK</a>
          </div>
        </div>

        {/* Right Section */}
        <div className="footer-right mt-auto">
          <div className="newsletter-title">Subscribe to our newsletter</div>

          <div className="newsletter-input-wrap">
            <input type="email" placeholder="Add your e-mail" className="newsletter-input" />

            <button className="px-4 fw-bold py-4 fs-4 blob-btn">SIGN UP</button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom fs-4">
        <img src="/makua-logo-h.svg" className="footer-logo" alt="Makua" />

        <div className="footer-bottom-center">©2025 MAKUA</div>

        <a href="#" className=" text-decoration-none text-secondary-color">
          PRIVACY POLICY
        </a>
        <a href="#" className=" text-decoration-none text-secondary-color">
          COOKIE POLICY
        </a>
      </div>
    </footer>
  );
};

export default Footer;
