import React, { useRef, useState, useEffect } from "react";

export default function HeroDivider() {
  const pathRef = useRef<SVGPathElement>(null);
  const [planeState, setPlaneState] = useState({
    x: 45,
    y: 45,
    angle: 90,
    targetLen: 45,
    ready: false,
  });

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    let pathLength = 0;
    try {
      pathLength = path.getTotalLength();
    } catch {
      return;
    }

    const updatePlanePosition = () => {
      // Calculate scroll progress from page top until Section 2 (#destinations) is nicely in view
      const scrollY = window.scrollY;
      const section2 = document.getElementById("destinations");

      let progress = 0;
      if (section2) {
        const rect = section2.getBoundingClientRect();
        const section2Top = rect.top + scrollY;
        const targetScroll = Math.max(250, section2Top - window.innerHeight * 0.45);
        progress = Math.min(1, Math.max(0, scrollY / targetScroll));
      } else {
        progress = Math.min(1, Math.max(0, scrollY / 600));
      }

      // Start comfortably inside visible viewport (~45px) and glide along the crest
      const startOffset = 45;
      const endOffset = 45;
      const effectiveLen = Math.max(0, pathLength - startOffset - endOffset);
      const currentTarget = startOffset + progress * effectiveLen;

      const ptA = path.getPointAtLength(currentTarget);
      const ptB = path.getPointAtLength(Math.min(pathLength, currentTarget + 2));

      const angleRad = Math.atan2(ptB.y - ptA.y, ptB.x - ptA.x);
      const angleDeg = angleRad * (180 / Math.PI) + 90;

      setPlaneState({
        x: ptA.x,
        y: ptA.y,
        angle: angleDeg,
        targetLen: currentTarget,
        ready: true,
      });
    };

    updatePlanePosition();
    window.addEventListener("scroll", updatePlanePosition, { passive: true });
    window.addEventListener("resize", updatePlanePosition, { passive: true });

    return () => {
      window.removeEventListener("scroll", updatePlanePosition);
      window.removeEventListener("resize", updatePlanePosition);
    };
  }, []);

  return (
    <div
      className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-20 pointer-events-none select-none"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full h-16 sm:h-20 md:h-28 block overflow-visible"
      >
        <defs>
          <linearGradient id="planeGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F4D58B" />
            <stop offset="50%" stopColor="#E5BD70" />
            <stop offset="100%" stopColor="#AC813D" />
          </linearGradient>
          <filter id="planeShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#17120E" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* Soft Warm-Ivory Background Fill */}
        <path
          d="M0,58 C220,12 360,18 640,52 C920,84 1160,16 1440,42 L1440,100 L0,100 Z"
          fill="#FAF7F0"
        />

        {/* Champagne-Gold Accent Stroke Along Crest */}
        <path
          ref={pathRef}
          d="M0,58 C220,12 360,18 640,52 C920,84 1160,16 1440,42"
          stroke="#E5BD70"
          strokeWidth="2"
          strokeOpacity="0.65"
          strokeLinecap="round"
          fill="none"
        />

        {/* Flight Path Vapor Trail Extending Behind Plane */}
        <path
          d="M0,58 C220,12 360,18 640,52 C920,84 1160,16 1440,42"
          stroke="#F4D58B"
          strokeWidth="2.5"
          strokeDasharray={`${Math.max(0, planeState.targetLen - 14)} 3000`}
          strokeOpacity="0.9"
          strokeLinecap="round"
          fill="none"
        />

        {/* Animated Prominent Airplane moving on the separator crest */}
        {planeState.ready && (
          <g
            transform={`translate(${planeState.x}, ${planeState.y}) rotate(${planeState.angle})`}
            filter="url(#planeShadow)"
            className="transition-transform duration-75 ease-out"
          >
            {/* Airplane shadow backing */}
            <path
              d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
              fill="rgba(33, 28, 24, 0.35)"
              transform="scale(2.5) translate(-11, -9.5)"
            />
            {/* Golden airplane body (scaled up significantly for prominent luxury presence) */}
            <path
              d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
              fill="url(#planeGoldGrad)"
              stroke="#FFFFFF"
              strokeWidth="0.7"
              strokeOpacity="0.9"
              transform="scale(2.5) translate(-12, -12)"
            />
            {/* Fuselage center spine highlight */}
            <line
              x1="0"
              y1="-18"
              x2="0"
              y2="14"
              stroke="#FFFFFF"
              strokeWidth="1.2"
              strokeOpacity="0.75"
              strokeLinecap="round"
            />
            {/* Cockpit glass highlight */}
            <circle
              cx="0"
              cy="-14"
              r="1.6"
              fill="#211C18"
              stroke="#FFFFFF"
              strokeWidth="0.6"
            />
          </g>
        )}
      </svg>
    </div>
  );
}
