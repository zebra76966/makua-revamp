import React, { useMemo, useState } from "react";
import { Container, Card, Row, Col, Dropdown } from "react-bootstrap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import useAsync from "../../../hooks/useAsync";
import { retreatsAPI, money, dateRange } from "../../../services/api";
import "./Products.css";

const cardVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

const FALLBACK_IMAGE = "/events/events1.png";

const ProductsCards = () => {
  const [tagFilter, setTagFilter] = useState("all");
  const { data: retreats, loading, error, reload } = useAsync(() => retreatsAPI.list(), [], []);
  const navigate = useNavigate();

  /* Filter chips come from whatever the retreats are actually about. */
  const availableTags = useMemo(() => {
    const tags = new Set();
    (retreats || []).forEach((r) => (r.focus || []).forEach((f) => tags.add(f)));
    return ["all", ...Array.from(tags)];
  }, [retreats]);

  const filtered = useMemo(() => {
    if (tagFilter === "all") return retreats || [];
    return (retreats || []).filter((r) => (r.focus || []).includes(tagFilter));
  }, [retreats, tagFilter]);

  return (
    <div className="ch-100 grain-bg px-lg-5 pt-5">
      <Container fluid className="py-5 px-5 pt-5 mt-5">
        {availableTags.length > 1 && (
          <div className="d-flex gap-3 my-5">
            <Dropdown style={{ zIndex: "999" }}>
              <Dropdown.Toggle className="rounded-pill bg-none px-5 text-secondary-color border-secondary-color border-2">
                {tagFilter === "all" ? "ALL" : tagFilter}
              </Dropdown.Toggle>
              <Dropdown.Menu className="bg-primary-color border-secondary-color border-1">
                {availableTags.map((tag) => (
                  <Dropdown.Item
                    className="text-secondary-color border-secondary-color border-bottom"
                    key={tag}
                    onClick={() => setTagFilter(tag)}
                  >
                    {tag === "all" ? "ALL" : tag}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        )}

        {loading && <p className="text-secondary-color fs-4 py-5">Loading retreats…</p>}

        {!loading && error && (
          <div className="text-secondary-color py-5">
            <p className="fs-4 mb-3">We couldn't load the retreats just now.</p>
            <button className="blob-btn px-5 fs-5 py-3" onClick={reload}>TRY AGAIN</button>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <p className="text-secondary-color fs-4 py-5">
            Nothing is open for booking right now. Join the newsletter below and we'll tell you when the next dates go live.
          </p>
        )}

        <Row className="g-4">
          {filtered.map((item, i) => (
            <Col lg={4} key={item.id} className="d-flex mb-3">
              <motion.div
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                className="w-100 h-100"
                onClick={() => navigate(`/retreats/${item.slug}`)}
                style={{ cursor: "pointer" }}
                role="link"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter") navigate(`/retreats/${item.slug}`); }}
              >
                <Card className="products-card shadow-sm text-center rounded-0 h-100 grain-bg-light">
                  <div className="products-img-wrapper">
                    {item.soldOut ? (
                      <div className="products-tag px-3 py-1 fs-6">Fully booked</div>
                    ) : item.tagline ? (
                      <div className="products-tag px-3 py-1 fs-6">{item.tagline}</div>
                    ) : item.placesLeft <= 3 ? (
                      <div className="products-tag px-3 py-1 fs-6">
                        {item.placesLeft} {item.placesLeft === 1 ? "place" : "places"} left
                      </div>
                    ) : null}
                    <Card.Img src={item.image || FALLBACK_IMAGE} alt={item.title} className="products-img" />
                  </div>

                  <Card.Body className="mt-3 d-flex flex-column pb-5">
                    <h3 className="fs-2 text-primary-color mb-2">{item.title}</h3>
                    <p className="pFont text-primary-color mb-3">
                      {dateRange(item.startDate, item.endDate)} · {item.nights} nights · {money(item.price)}
                    </p>
                    <p className="products-desc fs-4 mb-5 text-primary-color">{item.description}</p>

                    <div className="mt-auto">
                      <div className="products-tags-container mb-4">
                        {(item.focus || []).map((focus, idx) => (
                          <span className="focus-tag text-primary-color fs-6" key={idx}>{focus}</span>
                        ))}
                      </div>
                      <button className="blob-btn px-5 fs-4 py-3">MORE</button>
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default ProductsCards;
