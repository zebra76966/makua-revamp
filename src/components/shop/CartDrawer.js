import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineXMark, HiOutlineTrash } from "react-icons/hi2";

import { useCart } from "../../context/CartContext";
import { money, mediaUrl } from "../../services/api";
import "./shop.css";

const FALLBACK = "/events/events1.png";

/**
 * The basket, as a panel from the right.
 *
 * It slides in on its own when something is added, which is the only
 * feedback a shopper gets that the button worked.
 */
export default function CartDrawer() {
  const { lines, count, subtotal, setQuantity, remove, open, setOpen } = useCart();
  const navigate = useNavigate();

  /* Escape closes it, and the page behind it shouldn't scroll while it's open. */
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, setOpen]);

  const go = (to) => { setOpen(false); navigate(to); };

  return (
    <>
      <div
        className={`cart-scrim ${open ? "is-open" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      <aside
        className={`cart-drawer ${open ? "is-open" : ""}`}
        aria-label="Your basket"
        aria-hidden={!open}
      >
        <header className="cart-head">
          <h2 className="cart-title">
            YOUR BASKET{count > 0 && <span className="cart-count">{count}</span>}
          </h2>
          <button className="cart-close" onClick={() => setOpen(false)} aria-label="Close basket">
            <HiOutlineXMark />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="cart-empty">
            <p>Nothing in here yet.</p>
            <button className="blob-btn px-5 fs-5 py-3" onClick={() => go("/shop")}>VISIT THE SHOP</button>
          </div>
        ) : (
          <>
            <ul className="cart-lines">
              {lines.map((l) => (
                <li className="cart-line" key={l.variantId}>
                  <img
                    className="cart-line-img"
                    src={mediaUrl(l.image) || FALLBACK}
                    alt=""
                    onClick={() => go(`/shop/${l.slug}`)}
                  />
                  <div className="cart-line-main">
                    <p className="cart-line-name">{l.name}</p>
                    {(l.colour || l.size) && (
                      <p className="cart-line-opt">{[l.colour, l.size].filter(Boolean).join(" · ")}</p>
                    )}
                    <p className="cart-line-price">{money(l.price)}</p>

                    <div className="cart-qty">
                      <button onClick={() => setQuantity(l.variantId, l.quantity - 1)} aria-label="One fewer">−</button>
                      <span aria-live="polite">{l.quantity}</span>
                      <button onClick={() => setQuantity(l.variantId, l.quantity + 1)} aria-label="One more">+</button>
                    </div>
                  </div>

                  <button className="cart-line-del" onClick={() => remove(l.variantId)} aria-label={`Remove ${l.name}`}>
                    <HiOutlineTrash />
                  </button>
                </li>
              ))}
            </ul>

            <footer className="cart-foot">
              <div className="cart-sub">
                <span>Subtotal</span>
                <strong>{money(subtotal)}</strong>
              </div>
              <p className="cart-note">Shipping worked out at checkout.</p>
              <button className="shop-cta" onClick={() => go("/checkout")}>CHECKOUT</button>
              <button className="cart-keep" onClick={() => go("/shop")}>Keep looking</button>
            </footer>
          </>
        )}
      </aside>
    </>
  );
}
