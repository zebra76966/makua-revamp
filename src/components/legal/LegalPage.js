import React from "react";
import { Container } from "react-bootstrap";
import { motion } from "framer-motion";

import Footer from "../home/footer";
import useSite from "../home/useSite";
import "./legal.css";

/**
 * The shared frame for the privacy, terms and cancellation pages.
 *
 * Each page passes a title, a last-reviewed date and an array of
 * { heading, body } — body being a string or an array of strings, where
 * a string starting with "- " becomes a bullet.
 *
 * The contact address comes from Settings rather than being typed into
 * three separate files, so changing it in the admin changes it everywhere.
 */
export default function LegalPage({ title, intro, updated, sections }) {
  const site = useSite();
  const email = site?.email || "hello@makuaretreats.com";

  const renderBody = (body, key) => {
    const lines = Array.isArray(body) ? body : [body];
    const out = [];
    let bullets = [];

    const flush = () => {
      if (bullets.length) {
        out.push(<ul className="legal-list" key={`${key}-l${out.length}`}>{bullets}</ul>);
        bullets = [];
      }
    };

    lines.forEach((line, i) => {
      const text = line.replace("{email}", email);
      if (text.startsWith("- ")) {
        bullets.push(<li key={`${key}-b${i}`}>{text.slice(2)}</li>);
      } else {
        flush();
        out.push(<p className="legal-text" key={`${key}-p${i}`}>{text}</p>);
      }
    });
    flush();
    return out;
  };

  return (
    <>
      <div className="legal-page grain-bg">
        <Container className="legal-container text-secondary-color">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="legal-title text-uppercase">{title}</h1>
            {updated && <p className="legal-updated">Last reviewed {updated}</p>}
            {intro && <p className="legal-intro">{intro.replace("{email}", email)}</p>}

            {sections.map((s, i) => (
              <section className="legal-section" key={s.heading}>
                <h2 className="legal-heading">{s.heading}</h2>
                {renderBody(s.body, i)}
              </section>
            ))}

            <p className="legal-text legal-contact">
              Questions about any of this? Email us at{" "}
              <a href={`mailto:${email}`}>{email}</a>.
            </p>
          </motion.div>
        </Container>
      </div>

      <Footer />
    </>
  );
}
