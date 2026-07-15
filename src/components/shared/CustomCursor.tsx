"use client";

import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if device supports hover (typically laptops/desktops)
    const mediaQuery = window.matchMedia("(hover: hover)");
    if (!mediaQuery.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    const addHoverListeners = () => {
      const hoverElements = document.querySelectorAll(
        "a, button, select, input, textarea, [role='button'], .clickable"
      );
      hoverElements.forEach((el) => {
        el.addEventListener("mouseenter", () => setHovered(true));
        el.addEventListener("mouseleave", () => setHovered(false));
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    addHoverListeners();

    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      observer.disconnect();
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={cursorRef}
      className="custom-cursor hidden md:block"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: hovered ? "48px" : "20px",
        height: hovered ? "48px" : "20px",
        backgroundColor: hovered ? "rgba(200, 169, 106, 0.15)" : "transparent",
        borderColor: hovered ? "#D4AF37" : "#C8A96A",
        transition: "width 0.25s ease-out, height 0.25s ease-out, background-color 0.25s ease-out, border-color 0.25s ease-out",
      }}
    />
  );
}
