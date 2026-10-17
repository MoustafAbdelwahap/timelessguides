import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Search } from "lucide-react";

interface GuideFinderProps {
  className?: string;
}

export default function GuideFinder({ className = "" }: GuideFinderProps) {
  const [where, setWhere] = useState("Rome");
  const [want, setWant] = useState("A guidebook");

  // Active open dropdown: "where" | "want" | null
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close dropdown on outside click or escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const whereOptions = [
    { label: "Rome", country: "Italy", flag: "🇮🇹" },
    { label: "Paris", country: "France", flag: "🇫🇷" },
    { label: "Barcelona", country: "Spain", flag: "🇪🇸" },
    { label: "Amsterdam", country: "Netherlands", flag: "🇳🇱" },
    { label: "Istanbul", country: "Türkiye", flag: "🇹🇷" },
    { label: "Türkiye", country: "Eurasia", flag: "🇹🇷" },
    { label: "Egypt", country: "Cairo & Nile", flag: "🇪🇬" },
  ];

  const wantOptions = [
    {
      label: "A guidebook",
      desc: "Instant Amazon field guide with authentic local insight",
    },
    {
      label: "A 1-to-1 consultation",
      desc: "Personal itinerary planning with resident guides",
    },
    {
      label: "Local experiences",
      desc: "Private tasting tours & insider cultural moments",
    },
    {
      label: "Travel inspiration",
      desc: "Slow travel stories & curated neighborhood routes",
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveDropdown(null);

    const isGuidebook = want.toLowerCase().includes("guidebook");
    if (isGuidebook) {
      const amazonMap: Record<string, string> = {
        Rome: "https://www.amazon.com/dp/B0FCF1PYGG",
        Paris: "https://www.amazon.com/dp/B0H21PTJ77",
        Barcelona: "https://www.amazon.com/dp/B0GHGM2TCX",
        Amsterdam: "https://www.amazon.com/dp/B0H9G3JJCJ",
        Istanbul: "https://www.amazon.com/dp/B0FXHL554L",
        Türkiye: "https://www.amazon.com/dp/B0GT2NZLH8",
        Egypt: "https://www.amazon.com/dp/B0GSL9CWZ6",
      };
      const amazonUrl =
        amazonMap[where] ||
        "https://www.amazon.com/stores/Timeless-Guides/author/B0GHGPSXCD";
      window.open(amazonUrl, "_blank", "noopener,noreferrer");
    } else {
      // Any other option takes the user to the 1-to-1 consultation page on the website
      navigate(`/connect?destination=${encodeURIComponent(where.toLowerCase())}`);
    }
  };

  const toggleDropdown = (name: string) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-[740px] mx-auto z-40 ${className}`}
    >
      <form
        onSubmit={handleSearch}
        className="w-full bg-[#FAF7F0] rounded-2xl sm:rounded-full p-2 sm:p-2 sm:pl-6 sm:pr-2 shadow-[0_20px_50px_rgba(15,10,5,0.35),0_0_0_1.5px_rgba(201,161,91,0.45)] flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-0"
      >
        {/* Field 1: WHERE */}
        <div className="relative flex-1 group">
          <button
            type="button"
            onClick={() => toggleDropdown("where")}
            className="w-full text-left px-3.5 py-1.5 sm:py-2 rounded-xl sm:rounded-full hover:bg-[#F2ECE0]/70 transition-colors flex items-center justify-between gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A15B]"
            aria-haspopup="listbox"
            aria-expanded={activeDropdown === "where"}
          >
            <div className="flex flex-col min-w-0 pr-2">
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#766753] leading-none mb-1">
                WHERE
              </span>
              <span className="font-['Cormorant_Garamond',serif] font-semibold text-[19px] sm:text-[20px] text-[#211C18] leading-tight truncate">
                {where}
              </span>
            </div>
            <ChevronDown
              className={`w-3.5 h-3.5 text-[#766753] shrink-0 transition-transform duration-200 mr-2 ${
                activeDropdown === "where" ? "rotate-180 text-[#C9A15B]" : ""
              }`}
              strokeWidth={2}
            />
          </button>

          {/* WHERE Floating Popover Menu */}
          {activeDropdown === "where" && (
            <div className="absolute top-[calc(100%+8px)] left-0 w-72 sm:w-80 bg-[#FAF7F0] border border-[#C9A15B]/50 rounded-2xl p-2.5 shadow-[0_25px_60px_rgba(15,10,5,0.45),0_0_0_1px_rgba(201,161,91,0.25)] z-[100] animate-in fade-in zoom-in-95 duration-150">
              <div className="text-[10px] uppercase tracking-[0.16em] font-semibold text-[#766753] px-3 py-1.5 border-b border-[#766753]/15 mb-1.5">
                Select Destination
              </div>
              <div
                className="flex flex-col gap-1 max-h-72 overflow-y-auto pr-1"
                style={{ scrollbarWidth: "thin" }}
              >
                {whereOptions.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      setWhere(item.label);
                      setActiveDropdown(null);
                    }}
                    className={`w-full text-left px-3.5 py-2 rounded-xl font-['Cormorant_Garamond',serif] text-[18px] font-semibold flex items-center justify-between transition-colors ${
                      where === item.label
                        ? "bg-gradient-to-r from-[#F4D58B] via-[#E5BD70] to-[#C9A15B] text-[#211C18] shadow-sm font-bold"
                        : "text-[#211C18] hover:bg-[#F2ECE0]"
                    }`}
                  >
                    <span>
                      <span className="mr-2 text-[16px]">{item.flag}</span>
                      {item.label}
                    </span>
                    <span
                      className={`text-[12px] font-sans font-normal ${
                        where === item.label
                          ? "text-[#211C18]/80"
                          : "text-[#766753]"
                      }`}
                    >
                      {item.country}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Vertical Divider Between WHERE and I WANT */}
        <div className="hidden sm:block w-[1px] h-9 bg-[#766753]/25 mx-2 shrink-0" />

        {/* Field 2: I WANT */}
        <div className="relative flex-[1.25] group">
          <button
            type="button"
            onClick={() => toggleDropdown("want")}
            className="w-full text-left px-3.5 py-1.5 sm:py-2 rounded-xl sm:rounded-full hover:bg-[#F2ECE0]/70 transition-colors flex items-center justify-between gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A15B]"
            aria-haspopup="listbox"
            aria-expanded={activeDropdown === "want"}
          >
            <div className="flex flex-col min-w-0 pr-1">
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#766753] leading-none mb-1">
                I WANT
              </span>
              <span className="font-['Cormorant_Garamond',serif] font-semibold text-[19px] sm:text-[20px] text-[#211C18] leading-tight truncate">
                {want}
              </span>
            </div>
            <ChevronDown
              className={`w-3.5 h-3.5 text-[#766753] shrink-0 transition-transform duration-200 mr-2 ${
                activeDropdown === "want" ? "rotate-180 text-[#C9A15B]" : ""
              }`}
              strokeWidth={2}
            />
          </button>

          {/* I WANT Floating Popover Menu */}
          {activeDropdown === "want" && (
            <div className="absolute top-[calc(100%+8px)] left-0 sm:left-auto sm:right-0 mt-0 w-80 sm:w-96 bg-[#FAF7F0] border border-[#C9A15B]/50 rounded-2xl p-2.5 shadow-[0_25px_60px_rgba(15,10,5,0.45),0_0_0_1px_rgba(201,161,91,0.25)] z-[100] animate-in fade-in zoom-in-95 duration-150">
              <div className="text-[10px] uppercase tracking-[0.16em] font-semibold text-[#766753] px-3 py-1.5 border-b border-[#766753]/15 mb-1.5">
                Choose Experience Type
              </div>
              <div className="flex flex-col gap-1 max-h-80 overflow-y-auto pr-1">
                {wantOptions.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      setWant(item.label);
                      setActiveDropdown(null);
                    }}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-colors ${
                      want === item.label
                        ? "bg-gradient-to-r from-[#F4D58B] via-[#E5BD70] to-[#C9A15B] text-[#211C18] shadow-sm"
                        : "hover:bg-[#F2ECE0] text-[#211C18]"
                    }`}
                  >
                    <div className="font-['Cormorant_Garamond',serif] text-[18px] font-semibold leading-snug">
                      {item.label}
                    </div>
                    <div
                      className={`text-[12px] leading-relaxed mt-0.5 ${
                        want === item.label
                          ? "text-[#211C18]/80"
                          : "text-[#766753]"
                      }`}
                    >
                      {item.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* SEARCH BUTTON (Far Right) */}
        <div className="w-full sm:w-auto pt-1 sm:pt-0 shrink-0 sm:ml-2">
          <button
            type="submit"
            className="gold-button w-full sm:w-auto inline-flex items-center justify-center gap-2.5 font-semibold text-[15px] !px-7 !py-2.5 sm:!py-3 active:translate-y-0 shadow-sm"
          >
            <Search className="w-4 h-4 text-[#211C18] stroke-[2.2]" />
            <span>Search</span>
          </button>
        </div>
      </form>
    </div>
  );
}
