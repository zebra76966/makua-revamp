import React, { useMemo, useState } from "react";
import { Container, Card, Row, Col, Dropdown } from "react-bootstrap";
import { motion } from "framer-motion";

import retreatsData from "./retreatsData.json";
import merchData from "./merch.json";
import "./Products.css";
import { useNavigate } from "react-router-dom";

const cardVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

const ProductsCards = () => {
  const [typeFilter, setTypeFilter] = useState("all"); // all | retreats | merch
  const [tagFilter, setTagFilter] = useState("all");

  /* ---------------------------------------------
     Active dataset based on right filter
  --------------------------------------------- */
  const activeData = useMemo(() => {
    if (typeFilter === "retreats") return retreatsData;
    if (typeFilter === "merch") return merchData;
    return [...retreatsData, ...merchData];
  }, [typeFilter]);

  /* ---------------------------------------------
     Extract unique focus tags from active dataset
  --------------------------------------------- */
  const availableTags = useMemo(() => {
    const tags = new Set();
    activeData.forEach((item) => {
      item.focus?.forEach((f) => tags.add(f));
    });
    return ["all", ...Array.from(tags)];
  }, [activeData]);

  /* ---------------------------------------------
     Apply tag filter
  --------------------------------------------- */
  const filteredData = useMemo(() => {
    if (tagFilter === "all") return activeData;
    return activeData.filter((item) => item.focus?.includes(tagFilter));
  }, [activeData, tagFilter]);

  const navigation = useNavigate();

  return (
    <div className="ch-100 grain-bg px-lg-5 pt-5">
      <Container fluid className="py-5 px-5 pt-5 mt-5">
        {/* ---------------- FILTER BAR ---------------- */}
        <div className="d-flex gap-3 my-5">
          {/* LEFT – TAG FILTER */}
          <Dropdown style={{ zIndex: "999" }}>
            <Dropdown.Toggle className="rounded-pill bg-none px-5 text-secondary-color border-secondary-color border-2">{tagFilter === "all" ? "ALL" : tagFilter}</Dropdown.Toggle>

            <Dropdown.Menu className="bg-primary-color border-secondary-color border-1">
              {availableTags.map((tag) => (
                <Dropdown.Item className="text-secondary-color border-secondary-color border-bottom" key={tag} onClick={() => setTagFilter(tag)}>
                  {tag === "all" ? "ALL" : tag}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          {/* RIGHT – TYPE FILTER */}
          <Dropdown style={{ zIndex: "999" }}>
            <Dropdown.Toggle className="rounded-pill bg-none px-5 text-secondary-color border-secondary-color border-2">{typeFilter.toUpperCase()}</Dropdown.Toggle>

            <Dropdown.Menu className="bg-primary-color border-secondary-color border-1">
              {["all", "retreats", "merch"].map((type) => (
                <Dropdown.Item
                  className="text-secondary-color border-secondary-color border-bottom"
                  key={type}
                  onClick={() => {
                    setTypeFilter(type);
                    setTagFilter("all"); // reset tag when switching dataset
                  }}
                >
                  {type.toUpperCase()}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>

        {/* ---------------- CARDS ---------------- */}
        <Row className="g-4 ">
          {filteredData.map((item, i) => (
            <Col lg={4} key={i} className="d-flex mb-3">
              <motion.div
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                className="w-100 h-100"
                onClick={() => navigation(`/product_detail/${i}`)}
                style={{ cursor: "pointer" }}
              >
                <Card className="products-card shadow-sm text-center rounded-0 h-100 grain-bg-light">
                  <div className="products-img-wrapper">
                    {item.tag && <div className="products-tag px-3 py-1 fs-6">{item.tag}</div>}
                    <Card.Img src={item.image} alt={item.title} className="products-img" />
                  </div>

                  <Card.Body className="mt-3 d-flex flex-column pb-5">
                    <p className="products-desc fs-4 mb-5 text-primary-color">{item.description}</p>

                    <div className="mt-auto">
                      <div className="products-tags-container mb-4">
                        {item.focus?.map((focus, idx) => (
                          <span className="focus-tag text-primary-color fs-6" key={idx}>
                            {focus}
                          </span>
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
