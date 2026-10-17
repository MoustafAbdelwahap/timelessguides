import React, { useState } from "react";

interface Book3DProps {
  title: string;
  coverImage: string;
  mockup3d?: string;
  spineColor?: string;
  amazonUrl: string;
  className?: string;
}

export default function Book3D({
  title,
  coverImage,
  mockup3d,
  spineColor = "#6c796b",
  amazonUrl,
  className = "",
}: Book3DProps) {
  const [isHovered, setIsHovered] = useState(false);

  // If a high-fidelity 3D mockup render is available, display the authentic 3D book mockup
  if (mockup3d) {
    return (
      <div
        className={`relative flex items-center justify-center pt-2 pb-3 select-none ${className}`}
      >
        <a
          href={amazonUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${title} on Amazon`}
          className="group block focus:outline-none cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Interactive 3D Book Presentation */}
          <div
            className="relative transition-all duration-300 ease-out"
            style={{
              transform: isHovered
                ? "translateY(-9px) scale(1.025)"
                : "translateY(0) scale(1)",
            }}
          >
            <img
              src={mockup3d}
              alt={title}
              className="w-[208px] sm:w-[218px] h-auto object-contain block pointer-events-none transition-all duration-300"
              style={{
                filter: isHovered
                  ? "drop-shadow(0 16px 22px rgba(33, 28, 24, 0.16))"
                  : "drop-shadow(0 4px 10px rgba(33, 28, 24, 0.04))",
              }}
              loading="lazy"
              draggable={false}
            />
          </div>
        </a>
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-center justify-center py-6 select-none ${className}`}
      style={{ perspective: "950px" }}
    >
      <a
        href={amazonUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View ${title} on Amazon`}
        className="group block focus:outline-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* 3D Physical Book Assembly */}
        <div
          className="relative"
          style={{
            transformStyle: "preserve-3d",
            // Natural 3D perspective angle:
            // Positive rotateY (15deg) turns the book so the left spine faces the viewer
            // and the front cover angles back to the right in natural perspective.
            transform: isHovered
              ? "translateY(-14px) rotateY(5deg) rotateX(0deg)"
              : "translateY(0) rotateY(15deg) rotateX(2deg)",
            transition: "transform 420ms cubic-bezier(0.2, 0.8, 0.2, 1)",
            width: "216px",
            height: "324px",
          }}
        >
          {/* Ground Soft Contact Shadow */}
          <div
            className="absolute -bottom-5 left-[-10px] right-2 h-7 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 40% 40%, rgba(33, 28, 24, 0.45) 0%, rgba(33, 28, 24, 0.20) 48%, rgba(33, 28, 24, 0.04) 70%, transparent 85%)",
              filter: isHovered ? "blur(8px)" : "blur(5px)",
              transform: isHovered
                ? "translateY(11px) scale(1.08)"
                : "translateY(0) scale(1)",
              opacity: isHovered ? 0.95 : 0.85,
              transition: "all 420ms cubic-bezier(0.2, 0.8, 0.2, 1)",
            }}
          />

          {/* 3D TRUE LEFT SPINE FACE (Rotated -90deg on Y along the left edge) */}
          <div
            className="absolute top-0 bottom-0 left-0 w-[16px] overflow-hidden pointer-events-none z-10 rounded-l-[1px]"
            style={{
              backgroundColor: spineColor,
              transformOrigin: "left center",
              transform: "rotateY(-90deg)",
              boxShadow:
                "inset -2px 0 5px rgba(0,0,0,0.55), inset 2px 0 4px rgba(255,255,255,0.25)",
            }}
          >
            {/* Spine Vertical Title Text */}
            <div
              className="text-white/80 font-['Cormorant_Garamond',serif] font-bold text-[9px] tracking-[0.2em] uppercase text-center h-full flex items-center justify-center select-none"
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }}
            >
              TIMELESS GUIDES
            </div>
          </div>

          {/* 3D TOP PAGE BLOCK (Trimmed paper block receding into perspective) */}
          <div
            className="absolute top-0 left-0 right-0 h-[16px] bg-[#EDE6D8] pointer-events-none z-20"
            style={{
              transformOrigin: "top center",
              transform: "rotateX(90deg)",
              boxShadow:
                "inset 0 0 4px rgba(0,0,0,0.28), inset 0 2px 2px rgba(255,255,255,0.4)",
            }}
          />

          {/* FRONT COVER FACE */}
          <div
            className="absolute inset-0 rounded-r-[3px] overflow-hidden bg-[#211C18]"
            style={{
              boxShadow: isHovered
                ? "18px 25px 40px rgba(33, 28, 24, 0.32), 3px 6px 12px rgba(33, 28, 24, 0.18)"
                : "12px 18px 28px rgba(33, 28, 24, 0.24), 2px 4px 8px rgba(33, 28, 24, 0.12)",
              transition: "box-shadow 420ms cubic-bezier(0.2, 0.8, 0.2, 1)",
            }}
          >
            {/* Book Artwork Image */}
            <img
              src={coverImage}
              alt={title}
              className="w-full h-full object-cover block"
              loading="lazy"
              draggable={false}
            />

            {/* Vertical Paperback Hinge Crease & Laminate Gloss Sheen */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, rgba(0,0,0,0.38) 0%, rgba(255,255,255,0.30) 1.8%, rgba(0,0,0,0.08) 4%, transparent 9%, transparent 91%, rgba(255,255,255,0.10) 98%, rgba(0,0,0,0.22) 100%)",
              }}
            />

            {/* Subtle Diagonal Specular Reflection */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 35%, transparent 60%)",
              }}
            />
          </div>

          {/* RIGHT PAGE STACK (Subtle paper page block) */}
          <div
            className="absolute top-0 bottom-0 right-0 w-[16px] bg-[#E3DACB] pointer-events-none z-10"
            style={{
              transformOrigin: "right center",
              transform: "rotateY(90deg)",
              boxShadow: "inset 0 0 5px rgba(0,0,0,0.3)",
            }}
          />
        </div>
      </a>
    </div>
  );
}

