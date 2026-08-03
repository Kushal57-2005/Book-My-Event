import React, { useRef, useState } from "react";

export default function Card3D({ children, className = "" }) {
  const cardRef = useRef(null);
  const [style, setStyle] = useState({});
  const [sheenStyle, setSheenStyle] = useState({ opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg rotation
    const rotateY = ((x - centerX) / centerX) * 10;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: "transform 0.1s ease-out",
    });

    const sheenX = (x / rect.width) * 100;
    const sheenY = (y / rect.height) * 100;

    setSheenStyle({
      opacity: 0.15,
      background: `radial-gradient(circle at ${sheenX}% ${sheenY}%, rgba(255, 255, 255, 0.8), transparent 60%)`,
      transition: "opacity 0.2s ease",
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
    });
    setSheenStyle({
      opacity: 0,
      transition: "opacity 0.5s ease",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className={`relative transform-gpu preserve-3d will-change-transform ${className}`}
    >
      {/* Light Sheen Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 rounded-2xl"
        style={sheenStyle}
      />
      {children}
    </div>
  );
}
