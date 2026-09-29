import React, { useState } from "react";
import "./footer.css";
import { Link } from "react-router-dom";
import { formsAPI } from "../../services/api";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [state, setState] = useState({ busy: false, done: false, error: "" });

  const subscribe = async (e) => {
    e.preventDefault();
    setState({ busy: true, done: false, error: "" });
    try {
      await formsAPI.subscribe(email.trim(), "Footer");
      setState({ busy: false, done: true, error: "" });
      setEmail("");
    } catch (err) {
      setState({ busy: false, done: false, error: err.message });
    }
  };

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
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LINKEDIN</a>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">INSTAGRAM</a>
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">FACEBOOK</a>
          </div>
        </div>

        {/* Right Section */}
        <div className="footer-right mt-auto">
          <div className="newsletter-title">Subscribe to our newsletter</div>

          {state.done ? (
            <p className="newsletter-title mb-0">Thank you — you're on the list.</p>
          ) : (
            <form className="newsletter-input-wrap" onSubmit={subscribe}>
              <label htmlFor="footer-newsletter" className="visually-hidden">Your email address</label>
              <input
                id="footer-newsletter"
                type="email"
                required
                placeholder="Add your e-mail"
                className="newsletter-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button type="submit" disabled={state.busy} className="px-4 fw-bold py-4 fs-4 blob-btn">
                {state.busy ? "…" : "SIGN UP"}
              </button>
            </form>
          )}
          {state.error && <p className="newsletter-title mt-2 mb-0">{state.error}</p>}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom fs-4">
        <img src="/makua-logo-h.svg" className="footer-logo" alt="Makua" />

        <div className="footer-bottom-center">©2025 MAKUA</div>

        <Link to="/privacy-policy" className=" text-decoration-none text-secondary-color">
          PRIVACY POLICY
        </Link>
        <Link to="/privacy-policy" className=" text-decoration-none text-secondary-color">
          COOKIE POLICY
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
