/**
 * context/CartContext.js — the basket.
 *
 * Lives in React state and is mirrored to localStorage, so a half-filled
 * basket survives a refresh or a wander off to read the terms page.
 *
 * A line is identified by its VARIANT id, not its product id: the clay
 * tote and the sand tote are two lines, and adding the clay one twice
 * bumps the quantity rather than making a second row.
 *
 * Prices are kept here only so the basket can show a running total. The
 * server prices every order again from its own tables when it is placed —
 * nothing here is trusted.
 */
import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";

const KEY = "makua_cart";
const MAX_PER_LINE = 20;

const CartContext = createContext(null);

const read = () => {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || "[]");
    return Array.isArray(raw) ? raw.filter((l) => l && l.variantId) : [];
  } catch (_) {
    return [];   // private mode, cleared storage, or something we didn't write
  }
};

export function CartProvider({ children }) {
  const [lines, setLines] = useState(read);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(lines)); } catch (_) {}
  }, [lines]);

  /* Another tab is the same basket. */
  useEffect(() => {
    const sync = (e) => { if (e.key === KEY) setLines(read()); };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  const add = useCallback((item, quantity = 1) => {
    setLines((prev) => {
      const i = prev.findIndex((l) => l.variantId === item.variantId);
      if (i === -1) return [...prev, { ...item, quantity: Math.min(MAX_PER_LINE, quantity) }];
      const next = [...prev];
      next[i] = { ...next[i], quantity: Math.min(MAX_PER_LINE, next[i].quantity + quantity) };
      return next;
    });
    setOpen(true);
  }, []);

  const setQuantity = useCallback((variantId, quantity) => {
    setLines((prev) =>
      quantity <= 0
        ? prev.filter((l) => l.variantId !== variantId)
        : prev.map((l) => (l.variantId === variantId ? { ...l, quantity: Math.min(MAX_PER_LINE, quantity) } : l)));
  }, []);

  const remove = useCallback((variantId) => {
    setLines((prev) => prev.filter((l) => l.variantId !== variantId));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo(() => {
    const count = lines.reduce((n, l) => n + l.quantity, 0);
    const subtotal = lines.reduce((n, l) => n + l.price * l.quantity, 0);
    return { lines, count, subtotal, add, setQuantity, remove, clear, open, setOpen };
  }, [lines, add, setQuantity, remove, clear, open]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
