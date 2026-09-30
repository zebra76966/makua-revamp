import React, { useState, useMemo, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { BsArrowLeftCircle } from "react-icons/bs";
import { TfiPlus } from "react-icons/tfi";

import useAsync from "../../hooks/useAsync";
import { shopAPI, money, mediaUrl } from "../../services/api";
import { useCart } from "../../context/CartContext";
import Footer from "../home/footer";
import "./shop.css";

const FALLBACK = "/events/events1.png";

/** The distinct colours and sizes across a product's variants. */
const optionsOf = (variants) => {
  const colours = [];
  const sizes = [];
  for (const v of variants) {
    if (v.colour && !colours.some((c) => c.name === v.colour)) {
      colours.push({ name: v.colour, hex: v.colourHex });
    }
    if (v.size && !sizes.includes(v.size)) sizes.push(v.size);
  }
  return { colours, sizes };
};

export default function ProductPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const cart = useCart();

  const { data, loading, error } = useAsync(() => shopAPI.get(slug), [slug], null);
  const product = data?.product || null;
  const others = data?.others || [];

  const [colour, setColour] = useState(null);
  const [size, setSize] = useState(null);
  const [shot, setShot] = useState(0);
  const [openPanel, setOpenPanel] = useState(null);
  const [added, setAdded] = useState(false);

  const { colours, sizes } = useMemo(() => optionsOf(product?.variants || []), [product]);

  /* Start on the first combination that's actually in stock, so the page
     doesn't open on a sold-out colour. */
  useEffect(() => {
    if (!product) return;
    const first = product.variants.find((v) => !v.soldOut) || product.variants[0];
    setColour(first?.colour ?? null);
    setSize(first?.size ?? null);
    setShot(0);
    setOpenPanel(null);
  }, [product]);

  /* The one variant the current choices point at. */
  const variant = useMemo(() => {
    if (!product) return null;
    return product.variants.find(
      (v) => (v.colour ?? null) === (colour ?? null) && (v.size ?? null) === (size ?? null),
    ) || null;
  }, [product, colour, size]);

  /* A size is only offered if it exists in the chosen colour. */
  const sizeAvailable = (s) =>
    product?.variants.some((v) => (v.colour ?? null) === (colour ?? null) && v.size === s && !v.soldOut);
  const colourAvailable = (c) =>
    product?.variants.some((v) => v.colour === c && !v.soldOut);

  if (loading) {
    return (
      <div className="shop-page grain-bg-light shop-state">
        <p className="shop-note">Loading…</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="shop-page grain-bg-light shop-state">
        <p className="shop-note">
          {error?.status === 404 ? "We couldn't find that piece." : "We couldn't load that just now."}
        </p>
        <button className="blob-btn px-5 fs-5 py-3" onClick={() => navigate("/shop")}>BACK TO THE SHOP</button>
      </div>
    );
  }

  const images = product.images.length ? product.images : [{ path: FALLBACK, alt: product.name }];
  const price = variant?.price ?? product.price;
  const canBuy = !!variant && !variant.soldOut;

  const addToCart = () => {
    if (!canBuy) return;
    cart.add({
      variantId: variant.id,
      productId: product.id,
      slug: product.slug,
      name: product.name,
      colour: variant.colour,
      size: variant.size,
      price,
      image: product.image,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2200);
  };

  const panels = [
    { key: "description", label: "Description", body: product.description },
    { key: "details", label: "Additional information", body: product.details },
  ].filter((p) => p.body);

  return (
    <>
      <div className="shop-page grain-bg-light">
        <Container fluid className="shop-container">
          <button className="pd-back" onClick={() => navigate(-1)}>
            <BsArrowLeftCircle /> <span className="pFont">GO BACK</span>
          </button>

          <Row className="pd-grid g-4 g-lg-5">
            {/* ── Photos ── */}
            <Col lg={6}>
              <div className="pd-stage">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={shot}
                    src={mediaUrl(images[shot]?.path) || FALLBACK}
                    alt={images[shot]?.alt || product.name}
                    initial={{ opacity: 0, scale: 0.99 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                  />
                </AnimatePresence>
              </div>

              {images.length > 1 && (
                <div className="pd-thumbs">
                  {images.map((im, i) => (
                    <button
                      key={im.path + i}
                      type="button"
                      className={`pd-thumb ${shot === i ? "is-on" : ""}`}
                      onClick={() => setShot(i)}
                      aria-label={`Photo ${i + 1}`}
                    >
                      <img src={mediaUrl(im.path) || FALLBACK} alt="" />
                    </button>
                  ))}
                </div>
              )}
            </Col>

            {/* ── Choices ── */}
            <Col lg={6} className="pd-panel">
              <h1 className="pd-name">{product.name}</h1>
              <p className="pd-price">{money(price)}</p>

              {colours.length > 0 && (
                <div className="pd-option">
                  <p className="pd-option-label pFont">COLOR</p>
                  <div className="pd-swatches">
                    {colours.map((c) => (
                      <button
                        key={c.name}
                        type="button"
                        title={c.name}
                        aria-label={c.name}
                        aria-pressed={colour === c.name}
                        className={`pd-swatch ${colour === c.name ? "is-on" : ""} ${colourAvailable(c.name) ? "" : "is-gone"}`}
                        style={{ background: c.hex || "#cfc3b4" }}
                        onClick={() => setColour(c.name)}
                      />
                    ))}
                  </div>
                  {colour && <p className="pd-option-value">{colour}</p>}
                </div>
              )}

              {sizes.length > 0 && (
                <div className="pd-option">
                  <p className="pd-option-label pFont">SIZE</p>
                  <div className="pd-sizes">
                    {sizes.map((s) => (
                      <button
                        key={s}
                        type="button"
                        aria-pressed={size === s}
                        className={`pd-size ${size === s ? "is-on" : ""} ${sizeAvailable(s) ? "" : "is-gone"}`}
                        onClick={() => setSize(s)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {product.overview && (
                <div className="pd-option">
                  <p className="pd-option-label pFont">OVERVIEW</p>
                  <p className="pd-overview">{product.overview}</p>
                </div>
              )}

              <button className="shop-cta" onClick={addToCart} disabled={!canBuy}>
                {added ? "ADDED TO CART" : canBuy ? "ADD TO CART" : "SOLD OUT"}
              </button>

              {variant && variant.stock != null && variant.stock > 0 && variant.stock <= 5 && (
                <p className="pd-stock">Only {variant.stock} left in {variant.colour || "this one"}.</p>
              )}
              {!variant && (
                <p className="pd-stock">That combination isn't made — try another colour or size.</p>
              )}

              {panels.length > 0 && (
                <div className="pd-panels">
                  {panels.map((p) => {
                    const on = openPanel === p.key;
                    return (
                      <div className="pd-accordion" key={p.key}>
                        <button className="pd-accordion-head" onClick={() => setOpenPanel(on ? null : p.key)}>
                          <span className="pFont">{p.label}</span>
                          <motion.span animate={{ rotate: on ? 45 : 0 }} transition={{ duration: 0.2 }}>
                            <TfiPlus />
                          </motion.span>
                        </button>
                        <AnimatePresence initial={false}>
                          {on && (
                            <motion.div
                              className="pd-accordion-body"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              {p.body.split("\n").filter(Boolean).map((line, i) => <p key={i}>{line}</p>)}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </div>

      {/* ── Other products ── */}
      {others.length > 0 && (
        <div className="pd-others grain-bg">
          <Container fluid className="shop-container">
            <p className="pd-others-title pFont">OTHER PRODUCTS</p>
            <Row className="g-4">
              {others.map((o) => (
                <Col key={o.id} xs={12} sm={6} lg={4}>
                  <article
                    className="shop-card shop-card--dark"
                    role="button"
                    tabIndex={0}
                    onClick={() => navigate(`/shop/${o.slug}`)}
                    onKeyDown={(e) => { if (e.key === "Enter") navigate(`/shop/${o.slug}`); }}
                  >
                    <div className="shop-card-img">
                      <img src={mediaUrl(o.image) || FALLBACK} alt={o.name} />
                      <span className="shop-card-price">{money(o.priceFrom)}</span>
                    </div>
                    <div className="shop-card-body">
                      <h3 className="shop-card-name">{o.name}</h3>
                      {o.summary && <p className="shop-card-sum">{o.summary}</p>}
                      <span className="blob-btn px-5 fs-5 py-3 shop-card-cta">MORE</span>
                    </div>
                  </article>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      )}

      <Footer />
    </>
  );
}
