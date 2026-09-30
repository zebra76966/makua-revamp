import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import useAsync from "../../hooks/useAsync";
import { shopAPI, money, mediaUrl } from "../../services/api";
import Footer from "../home/footer";
import "./shop.css";

const FALLBACK = "/events/events1.png";

/**
 * The shelf. Same shape as the retreats grid so the site reads as one
 * thing: a picture, a name, a price, and the card itself is the link.
 */
export default function ShopPage() {
  const { data: products, loading, error, reload } = useAsync(() => shopAPI.list(), [], []);
  const navigate = useNavigate();

  return (
    <>
      <div className="shop-page grain-bg-light">
        <Container fluid className="shop-container">
          <header className="shop-head">
            <p className="shop-eyebrow pFont">MAKUA</p>
            <h1 className="shop-title">SHOP</h1>
            <p className="shop-sub">
              Made in Colombia, in small runs, by people we know. Everything here carries
              something of the place it came from.
            </p>
          </header>

          {loading && <p className="shop-note">Loading…</p>}

          {!loading && error && (
            <div className="shop-note">
              <p>We couldn't load the shop just now.</p>
              <button className="blob-btn px-5 fs-5 py-3" onClick={reload}>TRY AGAIN</button>
            </div>
          )}

          {!loading && !error && products.length === 0 && (
            <p className="shop-note">
              Nothing in the shop yet. New pieces are added here as they're made.
            </p>
          )}

          {!loading && !error && products.length > 0 && (
            <Row className="g-4 g-lg-5">
              {products.map((p, i) => (
                <Col key={p.id} xs={12} sm={6} lg={4}>
                  <motion.article
                    className={`shop-card ${p.soldOut ? "is-sold-out" : ""}`}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                    role="button"
                    tabIndex={0}
                    onClick={() => navigate(`/shop/${p.slug}`)}
                    onKeyDown={(e) => { if (e.key === "Enter") navigate(`/shop/${p.slug}`); }}
                  >
                    <div className="shop-card-img">
                      <img src={mediaUrl(p.image) || FALLBACK} alt={p.name} />
                      <span className="shop-card-price">{money(p.priceFrom)}</span>
                      {p.soldOut && <span className="shop-card-flag">SOLD OUT</span>}
                    </div>

                    <div className="shop-card-body">
                      <h2 className="shop-card-name">{p.name}</h2>
                      {p.summary && <p className="shop-card-sum">{p.summary}</p>}
                      <span className="blob-btn px-5 fs-5 py-3 shop-card-cta">MORE</span>
                    </div>
                  </motion.article>
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </div>

      <Footer />
    </>
  );
}
