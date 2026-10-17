import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, ArrowRight, Menu, X } from "lucide-react";

export default function Header() {
  const [isSolid, setIsSolid] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDestDropdownOpen, setIsDestDropdownOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsSolid(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => {
    setIsMobileOpen(false);
    setIsDestDropdownOpen(false);
  };

  const getHref = (hash: string) => (isHomePage ? hash : `/${hash}`);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isSolid || !isHomePage
          ? "bg-[#211C18]/95 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.4)] border-b border-[#C9A15B]/20 py-3"
          : "bg-transparent py-5 lg:py-6"
      }`}
    >
      <div className="max-w-[1500px] w-full mx-auto px-6 sm:px-10 lg:px-12 flex items-center justify-between">
        {/* Left: Two-line Luxury Serif Logo with Thin Champagne-Gold Line */}
        <Link
          to="/"
          className="group flex flex-col items-center justify-center text-center cursor-pointer select-none"
          aria-label="Timeless Guides Home"
          onClick={() => {
            closeMenu();
            if (isHomePage) {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
        >
          <span className="font-['Cormorant_Garamond',serif] font-bold text-[19px] sm:text-[21px] tracking-[0.2em] text-[#FAF7F0] leading-none transition-colors group-hover:text-[#E5BD70]">
            TIMELESS
          </span>
          <span className="w-full h-[1px] bg-[#C9A15B] my-[3.5px] transition-transform duration-300 group-hover:scale-x-110" />
          <span className="font-['Cormorant_Garamond',serif] font-semibold text-[17px] sm:text-[19px] tracking-[0.22em] text-[#FAF7F0] leading-none transition-colors group-hover:text-[#E5BD70]">
            GUIDES
          </span>
        </Link>

        {/* Center Desktop Navigation */}
        <nav
          className="hidden md:flex items-center gap-7 lg:gap-10 text-[15px] font-medium tracking-[0.02em]"
          aria-label="Main Navigation"
        >
          {/* Destinations Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsDestDropdownOpen(true)}
            onMouseLeave={() => setIsDestDropdownOpen(false)}
          >
            <a
              href={getHref("#destinations")}
              className="inline-flex items-center gap-1.5 text-[#FAF7F0] hover:text-[#E5BD70] transition-colors py-2"
              onClick={(e) => {
                if (isHomePage) {
                  // allow smooth scroll
                }
              }}
            >
              <span>Destinations</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-[#FAF7F0]/80 transition-transform duration-200 ${
                  isDestDropdownOpen ? "rotate-180 text-[#C9A15B]" : ""
                }`}
                strokeWidth={2.2}
              />
            </a>

            {/* Dropdown Menu */}
            {isDestDropdownOpen && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-64 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                role="menu"
              >
                <div className="bg-[#211C18]/95 backdrop-blur-md border border-[#C9A15B]/30 rounded-2xl p-3 shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                  <div className="flex flex-col gap-1">
                    <a
                      href="https://www.amazon.com/dp/B0FCF1PYGG"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 rounded-lg text-[14px] text-[#FAF7F0] hover:text-[#211C18] hover:bg-[#C9A15B] transition-colors flex items-center justify-between group"
                      onClick={closeMenu}
                    >
                      <span>Rome, Italy</span>
                      <span className="text-[13px]">🇮🇹</span>
                    </a>
                    <a
                      href="https://www.amazon.com/dp/B0GT2NZLH8"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 rounded-lg text-[14px] text-[#FAF7F0] hover:text-[#211C18] hover:bg-[#C9A15B] transition-colors flex items-center justify-between group"
                      onClick={closeMenu}
                    >
                      <span>Türkiye</span>
                      <span className="text-[13px]">🇹🇷</span>
                    </a>
                    <a
                      href="https://www.amazon.com/dp/B0GSL9CWZ6"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 rounded-lg text-[14px] text-[#FAF7F0] hover:text-[#211C18] hover:bg-[#C9A15B] transition-colors flex items-center justify-between group"
                      onClick={closeMenu}
                    >
                      <span>Egypt & Nile</span>
                      <span className="text-[13px]">🇪🇬</span>
                    </a>
                    <a
                      href="https://www.amazon.com/dp/B0H21PTJ77"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 rounded-lg text-[14px] text-[#FAF7F0] hover:text-[#211C18] hover:bg-[#C9A15B] transition-colors flex items-center justify-between group"
                      onClick={closeMenu}
                    >
                      <span>Paris, France</span>
                      <span className="text-[13px]">🇫🇷</span>
                    </a>
                    <a
                      href="https://www.amazon.com/dp/B0GHGM2TCX"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 rounded-lg text-[14px] text-[#FAF7F0] hover:text-[#211C18] hover:bg-[#C9A15B] transition-colors flex items-center justify-between group"
                      onClick={closeMenu}
                    >
                      <span>Barcelona, Spain</span>
                      <span className="text-[13px]">🇪🇸</span>
                    </a>
                    <a
                      href="https://www.amazon.com/dp/B0H9G3JJCJ"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 rounded-lg text-[14px] text-[#FAF7F0] hover:text-[#211C18] hover:bg-[#C9A15B] transition-colors flex items-center justify-between group"
                      onClick={closeMenu}
                    >
                      <span>Amsterdam</span>
                      <span className="text-[13px]">🇳🇱</span>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Commented out Experiences & Locals for now as requested */}
          {/* <a
            href={getHref("#experiences")}
            className="text-[#FAF7F0] hover:text-[#E5BD70] transition-colors py-2"
          >
            Experiences
          </a> */}

          {/* <a
            href={getHref("#locals")}
            className="text-[#FAF7F0] hover:text-[#E5BD70] transition-colors py-2"
          >
            Locals
          </a> */}

          <a
            href={getHref("#destinations")}
            className="text-[#FAF7F0] hover:text-[#E5BD70] transition-colors py-2"
          >
            Travel Guides
          </a>

          <Link
            to="/journal"
            className="text-[#FAF7F0] hover:text-[#E5BD70] transition-colors py-2"
          >
            Blog
          </Link>
        </nav>

        {/* Right Desktop CTA: Champagne-Gold Rounded Pill Button */}
        <div className="hidden md:flex items-center">
          <Link
            to="/connect"
            className="gold-button inline-flex items-center justify-center font-semibold text-[14.5px] !px-6 !py-2.5 active:translate-y-0"
          >
            <span>Book consultation</span>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center">
          <button
            type="button"
            className="p-2 text-[#FAF7F0] hover:text-[#C9A15B] transition-colors"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileOpen}
          >
            {isMobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileOpen && (
        <div className="md:hidden bg-[#211C18]/98 backdrop-blur-lg border-b border-[#C9A15B]/20 px-6 py-6 animate-in slide-in-from-top-4 duration-300">
          <nav className="flex flex-col gap-4 text-[16px]">
            {/* Mobile Destinations with direct Amazon book links */}
            <div className="py-1 border-b border-white/5">
              <div className="text-[#FAF7F0] font-medium mb-2.5">
                <span>Destinations</span>
              </div>
              <div className="grid grid-cols-2 gap-2 pl-1">
                <a
                  href="https://www.amazon.com/dp/B0FCF1PYGG"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13.5px] text-[#C9A15B] hover:text-white flex items-center gap-1.5 py-1"
                  onClick={closeMenu}
                >
                  <span>🇮🇹 Rome</span>
                </a>
                <a
                  href="https://www.amazon.com/dp/B0GT2NZLH8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13.5px] text-[#C9A15B] hover:text-white flex items-center gap-1.5 py-1"
                  onClick={closeMenu}
                >
                  <span>🇹🇷 Türkiye</span>
                </a>
                <a
                  href="https://www.amazon.com/dp/B0GSL9CWZ6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13.5px] text-[#C9A15B] hover:text-white flex items-center gap-1.5 py-1"
                  onClick={closeMenu}
                >
                  <span>🇪🇬 Egypt</span>
                </a>
                <a
                  href="https://www.amazon.com/dp/B0H21PTJ77"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13.5px] text-[#C9A15B] hover:text-white flex items-center gap-1.5 py-1"
                  onClick={closeMenu}
                >
                  <span>🇫🇷 Paris</span>
                </a>
                <a
                  href="https://www.amazon.com/dp/B0GHGM2TCX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13.5px] text-[#C9A15B] hover:text-white flex items-center gap-1.5 py-1"
                  onClick={closeMenu}
                >
                  <span>🇪🇸 Barcelona</span>
                </a>
                <a
                  href="https://www.amazon.com/dp/B0H9G3JJCJ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13.5px] text-[#C9A15B] hover:text-white flex items-center gap-1.5 py-1"
                  onClick={closeMenu}
                >
                  <span>🇳🇱 Amsterdam</span>
                </a>
              </div>
            </div>

            {/* Commented out Experiences & Locals for now as requested */}
            {/* <a
              href={getHref("#experiences")}
              className="text-[#FAF7F0] hover:text-[#C9A15B] py-1 border-b border-white/5"
              onClick={closeMenu}
            >
              Experiences
            </a> */}
            {/* <a
              href={getHref("#locals")}
              className="text-[#FAF7F0] hover:text-[#C9A15B] py-1 border-b border-white/5"
              onClick={closeMenu}
            >
              Locals
            </a> */}

            <a
              href={getHref("#destinations")}
              className="text-[#FAF7F0] hover:text-[#C9A15B] py-1 border-b border-white/5"
              onClick={closeMenu}
            >
              Travel Guides
            </a>
            <Link
              to="/journal"
              className="text-[#FAF7F0] hover:text-[#C9A15B] py-1 border-b border-white/5"
              onClick={closeMenu}
            >
              Blog
            </Link>

            <div className="pt-2">
              <Link
                to="/connect"
                className="gold-button w-full inline-flex items-center justify-center font-semibold text-[15px] !px-6 !py-3 active:translate-y-0"
                onClick={closeMenu}
              >
                <span>Book consultation</span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
