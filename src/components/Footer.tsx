import React, { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import worldmapImg from "@/assets/worldmap.webp";

interface MapDestination {
  id: string;
  name: string;
  country: string;
  flag: string;
  region: "europe" | "middle-east";
  regionLabel: string;
  coordinates: string;
  xPercent: number; // percentage left on 2048x1354 projection
  yPercent: number; // percentage top on 2048x1354 projection
  guideUrl: string;
  amazonUrl: string;
  bookTitle: string;
  bookSlug: string;
  tagline: string;
  highlights: string[];
  localGuidesCount: number;
}

const DESTINATIONS: MapDestination[] = [
  {
    id: "rome",
    name: "Rome",
    country: "Italy",
    flag: "🇮🇹",
    region: "europe",
    regionLabel: "Europe · Italy",
    coordinates: "41°53' N · 12°29' E",
    xPercent: 50.44,
    yPercent: 50.07,
    guideUrl: "https://www.amazon.com/dp/B0FCF1PYGG",
    amazonUrl: "https://www.amazon.com/dp/B0FCF1PYGG",
    bookTitle: "Food Lover's Travel Guide to Rome",
    bookSlug: "food-lovers-travel-guide-to-rome",
    tagline: "Cobblestone alleys, Trastevere wine bars, and quiet dawn walks through antiquity.",
    highlights: ["Trastevere Food Walks", "Testaccio Markets", "Dawn at the Roman Forum"],
    localGuidesCount: 2,
  },
  {
    id: "turkiye",
    name: "Istanbul & Cappadocia",
    country: "Türkiye",
    flag: "🇹🇷",
    region: "middle-east",
    regionLabel: "Middle East · Türkiye",
    coordinates: "41°00' N · 28°58' E",
    xPercent: 55.57,
    yPercent: 51.11,
    guideUrl: "https://www.amazon.com/dp/B0GT2NZLH8",
    amazonUrl: "https://www.amazon.com/dp/B0GT2NZLH8",
    bookTitle: "Essential Travel Guide to Türkiye",
    bookSlug: "essential-travel-guide-to-turkiye",
    tagline: "Where East meets West — Bosphorus ferries, grand spice bazaars & sunrise balloon rides.",
    highlights: ["Bosphorus Sunset Ferry", "Cappadocia Valleys", "Old Sultanahmet Walks"],
    localGuidesCount: 3,
  },
  {
    id: "egypt",
    name: "Cairo, Luxor & Nile",
    country: "Egypt",
    flag: "🇪🇬",
    region: "middle-east",
    regionLabel: "Middle East · Egypt",
    coordinates: "30°02' N · 31°14' E",
    xPercent: 55.52,
    yPercent: 57.24,
    guideUrl: "https://www.amazon.com/dp/B0GSL9CWZ6",
    amazonUrl: "https://www.amazon.com/dp/B0GSL9CWZ6",
    bookTitle: "Egypt for First-Timers",
    bookSlug: "egypt-for-first-timers",
    tagline: "Pyramids at dawn, slow felucca sails down the Nile, and millennia of sacred stone.",
    highlights: ["Sunrise at Giza Plateau", "Felucca on the Nile", "Karnak Temple Colonnades"],
    localGuidesCount: 2,
  },
  {
    id: "paris",
    name: "Paris",
    country: "France",
    flag: "🇫🇷",
    region: "europe",
    regionLabel: "Europe · France",
    coordinates: "48°51' N · 02°20' E",
    xPercent: 47.95,
    yPercent: 46.16,
    guideUrl: "https://www.amazon.com/dp/B0H21PTJ77",
    amazonUrl: "https://www.amazon.com/dp/B0H21PTJ77",
    bookTitle: "Paris for First-Timers",
    bookSlug: "paris-for-first-timers",
    tagline: "Hidden courtyard bistros, quiet Seine banks, and Parisian art beyond the postcard queues.",
    highlights: ["Arrondissement Walking", "Neighborhood Cafés", "Quiet Seine Bridges"],
    localGuidesCount: 1,
  },
  {
    id: "barcelona",
    name: "Barcelona",
    country: "Spain",
    flag: "🇪🇸",
    region: "europe",
    regionLabel: "Europe · Spain",
    coordinates: "41°23' N · 02°10' E",
    xPercent: 47.12,
    yPercent: 50.07,
    guideUrl: "https://www.amazon.com/dp/B0GHGM2TCX",
    amazonUrl: "https://www.amazon.com/dp/B0GHGM2TCX",
    bookTitle: "Barcelona: Tourist to Insider",
    bookSlug: "barcelona-tourist-traps-to-avoid",
    tagline: "Gràcia courtyards, Catalan wine bars, and authentic modernist quarters off the beaten path.",
    highlights: ["Gràcia Neighborhood Tapas", "Modernist Architecture", "Poblenou Sea Walks"],
    localGuidesCount: 1,
  },
  {
    id: "amsterdam",
    name: "Amsterdam",
    country: "Netherlands",
    flag: "🇳🇱",
    region: "europe",
    regionLabel: "Europe · Netherlands",
    coordinates: "52°22' N · 04°54' E",
    xPercent: 49.22,
    yPercent: 43.13,
    guideUrl: "https://www.amazon.com/dp/B0H9G3JJCJ",
    amazonUrl: "https://www.amazon.com/dp/B0H9G3JJCJ",
    bookTitle: "Amsterdam for First-Timers",
    bookSlug: "amsterdam-for-first-timers",
    tagline: "Canal ring bridges, bike lanes, historic brown cafés, and quiet morning waterways.",
    highlights: ["Jordaan Canal Walks", "Museum Quarter", "Canal Ring Architecture"],
    localGuidesCount: 1,
  },
];

type RegionFilter = "all" | "europe" | "middle-east";

export default function Footer() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [selectedDestId, setSelectedDestId] = useState<string | null>(null);
  const [activeRegion, setActiveRegion] = useState<RegionFilter>("all");
  const [hoveredDestId, setHoveredDestId] = useState<string | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const getHref = (hash: string) => (isHomePage ? hash : `/${hash}`);


  const handleSelectDestination = (destId: string) => {
    if (selectedDestId === destId) {
      setSelectedDestId(null);
    } else {
      setSelectedDestId(destId);
      const dest = DESTINATIONS.find((d) => d.id === destId);
      if (dest) {
        setActiveRegion(dest.region);
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Decorative Wave Transition into Atlas & Footer */}
      <div className="wave atlas-wave" style={{ color: "#ffffff" }}>
        <svg viewBox="0 0 1200 80" preserveAspectRatio="none">
          <path
            fill="currentColor"
            d="M0 38C160 8 360 70 600 42S1000 10 1200 42V81H0Z"
          />
        </svg>
      </div>

      <footer className="atlas-footer-wrapper" id="colophon">
        {/* ========================================================= */}
        {/* SECTION 1: INTERACTIVE WORLD ATLAS & DESTINATION TABS     */}
        {/* ========================================================= */}
        <section className="atlas-section" aria-label="Interactive World Map of Destinations">
          <div className="wrap">
            {/* Header / Intro */}
            <div className="atlas-header">
              <span className="atlas-kicker">✦ Where Our Stories Live ✦</span>
            </div>

            {/* Region & Destination Filter Tabs */}
            <div className="atlas-tabs-container">
              <div className="atlas-filter-tabs" role="tablist" aria-label="Filter destinations by region">
                <button
                  type="button"
                  className={`atlas-tab-btn ${activeRegion === "all" ? "active" : ""}`}
                  onClick={() => {
                    setActiveRegion("all");
                    setSelectedDestId(null);
                  }}
                  role="tab"
                  aria-selected={activeRegion === "all"}
                >
                  <span className="atlas-tab-dot"></span>
                  All Destinations <span className="atlas-tab-count">(6)</span>
                </button>

                <button
                  type="button"
                  className={`atlas-tab-btn ${activeRegion === "europe" ? "active" : ""}`}
                  onClick={() => {
                    setActiveRegion("europe");
                    setSelectedDestId("rome");
                  }}
                  role="tab"
                  aria-selected={activeRegion === "europe"}
                >
                  <span className="atlas-tab-dot"></span>
                  Europe <span className="atlas-tab-count">(Rome, Paris, Barcelona & Amsterdam)</span>
                </button>

                <button
                  type="button"
                  className={`atlas-tab-btn ${activeRegion === "middle-east" ? "active" : ""}`}
                  onClick={() => {
                    setActiveRegion("middle-east");
                    setSelectedDestId("turkiye");
                  }}
                  role="tab"
                  aria-selected={activeRegion === "middle-east"}
                >
                  <span className="atlas-tab-dot"></span>
                  Middle East <span className="atlas-tab-count">(Türkiye & Egypt)</span>
                </button>
              </div>

              {/* City Quick Pills */}
              <div className="atlas-city-pills">
                {DESTINATIONS.map((dest) => {
                  const isSelected = selectedDestId === dest.id;
                  const isHovered = hoveredDestId === dest.id;
                  return (
                    <a
                      key={dest.id}
                      href={dest.amazonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`atlas-pill-btn ${isSelected || isHovered ? "active" : ""}`}
                      onMouseEnter={() => setHoveredDestId(dest.id)}
                      onMouseLeave={() => setHoveredDestId(null)}
                      title={`Buy ${dest.bookTitle} on Amazon`}
                    >
                      <span className="atlas-pill-flag">{dest.flag}</span>
                      <span className="atlas-pill-name">{dest.name}</span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* ========================================================= */}
            {/* THE WORLD MAP STAGE                                       */}
            {/* ========================================================= */}
            <div className="atlas-map-stage" ref={mapContainerRef}>
              {/* Background Map Graphic */}
              <div className="atlas-map-layer">
                <img
                  src={worldmapImg}
                  alt="Timeless Guides Global Destinations Map"
                  className="atlas-map-img"
                  loading="lazy"
                  decoding="async"
                />

                {/* Placemarkers Layer (Rendered in percentage coordinate space) */}
                <div className="atlas-placemarkers-layer">
                  {DESTINATIONS.map((dest) => {
                    const isSelected = selectedDestId === dest.id;
                    const isHovered = hoveredDestId === dest.id;
                    const isActive = isSelected || isHovered;
                    const isFilteredOut = activeRegion !== "all" && dest.region !== activeRegion;

                    return (
                      <div
                        key={dest.id}
                        className={`atlas-marker-anchor ${isActive ? "active" : ""} ${isFilteredOut ? "dimmed" : ""}`}
                        style={{
                          left: `${dest.xPercent}%`,
                          top: `${dest.yPercent}%`,
                        }}
                      >
                        {/* Interactive Pin Link to Amazon Book */}
                        <a
                          href={dest.amazonUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="atlas-pin-link"
                          onMouseEnter={() => setHoveredDestId(dest.id)}
                          onMouseLeave={() => setHoveredDestId(null)}
                          aria-label={`Buy ${dest.bookTitle} on Amazon`}
                        >
                          {/* Floating Country Tag */}
                          <span className={`atlas-pin-tag ${isActive ? "visible" : ""}`}>
                            <span className="atlas-tag-flag">{dest.flag}</span>
                            <span className="atlas-tag-text">{dest.name}</span>
                          </span>

                          {/* Teardrop Pin */}
                          <svg viewBox="0 0 24 32" className="atlas-pin-svg">
                            <path
                              d="M12 0C5.373 0 0 5.373 0 12c0 9 12 20 12 20s12-11 12-20c0-6.627-5.373-12-12-12z"
                              fill="#211C18"
                              stroke="#C9A15B"
                              strokeWidth="1.5"
                            />
                            <circle cx="12" cy="12" r="4.5" fill="#E5BD70" />
                          </svg>
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>


          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 2: CLEAN MINIMAL BRAND FOOTER (TRAVELREBELS STYLE)*/}
        {/* ========================================================= */}
        <section className="atlas-directory-section">
          <div className="wrap">
            <div className="clean-footer-row">
              {/* Left Column: Brand, Mission & Social */}
              <div className="clean-footer-brand">
                <h3 className="clean-footer-logo">
                  TIMELESS <br /> GUIDES
                </h3>
                <p className="clean-footer-desc">
                  For the independent traveler who is not averse to adventure but likes to
                  hit the road well-prepared. Discover quiet corners, neighborhood trattorias,
                  sacred ruins, and slow travel field guides.
                </p>

                <div className="clean-footer-social">
                  <span className="clean-social-label">SOCIAL CHECK-IN</span>
                  <div className="clean-social-icons">
                    <a
                      href="https://instagram.com/timelessguides"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram (@timelessguides)"
                      className="clean-social-link"
                    >
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                      </svg>
                    </a>

                    <a
                      href="mailto:timelessguides.global@gmail.com"
                      aria-label="Email Us"
                      className="clean-social-link"
                    >
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column: High-level Pill Tabs */}
              <div className="clean-footer-nav">
                <div className="clean-nav-pills">
                  <a href={getHref("#destinations")} className="clean-pill-tab">
                    Destinations
                  </a>
                  <a href={getHref("#destinations")} className="clean-pill-tab">
                    Travel Guides
                  </a>
                  <Link to="/journal" className="clean-pill-tab">
                    Blog
                  </Link>
                  <Link to="/connect" className="clean-pill-tab">
                    Book Consultation
                  </Link>
                  <a href="mailto:timelessguides.global@gmail.com" className="clean-pill-tab">
                    Contact Us
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Bar: Copyright & Back to top */}
            <div className="clean-footer-bottom">
              <p className="clean-copyright">
                © {new Date().getFullYear()} Timelessguides.com, all rights reserved.
              </p>
              <button
                type="button"
                className="clean-back-to-top"
                onClick={scrollToTop}
                aria-label="Return to top of page"
              >
                <span>Back to top</span>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </button>
            </div>
          </div>
        </section>
      </footer>
    </>
  );
}
