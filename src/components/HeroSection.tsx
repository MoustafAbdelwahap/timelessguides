import React from "react";
import GuideFinder from "./GuideFinder";
import HeroDivider from "./HeroDivider";

export default function HeroSection() {
  return (
    <>
      <section
        id="home"
        className="relative min-h-[100vh] min-h-[100svh] flex flex-col justify-between text-white overflow-x-clip bg-[#211C18]"
        style={{
          backgroundImage: "url('/ref-hero.jpg')",
          backgroundPosition: "center 28%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        aria-label="Timeless Guides Hero"
      >
        {/* Layered cinematic dark espresso & golden hour ambient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(23, 18, 14, 0.78) 0%, rgba(23, 18, 14, 0.32) 20%, rgba(23, 18, 14, 0.05) 45%, rgba(23, 18, 14, 0.42) 75%, rgba(23, 18, 14, 0.88) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Ambient Warm Golden Sunset Glow on Left */}
        <div
          className="absolute -left-20 top-1/4 w-[450px] h-[450px] rounded-full pointer-events-none opacity-25 blur-3xl"
          style={{
            background: "radial-gradient(circle, #E5BD70 0%, #C9A15B 40%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        {/* Central Content Container */}
        <div className="relative z-30 w-full max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-12 pt-[140px] sm:pt-[150px] lg:pt-[165px] pb-28 sm:pb-32 lg:pb-36 flex flex-col items-center text-center my-auto">
          {/* Main Headline: 2 lines on desktop, editorial serif */}
          <h1 className="font-['Cormorant_Garamond',serif] font-medium text-[44px] sm:text-[68px] md:text-[84px] lg:text-[98px] xl:text-[104px] text-[#FAF7F0] leading-[1.04] tracking-[-0.015em] max-w-[15ch] drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
            Travel with{" "}
            <em className="gold-text font-normal">
              depth,
            </em>
            <br />
            not a checklist.
          </h1>

          {/* Centered Thin Horizontal Champagne-Gold Line (~65px wide) */}
          <div
            className="w-[65px] h-[1.5px] bg-gradient-to-r from-[#F4D58B] via-[#E5BD70] to-[#C9A15B] my-5 sm:my-6 rounded-full"
            aria-hidden="true"
          />

          {/* Subtitle */}
          <p className="font-['Cormorant_Garamond',serif] text-[19px] sm:text-[21px] md:text-[23px] text-[#FAF7F0]/90 leading-[1.48] max-w-[660px] tracking-[0.01em] drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] mb-8 sm:mb-10 lg:mb-12">
            Curated journeys through history, culture, food and music,
            <br className="hidden sm:inline" /> guided by the people who live there.
          </p>

          {/* Wide Luxury Floating Guidebook Discovery Bar */}
          <GuideFinder />
        </div>

        {/* Bottom Hero Flowing Warm-Ivory Transition Wave with Champagne-Gold Stroke */}
        <HeroDivider />
      </section>
    </>
  );
}