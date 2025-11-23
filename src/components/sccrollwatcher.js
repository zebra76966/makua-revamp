import React, { useEffect, useRef, useState } from "react";

const SCROLL_LOCK_MS = 800;
const WHEEL_THRESHOLD = 30;
const TOUCH_THRESHOLD = 10;

const isMobileDevice = () => {
  if (typeof window === "undefined") return false;
  return window.innerWidth <= 992; // adjust breakpoint
};

const FullPageScrollWrapper = ({ children }) => {
  const containerRef = useRef(null);
  const sectionsRef = useRef([]);
  const isScrollingRef = useRef(false);
  const touchStartRef = useRef(null);
  const currentIndexRef = useRef(0);
  const [, setRerender] = useState(0);
  const [isMobile, setIsMobile] = useState(isMobileDevice());

  useEffect(() => {
    const handleResize = () => setIsMobile(isMobileDevice());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) return; // 🚀 skip attaching scroll logic on mobile

    const container = containerRef.current;
    if (!container) return;

    sectionsRef.current = Array.from(container.querySelectorAll(".page-section"));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sectionsRef.current.indexOf(entry.target);
            if (idx !== -1) {
              currentIndexRef.current = idx;
              setRerender((s) => s + 1);

              window.dispatchEvent(new CustomEvent("sectionChange", { detail: { index: idx } }));
            }

            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible");
          }
        });
      },
      { root: container, threshold: 0.2 }
    );

    sectionsRef.current.forEach((s) => io.observe(s));

    const clamp = (n) => Math.max(0, Math.min(n, sectionsRef.current.length - 1));

    const scrollToIndex = (index) => {
      if (!container) return;
      index = clamp(index);
      if (isScrollingRef.current || index === currentIndexRef.current) return;
      isScrollingRef.current = true;
      container.scrollTo({
        top: sectionsRef.current[index].offsetTop,
        behavior: "smooth",
      });

      window.setTimeout(() => {
        isScrollingRef.current = false;
        currentIndexRef.current = index;
        setRerender((s) => s + 1);

        // 👉 Dispatch event so Navbar can react
        window.dispatchEvent(new CustomEvent("sectionChange", { detail: { index } }));
      }, SCROLL_LOCK_MS);
    };

    const onWheel = (e) => {
      if (isScrollingRef.current) {
        e.preventDefault();
        return;
      }
      const delta = e.deltaY;
      if (Math.abs(delta) < WHEEL_THRESHOLD) return;
      e.preventDefault();
      if (delta > 0) {
        scrollToIndex(currentIndexRef.current + 1);
      } else {
        scrollToIndex(currentIndexRef.current - 1);
      }
    };

    const onKey = (e) => {
      // if typing inside input/textarea/contentEditable, ignore scroll handling
      const targetTag = e.target.tagName.toLowerCase();
      const isTyping = targetTag === "input" || targetTag === "textarea" || e.target.isContentEditable;
      if (isTyping) return;

      if (isScrollingRef.current) {
        e.preventDefault();
        return;
      }

      if (["ArrowDown", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        scrollToIndex(currentIndexRef.current + 1);
      } else if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        scrollToIndex(currentIndexRef.current - 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        scrollToIndex(0);
      } else if (e.key === "End") {
        e.preventDefault();
        scrollToIndex(sectionsRef.current.length - 1);
      }
    };

    const onTouchStart = (e) => {
      touchStartRef.current = e.touches[0].clientY;
    };

    const onTouchEnd = (e) => {
      if (isScrollingRef.current || touchStartRef.current == null) {
        touchStartRef.current = null;
        return;
      }
      const touchEndY = e.changedTouches[0].clientY;
      const dy = touchStartRef.current - touchEndY;
      if (Math.abs(dy) < TOUCH_THRESHOLD) {
        touchStartRef.current = null;
        return;
      }
      if (dy > 0) {
        scrollToIndex(currentIndexRef.current + 1);
      } else {
        scrollToIndex(currentIndexRef.current - 1);
      }
      touchStartRef.current = null;
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchend", onTouchEnd, { passive: false });
    window.addEventListener("keydown", onKey, { passive: false });

    return () => {
      io.disconnect();
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKey);
    };
  }, [isMobile]);

  // 🚀 If on mobile, just render children normally
  if (isMobile) {
    return <>{children}</>;
  }

  return (
    <div ref={containerRef} className="fullpage-container js-smooth-snap hideScroll">
      {React.Children.map(children, (child) => (
        <section className="page-section">{child}</section>
      ))}
    </div>
  );
};

export default FullPageScrollWrapper;
